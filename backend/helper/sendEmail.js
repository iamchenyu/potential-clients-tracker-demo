const sgMail = require("@sendgrid/mail");

const sendEmail = (user, token) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const msg = {
    to: user.email,
    from: "adhc@ccacc-dc.org",
    subject: "Reset password requested",
    templateId: "d-97b8b1b36a974e008eada8ea51d5450d",
    dynamic_template_data: { token: token },
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

module.exports = sendEmail;
