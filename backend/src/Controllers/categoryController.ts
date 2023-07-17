
import * as CategoryService from "../Services/categoryService"
import ApiResponse from "../utilities/ApiResponse";
import httpStatusCodes from "http-status-codes";
let { OK, BAD_REQUEST } = httpStatusCodes;


const getCategory = async (req: any, res: any) => {

  let query = "";
 
  if (req.body.query && req.body.query != "") {
query = `WHERE(name like '%${req.body.query}%' OR description like '%${req.body.query}%' OR status like '%${req.body.query}%'`;
    }
  let result = await CategoryService.getCategory(query)
  if (result.length == 0)
    ApiResponse.error(res, httpStatusCodes.BAD_REQUEST, result.message);
  ApiResponse.result(res, result, httpStatusCodes.OK);

}


const create = async (req: any, res: any) => {
  try {

    let result: any = await CategoryService.create(req.body);
    if (!result.affectedRows) throw "Something went wrong !";
    return ApiResponse.result(res, { message: "Record inserted !" }, OK);
  } catch (e: any) {
    ApiResponse.error(res, httpStatusCodes.BAD_REQUEST, "");
  }
};

const remove = async (req: any, res: any) => {
  try {
    let result: any = await CategoryService.remove(req);

    if (!result.affectedRows) throw "Record not found !";
    return ApiResponse.result(res, { message: "Record deleted !" }, OK);
  } catch (e: any) {
    return ApiResponse.error(res, BAD_REQUEST, e);
  }
};

const update = async (req: any, res: any) => {
  try {
    if (!req.body.id) throw "Id is required!";

    let id = req.body.id;
    delete req.body.id;

    let result = await CategoryService.update(req.body, id);
    if (!result.affectedRows) throw "Category not found! !";
    return ApiResponse.result(res, { message: "Record updated!" }, OK);
  } catch (e: any) {
    return ApiResponse.error(res, BAD_REQUEST, e);
  }
};


const getById = async (req: any, res: any) => {
  try {
    let result: any = null;

    if (req.query.id) {
      result = await CategoryService.getById(req.query.id);
      if (!result.length) return ApiResponse.error(res, BAD_REQUEST, "Not found !");
      return ApiResponse.result(res, result, OK);
    }

  } catch (e: any) {
    if (e == "!found") return ApiResponse.error(res, BAD_REQUEST, " not found.");
    return ApiResponse.error(res, BAD_REQUEST,);
  }
};


export default {
  getCategory,
  create,
  remove,
  update,
  getById
}