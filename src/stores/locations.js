import {defineStore} from "pinia/dist/pinia";

export const useLocationsStore = defineStore('locationsStore', () => {
    const locations = {
        Berlin: {name: 'Berlin', lng: 13.4247317, lat: 52.5068441, zoom: 10, id: 1},
        Portland: {name: 'Portland', lng: -122.8192068, lat: 45.5428359, zoom: 10, id: 2}
    };
    return {locations}
});