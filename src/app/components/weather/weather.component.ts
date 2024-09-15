import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { WeatherService } from '../../services/weather.service';
import { WeatherInterface } from '../../interfaces/weather.interface';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [],
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.css',
})
export class WeatherComponent implements OnInit {
  weatherList!: WeatherInterface;
  url: string = '';
  imageUrl = 'assets/images/';

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {}

  onSubmit(event: Event, city: string) {
    event.preventDefault();
    this.getWeather(city);
  }

  getWeather(city: string) {
    this.url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${environment.apiKey}`;
    this.weatherService.getWeather(this.url).subscribe({
      next: (result) => {
        if (result) {
          this.weatherList = result;
          this.weatherList.weather[0].icon =
            this.imageUrl + this.weatherList.weather[0].icon + '.png';
          this.convertTemperatures(this.weatherList.main);
          this.convertTimestampToUTC(this.weatherList.sys);
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  private convertTimestampToUTC(main: any) {
    const dateR = new Date(main.sunrise * 1000);
    const dateS = new Date(main.sunset * 1000);
    main.sunrise = dateR.toLocaleString('en-GB', { timeStyle: 'short' });
    main.sunset = dateS.toLocaleString('en-GB', { timeStyle: 'short' });
  }

  private convertTemperatures(main: any) {
    const kelvinToCelsius = (temp: number) =>
      parseFloat((temp - 273.15).toFixed(0));

    main.temp = kelvinToCelsius(main.temp);
    main.feels_like = kelvinToCelsius(main.feels_like);
    main.temp_max = kelvinToCelsius(main.temp_max);
    main.temp_min = kelvinToCelsius(main.temp_min);
  }
}
