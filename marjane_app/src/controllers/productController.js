import { prisma } from "../../prisma/client";

const getProductsCenter = async (req, res) => {
    const idSubAdmin = req.idSubAdmin;
    const products = await prisma.$queryRaw`SELECT product.* FROM product ,category, center , _centertosubadmin WHERE product.idCategory = category.id AND category.idCenter = center.id AND _centertosubadmin.A = center.id AND _centertosubadmin.b = ${idSubAdmin}`
        .catch((e) => {
            res.status(400).json({
                error: e.message,
            });
        });
    res.status(200).json({ products });
}

export { getProductsCenter }