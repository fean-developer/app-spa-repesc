import { repescsAction } from 'src/app/store/actions';
import { Repescs } from 'src/app/models/repescs';
import { createReducer, on } from '@ngrx/store';

export interface State {
    repescs: Repescs[];
}

export const initialState: State = { 
    repescs: [] 
};

export const _repescsReducer = createReducer(
    initialState,
    on(
        repescsAction.saveRepescsData, (state) => {
        return { ...state, repescs: state.repescs }
    })
)