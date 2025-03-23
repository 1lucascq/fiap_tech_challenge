import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
    private static instance: PrismaService;

    constructor() {
        super({
            log: ['error'],
            errorFormat: 'minimal',
        });

        if (PrismaService.instance) {
            return PrismaService.instance;
        }
        PrismaService.instance = this;
    }

    async onModuleInit() {
        try {
            await this.$connect();
            console.log('Database connection established');

            process.on('SIGINT', this.handleTermination.bind(this));
            process.on('SIGTERM', this.handleTermination.bind(this));
        } catch (error) {
            console.error('Failed to connect to database:', error);
        }
    }

    async onModuleDestroy() {
        await this.$disconnect();
        console.log('Database connection closed');
    }

    private async handleTermination() {
        console.log('Closing database connection due to application termination');
        await this.$disconnect();
        process.exit(0);
    }
}
