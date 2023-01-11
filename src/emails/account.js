const nodemailer = require("nodemailer");
const process = require("process");
const transport = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  requireTLS: true,
  auth: {
    user: "goyalonkar13@gmail.com",
    pass: "einpwmfuclvdirlz",
  },
});
function sendwelcomeemail(name, email) {
  console.log("in welcm email");
  //   const transport = nodemailer.createTransport({
  //     host: "smtp.gmail.com",
  //     port: 587,
  //     secure: false,
  //     requireTLS: true,
  //     auth: {
  //       user: "goyalonkar13@gmail.com",
  //       pass: "einpwmfuclvdirlz",
  //     },
  //   });
  const mailoptions = {
    from: "goyalonkar13@gmail.com",
    to: email,
    subject: "Welcome email...",
    text: `Hi, ${name}, Welcome to the Task Manager app.`,
  };
  transport.sendMail(mailoptions, (err, info) => {
    const mailoptions = {
      from: "goyalonkar13@gmail.com",
      to: "goyalonkar13@gmail.com",
      subject: "Welcome",
      text: "WELCM",
    };
    if (err) {
      console.warn(err);
    } else {
      console.warn("email sent", info.response);
    }
  });
}

function sendgoodbyeemail(name, email) {
  console.log("in goodbyeemail fn");
  console.log("enter name and email");

  const mailoptions = {
    from: "goyalonkar13@gmail.com",
    to: email,
    subject: "Goodbye email...",
    text: `Hi, ${name}, Why r u cancelling the account? Anyways...Goodbye.`,
  };
  transport.sendMail(mailoptions, (err, info) => {
    const mailoptions = {
      from: "goyalonkar13@gmail.com",
      to: "goyalonkar13@gmail.com",
      subject: "Welcome",
      text: "WELCM",
    };
    if (err) {
      console.warn(err);
    } else {
      console.warn("email sent", info.response);
    }
  });
}

//return;

module.exports = { sendwelcomeemail, sendgoodbyeemail };
// const sgmail = require("@sendgrid/mail");

// const sgapikey =
//   "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";
// //"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";
// //"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";
// // "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";
// // "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 ";
// // "SG.GaCFv4egRq - ODkKDNlQOfA.Vcgj37F - yrSGsZbX_kSET5Eaj3ffOtY5j6rINZDS_kY";

// //SG.ica06TpLSaORjEI7zer_dQ.LquC - KxlCCZCi3zvzH6ljwQbkVWJcj7UE6WH9ftkqfI;
// //SG.ica06TpLSaORjEI7zer_dQ.LquC - KxlCCZCi3zvzH6ljwQbkVWJcj7UE6WH9ftkqfI;
// sgmail.setApiKey(sgapikey);

// sgmail
//   .send({
//     from: "onkargl@gmail.com",
//     to: " onkargl@gmail.com",
//     subject: " HI",
//     text: " hi  this is goyalonkar13",
//   })
//   .then((d) => console.log("done"));

// ----
// const sgMail = require("@sendgrid/mail");
// sgMail.setApiKey(
//   "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"
// );
// const msg = {
//   to: "goyalonkar13@gmail.com", // Change to your recipient
//   from: "goyalonkar13@gmail.com", // Change to your verified sender
//   subject: "Sending with SendGrid is Fun",
//   text: "mmmmmmmand easy to do anywhere, even with Node.js",
//   html: "<strong>and easy to do anywhere, even with Node.js</strong>",
// };
// sgMail
//   .send(msg)
//   .then(() => {
//     console.log("Email sent");
//   })
//   .catch((error) => {
//     console.error(error);
//   });

// ------------
//50f44f6af7f89f61db4fbfad6ae3f59b

//const { MailtrapClient } = require("mailtrap");

// For this example to work, you need to set up a sending domain,
// and obtain a token that is authorized to send from the domain
// const TOKEN = "71ab4d7773110e546ea816733a4e4a1f";
// const SENDER_EMAIL = "goyalonkar13@gmail.com";
// const RECIPIENT_EMAIL = "goyalonkar13@email.com";

// const client = new MailtrapClient({ token: TOKEN });

// const sender = { name: "Mailtrap Test", email: "goyalonkar13@gmail.com" };

// client
//   .send({
//     from: sender,
//     to: [{ email: "goyalonkar13@gmail.com" }],
//     subject: "Hello from Mailtrap!",
//     text: "Welcome to Mailtrap Sending!",
//   })
//   .then(console.log, console.error);
