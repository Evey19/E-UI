<template>
    <div class="page-component__content">
        <h3>基础用法</h3>
        <div class="demo-block">
            <e-steps :active="active" finish-status="success">
                <e-step title="步骤 1"></e-step>
                <e-step title="步骤 2"></e-step>
                <e-step title="步骤 3"></e-step>
            </e-steps>

            <el-button style="margin-top: 12px;" @click="next">下一步</el-button>
        </div>
        <h3>含状态步骤条</h3>
        <div class="demo-block">
            <e-steps :space="200" :active="1" finish-status="success">
                <e-step title="已完成"></e-step>
                <e-step title="进行中"></e-step>
                <e-step title="步骤 3"></e-step>
            </e-steps>
        </div>
        <h3>有描述的步骤条</h3>
        <div class="demo-block">
            <e-steps :active="1">
                <e-step title="步骤 1" description="这是一段很长很长很长的描述性文字"></e-step>
                <e-step title="步骤 2" description="这是一段很长很长很长的描述性文字"></e-step>
                <e-step title="步骤 3" description="这段就没那么长了"></e-step>
            </e-steps>
        </div>
        <h3>居中的步骤条</h3>
        <div class="demo-block">
            <e-steps :active="2" align-center>
                <e-step title="步骤1" description="这是一段很长很长很长的描述性文字"></e-step>
                <e-step title="步骤2" description="这是一段很长很长很长的描述性文字"></e-step>
                <e-step title="步骤3" description="这是一段很长很长很长的描述性文字"></e-step>
                <e-step title="步骤4" description="这是一段很长很长很长的描述性文字"></e-step>
            </e-steps>
        </div>
        <h3>带图标的步骤条</h3>
        <div class="demo-block">
            <e-steps :active="1">
                <e-step title="步骤 1" icon="el-icon-edit"></e-step>
                <e-step title="步骤 2" icon="el-icon-upload"></e-step>
                <e-step title="步骤 3" icon="el-icon-picture"></e-step>
            </e-steps>
        </div>
        <h3>竖式步骤条</h3>
        <div class="demo-block">
            <div style="height: 300px;">
                <e-steps direction="vertical" :active="1">
                    <e-step title="步骤 1"></e-step>
                    <e-step title="步骤 2"></e-step>
                    <e-step title="步骤 3" description="这是一段很长很长很长的描述性文字"></e-step>
                </e-steps>
            </div>
        </div>
        <h3>简洁风格的步骤条</h3>
        <div class="demo-block">
            <e-steps :active="1" simple>
                <e-step title="步骤 1" icon="el-icon-edit"></e-step>
                <e-step title="步骤 2" icon="el-icon-upload"></e-step>
                <e-step title="步骤 3" icon="el-icon-picture"></e-step>
            </e-steps>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            active: 0
        };
    },

    methods: {
        next() {
            if (this.active++ > 2) this.active = 0;
        }
    }
}
</script>