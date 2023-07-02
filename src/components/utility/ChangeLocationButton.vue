<template>
  <button @click="changeLocation" class="button location-button"> To {{ location.name }}</button>
</template>

<script>

export default {
  name: "ChangeLocationButton",
  props: {
    location: {
      type: Object,
      required: true,
    }
  },
  emits: ['changeLocation'],
  setup(props, context) {
    const changeLocation = () => {
      context.emit('changeLocation', props.location)
    }
    return {changeLocation}
  },

}

</script>

<style lang="scss" scoped>
.location-button {
  border: none;
  background-color: #e1e3e9;
  border-radius: 5px;
  padding: 10px;
  transition: color .3s ease, box-shadow .150ms ease;
  box-shadow: 0 0 3px;
  color: #2b2a28;
  cursor: pointer;

  &:hover,
  &:focus {
    color: #028eff;
  }

  &:active {
    box-shadow: 0 0 0;
  }
}


</style>