import { IsString, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UniqueEmail } from '../validations/uniqueEmail.validator';
import { UniqueCpf } from '../validations/uniqueCpf.validator';

export class CreateCustomerDto {
    @ApiProperty({
        name: 'name',
        description: 'The name of the customer.',
        example: 'John Doe',
    })
    @IsString()
    readonly name: string;

    @ApiProperty({
        name: 'email',
        description: 'The email of the customer.',
        example: 'john.doe@example.com',
    })
    @IsEmail()
    @UniqueEmail({ message: 'This email is already in use' })
    readonly email: string;

    @ApiProperty({
        name: 'cpf',
        description: 'The CPF (Cadastro de Pessoas Físicas) of the customer.',
        example: '12345678909',
    })
    @UniqueCpf({ message: 'This CPF is already in use' })
    @IsString()
    readonly cpf: string;
}
