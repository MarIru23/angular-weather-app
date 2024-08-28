import { WeatherComponent } from '../components/weather/weather.component';
import { WeatherInterface } from '../interfaces/weather.interface';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';

export interface State {
  favCities: WeatherInterface[];
}

//tip interfaz, valor por defecto
const initialState: State = {
  favCities: [],
};

export const firstState = signalStore(
  withState(initialState),
  withMethods(({ favCities, ...state }) => ({
    //Aquí se crean los métodos que va a tener(lo equivalente a un carrito/lista de objetos)
    addToFavs(weatherList: WeatherInterface) {
      const updatedCity = [...favCities(), weatherList];
      patchState(state, { favCities: updatedCity });
    },

    removeItemFromFavs(id: number) {
      const updatedCity = favCities().filter(
        (weatherList) => weatherList.sys.id !== id
      );
      patchState(state, { favCities: updatedCity });
    },
  }))
);
