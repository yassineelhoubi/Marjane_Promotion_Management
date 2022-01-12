import { prisma } from "../../prisma/client";

const getCategoriesCenter = async (req, res) => {
    const idSubAdmin = req.idSubAdmin;
    const categories = await prisma.$queryRaw`SELECT category.* FROM category, center , _centertosubadmin WHERE category.idCenter = center.id AND _centertosubadmin.A = center.id AND _centertosubadmin.b = ${idSubAdmin}`
        .catch((e) => {
            res.status(400).json({
                error: e.message,
            });
        });
    res.status(200).json({ categories });
}

export { getCategoriesCenter };