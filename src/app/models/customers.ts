import { Repescs } from './repescs';
import { User } from './user';
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
    sharedWithUser?: Partial<User>
    created_at!: Date;
    metaData?: Partial<CustomerMetaData>
    user!: string;
}

export interface CustomerMetaData {
    hasRegisterProposal: Boolean,
    hasProductProposal: Boolean,
    productProposalStatus: String,
    isPartner: Boolean
}