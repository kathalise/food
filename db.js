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

module.exports.uploadProfilePic = (imgUrl, id) => {
    const q = `UPDATE users SET imgurl = $1 WHERE id = $2 RETURNING imgurl`;
    const params = [imgUrl, id];
    return db.query(q, params);
};

module.exports.getOtherUser = (otherUserId) => {
    const q = `SELECT * FROM users WHERE id = $1`;
    const params = [otherUserId];
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

// module.exports.addOffer = (category_name) => {
//     const q = `INSERT INTO offers SELECT categories.id FROM categories WHERE name = $1`;
//     const params = [category_name];
//     return db.query(q, params);
// };

module.exports.addOffer = (
    offerer_id,
    title,
    category,
    description,
    imgurl,
    address
) => {
    const q = `INSERT INTO offers (offerer_id, title, category, description, imgurl_offer, address) VALUES ($1, $2, $3, $4, $5, $6) 
    RETURNING offers.id`;

    const params = [offerer_id, title, category, description, imgurl, address];
    return db.query(q, params);
};

module.exports.getAllOffers = () => {
    const q = `SELECT * FROM offers ORDER BY id DESC`;
    return db.query(q);
};

module.exports.getOffer = (id) => {
    // const q = `SELECT * FROM offers WHERE id = $1`;
    const q = `SELECT * FROM offers INNER JOIN users ON users.id= offerer_id WHERE offers.id = $1;`;
    const params = [id];
    return db.query(q, params);
};

module.exports.getOfferByCategory = (category) => {
    const q = `SELECT * FROM offers WHERE category=$1;`;
    const params = [category];
    return db.query(q, params);
};

module.exports.getUsersOffers = (offererId) => {
    const q = `SELECT * FROM offers WHERE offerer_id=$1`;
    const params = [offererId];
    return db.query(q, params);
};

// -------------------  messages  ------------------- //
module.exports.addPrivateMassages = (senderId, recipientId, message) => {
    const q = `INSERT INTO messages (sender_id, recipient_id, message_text) 
    VALUES ($1, $2, $3) RETURNING messages.id`;

    const params = [senderId, recipientId, message];
    return db.query(q, params);
};

module.exports.getPrivateMassages = (userId) => {
    const q = `SELECT * FROM messages INNER JOIN users ON (users.id=sender_id)
     WHERE (sender_id=$1) 
    OR (recipient_id=$1)
    ORDER BY msg_created_at DESC`;

    const params = [userId];
    return db.query(q, params);
};
