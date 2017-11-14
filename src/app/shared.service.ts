import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from "@angular/http";
import 'rxjs/Rx';
import { Observable } from "rxjs";
import { UserObject } from "./objects/userobject";
import { SendObject } from "./objects/sendobject";

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
 
@Injectable()
export class SharedService {
    weatherURL1 = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22";
    weatherURL2 = "%2C%20";
    weatherURL3 = "%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys";
     
    totReqsMade: number = 0;    

    userURL = "https://7fmznr0wp1.execute-api.us-east-2.amazonaws.com/prod/user";
    userUpdateURL = "https://7fmznr0wp1.execute-api.us-east-2.amazonaws.com/prod/user/update";
    deviceURL = "https://2kgdy8xngf.execute-api.us-east-2.amazonaws.com/proddevice/device";
    deviceUpdateURL = "https://2kgdy8xngf.execute-api.us-east-2.amazonaws.com/proddevice/device/update";
 
    devicesaleURL = "https://rovg8hssa8.execute-api.us-east-2.amazonaws.com/prod/devicesale";
    devicesaleUpdateURL = "https://rovg8hssa8.execute-api.us-east-2.amazonaws.com/prod/devicesale/update";

    constructor(private _http: Http) { }
 
    findWeather(city, state) { 
        this.totReqsMade = this.totReqsMade + 1; 
        return this._http.get(this.weatherURL1 + city + this.weatherURL2+ state + this.weatherURL3)
            .map(response => {
                { return response.json() };
            })
            .catch(error => Observable.throw(error.json()));
    }
              
    postCreateNewUser(u) { 
        this.totReqsMade = this.totReqsMade + 1;   

        var NewObject = new SendObject();
        NewObject.UserObject = u;    
        var content = JSON.stringify(NewObject);               

        return this._http.post(this.userURL,content)
            .map(response => {
                { return response.json() };
            })
            .catch(error => Observable.throw(error.json()));
    }

    postUpdateUser(u) { 
        this.totReqsMade = this.totReqsMade + 1; 
                    
        var NewObject = new SendObject();
        NewObject.UserObject = u;    
        var content = JSON.stringify(NewObject);       
        return this._http.post(this.userUpdateURL,content)
            .map(response => {
                { return response.json() };
            })
            .catch(error => Observable.throw(error.json()));
    }

    UpdateDevice(d) { 
        this.totReqsMade = this.totReqsMade + 1; 
                    
        var NewObject = new SendObject();
        NewObject.DeviceObject = d;    
        var content = JSON.stringify(NewObject);       
        return this._http.post(this.deviceUpdateURL,content)
            .map(response => {
                { return response.json() };
            })
            .catch(error => Observable.throw(error.json()));
    }

    getUsers()
    {
        this.totReqsMade = this.totReqsMade + 1; 
        return this._http.get(this.userURL)
        .map(response => {
            { return response.json() };
        })
        .catch(error => Observable.throw(error.json()));
    }

    getDevices()
    {
        this.totReqsMade = this.totReqsMade + 1; 
        return this._http.get(this.deviceURL)
        .map(response => {
            { return response.json() };
        })
        .catch(error => Observable.throw(error.json()));
    }

    getDeviceSales()
    {
        this.totReqsMade = this.totReqsMade + 1; 
        return this._http.get(this.devicesaleURL)
        .map(response => {
            { return response.json() };
        })
        .catch(error => Observable.throw(error.json()));
    }

    createNewDevice(d) { 
        this.totReqsMade = this.totReqsMade + 1;  
        var NewObject = new SendObject();
        NewObject.DeviceObject = d;    
        var content = JSON.stringify(NewObject);         

        return this._http.post(this.deviceURL,content)
            .map(response => {
                { return response.json() };
            })
            .catch(error => Observable.throw(error.json()));
    }

    createNewSale(d) { 
        this.totReqsMade = this.totReqsMade + 1;  
        var NewObject = new SendObject();
        NewObject.DeviceSaleObject = d;    
        var content = JSON.stringify(NewObject);         
        
        return this._http.post(this.devicesaleURL,content)
            .map(response => {
                { return response.json() };
            })
            .catch(error => Observable.throw(error.json()));
    }

    
}

