<template>
  <div class="map-wrap">
    <copyright-logo></copyright-logo>
    <div class="map" ref="mapContainer"></div>
    <changeLocationButton  class="button"  >click me</changeLocationButton>
  </div>
</template>

<script>
import {Map} from 'maplibre-gl';
import {shallowRef, onMounted, onUnmounted, markRaw} from 'vue';
import changeLocationButton from "@/components/utility/ChangeLocationButton";
import CopyrightLogo from "@/components/utility/CopyrightLogo";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "MapComponent",
  components: {
    CopyrightLogo,
    changeLocationButton
  },

  setup() {
    const map = shallowRef(null);
    const mapContainer = shallowRef(null);
    onMounted(() => {
      const initialState = {lng: 37.6879762, lat: 55.7523148, zoom: 10};
      map.value = markRaw(new Map({
        container: mapContainer.value,
        style: `https://gist.githubusercontent.com/smellman/d3cbc19d134d5283df73/raw/a4bb13b44c36e9225f95c545cdedbe7513200d70/osm_mapbox_gl_example.json`,
        center: [initialState.lng, initialState.lat],
        zoom: initialState.zoom
      }));


    }),
        onUnmounted(() => {
          map.value?.remove();
        })

    return {
      map, mapContainer
    };
  }
};
</script>


<style scoped>
@import '~maplibre-gl/dist/maplibre-gl.css';


button{
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