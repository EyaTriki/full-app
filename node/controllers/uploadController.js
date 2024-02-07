const multer = require("multer");

// Configure multer to store files in the 'uploads' folder
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        // if file type is image store it in images folder else store it in pdfs folder
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
            cb(null, './uploads');
        } else if (file.mimetype === 'application/pdf') {
            cb(null, './uploads');
        } else {
            cb({ message: 'This file is not an image or pdf file' }, false);
        }
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    },
});

const upload = multer({ storage: storage });

const uploadFile = (req, res) => {
    upload.single('file')(req, res, (err) => {
        if (err) {
            return res.status(500).json({
                errormessage: "Server Error"
            });
        }

        // if file uploaded successfully return file path with public and only one backsplaysh between folders and data and success message
        if (req.file) {
            return res.status(200).json({
                successmessage: "File uploaded successfully",
                filePath: req.file.path.replace(/\\/g, "/").replace("uploads", "")
            });
        } else {
            return res.status(500).json({
                errormessage: "Server Error"
            });
        }
    });
};

module.exports = {
    uploadFile
};