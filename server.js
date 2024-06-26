const express = require("express");
const cors = require("cors");
const connection = require("./db");
const { userRouter } = require("./routes/user.routes");
const { oemRouter } = require("./routes/oem.routes");
const { inventoryRouter } = require("./routes/inventory.routes");
const { authmiddleware } = require("./middlewares/auth.middleware");
const { ImageUploadRouter } = require("./routes/ImageUpload.routes");
require("dotenv").config();



const app = express();

app.use(cors())
app.use(express.json());

app.use("/user",userRouter);
app.use("/oem",oemRouter);
app.use("/inventory",authmiddleware,inventoryRouter);
app.use('/upload',ImageUploadRouter);


(async function(){
    try {
        await connection;
        console.log("db is connected");
        app.listen(process.env.PORT || 4000, async ()=>{
           
            console.log("server is  running");
           
        })
    } catch (error) {
        console.log(error)
    }
})()
