<template>
  <div class="e-checkbox-group">
    <slot></slot>
  </div>
</template>

<script>
import Emitter from "@/utils/emitter";
export default {
  name: "ECheckboxGroup",
  componentName: "ECheckboxGroup",
  mixins: [Emitter],
  props: {
    value: {},
    disabled: Boolean,
    min: Number,
    max: Number,
    size: String,
    fill: String,
    textColor: String,
  },
  computed:{
    checkboxGroupSize(){
      return this.size
    }
  }
};
</script>