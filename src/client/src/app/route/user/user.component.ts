import { Component, OnInit } from "@angular/core";
import { User } from "./user.model";
import { UserService } from "./user.service";

@Component({
    selector: "tyn-home",
    templateUrl: './user.component.html',
    styleUrls: [ "./user.component.scss" ],
    providers: [ UserService ]
})
export class UserComponent implements OnInit {
    users: User[];
    currentUser: User;
    jsonData: string;
    jsonDataIsValid: boolean;
    constructor(private userService: UserService){
        this.addNew();
    }
    ngOnInit() {
        this.getUserList();
    }
    saveUser() {
        this.jsonDataIsValid = this.isJsonString(this.jsonData);
        if (this.jsonDataIsValid){
            this.currentUser = JSON.parse(this.jsonData);
            this.userService.saveUser(this.currentUser).subscribe(
                response => {
                    this.jsonData = JSON.stringify(response,null,4);
                    this.getUserList();
                });
        }
    }
    getUser(id:string){
        this.userService.getUser(id).subscribe(
            response => {
                this.jsonData = JSON.stringify(response,null,4);
            });
    }
    getUserList(){
        this.userService.getUsers().subscribe(
            response => {
                this.users = response;
            }
        );
    }
    updateJsonData(){
        this.jsonDataIsValid = this.isJsonString(this.jsonData);
    }
    addNew(){
        this.jsonData = JSON.stringify(User._blank(),null,4);
        this.updateJsonData();
    }
    merge(){

    }
    private isJsonString(str:string) : boolean {
        try {
            JSON.parse(str);
        } catch (e) {
            return false;
        }
        return true;
    }
}