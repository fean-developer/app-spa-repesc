import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { throwError } from "rxjs";

@Injectable()
export class FormaData {

    public uppercase(str: string) {
        const regex = new RegExp(/[a-z]/gi);
        return str = regex.test(str) ? str.replace(/[a-z]+/, Function.prototype.call.bind(String.prototype.toUpperCase)) : str;
    }

    public formatCpf(cpf: string) {
        return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
    }

    public handleError(error: HttpErrorResponse) {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
            // Erro ocorreu no lado do client
            errorMessage = error.error.message;
        } else {
            // Erro ocorreu no lado do servidor
            errorMessage = `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
        }
        return throwError(errorMessage);
    };
}
