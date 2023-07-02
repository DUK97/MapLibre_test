<template>
  <div class="layers">
    <form class="layers__form" action="#">
      <label class="layers__label" v-for="layer in layers" :key="layer.name">{{ layer.name }}
        <input class="layers__input" :name="layer.name" type="checkbox">
      </label>
    </form>
  </div>
</template>

<script>
import {useLayersStore} from "@/stores/layers";


export default {
  name: "LayersList",
  setup() {
    const {layers} = useLayersStore()
    return {layers}
  }
}
</script>

<style lang="scss" scoped>
.layers {
  position: absolute;
  top: 1%;
  z-index: 1;
  left: 1%;
  padding: 20px;
  background-color: rgba(255, 255, 255, 0.7);
}

.layers__form {
  display: flex;
  flex-direction: column;
}

.layers__label {
  font-size: 16px;
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  flex-direction: row-reverse;
  position: relative;
  padding-left: 30px;
  cursor: pointer;

  &::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    width: 15px;
    height: 15px;
    border-radius: 10px;
    border: 1px solid #2b2a28;
  }

  &:has(.layers__input:checked) {
    &::after {
      content: "✔";
      color: #028eff;
      position: absolute;
      width: 19px;
      height: 10px;
      font-size: 16px;
      line-height: 0.6;
      left: 2px;
      top: 50%;
      transform: translateY(-50%);
    }
  }
}

.layers__input {
  position: fixed;
  transform: scale(0);
}
</style>