//modules
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { consola } = require("consola");
const nodemailer = require("nodemailer");

const PORT = process.env.PORT || 8000;
const app = express();

//middlewares
app.use(cors());
app.use(express.json());

app.post("/", async (req, res) => {
    try {
        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: process.env.SENDER_MAIL,
                pass: process.env.PASSWORD, // generated app password
            },
        });

        transporter.verify(function (error, success) {
            if (error) {
                consola.error(error.message);
            } else {
                consola.log("Server is ready to take our messages");
            }
        });

        const OTP = 458000;

        let mailOptions = {
            from: process.env.SENDER_MAIL,
            to: process.env.RECEIVER_MAIL,
            subject: "Verification Code",
            html: `<h1>Your verification  code is: ${OTP}</h1>`, // You can use html templates if you want to customize the design of email
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return res.status(400).json({ message: error.message });
            }
            return res.status(200).json({ message: `OTP sent to ${process.env.RECEIVER_MAIL}` });
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

app.listen(PORT, () => consola.info(`Server is running on port: ${PORT}`));
