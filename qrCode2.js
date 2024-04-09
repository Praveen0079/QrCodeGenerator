import express from "express";
import { dirname } from "path";
import qr from 'qr-image';
import fs from 'fs';
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/qrCode.html");
});

app.post("/submit", (req, res) => {
    // Generate QR code upon form submission
    var qr_svg = qr.image(req.body["url"]); 
    qr_svg.pipe(fs.createWriteStream('qr_img2.png')); 
    console.log("QR code img File saved");  
    const qrFileName = 'qr_img2.png';
    res.sendFile(__dirname + "/" + qrFileName);
    console.log(req.body);
    console.log("Image sent to the server")
});

app.listen(3000, () => {
    console.log(`Server running on port 3000`);
});
