import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { WeatherComponent } from './weather/weather.component';
import { DeviceComponent } from './device/device.component';
import { UserComponent } from './user/user.component';
import { CONST_ROUTING } from './app.routing';
import { SharedService } from "./shared.service";
import { DeviceSaleComponent } from './device-sale/device-sale.component';
import { ReportsComponent } from './reports/reports.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    WeatherComponent,
    DeviceComponent,
    UserComponent,
    DeviceSaleComponent,
    ReportsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    CONST_ROUTING,
    BrowserAnimationsModule
  ],
  providers: [SharedService],
  bootstrap: [AppComponent]
})
export class AppModule { }
