const spicedPg = require("spiced-pg");
const db = spicedPg(
    process.env.DATABASE_URL ||
        "postgres:postgres:postgres@localhost:5432/food-app"
);

// ------------------- users table ------------------- //

module.exports.addUser = (firstname, lastname, email, password) => {
    const q = `INSERT INTO users (firstname, lastname, email, password) VALUES ($1, $2, $3, $4) 
    RETURNING id`;

    const params = [firstname, lastname, email, password];
    return db.query(q, params);
};

module.exports.loginUser = (email) => {
    const q = `SELECT password, id FROM users WHERE email = $1`;
    const params = [email];
    return db.query(q, params);
};

module.exports.getUserInfo = (id) => {
    const q = `SELECT * FROM users WHERE id = $1`;
    const params = [id];
    return db.query(q, params);
};

module.exports.addNewPassword = (email, password) => {
    const q = `UPDATE users SET password=$2 WHERE email=$1 RETURNING *`;
    const params = [email, password];
    return db.query(q, params);
};
// ------------------- password_reset_codes table ------------------- //

module.exports.addResetCode = (email, code) => {
    const q = `INSERT INTO password_reset_codes (email, code) 
    VALUES ($1, $2) RETURNING id`;
    const params = [email, code];
    return db.query(q, params);
};

module.exports.getCode = (email) => {
    const q = `SELECT code FROM password_reset_codes WHERE email=$1 AND 
    CURRENT_TIMESTAMP - created_at < INTERVAL '10 minutes' 
    ORDER BY created_at DESC
    LIMIT 1`;
    const params = [email];
    return db.query(q, params);
};

// ------------------- offers & categories ------------------- //

module.exports.choseCategory = (category_name) => {
    const q = `SELECT * FROM categories WHERE name = $1`;
    const params = [category_name];
    return db.query(q, params);
};

module.exports.addOffer = (
    offerer_id,
    title,
    category,
    description,
    imgurl
) => {
    const q = `INSERT INTO offers (offerer_id, title, category_id, description, imgurl_offer) VALUES ($1, $2, $3, $4, $5) 
    RETURNING id`;

    const params = [offerer_id, title, category, description, imgurl];
    return db.query(q, params);
};