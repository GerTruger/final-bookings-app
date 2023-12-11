import { PrismaClient } from "@prisma/client";

const updateBookingById = async (id, updatedBooking) => {
    const prisma = new PrismaClient();

    const { user, property, ...rest } = updatedBooking;

    const booking = await prisma.booking.update({
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

    return booking
};

export default updateBookingById;