import { PrismaClient } from "@prisma/client";

const updateReviewById = async (id, updatedReview) => {
    const prisma = new PrismaClient();

    const review = await prisma.review.update({
        where: { id },
        data: {
            ...rest,
            user: user
                ? {
                    connect: { id: user },
                }
                : undefined,
            property: property
                ? {
                    connect: { id: property }
                }
                : undefined
        }
    })

    return review
};

export default updateReviewById;