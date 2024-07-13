import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD,
    },
});

async function sendEmail(to, mode, data) {


    const htmlBody = `<!DOCTYPE html>
<html>
<head>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 20px;
        }
        .container {
            background-color: #ffffff;
            padding: 20px;
            border-radius: 5px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            max-width: 600px;
            margin: 0 auto;
        }
        .header {
            font-size: 24px;
            font-weight: bold;
            color: #333333;
            margin-bottom: 20px;
        }
        .content {
            font-size: 16px;
            color: #333333;
            line-height: 1.5;
        }
        .footer {
            margin-top: 20px;
            font-size: 12px;
            color: #777777;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">Account ${mode}</div>
        <div class="content">
            <p>Dear ${data.userName},</p>
            <p>Your account has been ${mode}. Here are your account details:</p>
            <ul>
                <li><strong>Username:</strong> ${data.userName}</li>
                <li><strong>Email ID:</strong> ${data.email}</li>
                <li><strong>Password:</strong> ${data.password}</li>
            </ul>
        </div>
        <div class="footer">
            &copy; 2024 | pmgsv.in. All rights reserved.
        </div>
    </div>
</body>
</html>
`

    try {
        const info = await transporter.sendMail({
            from: 'admin@pmgsv.in', // sender address
            to: to, // list of receivers
            subject: 'User Credentials for pmgsv.in', // Subject line
            html: htmlBody, // html body
        });

        console.log("Message sent: %s", info.messageId);
        // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
    } catch (error) {
        console.log(error)
    }

}

export { sendEmail }
