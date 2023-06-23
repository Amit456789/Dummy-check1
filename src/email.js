const nodemailer = require("nodemailer");
const ejs = require("ejs");
const path = require("path");
const transport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "amit967551@gmail.com",
    pass: "ddmcfuusmyhufohk",
  },
});

const sendEmail = (receiver, subject, content, obj, way) => {
  ejs.renderFile(
    //     __dirname + "./templates/welcome.ejs",
    path.join(__dirname, "./templates/welcome.ejs"),
    { receiver, content, obj },
    (err, data) => {
      if (err) {
        console.log(err);
      } else {
        let mailOptions = {
          from: '"Amitbhandari@pearlorganisation.com" Amit Bhandari',
          to: "Amitbhandari@pearlorganisation.com",
          subject: subject,
          html: data,
        attachments: [
            {
              filename: way && way,
              contentType: "application/pdf",
            },
          ],
        };

        transport.sendMail(mailOptions, (error, info) => {
          if (error) {
            return console.log(error);
          }
          console.log("Message sent: %s", info.messageId);
        });
      }
    }
  );
};

module.exports = {
  sendEmail,
};
