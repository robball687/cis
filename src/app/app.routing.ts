import { Routes, RouterModule } from '@angular/router';
import { DeviceComponent } from "./device/device.component";
import { WeatherComponent } from "./weather/weather.component";
import { UserComponent } from "./user/user.component";
import { DeviceSaleComponent } from './device-sale/device-sale.component';
import { ReportsComponent } from './reports/reports.component';

const MAINMENU_ROUTES: Routes = [
    //full : makes sure the path is absolute path
    { path: '', redirectTo: '/weather', pathMatch: 'full' },
    { path: 'weather', component: WeatherComponent },
    { path: 'user', component: UserComponent },
    { path: 'device', component: DeviceComponent },
    { path: 'device/:id', component: DeviceComponent },
    { path: 'devicesale', component: DeviceSaleComponent },
    { path: 'devicesale/:id', component: DeviceSaleComponent },
    { path: 'reports', component: ReportsComponent }   
];
export const CONST_ROUTING = RouterModule.forRoot(MAINMENU_ROUTES);