// interface CustomerProps {
//     id: string;
//     name: string;
//     email: string;
//     cpf?: string;
// }

// export class CustomerEntity {
//     id: string;
//     name: string;
//     email: string;
//     cpf?: string;

//     constructor({ name, email, cpf, id }: CustomerProps) {
//         this.id = id;
//         this.name = name;
//         this.email = email;
//         this.cpf = cpf;
//     }
// }

export class Customer {
    constructor(
        public id: string,
        public name: string,
        public cpf: string,
        public email: string,
    ) {}
}
