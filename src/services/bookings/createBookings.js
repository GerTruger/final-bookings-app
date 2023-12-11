import { PrismaClient } from '@prisma/client'

const createBooking = async (userId, propertieId, checkinDate, checkoutDate, numberOfGuests, totalPrice, bookingStatus) => {
    const prisma = new PrismaClient()

    const booking = await prisma.booking.create({
        data: {
            checkinDate,
            checkoutDate,
            numberOfGuests,
            totalPrice,
            bookingStatus,
            user: {
                connect: { id: user }
            },
            propertie: {
                connect: { id: propertieId }
            }
        }
    })

    return booking
};

export default createBooking;