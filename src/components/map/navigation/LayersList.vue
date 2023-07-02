<template>
  <div class="layers">
    <form action="#" class="layers__form">
      <label v-for="layer in layers" :key="layer.name" class="layers__label">{{ layer.name }}
        <input v-model="checkedLayers" :value="layer.name" class="layers__input" name="enabledLayers"
               type="checkbox" @change="handleLayerChange">
      </label>
    </form>
  </div>
</template>

<script>
import {useLayersStore} from "@/stores/layers";
import {ref, watch} from "vue";


export default {
  emits: ['changeLayer'],
  name: "LayersList",
  setup(props, context) {
    const checkedLayers = ref(JSON.parse(localStorage.getItem('checkedLayers')) || []);
    const {layers} = useLayersStore()
    const handleLayerChange = function ({target}) {
      context.emit('changeLayer', ({name: target.value, isChecked: target.checked}))
    }
    watch(checkedLayers, to => {
          localStorage.setItem('checkedLayers', JSON.stringify(to))
        },
        {deep: true})
    return {layers, handleLayerChange, checkedLayers}
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