import { prisma } from "../../prisma/client";

const getCenters = async (req, res) => {
    const centers = await prisma.center
        .findMany()
        .catch((e) => {
            res.status(400).json({
                error: e.message,
            });
        });
        res.status(200).json({ centers });

}
const getCentersPromotions = async (req, res) => {
    const centersPromotions = await prisma.center
        .findMany({
            include: {
                SubAdmin: {
                    select: {
                        id: true,
                        _count: {
                            select: { Promotion: true },
                        },
                    }

                }

            },
        })
    res.status(200).json({ centersPromotions });
}

export { getCenters, getCentersPromotions };