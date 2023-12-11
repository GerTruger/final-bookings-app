import { PrismaClient } from '@prisma/client'

const createAmenitie = async (name) => {
    const prisma = new PrismaClient()

    return await prisma.createAmenitie.create({
        data: {
            name
        }
    })
};

export default createAmenitie;