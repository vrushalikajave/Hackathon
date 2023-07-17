
import * as userService from "../Services/userService"
import ApiResponse from "../utilities/ApiResponse";
import httpStatusCodes from "http-status-codes";
let { OK, BAD_REQUEST } = httpStatusCodes;
import moment from "moment";
import { uploadFile } from "../utilities/S3Bucket";
const bcrypt = require('bcrypt');
import Hashing from "../utilities/Hashing";
import Encryption from "../utilities/Encription";

const login = async (req: any, res: any) => {

    let user = await userService.getUser()
    if (user.length == 0) throw new Error("Invalid credentials");


    const match = await new Hashing().verifypassword(
        req.body.password,
        user[0].password
    );

    if (match) ApiResponse.error(res, httpStatusCodes.BAD_REQUEST, "Incorrect password !");
    const token = await Encryption.generateJwtToken({ id: user[0].id });

    if (user.length == 0) ApiResponse.error(res, httpStatusCodes.BAD_REQUEST, user.message);
    ApiResponse.result(res, token, httpStatusCodes.OK);

}
export default {
    login,

}