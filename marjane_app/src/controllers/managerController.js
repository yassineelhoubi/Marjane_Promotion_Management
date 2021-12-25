import { prisma } from "../../prisma/client";
import { createToken } from "../utils";

const loginManager = async (req, res) => {
    const { email, password } = req.body;
    const manager = await prisma.manager
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
    if (manager) {
        if (manager.password == password) {
            const token = createToken({ manager }, "MANAGER");
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

const getManagerPromotions = async (req, res) => {

    const idCategory = req.idCategory;
    const promo = await prisma.category
        .findMany({
            where: {

                id: idCategory,
            },
            select: {
                Product: {
                    include: {
                        Promotion: true
                    }
                }
            }

        })
        .catch((e) => {
            res.status(400).json({
                error: e.message,
            });
        });
    if (promo) {
        res.status(200).json({ res: promo });
    }
}

export {
    loginManager,
    getManagerPromotions,
}