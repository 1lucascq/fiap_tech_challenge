// prisma/seed.ts
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
    // Create Categories
    const sandwichCategory = await prisma.category.create({
        data: { name: 'Sandwich' },
    });

    const drinkCategory = await prisma.category.create({
        data: { name: 'Drink' },
    });

    const dessertCategory = await prisma.category.create({
        data: { name: 'Dessert' },
    });

    // Create Products
    const xBurger = await prisma.product.create({
        data: {
            name: 'X-Burger',
            ingredients: JSON.stringify(['Bread', 'Beef Patty', 'Cheese', 'Lettuce', 'Tomato']),
            category: { connect: { id: sandwichCategory.id } },
            price: 25.9,
        },
    });

    const xEgg = await prisma.product.create({
        data: {
            name: 'X-Egg',
            ingredients: JSON.stringify(['Bread', 'Beef Patty', 'Egg', 'Cheese', 'Lettuce', 'Tomato']),
            category: { connect: { id: sandwichCategory.id } },
            price: 27.9,
        },
    });

    const cookie = await prisma.product.create({
        data: {
            name: 'Cookie',
            category: { connect: { id: dessertCategory.id } },
            price: 7.9,
        },
    });

    const cola = await prisma.product.create({
        data: {
            name: 'Cola',
            category: { connect: { id: drinkCategory.id } },
            price: 7.9,
        },
    });

    // Create Customers
    const john = await prisma.customer.create({
        data: {
            name: 'John Doe',
            email: 'john@example.com',
            cpf: '12345678901',
        },
    });

    const jane = await prisma.customer.create({
        data: {
            name: 'Jane Smith',
            email: 'jane@example.com',
            cpf: '98765432101',
        },
    });

    // Create Orders
    await prisma.order.create({
        data: {
            customer: { connect: { id: john.id } },
            total: 61.7,
            status: 'ONGOING',
            products: {
                create: [
                    {
                        product: { connect: { id: xBurger.id } },
                        quantity: 2,
                    },
                    {
                        product: { connect: { id: cola.id } },
                        quantity: 1,
                    },
                ],
            },
        },
    });

    await prisma.order.create({
        data: {
            customer: { connect: { id: jane.id } },
            total: 35.8,
            status: 'CREATED',
            products: {
                create: [
                    {
                        product: { connect: { id: xEgg.id } },
                        quantity: 1,
                    },
                    {
                        product: { connect: { id: cookie.id } },
                        quantity: 1,
                    },
                ],
            },
        },
    });

    await prisma.order.create({
        data: {
            customer: { connect: { id: jane.id } },
            total: 35.8,
            status: 'CREATED',
            products: {
                create: [
                    {
                        product: { connect: { id: xEgg.id } },
                        quantity: 1,
                    },
                    {
                        product: { connect: { id: cola.id } },
                        quantity: 1,
                    },
                ],
            },
        },
    });

    console.log('Database has been seeded! 🌱');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
