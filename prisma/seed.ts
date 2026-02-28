import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const avatars = [
  "https://api.dicebear.com/7.x/initials/svg?seed=A",
  "https://api.dicebear.com/7.x/initials/svg?seed=B",
  "https://api.dicebear.com/7.x/initials/svg?seed=C",
  "https://api.dicebear.com/7.x/initials/svg?seed=D",
  "https://api.dicebear.com/7.x/initials/svg?seed=E",
];

const sampleBios = [
  "Building cool stuff on the internet 🚀",
  "Full stack dev. Coffee powered ☕",
  "Exploring code & creativity",
  "Shipping fast, learning faster",
  "Debugging life one bug at a time",
];

const samplePosts = [
  "Just shipped a new feature 🔥",
  "Learning something new every day",
  "This bug almost ended me 💀",
  "Clean code is underrated",
  "React + Next.js is love ❤️",
];

async function main() {
  console.log("🌱 Seeding started...");

  for (let i = 1; i <= 20; i++) {
    const user = await prisma.user.create({
      data: {
        id: `user_${i}`,
        username: `user${i}`,
        displayName: `User ${i}`,
        email: `user${i}@test.com`,
        avatarUrl: avatars[i % avatars.length],
        bio: sampleBios[i % sampleBios.length],
      },
    });

    // Create 2–4 posts per user
    const postCount = Math.floor(Math.random() * 3) + 2;

    for (let j = 0; j < postCount; j++) {
      const post = await prisma.post.create({
        data: {
          content:
            samplePosts[Math.floor(Math.random() * samplePosts.length)],
          userId: user.id,
        },
      });

      // Add optional media (image)
      if (Math.random() > 0.5) {
        await prisma.media.create({
          data: {
            postId: post.id,
            type: "IMAGE",
            url: `https://picsum.photos/seed/${post.id}/600/400`,
          },
        });
      }
    }
  }

  console.log("✅ Seeding finished");
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });