<template>
    <div class="crumbs-header">
        <div class="crumbs-icon" @click="prevCrumbs"></div>
        <ul class="crumbs-list">
            <li v-for="(item, index) in crumbsList" :key="index" class="crumbs-option" :class="{'last-crumbs': index == crumbsList.length - 1}">
                <span v-show="index != 0">/</span>
                <span class="crumbs-name" :class="{'move-crumbs': optionNum == index}" @click="pitchOnCruumbs(item, index)" @mousemove="moveCrumbs(index)" @mouseleave="leaveCrumbs(index)">{{item.name}}</span>
            </li>
        </ul>
    </div>
</template>

<script>

export default {
    props: {
        'crumbsList': {
            type: Array,
            required: true
        }
    },
    data() {
        return {
            optionNum: -1,
        }
    },
    methods: {
        moveCrumbs (index) {
            if (index != this.crumbsList.length - 1) {
                this.optionNum = index;
            } else {
                this.optionNum = -1;
            }
        },
        leaveCrumbs (index) {
            this.optionNum = -1;
        },
        pitchOnCruumbs(item, index) {
            if (index == this.crumbsList.length - 1) {
                return;
            } else {
                if (!item.href) {
                    this.$emit('crumbs-link', item.id);
                } else {
                    location.href = item.href;
                    return;
                }
            }
        },
        prevCrumbs () {
            var crumbsOption = this.crumbsList[this.crumbsList.length - 2];
            if (!crumbsOption.href) {
                this.$emit('crumbs-link', crumbsOption.id);
            } else {
                location.href = crumbsOption.href;
            }
        }
    }
}
</script>

<style scoped lang="scss">

.crumbs-header {
    box-sizing: border-box;
    position: relative;
    height: 80px;
    padding-left: 40px;
    margin: 0 -40px;
    border-bottom: 1px solid #d7d7d7;
    &::after {
        content: "";
        display: block;
        clear: both;
        visibility: hidden;
        height: 0;
    }
    .crumbs-icon {
        position: absolute;
        top: 50%;
        width: 24px;
        height: 24px;
        transform: translate(0, -50%);
        -ms-transform: translate(0, -50%);
        border: 1px solid #1ab394;
        border-radius: 50%;
        cursor: pointer;
        &::after {
            content: '';
            display: block;
            position: absolute;
            top: 50%;
            left: 8px;
            width: 10px;
            height: 10px;
            margin-top: -5px;
            border-left: 1px solid #1ab394;
            border-top: 1px solid #1ab394;
            transform: rotate(-45deg);
        }
    }
    .crumbs-list {
        float: left;
        margin-left: 30px;
        list-style: none;
        &::after {
            content: "";
            display: block;
            clear: both;
            visibility: hidden;
            height: 0;
        }
        .crumbs-option {
            float: left;
            box-sizing: border-box;
            width: max-content;
            padding: 0 3px;
            font-size: 16px;
            text-align: center;
            color: #1ab394;
            cursor: pointer;
            &.last-crumbs {
                color: #666;
            }
            .crumbs-name {
                margin-left: 1px;
                line-height: 80px;
                &.move-crumbs {
                    text-decoration: underline;
                }
            }
        }
    }
}
</style>
