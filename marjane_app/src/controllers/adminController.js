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
        ? res.status(200).json({ token })
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
        error: e.message,
      });
    });
  if (newSubAdmin) {
    mail(
      newSubAdmin.email,
      newSubAdmin.password,
      `${newSubAdmin.fName + " " + newSubAdmin.lName}`
    );
    res.status(201).json({
      response: "subadmin is create and email sent to the mailbox",
    });
  }
};

const getStats = async (req, res) => {
  const logs = await prisma.logs.findMany().catch((e) => {
    res.status(400).json({
      error: e.message,
    });
  });
  res.status(200).json({ logs });
};

const getCenters = async (req, res) => {
  const centers = await prisma.center
    .findMany()
    .catch((e) => {
      res.status(400).json({
        error: e.message,
      });
    });

}
const getCentersPromotions = async (req, res) => {
  const centersPromotions = await prisma.center
    .findMany({
      include: {
        SubAdmin: {
          select: {
            id: true,
            _count: {
              select: { Promotion: true },
            },
          }

        }

      },
    })
  res.status(200).json({ centersPromotions });
}

export { createSubAdmin, loginAdmin, getStats, getCenters, getCentersPromotions };
