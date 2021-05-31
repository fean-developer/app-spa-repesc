import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { UserService } from './../services/user.service';
import { environment } from './../../environments/environment';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private accountService: UserService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add auth header with jwt if user is logged in and request is to the api url
        const user = this.accountService.userValue;
        const isLoggedIn = user && user.token;
        const isApiUrl = request.url.startsWith(environment.api);
        if (isLoggedIn && isApiUrl) {
            request = request.clone({
                setHeaders: {
                    'x-access-token': `${user.token}`,
                }
            });
        }
        return next.handle(request);
    }
}