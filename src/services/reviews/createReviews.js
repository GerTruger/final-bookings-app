import { PrismaClient } from '@prisma/client'

const createReview = async (userId, propertyId, rating, comment) => {
    const prisma = new PrismaClient()

    const review = await prisma.user.create({
        data: {
            rating,
            comment,
            user: {
                connect: { id: user }
            },
            property: {
                connect: { id: property }
            }
        }
    })

    return review
};

export default createReview;