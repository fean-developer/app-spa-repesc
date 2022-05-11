import { NotificationsService } from './services/notifications.service';
import { UserService } from './services/user.service';
import { AfterViewChecked, AfterViewInit, Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { SwPush } from '@angular/service-worker';
import { NewsletterService } from './services/newsletter.service';

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
  readonly VAPID_PUBLIC_KEY = environment.PUSHER_PK;

  constructor(private user: UserService,
    private notification: NotificationsService,
    private swPush: SwPush,
    private newsletterService: NewsletterService) {
    
  }

  subscriptionNotification() {
    this.swPush.requestSubscription({
      serverPublicKey: this.VAPID_PUBLIC_KEY
    })
    .then((sub) => this.newsletterService.addPushSubscriber(sub).subscribe())
    .catch(err => console.log('Could not subscribe to notifications', err));
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
    this.subscriptionNotification();
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
