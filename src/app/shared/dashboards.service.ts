import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardsService {

  private readonly PENTAHO_HOME_URI = '/pentaho/Home';

  constructor(private http: HttpClient) { }

  public loadScript(userid?: string, password?: string): Observable<any> {

    const headers = new HttpHeaders();
    headers.append('Authorization', 'Basic' + btoa(userid + ':' + password));

    return this.http.get<any>('http://192.168.99.101:8080/pentaho/plugin/pentaho-cdf-dd/api/renderer/cde-embed.js', {headers});
  }

  /*public loadScript(userid?: string, password?: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'text/javascript'
      }),
      withCredentials: true,
    };
    return this.http.get('localhost:9999/pentaho', httpOptions);
  }*/

  public test() {
    this.http.get('localhost:9999/prueba').subscribe(res => console.log(res));
  }
}
