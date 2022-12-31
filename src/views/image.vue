<template>
    <div class="page-component__content">
        <h3>基础用法</h3>
        <div class="demo-block">
            <div class="block" v-for="fit in fits" :key="fit">
                <span class="demonstration">{{ fit }}</span>
                <e-image style="width: 100px; height: 100px" :src="url" :fit="fit"></e-image>
            </div>
        </div>
        <h3>懒加载</h3>
        <div class="demo-block">
            <div class="demo-image__lazy">
                <e-image v-for="url in urls" :key="url" :src="url" lazy></e-image>
            </div>
        </div>
        <h3>大图预览</h3>
        <div class="demo-block">
            <e-image style="width: 100px; height: 100px" :src="url" :preview-src-list="srcList">
            </e-image>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            fits: ['fill', 'contain', 'cover', 'none', 'scale-down'],
            url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
            urls: [
                'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
                'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg',
                'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg',
                'https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg',
                'https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg',
                'https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg',
                'https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg'
            ],
            srcList: [
                'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
                'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg'
            ]
        }
    }
}
</script>

<style lang="scss">
.demo-block {
    .block {
        text-align: center;
        display: inline-block;
        width: 20%;
        box-sizing: border-box;
        vertical-align: top;
        padding: 30px 0px;
        border-right: 1px solid rgb(239, 242, 246);

        .demonstration {
            display: block;
            color: rgb(132, 146, 166);
            font-size: 14px;
            margin-bottom: 20px;
        }
    }

    .demo-image__lazy {
        height: 400px;
        overflow-y: auto;

        .e-image {
            display: block;
            min-height: 200px;
            margin-bottom: 10px;
        }
    }
}
</style>