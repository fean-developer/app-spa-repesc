import { CustomersService } from './../../services/customers.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {


  constructor(customer: CustomersService) {
    
   }

  ngOnInit(): void {
  
  }

  goToRespecsTranslate() {

  }
}
