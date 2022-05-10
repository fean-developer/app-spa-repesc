import { AppState, CustomerState } from './reducer';
import { createSelector } from '@ngrx/store';


export const selectState = (state: AppState) => state
export const selectCustomerState = (state: CustomerState) => state


export const selectorData = createSelector(
    selectState,
    (state)  =>  state
)

export const selectorCustomers = createSelector(
    selectCustomerState,
    (state)  =>  state
)


