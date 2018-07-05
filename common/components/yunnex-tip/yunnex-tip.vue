<template>
    <div class="yunnex-tip-component dib" @mouseenter="enter" @mouseleave="leave">

        <slot></slot>

        <div class="yunnex-tip-content" :class="[activeClass,showClass]" v-html="tipContent" :style="{maxWidth: tipMaxWidth+'px'}">
        </div>
    </div>
</template>

<script>
    module.exports = {
        props: ['content','maxWidth','position'],
        data() {
            return {
                tipShow: false,
                tipMaxWidth: this.maxWidth ? this.maxWidth : 320
            }  
        },
        computed: {
            tipContent() {
                return this.content;
            },
            activeClass() {
                return this.position ? 'yunnex-tip-content-'+this.position : 'yunnex-tip-content-bottom';
            },
            showClass() {
                return this.tipShow && this.content ? 'yunnex-tip-show' : 'yunnex-tip-hide';
            }
        },
        methods: {
            enter( event ) {   

                this.$emit('on-mouseenter');

                var position = this.position;

                this.getPosition(event,position);
            },
            leave() {

                this.$emit('on-mouseleave');

                this.tipShow = false;
            },
            getPosition(event , position) {   

                this.$nextTick(function(){  //数据更新到dom的回调

                    var tipElement = event.target.lastElementChild,
                        eventWidth = event.target.offsetWidth,
                        eventHeight = event.target.offsetHeight,
                        offsetHeight = tipElement.offsetHeight;  

                    switch( position ) {

                        case 'top' :
                            tipElement.style.bottom = (eventHeight+10) +'px';
	                        tipElement.style.left = '-16px';
                            break;
                        case 'bottom' :
                            tipElement.style.top = (eventHeight+ 10)+'px';
	                        tipElement.style.left = '-16px';
                            break;
                        case 'right' :
                            tipElement.style.left = (eventWidth+10) + 'px';
                            tipElement.style.top = -(offsetHeight/2-10) + 'px';
                            break;
                        case 'left' :
                            tipElement.style.right =  (eventWidth+10)  + 'px';
                            tipElement.style.top = -(offsetHeight/2-10) + 'px';
                            break;
                            
                    }  

                    this.tipShow = true;  
                })  
            }
        }
    }
</script>

<style scoped lang="scss">

    .yunnex-tip-component {
        position: relative;
        box-sizing:border-box;
        .yunnex-tip-defalut {
            position: relative;
            font: 13px/22px normal;
            display: inline-block;
            cursor: pointer;
        }
        .yunnex-tip-question {
            width: 18px;
            height: 18px;
            display: inline-block;
            cursor: pointer;
            background: url("../../images/icons/yunnex-tip/question.png") center no-repeat;
            position: relative;
        }
        .yunnex-tip-content {
            width: max-content;
            width: -moz-max-content;
            font: 13px/24px normal;
            padding: 16px;
            background-color: #fff;
            border-radius: 2px;
            border: 1px solid #f8ac59;
            position: absolute;
            z-index: 9998;
        }
        .yunnex-hack {
            display: inline-block;
            white-space:nowrap;
        }
        .defalutCss {
            content: '';
            width: 0;
            height: 0;
            position: absolute;
            border: 9px solid transparent;
        }
        .yunnex-tip-hide {
            visibility: hidden;
        }

        .yunnex-tip-show {
            visibility: visible;
        }
        .yunnex-tip-content-bottom {
            &:before {
                @extend .defalutCss;
                border-bottom-color: #f8ac59;
                left: 5%;
                top: -18px;
            }
            &:after {
                @extend .defalutCss;
                border-bottom-color: #fff;
                left: 5%;
                top: -17px;
            }
        }
        .yunnex-tip-content-top {
            &:before {
                @extend .defalutCss;
                border-top-color: #f8ac59;
                left: 5%;
                bottom: -18px;
            }
            &:after {
                @extend .defalutCss;
                border-top-color: #fff;
                left: 5%;
                bottom: -17px;
            }
        }
        .yunnex-tip-content-right {
            &:before {
                @extend .defalutCss;
                border-right-color: #f8ac59;
                left: -18px;
                top: 50%;
                margin-top: -9px;
            }
            &:after {
                @extend .defalutCss;
                border-right-color: #fff;
                left: -17px;
                top: 50%;
                margin-top: -9px;
            }
        }
        .yunnex-tip-content-left {
            &:before {
                @extend .defalutCss;
                border-left-color: #f8ac59;
                right: -18px;
                top: 50%;
                margin-top: -9px;
            }
            &:after {
                @extend .defalutCss;
                border-left-color: #fff;
                right: -17px;
                top: 50%;
                margin-top: -9px;
            }
        }
    }
    .dib {
        display: inline-block;
        cursor: pointer;
    }
</style>