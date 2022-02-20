import { Injectable } from "@angular/core";
import { ClientsService } from "./service/clients.service";

@Injectable()
export class AppSimClient {
    responseData: any;
    constructor(private clientService: ClientsService) {}
    /** 
     * Sevices Client connect sim-prelogin for get authorization anonymous.
     */
     public simPreLogin() {
        this.clientService.connectSim()
        .subscribe((d) => {
          this.responseData = d;
        })
     }
}