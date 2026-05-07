const nodemailer = require("nodemailer");

const sendMessage = async (req, res) => {
  const { name, email, msg } = req.body;

  const { NODEMAILER_GMAIL_EMAIL, GMAIL_APP_PASSWORD } = process.env;
  // process.env vi e isto kako config.json do sega

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: NODEMAILER_GMAIL_EMAIL,
        pass: GMAIL_APP_PASSWORD,
      },
      timeout: 5000,
    });

    const mailOptions = {
      from: NODEMAILER_GMAIL_EMAIL,
      to: email,
      subject: "Message to Semos Students",
      html: `<h1>Semos Mailer</h1><br />
      <span>Hi, I am ${name}, <br /></span>
      <span>My email is: ${email}, <br /></span>
      <span>My message: <br/></span>
      <p>${msg}</p>
      `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        return res.send("<p>Error occurred while sending the email</p>");
      } else {
        console.log("Email sent: " + info.response);
        return res.status(200).send("Email sent successfully!");
      }
    });
  } catch (err) {
    return res.status(500).send("Internal Server Error!");
  }
};

module.exports = { sendMessage };
