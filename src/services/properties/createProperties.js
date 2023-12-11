import { PrismaClient } from '@prisma/client'

const createProperty = async (title, description, location, pricePerNight, bedroomCount, bathRoomCount, maxGuestCount, hostId, rating) => {
    const prisma = new PrismaClient()

    return await prisma.user.create({
        data: {
            title,
            description,
            location,
            pricePerNight,
            bedroomCount,
            bathRoomCount,
            maxGuestCount,
            hostId,
            reviews,
            rating
        }
    })
};

export default createProperty;