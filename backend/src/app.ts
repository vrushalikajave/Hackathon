const express = require('express')
const app = express()
import * as bodyParser from 'body-parser';
import indexRoute from "./Routes/index"


app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api", indexRoute)



app.listen(4000)