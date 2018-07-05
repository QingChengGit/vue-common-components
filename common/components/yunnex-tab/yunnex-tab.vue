<template>
    <div class="tab-header">
        <ul class="tab-list">
            <li v-for="(item, index) in tabObj.tabList" :key="index" @click="tabOption(item, index, tabObj.tabList.length)" class="tab-option" :class="{'pitch-on-tab': optionNum == item.id, 'only-one-tab': tabObj.tabList.length == 1}">
                <span class="tab-name" :class="{'only-one-tab-name': tabObj.tabList.length == 1}">{{item.name}}</span>
            </li>
        </ul>
    </div>
</template>

<script>

export default {
    props: {
        'tabObj': {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            optionNum: this.tabObj.optionNum,
        }
    },
    watch: {
        'tabObj': function (n, o) {
            this.optionNum = n.optionNum;
        }
    },
    methods: {
        tabOption(item, index, length) {
            if (length == 1) {
                return;
            }
            this.optionNum = item.id;
            if (!item.href) {
                this.$emit('tab-option', item.id);
            } else {
                location.href = item.href;
                return;
            }
        }
    }
}
</script>

<style scoped lang="scss">

.tab-header {
    box-sizing: border-box;
    height: 80px;
    padding-left: 40px;
    margin: 0 -40px;
    border-bottom: 1px solid #d7d7d7;
    .tab-list {
        height: 100%;
        list-style: none;
        &::after {
            content: "";
            display: block;
            clear: both;
            visibility: hidden;
            height: 0;
        }
        .tab-option {
            float: left;
            box-sizing: border-box;
            width: max-content;
            height: 100%;
            padding: 0 12px;
            margin: 0 13px;
            font-size: 16px;
            font-weight: bolder;
            text-align: center;
            color: #333;
            cursor: pointer;
            .tab-name {
                font-size: 16px;
                line-height: 96px;
                &.only-one-tab-name {
                    line-height: 80px;
                    font-weight: 800;
                    color: #1ab394;
                }
            }
            .tab-link {
                display: block;
                width: 100%;
                height: 100%;
                text-decoration: none;
                color: #333;
            }
            &.pitch-on-tab {
                border-bottom: 3px solid #1ab394;
                color: #1ab394;
            }
            &.only-one-tab {
                margin: 0;
                padding: 0;
            }
        }
    }
}
</style>
