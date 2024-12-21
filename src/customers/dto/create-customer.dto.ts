import { IsString, IsEmail, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { UniqueEmail } from '../validations/uniqueEmail.validator';
import { UniqueCpf } from '../validations/uniqueCpf.validator';

export class CreateCustomerDto {
    @ApiProperty({
        description: 'O nome do cliente.',
        example: 'John Doe',
    })
    @IsString()
    readonly name: string;

    @ApiProperty({
        description: 'O email do cliente.',
        example: 'john.doe@example.com',
    })
    @IsEmail()
    @UniqueEmail({ message: 'Este e-mail já está em uso' })
    readonly email: string;

    @ApiPropertyOptional({
        description: 'O CPF (Cadastro de Pessoas Físicas) do cliente.',
        example: '12345678909',
    })
	@UniqueCpf({ message: 'Este CPF já está em uso' })
    @IsOptional()
    @IsString()
    readonly cpf?: string;
}
