<template>
  <ul class="location-buttons-list">
    <li v-for="location in locations" :key="location.id" class="location-buttons-list__item">
      <change-location-button @changeLocation="changeMapLocation($event)" :location="location"></change-location-button>
    </li>
  </ul>

</template>

<script>
import changeLocationButton from "@/components/utility/ChangeLocationButton";


export default {

  name: "LocationButtonsList",
  emits: ['changeMapLocation'],
  props:{
    locations:{
      type:Object,
      required:true,
    }
  },
  components: {
    changeLocationButton
  },
  setup(props, context) {
    const changeMapLocation = function (newLocation){
      context.emit('changeMapLocation', newLocation)
    }
    return{changeMapLocation}
  },

}
</script>

<style scoped>
.location-buttons-list{
  position: absolute;
  list-style: none;
  padding: 0;
  margin: 0;
  bottom: 2%;
  left: 1%;
  display: flex;
  gap: 10px;
}
.location-buttons-list__item{

}


</style>