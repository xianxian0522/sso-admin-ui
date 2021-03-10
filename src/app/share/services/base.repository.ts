import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

const API = '/sso-admin/api/v1';

@Injectable({
  providedIn: 'root'
})
export class BaseRepository<MODEL extends {id?: number}> {
  constructor(protected httpClient: HttpClient) {
  }

  add(url: string, model: MODEL): Observable<any> {
    return this.httpClient.post(`${API}/${url}/client`, model);
  }
  update(url: string, model: MODEL): Observable<any> {
    return this.httpClient.post(`${API}/${url}/updateClient`, model);
  }
  updateByIds(url: string, model: MODEL): Observable<any> {
    return this.httpClient.post(`${API}/${url}/updateIds`, model);
  }
  delete(url: string, id: number): Observable<any> {
    return this.httpClient.post(`${API}/${url}/delete`, {id});
  }
  queryPage(url: string, page: number, size: number, q?: {[key: string]: any}): Observable<any>{
    const params = this.genParams(q);
    const requestUrl = `${API}/${url}/clientListPage?size=${size}&page=${page}&${params.toString()}`;
    return this.httpClient.get(requestUrl);
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
