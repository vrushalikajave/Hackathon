//import { getCategory } from './categoryService';
const db = require('../db');

export const getCategory = async (qry:any) => {

    const query = `SELECT * FROM category ${qry}`;
    
    const [rows] = await db.query(query);
 return rows;
}




export const create = async (data: any) => {
    const { name, description } = data;
    const query = `INSERT INTO category (name, description)
    VALUES (?, ?)`;
    const [rows] = await db.query(query, [name, description]);

    console.log("rows", rows)
    return rows;


}

export const remove = async (req: any) => {
    try {
        const query = `update category set status=0 where id=${req.query.id}`;
        const [rows] = await db.query(query, []);
        return rows;
    } catch (e: any) {
        throw e;
    }
};

export const update = async (data: any, id: number) => {
    try {

        const query = 'UPDATE category SET ? WHERE id = ?';
        const [rows] = await db.query(query, [data, id]);
        return rows;
    } catch (e: any) {
        throw e;
    }
};


export const getById = async (id: any) => {
    const query = `SELECT * FROM category where id=${id}`;
    const [rows] = await db.query(query);

    return rows;



};