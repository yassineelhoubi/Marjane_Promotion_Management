import { mail } from "../utils";
import { prisma } from "../../prisma/client";
import { createToken } from "../utils";

const loginAdmin = async (req, res) => {
  const { email, password } = req.body;
  const admin = await prisma.admin
    .findUnique({
      where: {
        email,
      },
    })
    .catch((e) => {
      res.status(400).json({
        error: e.message,
      });
    });
  if (admin) {
    if (admin.password == password) {
      const token = createToken({ admin }, "ADMIN");
      token
        ? res.status(200).json(token)
        : res.status(500).json({ error: "cant create token" });
    } else {
      res.status(200).json({ error: "password incorrect" });
    }
  } else {
    res.status(200).json({ error: "email incorrect" });
  }
};
const createSubAdmin = async (req, res, next) => {
  const { fName, lName, email, password, idCenter } = req.body;
  const newSubAdmin = await prisma.subAdmin
    .create({
      data: {
        fName,
        lName,
        email,
        password,
        idCenter,
      },
    })
    .catch((e) => {
      res.status(400).json({
        error: e,
      });
    });
  if (newSubAdmin) {
    // mail("elhoubiyassine@gmail.com", "1234", "yassine elhoubi");
    res.status(201).json({
      response: "subadmin is create and email sent to the mailbox",
    });
  }
};

export { createSubAdmin, loginAdmin };
