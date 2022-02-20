import { Injectable } from '@angular/core';

export interface SetContext<T> {
    [key: string]: any
}
@Injectable()
 class Context<T>  {

    private _context!: SetContext<T>;
    
    public setContext(value: SetContext<T>) {this._context = {...this._context,...value}}
    public getContext(): SetContext<T> { return this._context }
    
    constructor() {
    }
}

export default Context;