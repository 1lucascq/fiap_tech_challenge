import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { useContainer } from 'class-validator';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
            whitelist: true, // ignore json properties not present in the DTO
            forbidNonWhitelisted: true, // throw an error if a non-whitelisted property is present in the DTO,
        }),
    );

    const config = new DocumentBuilder()
        .setTitle('Tech Challenge - Fast Food App')
        .setDescription(
            'Documentação da API da loja de Fast Food para o Tech Challenge da fase 01 um de Arquitetura de Software da FIAP | Responsável: Lucas Costa Quadros',
        )
        .setVersion('1.0')
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

    useContainer(app.select(AppModule), { fallbackOnErrors: true });

    await app.listen(3000);
}
bootstrap();
