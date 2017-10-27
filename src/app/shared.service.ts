import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from "@angular/http";
import 'rxjs/Rx';
import { Observable } from "rxjs";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
 
@Injectable()
export class SharedService {
    weatherURL1 = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22";
    weatherURL2 = "%2C%20";
    weatherURL3 = "%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys";
    findMovieURL1 = "http://www.omdbapi.com/?t=";
    findMovieURL2 = "&y=&plot=short&r=json"; 
    currencyURL = "http://api.fixer.io/latest?symbols="; 
    totReqsMade: number = 0;
    userURL = "https://lvxoa9yn87.execute-api.us-east-2.amazonaws.com/prod/proxy";
    userURL2 = "https://7fmznr0wp1.execute-api.us-east-2.amazonaws.com/prod/user";
    constructor(private _http: Http) { }
 
    findWeather(city, state) { 
        this.totReqsMade = this.totReqsMade + 1; 
        return this._http.get(this.weatherURL1 + city + this.weatherURL2+ state + this.weatherURL3)
            .map(response => {
                { return response.json() };
            })
            .catch(error => Observable.throw(error.json()));
    }
 
    findMovie(movie) { 
        this.totReqsMade = this.totReqsMade + 1; 
        return this._http.get(this.findMovieURL1 + movie + this.findMovieURL2)
            .map(response => {
                { return response.json() };
            })
            .catch(error => Observable.throw(error.json().error));
    }
 
    getCurrencyExchRate(currency) { 
        this.totReqsMade = this.totReqsMade + 1; 
        return this._http.get(this.userURL)
            .map(response => {
                { return response.json() };
            })
            .catch(error => Observable.throw(error.json()));
    }

    postNewUser(currency) { 
        this.totReqsMade = this.totReqsMade + 1; 
        
        var NewUser = new User();
        NewUser.UserName = "robtest";
        NewUser.FirstName = "rob";
        NewUser.LastName = "test";       

        var NewObject = new ObjectToSend();
        NewObject.User = NewUser;    
        var content = JSON.stringify(NewObject);               

        return this._http.post(this.userURL2,content)
            .map(response => {
                { return response.json() };
            })
            .catch(error => Observable.throw(error.json()));
    }

    
}

export class ObjectToSend 
{
    User: User;      
}

export class PickupLocation 
{
    Latitude: string;
    Longitude: string;    
}

export class User
{
    UserName: string;
    FirstName: string;
    LastName: string;
}