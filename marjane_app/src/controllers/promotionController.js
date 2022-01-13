import { prisma } from "../../prisma/client";
import { logs } from "../utils";

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

export { createPromo, untreatedPromo };
