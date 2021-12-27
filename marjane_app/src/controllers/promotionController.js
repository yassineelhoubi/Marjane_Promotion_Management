import { prisma } from "../../prisma/client";

const untreatedPromo = async (req, res) => {
    const dateNow = new Date()
    const hourNow = dateNow.getHours()
console.log('zes')
    if (hourNow > 12) {

        const result = await prisma.promotion
            .updateMany({
                where: {
                    status: "ongoing",
                },
                data: {
                    status: "untreated"
                }
            })
            .catch((e) => {
                res.status(400).json({
                    error: e.message,
                });
            });

    } else {

        const HOUR = 1000 * 60 * 60;//hour in millisecond
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
                }
            })
            .catch((e) => {
                res.status(400).json({
                    error: e.message,
                });
            });

    }
}

export {
    untreatedPromo,
}