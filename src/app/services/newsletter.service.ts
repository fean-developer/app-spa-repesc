import { APP_CONFIG, AppConfig } from 'src/app/config/app-config';
import {Inject, Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import { catchError, delay, retry } from 'rxjs/operators';
import { FormaData } from '../_helpers/format.data';



@Injectable()
export class NewsletterService {

    constructor(private http: HttpClient,  @Inject(APP_CONFIG) private config: AppConfig, private helpers: FormaData) {

    }

    addPushSubscriber(sub:any) {
        return this.http.post(`${this.config.api}/api/notifications`, sub);
    }

    send() {
        return this.http.post(`${this.config.api}/api/newsletter`, null);
    }

  

    public allNotificationsSubscription() {
      return this.http.get(`${this.config.api}/subscriptions/pusher`)
        .pipe(
          retry(1), delay(600),
          catchError(this.helpers.handleError));
    }
}