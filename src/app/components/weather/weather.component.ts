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


  constructor(private weatherService : WeatherService){}
  
  ngOnInit(): void {
    this.getWeather();
  }

  getWeather(){
    this.weatherService.getWeather().subscribe(
      {
        next: (result) => {
          this.weatherList=result;
          if(this.weatherList!=null){
            this.weatherList.main.temp = this.weatherList.main.temp - 273.15;
          }          
          console.log(this.weatherList);
        },
        error: (err) => {
          console.log(err);
        }
      }
    );
  }

}
