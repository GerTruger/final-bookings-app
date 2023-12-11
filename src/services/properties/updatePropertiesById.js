import { PrismaClient } from "@prisma/client";

const updateProperyById = async (id, updatedPropery) => {
    const prisma = new PrismaClient();
    const property = await prisma.propertie.updateMany({
        where: { id },
        data: updatedPropery,
    });

    return property.count > 0 ? id : null;
};

export default updateProperyById;