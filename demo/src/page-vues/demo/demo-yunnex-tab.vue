<template>
    <div class="page-demo-yunnex-tab page-padding">
        <div class="title-page">选项卡(tab)组件</div>
        <div class="banxin">
            <div class="header">
                <yunnex-tab :tab-obj="tabObj" v-on:tab-option="tabOption"></yunnex-tab>
            </div>
        </div>
    </div>
</template>

<script>
import 'common/styles/common';
import Tab from 'common/components/yunnex-tab/index';
export default {
    data() {
        return {
            tabObj: {   // 传入一个对象。
                tabList: [
                    {
                        name: '标题名字', // tab文本   必传
                        id: 1,  // tab ID  这个ID 在选中了tab后会在tabOption事件中传递过来   必传
                        href: '', // 如果有页面跳转的话，就输入地址 如：/saofu-agent-admin/renewal/orders， 不要忘了前面的"/";
                    },
                    {
                        name: '百度',
                        id: 2,
                        href: 'http://www.baidu.com', // 不同域名下的地址要写完整 "http://www.baidu.com";
                    },
                    {
                        name: '自由活动',
                        id: 3,
                        href: '', // 不用跳转地址，就可以不传这个字段。
                    },
                    {
                        name: '营销情况',
                        id: 4,
                    }
                ],
                optionNum: 3  // 默认选中的 tab ID;  /** 当tab 只有一项的时候，不要传。**/
            }
        }
    },
    components: {
        'yunnex-tab': Tab
    },
    methods: {
        tabOption(id) { // 选中的tab ID
            console.log("选中的tab ID为：" +id);
        }
    }
}
</script>

<style scoped lang="scss">
    .page-demo-yunnex-tab {
        .banxin {
            min-height: 910px;
            margin: 50px auto;
            background-color: #fff;
        }
    }
</style>
