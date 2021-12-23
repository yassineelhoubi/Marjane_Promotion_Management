import { mail } from "../utils";
import { PrismaClient } from "@prisma/client";

const createSubAdmin = async (req, res, next) => {
  const prisma = new PrismaClient();
  const { fName, lName, email, password, center } = req.body;
  const newSubAdmin = await prisma.user.create({
    data: {
      fName,
      lName,
      email,
      password,
      center,
    },
  });
  console.log(newSubAdmin);
  if (newSubAdmin) {
    res.status(400).json({
      error:
        "The server could not understand the request due to invalid syntax.",
    });
  } else {
    // mail("elhoubiyassine@gmail.com", "1234", "yassine elhoubi");
    res.status(201).json({
      response: "subadmin is create and email sent to the mailbox",
    });
  }
};

export { createSubAdmin };
