import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {NzMessageService} from 'ng-zorro-antd/message';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {HttpService} from './httpService';
import {tap} from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private httpService: HttpService,
    private messageService: NzMessageService,
    private router: Router,
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authToken = this.httpService.getAuthorizationToken();
    if (authToken) {
      req = req.clone({
        setHeaders: {Authorization: authToken}
      });
    }
    return next.handle(req).pipe(
      tap(
        event => {
          if (event instanceof HttpResponse) {
            // console.log('success');
          }
        },
        err => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
              this.messageService.warning(err.error.message);
              this.router.navigateByUrl('/login');
            } else {
              console.log('11');
              this.messageService.error(err.message);
            }
          }
        }
      )
    );
  }
}
