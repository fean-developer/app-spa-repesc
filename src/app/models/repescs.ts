interface RepescsProducts {
    _id?: string;
    cp_puro: string;
    cp_puro_deadline: string;
    cp_auto: string;
    cp_auto_deadline: string;
    cp_moto: string;
    cp_moto_deadline: string;
    cp_renda: string
    cp_renda_deadline: string;
    cdc: string;
    cdc_deadline: string;
    cartao: string;
    cartao_deadline: string;
    fgts: string;
    fgts_deadline: string;

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


