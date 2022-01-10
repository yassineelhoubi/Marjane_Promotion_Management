import { mail } from "../utils";
import { prisma } from "../../prisma/client";
import { createToken, logs } from "../utils";
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

const createManager = async (req, res) => {
  const { fName, lName, email, password, idCategory } = req.body;
  const newManager = await prisma.manager
    .create({
      data: {
        fName,
        lName,
        email,
        password,
        idCategory,
      },
    })
    .catch((e) => {
      res.status(400).json({
        error: e.message,
      });
    });
  if (newManager) {
    const comment = {
      auth: req.body.idSubAdmin,
      operation: "create manager",
      details: newManager,
    };
    logs(comment);
    mail(
      newManager.email,
      newManager.password,
      newManager.fName + " " + newManager.lName
    );
    res.status(201).json({
      response: "manager is create and email sent to the mailbox",
    });
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

export { loginSubAdmin, createManager, createPromo, getAllSubAdmin, removeCenter, deleteSubAdmin };
