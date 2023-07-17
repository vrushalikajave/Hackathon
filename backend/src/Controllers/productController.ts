
import * as ProductService from "../Services/productService"
import ApiResponse from "../utilities/ApiResponse";
import httpStatusCodes from "http-status-codes";
let { OK, BAD_REQUEST } = httpStatusCodes;
import moment from "moment";
import { uploadFile } from "../utilities/S3Bucket";

const getProduct = async (req: any, res: any) => {

  // let query = "";
 
  // if (req.body.query && req.body.query != "") {

  //   query = `WHERE CAST(name AS text) LIKE '%${req.body.query}%' 
  //          OR CAST(description AS text) LIKE '%${req.body.query}%' OR CAST(status AS text) LIKE '%${req.body.query}%'
  //           OR CAST(id AS text) LIKE '%${req.body.query}%' `;
  // }

  let result = await ProductService.getProduct()
  if (result.length == 0)
    ApiResponse.error(res, httpStatusCodes.BAD_REQUEST, result.message);
  ApiResponse.result(res, result, httpStatusCodes.OK);

}


const create = async (req: any, res: any) => {
  try {

    if (req.file) {
      const imageName = moment().unix() + "_" + req.file.originalname;
      let name: string = "Images/" + "products" + "/" + imageName;
      req.body.image_url = await uploadFile(req.file, name);
    }

    let result: any = await ProductService.create(req.body);


    if (!result.affectedRows) throw "Something went wrong !";
    return ApiResponse.result(res, { message: "Record inserted !" }, OK);
  } catch (e: any) {
    ApiResponse.error(res, httpStatusCodes.BAD_REQUEST, "");
  }
};

const remove = async (req: any, res: any) => {
  try {
    let result: any = await ProductService.remove(req);

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

    let result = await ProductService.update(req.body, id);
    if (!result.affectedRows) throw "Product not found! !";
    return ApiResponse.result(res, { message: "Record updated!" }, OK);
  } catch (e: any) {
    return ApiResponse.error(res, BAD_REQUEST, e);
  }
};


const getById = async (req: any, res: any) => {
  try {
    let result: any = null;

    if (req.query.id) {
      result = await ProductService.getById(req.query.id);
      if (!result.length) return ApiResponse.error(res, BAD_REQUEST, "Product Not found !");
      return ApiResponse.result(res, result, OK);
    }

  } catch (e: any) {
    if (e == "!found") return ApiResponse.error(res, BAD_REQUEST, " not found.");
    return ApiResponse.error(res, BAD_REQUEST,);
  }
};


export default {
  getProduct,
  create,
  remove,
  update,
  getById
}