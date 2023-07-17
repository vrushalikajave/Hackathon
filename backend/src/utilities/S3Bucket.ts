import fs from "fs";
import AWS from 'aws-sdk';
// let config = require("../config");
require('dotenv').config();
const bucketName = process.env.AWS_BUCKET_NAME
const region = process.env.AWS_BUCKET_REGION
const accessKeyId = process.env.AWS_ACCESS_KEY
const secretAccessKey = process.env.AWS_SECRET_KEY

const s3 = new AWS.S3({
    region,
    accessKeyId,
    secretAccessKey,
});

export const uploadFile = async (file: Express.Multer.File, name: string): Promise<string> => {
     try {
    const params: any = {
            Bucket: bucketName,
            Body: file.buffer,
            Key: name,
            ContentType: file.mimetype
        }
 var result = await s3.upload(params).promise();
        return result.Key;
    } catch (e) {
        throw e;
    }
}

// downloads file from s3
export function getFileStream(fileKey: any) {
    const downloadParams: any = {
        key: fileKey,
        Bucket: bucketName
    }
    s3.getObject(downloadParams).createReadStream()
}



