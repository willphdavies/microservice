export class User {
    constructor(
        id: string,
        name: string,
        company: string,
        address: string,
        customerType: string,
        phoneNumber: string,
        email: string,
        tags: string[] = [],
        created: string,
        updated: string,
    ){}
    static _blank(){
            return {
                name: '',
                email: '',
                address: '',
                customerType: '',
                phoneNumber: '',
                tags: ['']
            };
    }
}