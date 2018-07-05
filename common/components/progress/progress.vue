<template>
    <div class="yunnex-progress-component">
        <div class="progress-item" v-for="(item, index) in progressData" v-if="progressData.length">
            <div class="progress-line" v-if="index !== 0" :class="getProgressBgColorClass(item.status)"></div>
            <div class="progress-node" :class="getProgressNodeClass(item.status)">{{index + 1}}</div>
            <p class="progress-node-name" :class="getProgressColorClass(item.status)">{{item.name}}</p>
            <p class="progress-node-desc">{{item.desc}}</p>
        </div>
    </div>
</template>

<style lang="less">
.yunnex-progress-component {
    font-size: 0;
    .progress-item {
        position: relative;
        display: inline-block;
        width: 156px;
        margin-right: 120px;
        text-align: center;
        vertical-align: top;
        &:last-child {
            margin-right: 0;
        }
    }
    .progress-node {
        margin-bottom: 14px;
    }
    .progress-node-name {
        line-height: 1;
        margin-bottom: 8px;
        font-size: 14px;
    }
    .progress-node-desc {
        line-height: 21px;
        font-size: 13px;
        color: #999;
    }
    .progress-line {
        position: absolute;
        top: 18px;
        left: -177px;
        width: 234px;
        height: 4px;
    }
    .progress-gray-circle {
        display: inline-block;
        width: 42px;
        height: 42px;
        line-height: 42px;
        -webkit-border-radius: 21px;
        -moz-border-radius: 21px;
        border-radius: 21px;
        font-size: 25px;
        color: #fff;
        background-color: #ccc;
        text-align: center;
    }
    .progress-bg-green {
        background-color: #1ab394;
    }
    .progress-bg-yellow {
        background-color: #f8ac59;
    }
    .progress-bg-gray {
        background-color: #e5e5e5;
    }
    .progress-black {
        color: #333;
    }
    .progress-green {
        color: #1ab394;
    }
    .progress-yellow {
        color: #f8ac59;
    }
}
</style>

<script>
    var spriteCss = require('common/styles/progress-sprite.css');

    module.exports = {
        props: {
            /*
             progressData
            */
            progressData: {
                type: Array,
                required: true
            }
        },
        methods: {
            getProgressNodeClass: function(status) {
                if(status === 'complete') {
                    return 'icon-complete';
                }
                if(status === 'dealing') {
                    return 'icon-wait';
                }
                return 'progress-gray-circle';
            },
            getProgressColorClass: function(status) {
                if(status === 'complete') {
                    return 'progress-green';
                }
                if(status === 'dealing') {
                    return 'progress-yellow';
                }
                return 'progress-black';
            },
            getProgressBgColorClass: function(status) {
                if(status === 'complete') {
                    return 'progress-bg-green';
                }
                if(status === 'dealing') {
                    return 'progress-bg-yellow';
                }
                return 'progress-bg-gray';
            }
        }
    };
</script>