const multer = require("multer");
const path = require("path");

// Storage
const storage = multer.diskStorage({

    destination: (req, file, cb) => {

        cb(null, "uploads/profile");

    },

    filename: (req, file, cb) => {

        const uniqueName =
            Date.now() + "-" + Math.round(Math.random() * 1e9);

        cb(null, uniqueName + path.extname(file.originalname));

    }

});

// Image Filter
const fileFilter = (req, file, cb) => {

    const allowedTypes = /jpeg|jpg|png/;

    const extname = allowedTypes.test(
        path.extname(file.originalname).toLowerCase()
    );

    const mimetype = allowedTypes.test(file.mimetype);

    if (extname && mimetype) {

        return cb(null, true);

    }

    cb(new Error("Only JPG, JPEG and PNG files are allowed."));

};

module.exports = multer({

    storage,
    fileFilter,
    limits: {
        fileSize: 2 * 1024 * 1024
    }

});