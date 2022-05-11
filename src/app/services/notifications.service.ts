import { Injectable } from '@angular/core';

enum MSG {
  granted= "Notificaçao desktop ativada"
}
@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  private icon!: string;
  private title!: string;
  private options!: NotificationOptions;



  constructor() { }

  public isAvailableNotificationDesktop() {
    if (!("Notification" in window)) {
      alert("This browser does not support desktop notification");
    }
    else if (Notification.permission !== "denied") {
      Notification.requestPermission().then(function (permission) {
        if (permission === "granted") {
          return ;
        }
      });
    }

    return this;
  }

  public pusherDesktop(msg: string) {
    
      if (Notification.permission === "granted") {
        var notification = new Notification(msg,this.notifyCreation(this.getOptions()));
      }
  }

  public notifyCreation(options: NotificationOptions) {
    return {
      ...options,
      title: this.title,
      icon: this.icon
    }
  }

  public getOptions(): NotificationOptions {
    return this.options;
}

public setOptions(options: NotificationOptions) {
    this.options = options;
    return this;
}


}
