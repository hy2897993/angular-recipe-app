import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { User } from './register'
// import { API } from '../api.service'

@Injectable()
export class RegisterService {
    constructor(private http: HttpClient) { }
    private apiUrl= "http://www.yingrecipedatabaseapi.xyz/api"

    getUsers (): Observable<User[]> {
        return this.http.get<User[]>(`${this.apiUrl}/all`)
    }

    addUser (user: User): Observable<User> {
        console.log(user)
        return this.http.post<User>(`${this.apiUrl}/register`, user)
    }
    loginUser ( user: User): Observable<User>{
        console.log(user)
        return this.http.post<User>(`${this.apiUrl}/login`, user)
    }

}