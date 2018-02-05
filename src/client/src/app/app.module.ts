import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { APP_ROUTING } from './app.routing';

import { SafeHtml } from "./pipes/pipe.safeHtml";

import { UserComponent } from './route/user/user.component';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        APP_ROUTING
    ],
    declarations: [
        AppComponent,
        UserComponent,
        SafeHtml
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule {}