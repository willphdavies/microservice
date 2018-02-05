import { RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { UserComponent } from './route/user/user.component';

export const APP_ROUTING: ModuleWithProviders = RouterModule.forRoot([
    {
        path: '',
        component: UserComponent
    }
]);