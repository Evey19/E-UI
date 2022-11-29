<template>
  <component :is="_elTag" class="e-radio-group">
    <slot></slot>
  </component>
</template>

<script>
import Emitter from "@/utils/emitter";
export default {
  name: "ERadioGroup",
  componentName: "ERadioGroup",
  mixins: [Emitter],
  props: {
    value: {},
    size: String,
    fill: String,
    textColor: String,
    disabled: Boolean,
  },
  computed: {
    _elTag() {
      let tag = (this.$vnode.data || {}).tag;
      if (!tag || tag === "component") tag = "div";
      return tag;
    },
    radioGroupSize() {
      return this.size;
    },
  },
  created() {
    this.$on("handleChange", (value) => {
      this.$emit("change", value);
    });
  },
};
</script>

<style lang="scss" scoped>
@import "../../../common/mixins.scss";
@import "../../../common/var.scss";

@include b(radio-group) {
  display: inline-block;
  line-height: 1;
  vertical-align: middle;
  font-size: 0;
}
</style>