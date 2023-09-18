const sgMail = require("@sendgrid/mail");

const sendResetEmail = (user, token) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const msg = {
    to: user.email,
    from: "hellochenyuw@gmail.com",
    subject: "Reset password requested",
    templateId: "d-97b8b1b36a974e008eada8ea51d5450d",
    dynamic_template_data: {
      token: token,
      domain:
        process.env.NODE_ENV === "production"
          ? "https://potential-clients-tracker-demo.herokuapp.com"
          : "http://localhost:3000",
    },
  };

  sgMail
    .send(msg)
    .then(() => {
      console.log("Email sent successfully");
    })
    .catch((error) => {
      console.error(error);
    });
};

const sendCommentEmail = (emails, firstname, lastname, comment, user) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const msg = {
    from: "hellochenyuw@gmail.com",
    subject: "New update posted",
    templateId: "d-6e7c8d1041ae4524bdd64d9135ae9810",
    dynamic_template_data: {
      firstName: firstname,
      lastName: lastname,
      comment: comment,
      user_email: user,
      link:
        process.env.NODE_ENV === "production"
          ? "https://potential-clients-tracker-demo.herokuapp.com/"
          : "http://localhost:3000",
    },
    personalizations: [
      {
        to: [{ email: "hellochenyuw@gmail.com" }],

        bcc: emails.map((email) => ({
          email: email,
        })),
      },
    ],
  };

  console.log(msg);

  sgMail
    .send(msg)
    .then(() => {
      console.log("Email sent successfully");
    })
    .catch((error) => {
      console.error(error);
      console.log(error.response.body.errors);
    });
};

const sendNewClientEmail = (emails, client, user) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const msg = {
    from: "hellochenyuw@gmail.com",
    subject: "New client added",
    templateId: "d-56b5bede6e5140d5af19cf521db20a97",
    dynamic_template_data: {
      firstName: client.first_name,
      lastName: client.last_name,
      citizenship: client.citizenship,
      medicaid: client.medicaid,
      from_channel_name: client.from_channel_name,
      notes: client.notes,
      user_email: user,
      link:
        process.env.NODE_ENV === "production"
          ? "https://potential-clients-tracker-demo.herokuapp.com/"
          : "http://localhost:3000",
    },
    personalizations: [
      {
        to: [{ email: "hellochenyuw@gmail.com" }],

        bcc: emails.map((email) => ({
          email: email,
        })),
      },
    ],
  };

  console.log(msg);

  sgMail
    .send(msg)
    .then(() => {
      console.log("Email sent successfully");
    })
    .catch((error) => {
      console.error(error);
      console.log(error.response.body.errors);
    });
};

module.exports = { sendResetEmail, sendCommentEmail, sendNewClientEmail };
