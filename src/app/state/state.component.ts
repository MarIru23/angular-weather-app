import { WeatherComponent } from '../components/weather/weather.component';
import { WeatherInterface } from '../interfaces/weather.interface';
//import { signalStore}

export interface State {
  favCities: WeatherInterface[];
}

//tip interfaz, valor por defecto
const initialState: State = {
  favCities: [],
};

//export const firstState = signalStore()
