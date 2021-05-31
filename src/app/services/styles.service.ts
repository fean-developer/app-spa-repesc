import { throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { Styles } from '../interfaces/styles';

@Injectable({
  providedIn: 'root'
})
export class StylesService {

  constructor() { }


  private setPropertyStyle(varStyle: string, value: string): void {
    document.documentElement.style.setProperty(varStyle, value);
  }

  public style(styles: Styles[]): void {
    try {

      for (let style of styles) {
        this.setPropertyStyle(style.style, style.value);
      }
    } catch (error) {
      throw (error);
    }
  }
}
