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
            const token = createToken({ subAdmin }, "SUBADMIN");
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
        mail(
            newManager.email,
            newManager.password,
            newManager.fName + " " + newManager.lName
        );
        res.status(201).json({
            response: "manager is create and email sent to the mailbox",
        });
    }
}

const createPromo = async (req, res) => {
    const { percentage, pointsFidelity, idSubAdmin, idProduct } = req.body

    const newPromo = await prisma.promotion
        .create({
            data: { percentage, pointsFidelity, idSubAdmin, idProduct }
        })
        .catch((e) => {
            res.status(400).json({
                error: e.message,
            });
        });
    if (newPromo) {
        res.status(201).json({
            response: "Promotion created successfully",
        });
    }
}

export {
    loginSubAdmin,
    createManager,
    createPromo
}