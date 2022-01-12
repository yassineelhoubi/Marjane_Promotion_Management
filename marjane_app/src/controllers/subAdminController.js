import { mail } from "../utils";
import { prisma } from "../../prisma/client";
import { createToken, logs } from "../utils";
import { verifyToken } from "../utils";
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
      const token = createToken({ subAdmin }, "SUBADMIN");
      const comment = {
        auth: `${subAdmin.fName + "" + subAdmin.lName}`,
        operation: "subadmin login",
        details: subAdmin,
      };
      logs(comment);

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


const createPromo = async (req, res) => {
  const { percentage, pointsFidelity, idSubAdmin, idProduct } = req.body;
  const productCatego = await prisma.product.findMany({
    where: {
      id: idProduct,
    },
    include: {
      category: true,
    },
  });
  if (productCatego[0].category.name == "multimedia") {
    if (percentage <= 20) {
      const newPromo = await prisma.promotion
        .create({
          data: { percentage, pointsFidelity, idSubAdmin, idProduct },
        })
        .catch((e) => {
          res.status(400).json({
            error: e.message,
          });
        });
      if (newPromo) {
        const comment = {
          auth: req.body.idSubAdmin,
          operation: "create promo",
          details: newPromo,
        };
        logs(comment);
        res.status(201).json({
          response: "Promotion created successfully",
        });
      }
    } else {
      res.status(200).json({
        response: "Porcenteage > 20%",
      });
    }
  } else {
    if (percentage <= 50) {
      const newPromo = await prisma.promotion
        .create({
          data: { percentage, pointsFidelity, idSubAdmin, idProduct },
        })
        .catch((e) => {
          res.status(400).json({
            error: e.message,
          });
        });
      if (newPromo) {
        const comment = {
          auth: req.body.idSubAdmin,
          operation: "create promo",
          details: newPromo,
        };
        logs(comment);
        res.status(201).json({
          response: "Promotion created successfully",
        });
      }
    } else {
      res.status(200).json({
        response: "Porcenteage > 50%",
      });
    }
  }
};

const getAllSubAdmin = async (req, res) => {
  const subAdmins = await prisma.subAdmin.findMany({
    include: {
      Center: true
    }
  }).catch((e) => {
    res.status(400).json({
      error: e.message,
    });
  });
  res.status(200).json({ subAdmins });
}

const removeCenter = async (req, res) => {
  const id = Number(req.params.id);
  prisma.subAdmin.update({
    where: {
      id
    },
    data: {
      Center: {
        set: []
      }
    }
  }).then((result) => {
    res.status(200).json({ result });
  })
    .catch((e) => {
      res.status(400).json({
        error: e.message,
      });
    });
}

const deleteSubAdmin = async (req, res) => {
  const id = Number(req.params.id);
  prisma.subAdmin.delete({
    where: {
      id
    },
  }).then((result) => {
    res.status(200).json({ result });
  })
    .catch((e) => {
      res.status(400).json({
        error: e.message,
      });
    });
}

const getSubAdmin = async (req, res) => {
  const id = Number(req.params.id);
  prisma.subAdmin.findUnique({
    where: { id },
    include: {
      Center: true
    }
  }).then((result) => {
    res.status(200).json({ result });
  })
    .catch((e) => {
      res.status(400).json({
        error: e.message,
      });
    });
}
const updateSubAdmin = (req, res) => {
  const id = Number(req.params.id);
  const { fName, lName, idCenter } = req.body;
  prisma.subAdmin.update({
    where: { id },
    data: {
      fName,
      lName,
      Center: {
        connect: {
          id: Number(idCenter),
        },
      },
    }
  }).then((subAdmin) => {
    res.status(200).json({ subAdmin });
  })
    .catch((e) => {
      res.status(400).json({
        error: e.message,
      });
    });
}
const idFromToken = (role = "") =>
  async (req, res, next) => {
    const bearer = req?.headers?.authorization;
    if (!bearer) {
      return;
    }
    const token = bearer.split(" ")[1];
    const payload = verifyToken(token, role);
    if (!payload) {
      return res.status(401).json({ error: "unauthenticated" });
    }

    req.idSubAdmin = payload.subAdmin.id;
    next()
  };
  
export {
  loginSubAdmin,
  createPromo,
  getAllSubAdmin,
  removeCenter,
  deleteSubAdmin,
  getSubAdmin,
  updateSubAdmin,
  idFromToken
};
