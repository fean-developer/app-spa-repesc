interface RepescsProducts {
    _id?: String;
    cp_puro: string;
    cp_auto: string;
    cp_moto: string;
    cp_renda: string
    cdc: string;
    cartao: string;
}
export interface Repescs {
    _id?: string;
    code: string;
    editable?: boolean;
    description: string;
    range_cpf_digit: string;
    products: Omit<RepescsProducts, '_id'>;
    forwardScreen?: string;
}


