import { Injectable } from "@angular/core";

@Injectable()
export class FormaData {

    public uppercase(str: string) {
        const regex = new RegExp(/[a-z]/gi);
        return str = regex.test(str) ? str.replace(/[a-z]+/, Function.prototype.call.bind(String.prototype.toUpperCase)) : str;
    }

    public formatCpf(cpf: string) {
        return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
    }
}