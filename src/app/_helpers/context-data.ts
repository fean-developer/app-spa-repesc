import { Injectable } from '@angular/core';

@Injectable()
 class Context<T>  {

    private _context!: T;
    
    public setContext(value: T) { this._context = value; }
    public getContext(): T { return this._context }
    
    constructor() {
        console.log(this._context);
    }
}

export default Context;