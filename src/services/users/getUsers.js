import { PrismaClient } from '@prisma/client'

const getUsers = async (username, email) => {
    const prisma = new PrismaClient()

    return prisma.user.findMany({
        where: {
            username: {
                contains: username
            },
            email:
            {
                contains: email
            }
        }
    })
};

export default getUsers;