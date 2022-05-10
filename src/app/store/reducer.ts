import { customersAction } from './actions';
import { Customers } from './../models/customers';
import { repescsAction } from 'src/app/store/actions';
import { Repescs } from 'src/app/models/repescs';
import { createReducer, on } from '@ngrx/store';

export interface AppState {
    repescs: Repescs[],
}

export const initialState: AppState = { 
    repescs: [],
};

export interface CustomerState {
    customers: Customers[],
}

export const initialCustomerState: CustomerState = { 
    customers: [],
};

export const _repescsReducer = createReducer(
    initialState,
    on(
        repescsAction.saveRepescsData, (state,action) => {
        return { ...state,  repescs: action.repescs }
    })
)

export const _customersReducer = createReducer(
    initialCustomerState,
    on(
        customersAction.retrieveCustomers, (state,action) => {
        return { ...state, customers: action.customers  }
    })
)


export const _updateCustomersReducer = createReducer(
    initialCustomerState,
    on(
        customersAction.retrieveCustomers, (state,action) => {
            state.customers.forEach(customer => {
                if (!customer.id) {
                    state.customers.push(customer);
                }
            });
        return { ...state, customers: action.customers  }
    })
)

export const _updateTradutorReducer = createReducer(
    initialState,
    on(
        repescsAction.saveRepescsData, (state,action) => {
        return { ...state, repescs: action.repescs  }
    })
)