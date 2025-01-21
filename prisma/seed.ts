// prisma/seed.ts
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function hasExistingData(model: string): Promise<boolean> {
    const count = await prisma[model].count();
    return count > 0;
}

async function seedCategories() {
    const sandwichCategory = await prisma.category.create({
        data: { name: 'Sandwich' },
    });

    const drinkCategory = await prisma.category.create({
        data: { name: 'Drink' },
    });

    const dessertCategory = await prisma.category.create({
        data: { name: 'Dessert' },
    });

    return { sandwichCategory, drinkCategory, dessertCategory };
}

async function seedProducts({ sandwichCategory, drinkCategory, dessertCategory }) {
    const xBurger = await prisma.product.create({
        data: {
            name: 'X-Burger',
            ingredients: ['Bread', 'Beef Patty', 'Cheese', 'Lettuce', 'Tomato'],
            category: { connect: { id: sandwichCategory.id } },
            price: 25.9,
        },
    });

    const xEgg = await prisma.product.create({
        data: {
            name: 'X-Egg',
            ingredients: ['Bread', 'Beef Patty', 'Egg', 'Cheese', 'Lettuce', 'Tomato'],
            category: { connect: { id: sandwichCategory.id } },
            price: 27.9,
        },
    });

    const cookie = await prisma.product.create({
        data: {
            name: 'Cookie',
            ingredients: [''],
            category: { connect: { id: dessertCategory.id } },
            price: 7.9,
        },
    });

    const cola = await prisma.product.create({
        data: {
            name: 'Cola',
            ingredients: [],
            category: { connect: { id: drinkCategory.id } },
            price: 7.9,
        },
    });

    return { xBurger, xEgg, cookie, cola };
}

async function seedCustomers() {
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

    return { john, jane };
}

async function seedOrders({ xBurger, xEgg, cookie, cola, john, jane }) {
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
}

async function main() {
    try {
        const hasData = await hasExistingData('category');
        if (hasData) {
            console.log('Database already seeded!');
            return;
        }

        const { sandwichCategory, drinkCategory, dessertCategory } = await seedCategories();

        const { xBurger, xEgg, cookie, cola } = await seedProducts({
            sandwichCategory,
            drinkCategory,
            dessertCategory,
        });

        const { john, jane } = await seedCustomers();

        await seedOrders({ xBurger, xEgg, cookie, cola, john, jane });
        console.log('Database has been seeded! 🌱');
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
