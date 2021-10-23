import { Repescs } from './repescs';
export class Customers {
    id?: string;
    nome!: string;
    idade?: number;
    cpf!: string;
    rg!: string;
    data_nasc?: string;
    sexo?: string;
    email!: string;
    senha?: string;
    cep!: string;
    endereco!: string;
    numero!: number;
    bairro!: string;
    cidade!: string;
    estado!: string;
    telefone_fixo?: string;
    celular!: string;
    repesc?: string;
    repescData?: Repescs;
    created_at!: Date;
    user!: string;
}