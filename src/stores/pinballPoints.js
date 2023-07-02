import {defineStore} from "pinia/dist/pinia";
import {ref} from "vue";
import {fetchPinballPoints} from "@/api/fetchPinballPoints";
import jsonToGeoJSONConverter from "@/utility/jsonToGeoJSONConverter";


export const usePinballPointsStore = defineStore('pinballPointsStore', () => {
    const sensorsPointsArray = ref({});
    const getPinballMachines = async () => {
        const sensorsPoints = await fetchPinballPoints();
        sensorsPointsArray.value =  sensorsPoints;
        sensorsPointsArray.value = jsonToGeoJSONConverter(sensorsPointsArray.value);
        return sensorsPointsArray.value;
    }

    return {getPinballMachines,sensorsPointsArray}

})
