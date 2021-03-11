import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Login} from '../mode/login';
import {User} from '../mode/user';

const clientApi = '/sso-admin/api/v1/client';
const ssoApi = '/sso-admin/api/v1/sso';
const userApi = '/sso-admin/api/v1/user';

@Injectable({
  providedIn: 'root'
})
export class BaseRepository<MODEL extends {id?: number}> {
  constructor(protected httpClient: HttpClient) {
  }

  add(model: MODEL): Observable<any> {
    return this.httpClient.post(`${clientApi}/client`, model);
  }
  update(model: MODEL): Observable<any> {
    return this.httpClient.post(`${clientApi}/updateClient`, model);
  }
  updateByIds(id: number): Observable<any> {
    return this.httpClient.post(`${clientApi}/updateIds`, {id});
  }
  delete(id: number): Observable<any> {
    return this.httpClient.post(`${clientApi}/delete`, {id});
  }
  queryPage(page: number, size: number, q?: {[key: string]: any}): Observable<any>{
    const params = this.genParams(q);
    const requestUrl = `${clientApi}/clientListPage?size=${size}&page=${page}&${params.toString()}`;
    return this.httpClient.get(requestUrl);
  }

  login(): Observable<Login> {
    return this.httpClient.get<Login>(`${ssoApi}/login`);
  }
  token(state: string, code: string): Observable<Login>{
    return this.httpClient.get(`${ssoApi}/getToken?state=${state}&code=${code}`);
  }

  userInfo(): Observable<User>{
    return this.httpClient.get<User>(`${userApi}/userinfo`);
  }
  updateUserInfo(model: MODEL): Observable<any>{
    return this.httpClient.post(`${userApi}/updateUserInfo`, model);
  }
  updatePassword(model: MODEL): Observable<any>{
    return this.httpClient.post(`${userApi}/modifyPassword`, model);
  }

  protected genParams(q?: {[key: string]: any}): URLSearchParams {
    const params = new URLSearchParams();
    const addValue = (key: string, value: any) => {
      if (value === 0) {
        value = '0';
      }
      if (value === false) {
        value = 'false';
      }
      if (value) {
        params.append(key, value);
      }
    };
    if (q) {
      Object.keys(q).forEach(k => {
        const v = q[k];
        if (v instanceof Array){
          v.forEach(vv => addValue(k, vv));
          return;
        }
        addValue(k, v);
      });
    }
    return params;
  }
}
