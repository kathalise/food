const express = require("express");
const app = express();
const compression = require("compression");
// const config is for image upload
// const config = require("./config.json");

app.use(compression());
app.use(express.static("./public"));
app.use(express.json());

app.use(
    express.urlencoded({
        extended: false,
    })
);

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
////////////////////////////////////////////////
/* --------------   ALL ROUTES  ------------- */
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

app.get("/user/logged-in", function (req, res) {
    console.log("HELLO USER PAGE! userId: ");
    // const userId = req.session.userId;
    // db.getUserInfo(userId)
    //     .then((result) => {
    //         // console.log("result: ", result.rows[0]);
    //         const userInfo = result.rows[0];
    //         // console.log("UserInfo", userInfo);
    //         res.json(userInfo);
    //     })
    //     .catch((err) => {
    //         console.log("err in GET /user", err);
    //     });
});
////////////////////////////////////////////////
/* --------------    LOG OUT    ------------- */
////////////////////////////////////////////////

app.get("/logout", (req, res) => {
    req.session.userId = null;
    res.redirect("/");
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
