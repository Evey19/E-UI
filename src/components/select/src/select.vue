<template>
    <div class="e-select" :class="[selectSize ? 'e-select--' + selectSize : '']" @click.stop="toggleMenu">
        <div class="e-select__tags" v-if="multiple" ref="tags"
            :style="{ 'max-width': inputWidth - 32 + 'px', width: '100%' }">
        <span v-if="collapseTags&&selected.length">
        
        </span>
        </div>
    </div>
</template>

<script>

</script>