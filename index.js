const express = require("express");
const app = express();
const compression = require("compression");

const cookieSession = require("cookie-session");
// const config is for image upload
const config = require("./config.json");
const { compare, hash } = require("./bcrypt.js");
const csurf = require("csurf");
const db = require("./db.js");
const ses = require("./ses.js");
const s3 = require("./s3.js");
const multer = require("multer");
const uidSafe = require("uid-safe");
const path = require("path");
const cryptoRandomString = require("crypto-random-string");

const diskStorage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, __dirname + "/uploads");
    },
    filename: function (req, file, callback) {
        uidSafe(24).then(function (uid) {
            callback(null, uid + path.extname(file.originalname));
        });
    },
});
const uploader = multer({
    storage: diskStorage,
    limits: {
        fileSize: 2097152,
    },
});
app.use(compression());
app.use(express.static("./public"));
app.use(express.json());

app.use(
    express.urlencoded({
        extended: false,
    })
);

// cookie session
let secrets;
process.env.NODE_ENV === "production"
    ? (secrets = process.env)
    : (secrets = require("./secrets"));
app.use(
    cookieSession({
        secret: `${secrets.sessionSecret}`,
        maxAge: 1000 * 60 * 60 * 24,
    })
);

// cookie Session token protection
app.use(csurf());

app.use(function (req, res, next) {
    console.log("token");
    res.cookie("mytoken", req.csrfToken());
    next();
});

app.use(function (req, res, next) {
    res.set("x-frame-options", "DENY");
    console.log(req.method, req.url);
    next();
});

if (process.env.NODE_ENV != "production") {
    app.use(
        "/bundle.js",
        require("http-proxy-middleware")({
            target: "http://localhost:8081/",
        })
    );
} else {
    app.use("/bundle.js", (req, res) => res.sendFile(`${__dirname}/bundle.js`));
}
////////////////////////////////////////////////////////////////////////////////
/* ------------------------------   ALL ROUTES  ---------------------------- */
///////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////
/* ----------------  WELCOME  --------------- */
////////////////////////////////////////////////
app.get("/welcome", function (req, res) {
    console.log("in get /welcome: ", req.session);
    // if user is logged in
    // if (req.session.userId) {
    //     console.log("Hallo MerleMerle");
    //     res.redirect("/");
    // } else {
    res.sendFile(__dirname + "/index.html");
    // }
});

////////////////////////////////////////////////
/* ---------------  REGISTER  --------------- */
////////////////////////////////////////////////

app.post("/register", (req, res) => {
    console.log("user info, req.body: ", req.body);
    const { firstname, lastname, email } = req.body;
    const plainPassword = req.body.password;

    if (!firstname || !lastname || !email || !plainPassword) {
        console.log("Missing input!");
        res.json({ success: false });
    } else {
        hash(plainPassword).then((password) => {
            console.log("plainPassword got hashed -> : ", password);
            db.addUser(firstname, lastname, email, password)
                .then((result) => {
                    console.log("userId from DB: ", result.rows[0].id);
                    req.session.userId = result.rows[0].id;
                    res.json({ success: true });
                })
                .catch((err) => {
                    console.log("Error in POST / register addUser", err);
                    res.json({ success: false });
                });
        });
    }
});

////////////////////////////////////////////////
/* -----------------  LOGIN ----------------- */
////////////////////////////////////////////////

app.post("/login", (req, res) => {
    console.log("user info login, req.body: ", req.body);
    const email = req.body.email;
    const plainPassword = req.body.password;

    db.loginUser(email)
        .then((hashedPassword) => {
            const password = hashedPassword.rows[0].password;
            // console.log("password ", password);
            // console.log(
            //     "hashedPassword.rows[0].id ",
            //     hashedPassword.rows[0].id
            // );
            compare(plainPassword, password)
                .then((userExists) => {
                    console.log("userExists: ", userExists);
                    if (userExists) {
                        // console.log("user Exists GO ON!");
                        req.session.userId = hashedPassword.rows[0].id;
                        res.json({ success: true });
                    } else {
                        console.log("Wrong email pw combination!");
                        res.json({ success: false });
                    }
                })
                .catch((err) => {
                    console.log("error in catch block compare", err);
                    res.json({ success: false });
                });
        })
        .catch((err) => {
            console.log("err in catch block loginUser", err);
            res.json({ success: false });
        });
});

////////////////////////////////////////////////
/* ------------- RESET PASSWORD ------------- */
////////////////////////////////////////////////

///////////// STEP ONE - post-email ///////////

app.post("/reset-email", (req, res) => {
    console.log("Email for pw reset submitted", req.body);
    const { email } = req.body;
    console.log("email: ", email);
    if (!email) {
        console.log("Wrong E-Mail");
        res.json({ success: false });
    } else {
        console.log("EMAIL IS CORRECT!");
        const resetCode = cryptoRandomString({
            length: 6,
        });
        console.log("resetCode: ", resetCode);

        db.addResetCode(email, resetCode)
            .then(() => {
                console.log("inside addResetCode");
                ses.sendEmail(
                    email,
                    resetCode,
                    "Here's the Code to reset Your Password"
                )
                    .then(() => {
                        console.log("inside send Email");
                        res.json({ success: true });
                    })
                    .catch((err) => {
                        console.log("Err in sendEmail", err);
                        res.json({ success: false });
                    });
            })
            .catch((err) => {
                console.log("error in addResetCode", err);
                res.json({ success: false });
            });
    }
});

///////////// STEP TWO - post code + new pw ///////////

app.post("/reset-code", (req, res) => {
    // console.log("inside POST /reset-code: ", req.body);
    const email = req.body.email;
    const code = req.body.code;
    const plainPassword = req.body.password;
    if (!code || !plainPassword) {
        console.log("missing / false input values!");
        res.json({ success: false });
    } else {
        // console.log("ELSE, code pw: ", code, plainPassword);
        db.getCode(email)
            .then((result) => {
                console.log(
                    "Result from DB / get code, result.rows[0].code: ",
                    result.rows[0].code
                );
                if (code == result.rows[0].code) {
                    console.log("Code matches! off to hashing new pw");
                    hash(plainPassword)
                        .then((password) => {
                            db.addNewPassword(email, password)
                                .then(() => {
                                    res.json({ success: true });
                                })
                                .catch((err) => {
                                    console.log("err", err);
                                });
                        })
                        .catch((err) => {
                            console.log("err in hashing new pw", err);
                        });
                } else {
                    console.log("FAILED CHANGING PW");
                    res.json({ success: false });
                }
            })
            .catch((err) => {
                console.log("err in getCode", err);
                res.json({ success: false });
            });
    }
});

////////////////////////////////////////////////
/* --------------   USER PAGE   ------------- */
////////////////////////////////////////////////

app.get("/user/logged-in", function (req, res) {
    console.log("HELLO USER PAGE! userId: ", req.session.userId);
    const userId = req.session.userId;
    db.getUserInfo(userId)
        .then((result) => {
            console.log("result: ", result.rows[0]);
            const userInfo = result.rows[0];

            res.json(userInfo);
        })
        .catch((err) => {
            console.log("err in GET /user", err);
        });
});
////////////////////////////////////////////////
/* --------------    LOG OUT    ------------- */
////////////////////////////////////////////////

app.get("/logout", (req, res) => {
    req.session.userId = null;
    res.redirect("/welcome");
});

////////////////////////////////////////////////
/* -------------- LAST ROUTE    ------------- */
////////////////////////////////////////////////
app.get("*", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.listen(8080, function () {
    console.log("I'm listening.");
});
