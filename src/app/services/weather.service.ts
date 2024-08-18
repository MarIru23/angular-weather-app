import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  api_url=`https://api.openweathermap.org/data/2.5/weather?q=London&appid=62ff94c8139aae06b3d3e0c029d6c116`;
  new_url='';

  constructor(private httpClient : HttpClient) {
   }
   changeUrl(city : string):string{
    return this.new_url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=62ff94c8139aae06b3d3e0c029d6c116`;
 }

   getWeather(): Observable<any>{
    return this.httpClient.get(this.new_url).pipe(res=> res);
  }

 
}
