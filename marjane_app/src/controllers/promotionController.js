import { prisma } from "../../prisma/client";
import { logs } from "../utils";

const createPromo = async (req, res) => {
  const { percentage, pointsFidelity, idSubAdmin, idProduct } = req.body;

  const productCatego = await prisma.product.findMany({
    where: {
      id: Number(idProduct),
    },
    include: {
      category: true,
    },
  });
  if (productCatego[0].category.name == "multimedia") {
    if (Number(percentage) <= 20) {
      const newPromo = await prisma.promotion
        .create({
          data: {
            percentage: Number(percentage),
            pointsFidelity: Number(pointsFidelity),
            idSubAdmin: Number(idSubAdmin),
            idProduct: Number(idProduct)
          },
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
          status: true,
          response: "Promotion created successfully",
        });
      }
    } else {
      res.status(200).json({
        status: false,
        response: "Porcenteage > 20%",
      });
    }
  } else {
    if (Number(percentage) <= 50) {
      const newPromo = await prisma.promotion
        .create({
          data: {
            percentage: Number(percentage),
            pointsFidelity: Number(pointsFidelity),
            idSubAdmin: Number(idSubAdmin),
            idProduct: Number(idProduct)
          },
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
          status: true,
          response: "Promotion created successfully",
        });
      }
    } else {
      res.status(200).json({
        status: false,
        response: "Porcenteage > 50%",
      });
    }
  }
};


const untreatedPromo = async (req, res) => {
  const dateNow = new Date();
  const hourNow = dateNow.getHours();
  if (hourNow > 12) {
    const result = await prisma.promotion
      .updateMany({
        where: {
          status: "ongoing",
        },
        data: {
          status: "untreated",
        },
      })
      .catch((e) => {
        res.status(400).json({
          error: e.message,
        });
      });
  } else {
    const HOUR = 1000 * 60 * 60; //hour in millisecond
    const dateNowMinus1D = new Date(dateNow.getTime() - HOUR * 24); //yesterday

    const result = await prisma.promotion
      .updateMany({
        where: {
          status: "ongoing",
          createdAt: {
            lt: dateNowMinus1D,
          },
        },
        data: {
          status: "untreated",
        },
      })
      .catch((e) => {
        res.status(400).json({
          error: e.message,
        });
      });
  }
};
const getPromotionsCenter = async (req, res) => {
  const idSubAdmin = Number(req.body.idSubAdmin);
  const promotions = await prisma.promotion
    .findMany({
      where: {
        idSubAdmin,
      },
      include: {
        Product: {
          select: {
            name: true,
            category: {
              select: {
                name: true,
              }
            }
          },
        },
      }
    }).catch((e) => {
      res.status(400).json({
        error: e.message,
      });
    });
  res.status(201).json(promotions);
}
const getManagerPromotions = async (req, res) => {
  untreatedPromo();
  const idCategory = req.idCategory;
  const promotions = await prisma.promotion
    .findMany({
      where: {
        Product: {
          idCategory: idCategory
        }
      },

    })
    .catch((e) => {
      res.status(400).json({
        error: e.message,
      });
    });
  res.status(200).json({ promotions });
}

export { createPromo, untreatedPromo, getPromotionsCenter, getManagerPromotions };
