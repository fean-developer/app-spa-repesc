import { Injectable } from '@angular/core';

export interface SetContext<T> {
    [key: string]: any
}
@Injectable()
 class Context<T>  {

    private _context!: SetContext<T>;
    
    public setContext(value: SetContext<T>) {this._context = {...value,...this._context}; }
    public getContext(): SetContext<T> { return this._context }
    
    constructor() {
        console.log(this._context);
    }
}

export default Context;