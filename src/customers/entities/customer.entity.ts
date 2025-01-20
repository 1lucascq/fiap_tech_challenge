import { CreateCustomerDto } from '../dto/create-customer.dto';

export class Customer {
    name: string;
    email: string;
    cpf: string;

    constructor({ name, email, cpf }: CreateCustomerDto) {
        this.name = name;
        this.email = email;
        this.cpf = cpf;
    }
}
