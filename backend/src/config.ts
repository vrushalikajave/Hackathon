import * as dotenv from "dotenv";
dotenv.config();

const env = process.env;

export = {

    JwtToken: {
        secretKey: process.env.JWT_TOKEN_SECRET_KEY || 'aLNYaVAtxBCUBSsDIimwBStCTt4E1teRlTbceVp7FY0f6HPFtp91nWVZvmdmtwGC',
        expiry: process.env.JWT_TOKEN_EXPIRY || '90d'
    },

}