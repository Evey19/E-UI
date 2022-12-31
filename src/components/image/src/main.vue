<template>
    <div class="e-image">
        <slot v-if="loading" name="placeholder">
            <div class="e-image__placeholder"></div>
        </slot>
        <slot v-else-if="error" name="error">
            <div class="e-image__error"></div>
        </slot>
        <img v-else class="e-image__inner" v-bind="$attrs" v-on="$listeners" @click="clickHandler" :src="src"
            :style="imageStyle" :class="{ 'e-image__inner--center': alignCenter, 'e-image__preview': preview }">
        <template v-if="preview">
            <image-viewer :z-index="zIndex" :initial-index="imageIndex" v-if="showViewer" :on-close="closeViewer"
                :url-list="previewSrcList"></image-viewer>
        </template>
    </div>
</template>
  
<script>
import imageViewer from './image-viewer.vue';
import { on, off, getScrollContainer, isInContainer } from '@/utils/dom';
import { isString, isHtmlElement } from '@/utils/types';
import throttle from 'throttle-debounce/throttle';

const isSupportObjectFit = () => document.documentElement.style.objectFit !== undefined;

const ObjectFit = {
    NONE: 'none',
    CONTAIN: 'contain',
    COVER: 'cover',
    FILL: 'fill',
    SCALE_DOWN: 'scale-down'
};

let prevOverflow = '';

export default {
    name: 'EImage',
    inheritAttrs: false,
    components: {
        imageViewer
    },

    props: {
        src: String,
        fit: String,
        lazy: Boolean,
        scrollContainer: {},
        previewSrcList: {
            type: Array,
            default: () => []
        },
        zIndex: {
            type: Number,
            default: 2000
        }
    },

    data() {
        return {
            loading: true,
            error: false,
            show: !this.lazy,
            imageWidth: 0,
            imageHeight: 0,
            showViewer: false
        };
    },

    computed: {
        imageStyle() {
            const { fit } = this;
            if (!this.$isServer && fit) {
                return isSupportObjectFit()
                    ? { 'object-fit': fit }
                    : this.getImageStyle(fit);
            }
            return {};
        },
        alignCenter() {
            return !this.$isServer && !isSupportObjectFit() && this.fit !== ObjectFit.FILL;
        },
        preview() {
            const { previewSrcList } = this;
            return Array.isArray(previewSrcList) && previewSrcList.length > 0;
        },
        imageIndex() {
            let previewIndex = 0;
            const srcIndex = this.previewSrcList.indexOf(this.src);
            if (srcIndex >= 0) {
                previewIndex = srcIndex;
            }
            return previewIndex;
        }
    },

    watch: {
        src(val) {
            this.show && this.loadImage();
        },
        show(val) {
            val && this.loadImage();
        }
    },

    mounted() {
        if (this.lazy) {
            this.addLazyLoadListener();
        } else {
            this.loadImage();
        }
    },

    beforeDestroy() {
        this.lazy && this.removeLazyLoadListener();
    },

    methods: {
        loadImage() {
            if (this.$isServer) return;

            // reset status
            this.loading = true;
            this.error = false;

            const img = new Image();
            img.onload = e => this.handleLoad(e, img);
            img.onerror = this.handleError.bind(this);

            // bind html attrs
            // so it can behave consistently
            Object.keys(this.$attrs)
                .forEach((key) => {
                    const value = this.$attrs[key];
                    img.setAttribute(key, value);
                });
            img.src = this.src;
        },
        handleLoad(e, img) {
            this.imageWidth = img.width;
            this.imageHeight = img.height;
            this.loading = false;
            this.error = false;
        },
        handleError(e) {
            this.loading = false;
            this.error = true;
            this.$emit('error', e);
        },
        handleLazyLoad() {
            if (isInContainer(this.$el, this._scrollContainer)) {
                this.show = true;
                this.removeLazyLoadListener();
            }
        },
        addLazyLoadListener() {

            const { scrollContainer } = this;
            let _scrollContainer = null;

            if (isHtmlElement(scrollContainer)) {
                _scrollContainer = scrollContainer;
            } else if (isString(scrollContainer)) {
                _scrollContainer = document.querySelector(scrollContainer);
            } else {
                _scrollContainer = getScrollContainer(this.$el);
            }

            if (_scrollContainer) {
                this._scrollContainer = _scrollContainer;
                this._lazyLoadHandler = throttle(200, this.handleLazyLoad);
                on(_scrollContainer, 'scroll', this._lazyLoadHandler);
                this.handleLazyLoad();
            }
        },
        removeLazyLoadListener() {
            const { _scrollContainer, _lazyLoadHandler } = this;

            if (!_scrollContainer || !_lazyLoadHandler) return;

            off(_scrollContainer, 'scroll', _lazyLoadHandler);
            this._scrollContainer = null;
            this._lazyLoadHandler = null;
        },
        /**
         * simulate object-fit behavior to compatible with IE11 and other browsers which not support object-fit
         */
        getImageStyle(fit) {
            const { imageWidth, imageHeight } = this;
            const {
                clientWidth: containerWidth,
                clientHeight: containerHeight
            } = this.$el;

            if (!imageWidth || !imageHeight || !containerWidth || !containerHeight) return {};

            const imageAspectRatio = imageWidth / imageHeight;
            const containerAspectRatio = containerWidth / containerHeight;

            if (fit === ObjectFit.SCALE_DOWN) {
                const isSmaller = imageWidth < containerWidth && imageHeight < containerHeight;
                fit = isSmaller ? ObjectFit.NONE : ObjectFit.CONTAIN;
            }

            switch (fit) {
                case ObjectFit.NONE:
                    return { width: 'auto', height: 'auto' };
                case ObjectFit.CONTAIN:
                    return (imageAspectRatio < containerAspectRatio) ? { width: 'auto' } : { height: 'auto' };
                case ObjectFit.COVER:
                    return (imageAspectRatio < containerAspectRatio) ? { height: 'auto' } : { width: 'auto' };
                default:
                    return {};
            }
        },
        clickHandler() {
            // don't show viewer when preview is false
            if (!this.preview) {
                return;
            }
            // prevent body scroll
            prevOverflow = document.body.style.overflow;
            document.body.style.overflow = 'hidden';
            this.showViewer = true;
        },
        closeViewer() {
            document.body.style.overflow = prevOverflow;
            this.showViewer = false;
        }
    }
};
</script>
  

<style lang="scss">
@import '../../../common/mixins';
@import '../../../common/var';

%size {
    width: 100%;
    height: 100%;
}

@include b(image) {
    position: relative;
    display: inline-block;
    overflow: hidden;

    @include e(inner) {
        @extend %size;
        vertical-align: top;

        @include m(center) {
            position: relative;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            display: block;
        }
    }

    @include e(placeholder) {
        @extend %size;
        background: $--background-color-base;
    }

    @include e(error) {
        @extend %size;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 14px;
        background: $--background-color-base;
        color: $--color-text-placeholder;
        vertical-align: middle;
    }

    @include e(preview) {
        cursor: pointer;
    }
}


@include b(image-viewer) {


    @include e(wrapper) {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
    }

    @include e(btn) {
        position: absolute;
        z-index: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        opacity: .8;
        cursor: pointer;
        box-sizing: border-box;
        user-select: none;
    }

    @include e(close) {
        top: 40px;
        right: 40px;
        width: 40px;
        height: 40px;
        font-size: 24px;
        color: #fff;
        background-color: #606266;
    }

    @include e(canvas) {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    @include e(actions) {
        left: 50%;
        bottom: 30px;
        transform: translateX(-50%);
        width: 282px;
        height: 44px;
        padding: 0 23px;
        background-color: #606266;
        border-color: #fff;
        border-radius: 22px;

        @include e(actions__inner) {
            width: 100%;
            height: 100%;
            text-align: justify;
            cursor: default;
            font-size: 23px;
            color: #fff;
            display: flex;
            align-items: center;
            justify-content: space-around;
        }
    }

    @include e(prev) {
        top: 50%;
        transform: translateY(-50%);
        width: 44px;
        height: 44px;
        font-size: 24px;
        color: #fff;
        background-color: #606266;
        border-color: #fff;
        left: 40px;
    }

    @include e(next) {
        top: 50%;
        transform: translateY(-50%);
        width: 44px;
        height: 44px;
        font-size: 24px;
        color: #fff;
        background-color: #606266;
        border-color: #fff;
        right: 40px;
        text-indent: 2px;
    }

    @include e(mask) {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        opacity: .5;
        background: #000;
    }
}

.viewer-fade-enter-active {
    animation: viewer-fade-in .3s;
}

.viewer-fade-leave-active {
    animation: viewer-fade-out .3s;
}

@keyframes viewer-fade-in {
    0% {
        transform: translate3d(0, -20px, 0);
        opacity: 0;
    }

    100% {
        transform: translate3d(0, 0, 0);
        opacity: 1;
    }
}

@keyframes viewer-fade-out {
    0% {
        transform: translate3d(0, 0, 0);
        opacity: 1;
    }

    100% {
        transform: translate3d(0, -20px, 0);
        opacity: 0;
    }
}
</style>