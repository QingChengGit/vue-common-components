<template>
    <div>
        <div class="com-layer-box" v-tip="{ position:'top',tipText:'ssssssssssssssssssss'}">xxxxxxxxxxxxxxxxxx</div>

        <div class="com-layer-box" v-tip="{ position:'bottom',tipText:'提示内容中有链接，可点击xsdsd 提示内容中有链接.'}">xxxxxxxxxxx</div>

        <div class="com-layer-box" v-tip="{ position:'left',tipText:'提示内容中有链接提示内容中有链接'}">

            <span class="com-layer com-layer-question"></span>

        </div>

        <div class="com-layer-box" v-tip="{ position:'right',tipText:'提示内容中有链接，可点击xsdsd 提示内容中有链接'}">

                    <span class="com-layer com-layer-question"></span>
        </div>
    </div>
</template>

<script>

	require('common/directives/js/tip.js');

    module.exports = {
        data() {
            return {
                messgae: 'tip'
            }
        }
    }
</script>