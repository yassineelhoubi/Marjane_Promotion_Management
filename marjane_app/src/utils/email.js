import Mailgen from "mailgen";
import nodemailer from "nodemailer";

const mailGenerator = new Mailgen({
  theme: "default",
  product: {
    name: "Marjane",
    link: "https://www.marjane.ma/",
    logo: "https://media-exp1.licdn.com/dms/image/C4E1BAQGk7K7eX8yaLA/company-background_10000/0/1519800584543?e=2159024400&v=beta&t=M9jcgYJxi7_7K_VEdhmaGqx3FuET1TUBurWSAWZ7wqA",
  },
});

const mail = async (email, password, fullName) => {
  const template = {
    body: {
      name: fullName,
      intro: "Welcome to Marjan! We're very excited to have you on board.",
      instructions: "To get started using your account  :",
      dictionary: {
        email: email,
        password: password,
      },
      outro:
        "Need help, or have questions? Just reply to this email, we'd love to help.",
    },
  };

  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    service: "Gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });
  const info = await transporter.sendMail({
    from: '"Marjane" <safiairline123@gmail.com>',
    to: email,
    subject: "Marjane Authentication",
    text: "Marjane",
    html: mailGenerator.generate(template),
  });
  //   return info;
};

export { mail };
