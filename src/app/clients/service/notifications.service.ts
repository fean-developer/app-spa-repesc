import { NotificationsService } from './../../services/notifications.service';
import { Injectable } from "@angular/core";
import { NewsletterService } from 'src/app/services/newsletter.service';
import { environment } from 'src/environments/environment';

const vapiKeys = {
    publicKey: environment.PUSHER_PK,
    privateKey: environment.PUSHER_PVTK
}

import webpush from 'web-push';

@Injectable({
    providedIn: 'root'
})
export class ApiNotificationServiceImpl {

   public vapiKeys = {
        publicKey: environment.PUSHER_PK,
        privateKey: environment.PUSHER_PVTK
    }
    

    constructor(private service: NewsletterService){
        webpush.setVapidDetails(
            'mailto:example@yourdomain.org',
            this.vapiKeys.publicKey,
            this.vapiKeys.privateKey
        )
        
    }


    public templateNotifications(data: any) {
        return data;
    }

    public async notify() {
        let allSubscriptions: any = {};

        this.service.allNotificationsSubscription()
        .subscribe(
            data => {
                allSubscriptions = data;
            }
        );

        const notificationPayload = {
            "notification": {
                "title": "Tradutor Repescs",
                "body": "Newsletter Available!",
                "icon": "assets/my-customers.png",
                "vibrate": [100, 50, 100],
                "data": {
                    "dateOfArrival": Date.now(),
                    "primaryKey": 1
                },
                "actions": [{
                    "action": "explore",
                    "title": "Go to the site"
                }]
            }
        }
        
        Promise.all(allSubscriptions.map((sub: any) => webpush.sendNotification(
            sub, JSON.stringify(notificationPayload) )))
            .then(() => ({"message": 'Newsletter sent successfully.'}))
            .catch(err => {
                console.error("Error sending notification, reason: ", err);
            });
    }
}