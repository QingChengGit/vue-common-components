<template>
    <div class="footer">
        <div class="footer-content-wrapper">
            <div class="relative-link">
                <a class="link-item" target="_blank" href="http://www.yunnex.com">掌贝官网</a>
                <span class="split-line"></span>
                <a class="link-item" target="_blank" href="http://help.yunnex.com">客户服务中心</a>
            </div>
            <div class="copy-right">
                {{copyRight}}
            </div>
        </div>
    </div>
</template>

<style lang="less">
    .footer {
        height: 90px;
        margin-top: 42px;
        padding: 0;
        color: #fff;
        background-color: #1E1A28;
        text-align: center;
        clear: both;
        zoom: 1;
        &:after {
            display: inline-block;
            content: '';
            width: 0;
            height: 100%;
            font-size: 0;
            vertical-align: middle;
        }
        .footer-content-wrapper {
            display: inline-block;
            width: 1310px;
            vertical-align: middle;
        }
        .relative-link {
            margin-bottom: 16px;
            font-size: 13px;
            text-align: center;
        }
        .relative-link, .copy-right {
            line-height: 1;
        }
        .link-item {
            color: #fff;
        }
        .split-line {
            display: inline-block;
            width: 0;
            height: 13px;
            padding-right: 8px;
            border-right: 1px solid #979797;
            font-size: 0;
            vertical-align: middle;
        }
        .copy-right {
            margin: 0;
            font-size: 12px;
            text-align: center;
        }
    }
</style>
<script>
    module.exports = {
        props: {
            copyRight: {
                type: String,
                required: true
            }
        }
    };
</script>