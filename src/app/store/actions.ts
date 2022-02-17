import { Repescs } from 'src/app/models/repescs';
import { createAction } from "@ngrx/store";

const enum repescsTypes {
    DATA_TABLE = '[Repescs] Salvar Repescs',
}

export const repescsAction = {
    saveRepescsData: createAction(repescsTypes.DATA_TABLE,(payload: {repescs: Repescs[]}) => payload)
}