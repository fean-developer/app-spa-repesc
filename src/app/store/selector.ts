import { AppState } from './reducer';
import { createSelector } from '@ngrx/store';


export const selectState = (state: AppState) => state

export const selecRepescs = createSelector(
    selectState,
    (state)  => { console.log('STATE SELETOR:', state); return state}
)

