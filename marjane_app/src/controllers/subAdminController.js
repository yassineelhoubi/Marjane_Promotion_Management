import { mail } from "../utils";
import { prisma } from "../../prisma/client";
import { createToken } from "../utils";

const loginSubAdmin = async (req, res) => {
    const { email, password } = req.body;
    const subAdmin = await prisma.subAdmin
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
    if (subAdmin) {
      if (subAdmin.password == password) {
        const token = createToken({ subAdmin }, "ADMIN");
        token
          ? res.status(200).json({ token })
          : res.status(500).json({ error: "cant create token" });
      } else {
        res.status(200).json({ error: "password incorrect" });
      }
    } else {
      res.status(200).json({ error: "email incorrect" });
    }
  };

export  {
    loginSubAdmin,
}