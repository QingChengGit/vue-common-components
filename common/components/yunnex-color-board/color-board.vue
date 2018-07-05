<template>
<div class="yunnex-color-board-component" @click="selectColor">
    <span class="color-item" :style="{backgroundColor: item.color}"
          :class="{'selected-color-item': item.selected, 'icon-select': item.selected}"
          v-for="item in innerColors"></span>
</div>
</template>

<style lang="scss">
.yunnex-color-board-component {
    font-size: 0;
    .selected-color-item {
        background-position: 50% 50%;
        background-repeat: no-repeat;
    }
    .color-item {
        display: inline-block;
        width: 34px;
        height: 34px;
        cursor: pointer;
        vertical-align: middle;
    }
}
</style>

<script>
    var sprite = require('common/styles/yunnex-color-board-sprite.css');

    module.exports = {
        data: function() {
            return {
                selectedIndex: 0
            };
        },
        props: {
            colors: {
                type: Array,
                default: ['#a9d92d', '#63b359', '#2c9f67', '#509fc9', '#5885cf', '#9062c0', '#d09a45',
                    '#e4b138', '#ee903c', '#f08500', '#dd6549', '#cc463d', '#cf3e36', '#5E6671']
            },
            curColor: {
                type: String
            },
            disabled: {
            	type: Boolean,
                default: false
            }
        },
        computed: {
            innerColors: function() {
                var len = this.colors.length,
                    arr = [];

                while(len--) {
                    if(typeof this.curColor !== 'undefined' && this.colors[len] === this.curColor) {
                        this.selectedIndex = len;
                        this.$emit('input', this.colors[len]);
                        arr.unshift({color: this.colors[len], selected: true});
                    } else {
                        arr.unshift({color: this.colors[len]});
                    }
                }

                return arr;
            }
        },
        methods: {
            selectColor: function(e) {
                var index,
                    target = e.target;

                if(this.disabled) {
                	return;
                }
                index = Array.prototype.slice.call(this.$el.querySelectorAll('.color-item')).indexOf(target);
                if(index >= 0 && index < this.innerColors.length) {
                    delete this.innerColors[this.selectedIndex].selected;
                    this.selectedIndex = index;
                    this.$set(this.innerColors[index], 'selected', true);
                    this.$forceUpdate();
                    this.$emit('input', this.innerColors[index].color);
                }
            }
        }
    };
</script>