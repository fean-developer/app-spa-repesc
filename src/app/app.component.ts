import { UserService } from './services/user.service';
import { AfterViewChecked, AfterViewInit, Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { getMessaging, getToken, onMessage } from 'firebase/messaging'
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
  messaging:any = null; 

  constructor(private user: UserService){
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
   
    this.requestPermission(); 
    this.listen();

  }
  requestPermission() { 
    const messaging = getMessaging(); 
    getToken(messaging, 
     { vapidKey: environment.firebaseConfig.vapidKey}).then( 
       (currentToken) => { 
         if (currentToken) { 
           console.log("Hurraaaa!!! temos o token...."); 
           console .log(currentToken); 
         } else { 
           console.log('Nenhum token de registro disponível. Solicite permissão para gerar um.'); 
         }
     }).catch((err) => { 
        console.log('Ocorreu um erro ao recuperar o token. ', err); 
    }); 
  } 
  listen() { 
    const messaging = getMessaging(); 
    onMessage(messaging, (payload) => { 
      this.messaging=payload; 
    }); 
  } 

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.isLogged = this.user.userValue ? true : false;
    });
  }

  public myDashboard() {

  }


  public logout() {
    this.user.logout();
    this.isLogged = false;
  }
}
