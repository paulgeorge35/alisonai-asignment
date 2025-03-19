import { Class, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const numbers = [3, 5, 7, 2, -15, 44];

const grades: {
    class: Class;
    grade: number;
}[] = [
        { class: 'Math', grade: 85 },
        { class: 'Math', grade: 92 },
        { class: 'Science', grade: 78 },
        { class: 'Science', grade: 88 },
        { class: 'History', grade: 95 },
        { class: 'History', grade: 82 },
    ];

async function main() {
    await prisma.grade.deleteMany();
    await prisma.number.deleteMany();

    await prisma.number.createMany({
        data: numbers.map((value) => ({ value })),
    });

    await prisma.grade.createMany({
        data: grades,
    });

    console.log("Database seeded successfully!");
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