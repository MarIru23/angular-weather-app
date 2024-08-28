import { Component } from '@angular/core';
import { Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { WeatherInterface } from '../interfaces/weather.interface';

@Component({
  selector: 'app-state',
  standalone: true,
  imports: [],
  templateUrl: './state.component.html',
  styleUrl: './state.component.css',
})
export class StateComponent {
  //@Output() addToFav = new EventEmitter<WeatherInterface>();
  //saveCity() {
  //this.addToFav.emit(weatherList);}
}
