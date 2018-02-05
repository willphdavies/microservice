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
    mergeUsers: string[];
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
                    delete response.created;
                    delete response.updated;
                    this.jsonData = JSON.stringify(response,null,4);
                    this.getUserList();
                });
        }
    }
    getUser(id:string){
        this.userService.getUser(id).subscribe(
            response => {
                delete response.created;
                delete response.updated;
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
    clickMerge(){

    }
    merge(){

    }
    deleteUser(userId: string){
        this.userService.deleteUser(userId).subscribe(
            () => {
                this.getUserList();
            }
        )
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