<template>
  <div class="map-wrap">
    <copyright-logo></copyright-logo>
    <div class="map" ref="mapContainer"></div>
    <location-buttons-list @changeMapLocation="handleNewLocation($event)"/>
    <layersList @changeLayer='changeLayerHandle'/>
  </div>
</template>

<script>
import {Map} from 'maplibre-gl';
import {shallowRef, onMounted, onUnmounted, markRaw} from 'vue';
import CopyrightLogo from "@/components/utility/CopyrightLogo";
import locationButtonsList from "@/components/map/navigation/LocationButtonsList";
import layersList from "@/components/map/navigation/LayersList";
import {useSensorsPointsStore} from "@/stores/sensorPoints";
import {usePinballPointsStore} from "@/stores/pinballPoints";
import {renderMapLayer} from "@/utility/layersHandler";

export default {
  name: "MapComponent",
  components: {
    CopyrightLogo,
    locationButtonsList,
    layersList,
  },

  setup() {

    const {getPinballMachines} = usePinballPointsStore();
    const {getSensors} = useSensorsPointsStore();
    const map = shallowRef(null);
    const mapContainer = shallowRef(null);
    const handleNewLocation = function (newLocation) {
      map.value.flyTo({center: [newLocation.lng, newLocation.lat], zoom: newLocation.zoom})
    };
    const isLoading = shallowRef(false);

    const changeLayerHandle = async function ({name, isChecked}) {
      if (name === 'Pinball machines' ) {
        if (isChecked === true) {
          const mapPoints = await getPinballMachines();
          addNewLayer('pinball', mapPoints);
        }
        else {
          map.value.removeLayer('pinball');
          map.value.removeSource('pinball');
        }
      }
      if (name === 'Sensors') {
        if (isChecked === true) {
          const mapPoints = await getSensors();
          console.log(mapPoints)
          addNewLayer('sensors', mapPoints);
        }
        else {
          map.value.removeLayer('sensors');
          map.value.removeSource('sensors');
        }
      }
    }
    const addNewLayer = function (mapSourceId, pointsLocation) {
      isLoading.value = true;
      try {
        renderMapLayer(map.value, mapSourceId, pointsLocation);
      } catch (error) {
        console.error(error)
      } finally {
        isLoading.value = false;
      }

    }
    onMounted(async () => {
      const initialState = {lng: -122.8192068, lat: 45.5428359, zoom: 4};
      map.value = markRaw(new Map({
        container: mapContainer.value,
        style: process.env.VUE_APP_MAP_STYLE,
        center: [initialState.lng, initialState.lat],
        zoom: initialState.zoom
      }));
    })
    onUnmounted(() => {
      map.value?.remove();
    })


    return {
      map, mapContainer, handleNewLocation, changeLayerHandle, addNewLayer
    };
  }
};
</script>


<style scoped>
@import '~maplibre-gl/dist/maplibre-gl.css';


button {
  background-color: black;
  color: wheat;
  position: absolute;
  top: 50%;
}

.map-wrap {
  position: relative;
  width: 100%;
  height: calc(100vh);
}

.map {
  position: absolute;
  width: 100%;
  height: 100%;
}

.watermark {
  position: absolute;
  left: 10px;
  bottom: 10px;
  z-index: 999;
}
</style>