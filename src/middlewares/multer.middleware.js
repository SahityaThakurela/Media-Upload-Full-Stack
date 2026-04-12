import multer from "multer";                    // multer used as a middlewares 

const storage = multer.diskStorage({            // diskStorage directly upload file not store locally 
    destination: function (req, file, cb){      // cb-> callback // file is extra thing provide by multer
        cb(null, "./public/temp")                                // for uploading files
    },
    filename: function (req, file, cb){ 
        cb(null, file.originalname)             //can use originalname cuz only for few time, it's there
    }

})

export const upload = multer({
    storage,          // also write as storage = storage (js concept)
})