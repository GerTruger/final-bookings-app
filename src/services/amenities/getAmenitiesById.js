import { PrismaClient } from "@prisma/client";

const getAmenitieById = async (id) => {
    const prisma = new PrismaClient();
    const amenity = await prisma.getAmenitieById.findUnique({
        where: { id },
    });

    return amenity;
};

export default getAmenitieById;