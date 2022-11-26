<template>
  <div
    :class="[
      'e-input-number',
      inputNumberSize ? 'e-input-number--' + inputNumberSize : '',
      { 'is-disabled': inputNumberDisabled },
    ]"
  >
    <span
      class="e-input-number__decrease"
      v-if="controls"
      :class="{ 'is-disabled': minDisabled }"
    >
      <i :class="`el-icon-${controlsAtRight ? 'arrow-down' : 'minus'}`"></i>
    </span>
    <span
      class="e-input-number__increase"
      v-if="controls"
      :class="{ 'is-disabled': maxDisabled }"
    >
      <i :class="`el-icon-${controlsAtRight ? 'arrow-up' : 'plus'}`"></i>
    </span>
    
  </div>
</template>

<script>
</script>