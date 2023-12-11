import { PrismaClient } from "@prisma/client";

const deleteAmenities = async (id) => {
    const prisma = new PrismaClient();
    const amenitie = await prisma.deleteAmenities.deleteMany({
        where: { id },
    });

    return amenitie.count > 0 ? id : null;
};

export default deleteAmenities;