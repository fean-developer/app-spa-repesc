import { NotificationsService } from './services/notifications.service';
import { UserService } from './services/user.service';
import { AfterViewChecked, AfterViewInit, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit, AfterViewChecked {
  title = 'repescs';
  public isLogged: boolean = false;
  public listMenu: Array<any> = [];
  public currentUser!: any;

  constructor(private user: UserService,
    private notification: NotificationsService) {
    
  }


  ngAfterViewChecked(): void {
    setTimeout(() => {
      this.isLogged = this.user.userValue ? true : false;
    });
  }

  ngOnInit() {
    this.currentUser = this.user.userValue;
    this.listMenu = [
      { icon: 'assessment', text: 'Repescs', page: '/repescs', disabled: false},
      { icon: 'groups', text: 'Meus cliente', page: '/customers', disabled: false},
      { icon: 'person', text: 'Adicionar usuario', page: '/users', disabled: !this.user.userValue.isAdmin }
    ]

  this.notification.isAvailableNotificationDesktop()
  
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.isLogged = this.user.userValue ? true : false;
    });
  }

  public myDashboard() {

    // property five last customers

    // property all customers

    // property all shared customers

    // property cadastrados na sim

  }


  public logout() {
    this.user.logout();
    this.isLogged = false;
  }
}
