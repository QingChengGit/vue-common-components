<template>
    <div class="tab-box">
        <ul class="tab-list">
            <li v-for="(item, index) in tableTabObj.tableTabList" :key="index" @click="tabOption(item, index)" class="tab-option" :class="{'pitch-on-tab': optionNum == item.id}">
                <span class="tab-name">{{item.name}}</span>
            </li>
        </ul>
        <div class="right-line"></div>
    </div>
</template>

<script>

export default {
    props: {
        'tableTabObj': {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            optionNum: this.tableTabObj.optionNum,
        }
    },
    methods: {
        tabOption(item, index) {
            this.optionNum = item.id;
            if (!item.href) {
                this.$emit('table-tab-option', item.id);
            } else {
                location.href = item.href;
                return;
            }
        }
    }
}
</script>

<style scoped lang="scss">
.tab-box {
    width: 100%;
    height: 34px;
    &::after{
        content: "";
        display: block;
        clear: both;
        visibility: hidden;
        height: 0;
    }
    .tab-list {
        width: max-content;
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
            width: max-content;
            height: 100%;
            padding: 0 20px;
            text-align: center;
            border-top: 1px solid #d7d7d7;
            border-right: 1px solid #d7d7d7;
            background-color: #fff;
            color: #333;
            cursor: pointer;
            .tab-name {
                line-height: 34px;
            }
            &:nth-child(1) {
                border-left: 1px solid #d7d7d7;
            }
            &.pitch-on-tab {
                background-color: #1ab394;
                color: #fff;
            }
        }
    }
    .right-line {
        width: 100%;
        margin-top: -1px;
        border-bottom: 1px solid #d7d7d7;
    }
}
</style>
