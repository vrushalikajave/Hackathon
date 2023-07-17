const db = require('../db');

export const getProduct = async () => {

    const query = `SELECT * FROM products `;
    const [rows] = await db.query(query);
    return rows;
}




export const create = async (data: any) => {
    try {
        const { category, name, pack_size, mrp, image, status } = data;
        const query = `INSERT INTO products (category, name, pack_size, mrp, image, status)
                     VALUES (?, ?, ?, ?, ?, ?)`;
        const [rows] = await db.query(query, [category, name, pack_size, mrp, image, status]);

        return rows;
    } catch (e) {
        throw e;
    }
};

export const remove = async (req: any) => {
    try {
        const query = `update products set status=0 where id=${req.query.id}`;
        const [rows] = await db.query(query, []);
        return rows;
    } catch (e: any) {
        throw e;
    }
};

export const update = async (data: any, id: number) => {
    try {

        const query = 'UPDATE products SET ? WHERE id = ?';
        const [rows] = await db.query(query, [data, id]);
        return rows;
    } catch (e: any) {
        throw e;
    }
};


export const getById = async (id: any) => {
    const query = `SELECT * FROM products where id=${id}`;
    const [rows] = await db.query(query);

    return rows;

};