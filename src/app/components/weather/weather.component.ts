import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../../services/weather.service';
import { WeatherInterface } from '../../interfaces/weather.interface';

@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [],
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.css'
})
export class WeatherComponent implements OnInit{
  
  weatherList: WeatherInterface | undefined;
  city : string ='';

  constructor(private weatherService : WeatherService){}
  
  ngOnInit(): void {
  }

  onSubmit(event: Event, city: string) {
    event.preventDefault();
    this.getCity(city);
  }
    

  getCity(city:string) {
    this.city=city;
    this.weatherService.changeUrl(this.city);
    this.getWeather();
  }

  getWeather() {
    this.weatherService.getWeather().subscribe({
      next: (result) => {
        if (result) {
          this.weatherList = result;
          this.convertTemperatures(this.weatherList?.main);
          this.convertTimestampToUTC(this.weatherList?.sys);
        }
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  private convertTimestampToUTC(main:any){
    const dateR = new Date(main.sunrise * 1000);
    const dateS = new Date(main.sunset * 1000);
    main.sunrise = dateR.toLocaleString('en-GB', { timeStyle: 'short' });
    main.sunset = dateS.toLocaleString('en-GB', { timeStyle: 'short' });
  }
  
  private convertTemperatures(main: any) {
    const kelvinToCelsius = (temp: number) => parseFloat((temp - 273.15).toFixed(0));
  
    main.temp = kelvinToCelsius(main.temp);
    main.feels_like = kelvinToCelsius(main.feels_like);
    main.temp_max = kelvinToCelsius(main.temp_max);
    main.temp_min = kelvinToCelsius(main.temp_min);
  }

}
