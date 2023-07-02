import {defineStore} from "pinia/dist/pinia";
import {ref} from "vue";
import {fetchSensorsPoints} from "@/api/fetchSensorsPoints";

export const useSensorsPointsStore = defineStore('sensorsPointsStore', () => {
    const sensorsPointsArray = ref([]);
    const getSensors = async () => {
        const sensorsPoints = await fetchSensorsPoints();
        sensorsPointsArray.value =  sensorsPoints;
        return sensorsPointsArray.value;
    }

    return {getSensors,sensorsPointsArray}
})
