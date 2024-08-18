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
          console.log(this.city);
        }
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
  
  private convertTemperatures(main: any) {
    const kelvinToCelsius = (temp: number) => parseFloat((temp - 273.15).toFixed(2));
  
    main.temp = kelvinToCelsius(main.temp);
    main.feels_like = kelvinToCelsius(main.feels_like);
    main.temp_max = kelvinToCelsius(main.temp_max);
    main.temp_min = kelvinToCelsius(main.temp_min);
  }

  /*
  getWeather(){
    this.weatherService.getWeather().subscribe(
      {
        next: (result) => {
          this.weatherList=result;
          if(this.weatherList!=null){
            this.weatherList.main.temp = this.weatherList.main.temp - 273.15;
            this.weatherList.main.temp = parseFloat(this.weatherList.main.temp.toFixed(2));
            this.weatherList.main.feels_like = this.weatherList.main.feels_like - 273.15;
            this.weatherList.main.feels_like = parseFloat(this.weatherList.main.feels_like.toFixed(2));
            this.weatherList.main.temp_max = this.weatherList.main.temp_max- 273.15;
            this.weatherList.main.temp_max = parseFloat(this.weatherList.main.temp_max.toFixed(2));
            this.weatherList.main.temp_min = this.weatherList.main.temp_min - 273.15;
            this.weatherList.main.temp_min = parseFloat(this.weatherList.main.temp_min.toFixed(2));
          }          
          console.log(this.weatherList);
        },
        error: (err) => {
          console.log(err);
        }
      }
    );
  }
  */
  

}
