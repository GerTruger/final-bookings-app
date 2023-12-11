// import { PrismaClient } from '@prisma/client'

// const getAmenitie = async () => {
//     const prisma = new PrismaClient()

//     return prisma.getAmenities.findMany({})
// };

// export default getAmenitie;
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const getAmenities = async () => {
  try {
    const amenities = await prisma.amenitie.findMany({});
    return amenities;
  } catch (error) {
    throw new Error(`Failed to fetch amenities: ${error}`);
  }
};

export default getAmenities;