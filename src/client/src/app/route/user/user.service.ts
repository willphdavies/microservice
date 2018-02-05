import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { User } from './user.model';

@Injectable()
export class UserService {

    private api = 'http://localhost:3001/api/v1/';
    private usersUrl = 'users';


    private users:[any];

    constructor(private http: Http) {

    }

    getUsers() {

        return this.http.get(this.api + this.usersUrl)
            .map((res:Response) => res.json().data)
            .share()
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));

    }

    getUser(userId: string) : Observable<any>{

        return this.http.get(this.api + this.usersUrl +'/'+ userId)
            .map((res: Response) => res.json().data)
            .share()
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));

    }

    saveUser(user: User) : Observable<any>{

        return this.http.post(this.api + this.usersUrl,user)
            .map((res: Response) => res.json().data)
            .share()
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));

    }

    mergeUsers(user1: string, user2: string){

        return this.http.get(this.api + this.usersUrl + '/merge/' + user1 + '/' + user2)
            .map((res: Response) => res.json())
            .share()
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));

    }

}