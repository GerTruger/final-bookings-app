import { PrismaClient } from "@prisma/client";

const updateAmenitiesById = async (id, updatedAmenitie) => {
    const prisma = new PrismaClient();
    const amenitie = await prisma.amenitie.updateMany({
        where: { id },
        data: updatedAmenitie,
    });

    return amenitie.count > 0 ? id : null;
};

export default updateAmenitiesById;
