<template>
  <div class="page-component__content">
    <h3>基础用法</h3>
    <div class="demo-block">
      <e-checkbox v-model="checked">备选项</e-checkbox>
    </div>
    <h3>禁用状态</h3>
    <div class="demo-block">
      <e-checkbox v-model="checked1" disabled>备选项1</e-checkbox>
      <e-checkbox v-model="checked2" disabled>备选项</e-checkbox>
    </div>
    <h3>多选框组</h3>
    <div class="demo-block">
      <e-checkbox-group v-model="checkList">
        <e-checkbox label="复选框 A"></e-checkbox>
        <e-checkbox label="复选框 B"></e-checkbox>
        <e-checkbox label="复选框 C"></e-checkbox>
        <e-checkbox label="禁用" disabled></e-checkbox>
        <e-checkbox label="选中且禁用" disabled></e-checkbox>
      </e-checkbox-group>
    </div>
    <h3>可选项目数量的限制</h3>
    <div class="demo-block">
      <e-checkbox-group v-model="checkedCities" :min="2" :max="3">
        <e-checkbox v-for="city in cities" :label="city" :key="city">{{
          city
        }}</e-checkbox>
      </e-checkbox-group>
    </div>
    <h3>indeterminate 状态</h3>
    <div class="demo-block">
      <e-checkbox
        :indeterminate="isIndeterminate"
        v-model="checkAll"
        @change="handleCheckAllChange"
        >全选</e-checkbox
      >
      <div style="margin: 15px 0"></div>
      <e-checkbox-group
        v-model="checkedCities"
        @change="handleCheckedCitiesChange"
      >
        <e-checkbox v-for="city in cities" :label="city" :key="city">{{
          city
        }}</e-checkbox>
      </e-checkbox-group>
    </div>
  </div>
</template>

<script>
const cityOptions = ["上海", "北京", "广州", "深圳"];
export default {
  data() {
    return {
      checked: true,
      checkList: ["选中且禁用", "复选框 A"],
      checkedCities: ["上海"],
      cities: cityOptions,
      checkAll: false,
      isIndeterminate: true,
      checked1: false,
      checked2: true,
    };
  },
  methods: {
    handleCheckAllChange(val) {
      this.checkedCities = val ? cityOptions : [];
      this.isIndeterminate = false;
    },
    handleCheckedCitiesChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.cities.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.cities.length;
    },
  },
};
</script>