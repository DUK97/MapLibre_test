import {defineStore} from "pinia/dist/pinia";
import {ref} from "vue";

export const useLayersStore = defineStore("layersStore", () => {
    const layers = ref([{name: 'Pinball machines'}, {name: 'Sensors'}]
    );
    return {layers}
})