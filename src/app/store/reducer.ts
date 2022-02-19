import { repescsAction } from 'src/app/store/actions';
import { Repescs } from 'src/app/models/repescs';
import { createReducer, on } from '@ngrx/store';

export interface AppState {
    repescs: Repescs[];
}

export const initialState: AppState = { 
    repescs: [] 
};

export const _repescsReducer = createReducer(
    initialState,
    on(
        repescsAction.saveRepescsData, (state,action) => {
        return { ...state,  repescs: action.repescs  }
    })
)