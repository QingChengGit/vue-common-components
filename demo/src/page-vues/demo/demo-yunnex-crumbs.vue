<template>
    <div class="page-demo-yunnex-crumbs page-padding">
        <div class="title-page">面包屑组件</div>
        <div class="banxin">
            <div class="body-cont">
                <yunnex-crumbs :crumbs-list="crumbsList" v-on:crumbs-link="crumbsPitchOn"></yunnex-crumbs>
            </div>
        </div>
    </div>
</template>

<script>
import 'common/styles/common';
import Crumbs from 'common/components/yunnex-crumbs/index';
export default {
    data() {
        return {
                crumbsList: [{
                    name: '我的活动', // 必传
                    id: 1,   // 必传
                    href: '', // 如果有页面跳转的话，就输入地址 如：/saofu-agent-admin/renewal/orders， 不要忘了前面的"/";
                },
                {
                    name: '查看活动',
                    id: 2,
                    href: 'http://www.baidu.com', // 不同域名下的地址要写完整 "http://www.baidu.com";
                },
                {
                    name: '自由活动',
                    id: 3,
                    href: '', //  /** 需要额外做一些事情就不要传。**/
                },
                {
                    name: '营销情况',
                    id: 4,
                }
                ],
        }
    },
    components: {
        'yunnex-crumbs': Crumbs
    },
    methods: {
        crumbsPitchOn(id) {
            console.log("点击的crumbs为:"+id);
        }
    }
}
</script>

<style scoped lang="scss">
    .page-demo-yunnex-crumbs {
        .banxin {
            min-height: 910px;
            margin: 50px auto;
            background-color: #fff;
        }
    }
</style>