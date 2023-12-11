import { PrismaClient } from '@prisma/client'

const createUser = async (username, password, name, email, phoneNumber, profilePicture) => {
    const prisma = new PrismaClient()

    return await prisma.user.create({
        data: {
            username,
            password,
            name,
            email,
            phoneNumber,
            profilePicture
        }
    })
};

export default createUser;