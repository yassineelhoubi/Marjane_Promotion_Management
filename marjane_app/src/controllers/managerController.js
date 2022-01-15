import { prisma } from "../../prisma/client";
import { createToken, logs } from "../utils";
import { untreatedPromo } from "./index";
import { mail } from "../utils";
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
const createManager = async (req, res) => {
    const { fName, lName, email, password } = req.body;
    const idCategory = Number(req.body.idCategory)
    const newManager = await prisma.manager
        .create({
            data: {
                fName,
                lName,
                email,
                password,
                idCategory
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

const deleteManager = async (req, res) => {
    const id = Number(req.params.id)
    prisma.manager.delete({
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

const updateManager = async (req, res) => {
    const id = Number(req.params.id);
    const { fName, lName, idCategory } = req.body;
    prisma.manager.update({
        where: { id },
        data: {
            fName,
            lName,
            idCategory: Number(idCategory)
        }
    }).then((manager) => {
        res.status(200).json({ manager });
    })
        .catch((e) => {
            res.status(400).json({
                error: e.message,
            });
        });
}

const getManager = async (req, res) => {
    const id = Number(req.params.id);
    prisma.manager.findUnique({
        where: { id },
        include: {
            category: {
                select: {
                    name: true,
                }
            }
        }
    }).then((manager) => {
        res.status(200).json({ manager });
    })
        .catch((e) => {
            res.status(400).json({
                error: e.message,
            });
        });
}

export {
    loginManager,
    getAllManagerCenter,
    createManager,
    deleteManager,
    updateManager,
    getManager,
}