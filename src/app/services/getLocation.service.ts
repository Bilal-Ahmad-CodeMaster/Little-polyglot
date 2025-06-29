import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
    providedIn: 'root',
})
export class GetlocationService {
    private readonly apiUrl = 'https://ipinfo.io/json?token=78212df9ecbea0';

    constructor(private http: HttpClient) { }

    getLocation(): Observable<any> {
        return this.http.get<any>(this.apiUrl);
    }
}
