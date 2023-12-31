import { PrismaClient } from "@prisma/client";
import amenitiesData from "../src/data/amenities.json" assert {type: "json"}
import bookingsData from "../src/data/bookings.json" assert {type: "json"}
import hostsData from "../src/data/hosts.json" assert {type: "json"}
import propertiesData from "../src/data/properties.json" assert {type: "json"}
import reviewsData from "../src/data/reviews.json" assert {type: "json"}
import usersData from "../src/data/users.json" assert {type: "json"}

const prisma = new PrismaClient({ log: ["query", "info", "warn", "error"] });

async function main() {
    const { amenities } = amenitiesData;
    const { bookings } = bookingsData
    const { hosts } = hostsData
    const { properties } = propertiesData
    const { reviews } = reviewsData
    const { users } = usersData

    for (const user of users) {
        await prisma.user.upsert({
            where: { id: user.id },
            update: {},
            create: user
        })
    }

    for (const host of hosts) {
        await prisma.host.upsert({
            where: { id: host.id },
            update: {},
            create: host
        })
    }

    for (const propertie of properties) {
        await prisma.propertie.upsert({
            where: { id: propertie.id },
            update: {},
            create: propertie
        })
    }

    for (const amenitie of amenities) {
        await prisma.amenitie.upsert({
            where: { id: amenitie.id },
            update: {},
            create: amenitie,
        });
    }

    for (const review of reviews) {
        await prisma.review.upsert({
            where: { id: review.id },
            update: {},
            create: {
                id: review.id,
                rating: review.rating,
                comment: review.comment,
                user: {
                    connect: { id: review.userId }
                },
                propertie: {
                    connect: { id: review.propertyId }
                }
            }
        })
    }

    for (const booking of bookings) {
        await prisma.booking.upsert({
            where: { id: booking.id },
            update: {},
            create: {
                id: booking.id,
                checkinDate: booking.checkinDate,
                checkoutDate: booking.checkoutDate,
                numberOfGuests: booking.numberOfGuests,
                totalPrice: booking.totalPrice,
                bookingStatus: booking.bookingStatus,
                user: {
                    connect: { id: booking.userId }
                },
                propertie: {
                    connect: { id: booking.propertyId }
                }
            },

        })
    }
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
