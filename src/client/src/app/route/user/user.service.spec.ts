import { TestBed, inject, async } from '@angular/core/testing';

import { UserService } from './user.service';
import {
    HttpModule,
    Http,
    Response,
    ResponseOptions,
    XHRBackend
} from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

const user1 = { id: 1, name: 'Jim', address: '64 SW Lombard', customerType: 'client', email: 'v@m.com' };
const user2 = { id: 2, name: 'John', address: '64 SE Jefferson', customerType: 'sales', email: 'u@m.com' }

const mockUsers = {
    success: 'success',
    data: [user1, user2]
};

let app;

describe('UserService', () => {

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [HttpModule],
            providers: [
                { provide: XHRBackend, useClass: MockBackend },
                UserService
            ]
        });
    }));

    describe('getUsers',() => {

        it('gets a list of users', async(() => {
            inject([UserService, XHRBackend], (userService: UserService, mockBackend: MockBackend) => {
                mockBackend.connections.subscribe((connection: MockConnection) => {
                    connection.mockRespond(
                        new Response(new ResponseOptions({
                            body: JSON.stringify(mockUsers)
                        })));
                });
                userService.getUsers().subscribe(
                    response => {
                        expect(response.length).toEqual(2);
                        expect(response[0].email).toEqual('v@m.com');
                        expect(response[1].email).toEqual('u@dgrm.com');
                    });
            });
        }));
    });
    describe('getUser',() => {
        // Extremely basic example test. Just checks that the created Component is the type we expect.
        it('creates the component', async(() => {
            inject([UserService, XHRBackend], (userService: UserService, mockBackend: MockBackend) => {
                mockBackend.connections.subscribe((connection: MockConnection) => {
                    connection.mockRespond(new Response(new ResponseOptions({
                        body: JSON.stringify(user1)
                    })));
                });
                userService.getUser('1').subscribe(
                    response => {
                        expect(response.email).toEqual('v@m.com');
                        expect(response.address).toEqual('Jim');
                    });
            });
        }));
    });
});