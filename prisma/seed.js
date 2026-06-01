import { PrismaClient } from "@prisma/client";
import usersData from "../src/data/users.json" with { type: "json" };
import hostsData from "../src/data/hosts.json" with { type: "json" };
import propertiesData from "../src/data/properties.json" with { type: "json" };
import bookingsData from "../src/data/bookings.json" with { type: "json" };
import reviewsData from "../src/data/reviews.json" with { type: "json" };
import amenitiesData from "../src/data/amenities.json" with { type: "json" };

const prisma = new PrismaClient();

async function main() {
  
  for (const user of usersData.users) {
    await prisma.user.create({
      data: user,
    });
  }

  for (const host of hostsData.hosts) {
    await prisma.host.create({
      data: host,
    });
  }

  for (const property of propertiesData.properties) {
    await prisma.property.create({
      data: property,
    });
  }

  for (const booking of bookingsData.bookings) {
    await prisma.booking.create({
      data: booking,
    });
  }

  for (const review of reviewsData.reviews) {
    await prisma.review.create({
      data: review,
    });
  }

  for (const amenity of amenitiesData.amenities) {
    await prisma.amenity.create({
      data: amenity,
    });
  }

  console.log("Database seeded 🌱");
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
