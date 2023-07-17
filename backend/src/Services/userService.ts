const db = require('../db');

export const getUser = async () => {

    const query = `SELECT * FROM user`;
    const [rows] = await db.query(query);
    return rows;
}




