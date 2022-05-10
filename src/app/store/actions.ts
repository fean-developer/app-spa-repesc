import { Customers } from './../models/customers';
import { Repescs } from 'src/app/models/repescs';
import { createAction } from "@ngrx/store";

const enum Types {
    DATA_TABLE = '[Repescs] Salvar Repescs',
    CUSTOMERS = '[Customers] Lista de clientes'
}

export const repescsAction = {
    saveRepescsData: createAction(Types.DATA_TABLE,(payload: {repescs: Repescs[]}) => payload)
}

export const customersAction = {
    retrieveCustomers: createAction(Types.CUSTOMERS,(payload: {customers: Customers[]}) => payload)
}

export const customersUpdateAction = {
    updateCustomer: createAction(Types.CUSTOMERS,(payload: {customers: Customers[]}) => payload)
}

export const updateRepescsAction = {
    updateRepescs: createAction(Types.DATA_TABLE,(payload: {repescs: Repescs[]}) => payload)
}