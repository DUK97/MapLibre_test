<template>
  <div :class={overlay:isLoading} class="map-wrap">
    <copyright-logo></copyright-logo>
    <div ref="mapContainer" class="map"></div>
    <location-buttons-list @changeMapLocation="handleNewLocation($event)"/>
    <layersList @changeLayer='changeLayerHandle'/>
    <loader-component :isLoading="isLoading"/>
  </div>
</template>

<script>
import {Map} from 'maplibre-gl';
import {markRaw, onMounted, onUnmounted, shallowRef} from 'vue';
import CopyrightLogo from "@/components/utility/CopyrightLogo";
import locationButtonsList from "@/components/map/navigation/LocationButtonsList";
import layersList from "@/components/map/navigation/LayersList";
import {useSensorsPointsStore} from "@/stores/sensorPoints";
import {usePinballPointsStore} from "@/stores/pinballPoints";
import {renderMapLayer} from "@/utility/layersHandler";
import LoaderComponent from "@/components/utility/LoaderComponent";

export default {
  name: "MapComponent",
  components: {
    LoaderComponent,
    CopyrightLogo,
    locationButtonsList,
    layersList,
  },

  setup() {
    const map = shallowRef(null);
    const {getPinballMachines} = usePinballPointsStore();
    const {getSensors} = useSensorsPointsStore();
    const mapContainer = shallowRef(null);
    const isLoading = shallowRef(false);
    const handleNewLocation = function (newLocation) {
      map.value.flyTo({center: [newLocation.lng, newLocation.lat], zoom: newLocation.zoom})
    };
    const changeLayerHandle = async function ({name, isChecked}) {
      isLoading.value = true
      try {
        if (name === 'Pinball machines') {
          if (isChecked === true) {
            const mapPoints = await getPinballMachines();
            addNewLayer('pinball', mapPoints);
          } else {
            map.value.removeLayer('pinball-label');
            map.value.removeLayer('pinball');
            map.value.removeSource('pinball');
          }
        }
        if (name === 'Sensors') {
          if (isChecked === true) {
            const mapPoints = await getSensors();
            addNewLayer('sensors', mapPoints);
          } else {
            map.value.removeLayer('sensors-label');
            map.value.removeLayer('sensors');
            map.value.removeSource('sensors');
          }
        }
      } catch (error) {
        console.error(error)
      } finally {
        isLoading.value = false
      }

    }
    const addNewLayer = function (mapSourceId, pointsLocation) {

      try {
        renderMapLayer(map.value, mapSourceId, pointsLocation);
      } catch (error) {
        console.error(error)
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
      map.value.on('load', () => {

        if (localStorage.getItem('checkedLayers').length !== 0) {
          const localStorageItems = JSON.parse(localStorage.getItem('checkedLayers'))
          localStorageItems.forEach(item => {
            changeLayerHandle({name: item, isChecked: true});
          })
        }
      })
    })
    onUnmounted(() => {
      map.value?.remove();
    })


    return {
      map, mapContainer, handleNewLocation, changeLayerHandle, addNewLayer, isLoading
    };
  }
};
</script>


<style lang="scss" scoped>
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
  height: 100vh;

  &.overlay {
    pointer-events: none;
    user-select: none;
  }
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