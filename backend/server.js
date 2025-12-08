const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const db = require("./db");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

// Upload foto/video
app.post("/upload", upload.single("file"), (req, res) => {
    const filePath = "/uploads/" + req.file.filename;

    db.query(
        "INSERT INTO files (path) VALUES (?)",
        [filePath],
        (err) => {
            if (err) throw err;
            res.json({ success: true, url: filePath });
        }
    );
});

// Ambil semuanya
app.get("/files", (req, res) => {
    db.query("SELECT * FROM files", (err, result) => {
        if (err) throw err;
        res.json(result);
    });
});

app.listen(3000, () => console.log("Server running on port 3000"));
