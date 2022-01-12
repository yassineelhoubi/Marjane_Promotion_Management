import { prisma } from "../../prisma/client";
import { createToken } from "../utils";
import { untreatedPromo } from "./index"
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
    untreatedPromo();
};

const getManagerPromotions = async (req, res) => {
    untreatedPromo();
    const idCategory = req.idCategory;
    const promotion = await prisma.promotion
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
    if (promotion) {
        res.status(200).json({ promotion: promotion });
    }
}

const promoValidate = async (req, res) => {
    const id = req.params.id;
    const { status } = req.body;
    const updateStatus = await prisma.promotion
        .update({
            where: {
                id: Number(id),
            },
            data: {
                status,
            },
        })
        .catch((e) => {
            res.status(400).json({
                error: e.message,
            });
        });

    if (updateStatus) {
        res.status(200).json({ response: "updated", result: updateStatus });
    }
    
}

const getAllManagerCenter = async (req, res) => {
    const idSubAdmin = req.idSubAdmin;
    const managers = await prisma.$queryRaw`SELECT manager.* , category.name as categoName FROM manager, category, center, _centertosubadmin WHERE manager.idCategory = category.id and category.idCenter = center.id and _centertosubadmin.B =${idSubAdmin} and _centertosubadmin.A = center.id`
    .catch((e) => {
        res.status(400).json({
            error: e.message,
        });
    });
    res.status(200).json({ managers: managers });
}

export {
    loginManager,
    getManagerPromotions,
    promoValidate,
    getAllManagerCenter,
}