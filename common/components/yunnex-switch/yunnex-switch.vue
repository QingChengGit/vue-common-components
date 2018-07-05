
<template>
 
        <span class="yunnex-swicth" :class="{'yunnex-switch-checked': isOn,'yunnex-swicth-small':sizeClass}" @click="updateValue">
            <span class="yunnex-switch-inner" :class="{'yunnex-switch-small-inner': sizeClass}"></span>
        </span> 
         
</template>

<script>
    
    module.exports = {
        props: ['value','size'],
        data: function () {
            return {
                isOn: this.value,
                sizeClass: this.size == 'small' ? true : false
            }
        },
        methods: {
            updateValue: function () {
                this.isOn = !this.isOn;
                this.$emit('input',this.isOn);
                this.$emit('callback',this.isOn);
            }
        },
        watch: {
            value: function (newvalue,oldvalue) {
                this.isOn = newvalue;
            }
        }
    }

</script>

<style lang="scss">

    .yunnex-swicth {
        display: inline-block;
        width: 48px;
        height: 24px;
        line-height: 22px;
        border-radius: 24px;
        vertical-align: middle;
        border: 1px solid #d8d8d8;
        background-color: #fff;
        position: relative;
        cursor: pointer;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        transition: all .2s ease-in-out;

        &:after {
            content: '';
            box-sizing: border-box;
            width: 22px;
            height: 22px;
            border-radius: 22px;
            background-color: #fff;
            border: 1px solid #d8d8d8;
            position: absolute;
            left: 0;
            top: 0;
            cursor: pointer;
            transition: left .2s ease-in-out,width .2s ease-in-out;
        }      

        .yunnex-switch-inner {
            color: #fff;
            font-size: 12px;
            position: absolute;
            left: 25px;
        }     
    }   
    .yunnex-swicth.yunnex-switch-checked:after {
        left: 25px;
    }
    .yunnex-swicth-small {           
        display: inline-block;
        width: 42px; 
        height: 22px;      
        line-height: 22px;
        border-radius: 22px;
        vertical-align: middle;
        border: 1px solid #d8d8d8;
        background-color: #fff;
        position: relative;
        cursor: pointer;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        transition: all .2s ease-in-out;

        &:after {
            content: '';
            width: 20px;
            height: 20px;
            border-radius: 20px;
            background-color: #fff;
            border: 1px solid #d8d8d8;
            position: absolute;
            left: 0;
            top: 0;
            cursor: pointer;
            transition: left .2s ease-in-out,width .2s ease-in-out;
        } 

        .yunnex-switch-small-inner {
            color: #fff;
            font-size: 12px;
            position: absolute;
            left: 25px;
        }    
    }
    
    .yunnex-swicth-small.yunnex-switch-checked:after {
        left: 21px;
    }  
    
    .yunnex-switch-checked {
        background-color: #1ab394;
        border-color: #1ab394;
    }


</style>