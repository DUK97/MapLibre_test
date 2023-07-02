<template>
  <div class="map-wrap">
    <copyright-logo></copyright-logo>
    <div class="map" ref="mapContainer"></div>
    <location-buttons-list @changeMapLocation="handleNewLocation($event)" :locations="locations"/>
  </div>
</template>

<script>
import {Map} from 'maplibre-gl';
import {shallowRef, onMounted, onUnmounted, markRaw} from 'vue';
import CopyrightLogo from "@/components/utility/CopyrightLogo";
import locationButtonsList from "@/components/map/navigation/LocationButtonsList";
import {useLocationsStore} from "@/stores/locations";

export default {
  name: "MapComponent",
  components: {
    CopyrightLogo,
    locationButtonsList,
  },

  setup() {
    const {locations} = useLocationsStore();
    const map = shallowRef(null);
    const mapContainer = shallowRef(null);
    const handleNewLocation = function (newLocation) {
      map.value.flyTo({center: [newLocation.lng, newLocation.lat], zoom: newLocation.zoom})
    };
    onMounted(() => {
      const initialState = {lng: 37.6879762, lat: 55.7523148, zoom: 10};
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
      map, mapContainer, locations, handleNewLocation
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