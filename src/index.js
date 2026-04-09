// require('dotenv').config() //it's also fine & works but kill the vibe

import dotenv from 'dotenv';
import connectDB from "./db/index.js";

dotenv.config({
    path: "./env"
})



connectDB()














// import express from 'express';
// const app = express

// ( async () => {
//     try {
//         await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
//         app.on("error", (error) => {   //jb error express ke connection na banane pr ho
//             console.log("ERRR: ", error);
//             throw error
//         })   

//         app.listen(process.env.PORT, () => {
//             console.log(`app is listining on ${process.env.PORT}`)
//         })
//     } catch (error) {
//         console.error("ERRR: ", error);
//         throw error
//     }
// })()