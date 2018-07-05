<template>
<ul class="yunnex-left-menu-ul" @click="foldMenu">
    <li>
        <a class="top-menu-a menu-branch-a">
            <span class="top-menu-name menu-branch-label">{{leftMenu.curTopMenuName}}</span>
        </a>
    </li>
    <li v-for="(menu, index) in leftMenu.list">
        <!-- 有下级菜单时,当前二级菜单不需要生成链接 -->
        <a class="menu-branch-a" v-if="!menu.subMenus || !menu.subMenus.length"
           :class="{'menu-branch-selected': menu.active, 'last-menu-branch-a': index === leftMenu.list.length - 1}"
           :href="menu.server + menu.url.split(';')[0]" :target="menu.target">
            <i class="fa" :class="menu.icon"></i>
            <span class="menu-branch-label">{{menu.name}}</span>
            <span class="new-menu-tip-span" v-if="menu.flag === 'new'">新</span>
         </a>
        <a class="js_brach_menu menu-branch-a" v-else :class="{'last-menu-branch-a': index === leftMenu.list.length - 1}">
            <i class="fa" :class="menu.icon"></i>
            <span class="menu-branch-label">{{menu.name}}</span>
            <span v-if="menu.flag !== 'new'" class='js_menu_arrow menu-arrow arrow-down'></span>
            <span class="new-menu-tip-span" v-else>新</span>
        </a>
        <ul v-if="menu.subMenus && menu.subMenus.length" class="js_second_menu_ul yunnex-left-second-menu-ul"
            :server="menu.subMenus.server">
            <li v-for="childMenu in menu.subMenus">
                <a class="menu-leaf-a" :class="{'leaf-selected': childMenu.active}" :href="childMenu.server + childMenu.url.split(';')[0]"
                   :target="childMenu.target">
                    {{childMenu.name}}
                    <span v-if="childMenu.flag === 'new'" class="new-menu-tip-span">新</span>
                </a>
            </li>
        </ul>
    </li>
</ul>
</template>

<style lang="less">
    .border-box {
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
    }
    .yunnex-left-menu-ul {
        display: inline-block;
        position: static;
        margin-right: 14px;
        background-color: #fff;
        vertical-align: top;
        > li {
            margin: 0;
            padding: 0;
            list-style: none;
            white-space: nowrap;
        }
        .yunnex-left-second-menu-ul {
            display: none;
        }
        .menu-branch-a {
            position: relative;
            display: block;
            width: 180px;
            height: 54px;
            line-height: 54px;
            padding: 0 18px;
            border-top: 1px solid #eee;
            font-size: 14px;
            color: #333;
            text-decoration: none;
            .border-box;
        }
        .fa {
            width: 19px;
            color: #999;
        }
        .last-menu-branch-a {
            border-bottom: 1px solid #eee;
        }
        .top-menu-a {
            height: 56px;
            line-height: 56px;
        }
        .menu-branch-a:hover, .menu-leaf-a:hover {
            background-color: #f2fbf9;
            color: #1ab394;
            cursor: pointer;
        }
        .menu-branch-selected {
            .fa {
                color: #fff;
            }
        }
        .menu-branch-a:hover {
            .fa {
                color: #1ab394;
            }
        }
        .top-menu-a:hover {
            background-color: #fff;
            cursor: auto;
        }
        .menu-branch-label {
            display: inline-block;
            width: 100px;
            line-height: 54px;
            -ms-text-overflow: ellipsis;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
            vertical-align: top;
        }
        .top-menu-name {
            padding-left: 2px;
            font-size: 16px;
            color: #333;
        }
        .menu-leaf-a {
            position: relative;
            display: block;
            height: 34px;
            line-height: 34px;
            padding: 0 18px 0 40px;
            font-size: 14px;
            color: #999;
            text-decoration: none;
        }
        .menu-branch-selected, .leaf-selected {
            color: #fff;
            background-color: #1AB394;
        }
        .new-menu-tip-span {
            position: absolute;
            right: 10px;
            top: 50%;
            line-height: 18px;
            padding: 3px 8px;
            margin-top: -12px;
            font-size: 12px;
            font-weight: 500;
            color: #FFFFFF;
            background-color: #ed5565;
            text-align: center;
        }
        .arrow-down:after {
            content: "\f107";
        }
        .arrow-up:after {
            content: "\f106";
        }
        .menu-arrow {
            position: absolute;
            right: 18px;
            top: 50%;
            margin-top: -8px;
            font: normal normal normal 14px/1 FontAwesome;
            font-size: 18px;
            text-rendering: auto;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
        }
    }
</style>

<script>
    var util = require('../../js/util'),
        dom = require('../../js/dom');

    function storeClickedMenuPath(menuUrl) {
        var uri;

        if(!menuUrl){
            return;
        }
        uri = util.getUrlInfo(menuUrl).pathname.replace(/\/[^\/]+(\/[^\/]+?.*)/, '$1');
        localStorage.setItem('curURI', uri);
    }
    module.exports = {
        props: {
            leftMenu: {
                type: Object,
                required: true
            }
        },
        methods: {
            foldMenu: function(evt) {
                var target = evt.target,
                    childMenu,
                    effect = 'normal',
                    isShowAttributeName = 'second-menu-show',
                    targetClass = 'js_brach_menu',
                    selectedArrow,
                    element;

                element = dom.hasClass(target, targetClass) ? target : dom.parent(target);
                if (!element || !dom.hasClass(element, targetClass)) {
                    element && storeClickedMenuPath(element.getAttribute('href'));
                    return;
                }
                childMenu = dom.next(element);
                selectedArrow = dom.prev(childMenu).querySelector('.js_menu_arrow');
                if (childMenu.hasAttribute(isShowAttributeName)) {
                    dom.hide(childMenu);
                    if(selectedArrow) {
                        dom.removeClass(selectedArrow, 'arrow-up');
                        dom.addClass(selectedArrow, 'arrow-down');
                    }
                    childMenu.removeAttribute(isShowAttributeName);
                } else {
                    dom.show(childMenu);
                    if(selectedArrow) {
                        dom.removeClass(selectedArrow, 'arrow-down');
                        dom.addClass(selectedArrow, 'arrow-up');
                    }
                    childMenu.setAttribute(isShowAttributeName, '1');
                }
            }
        },
        updated: function() {
            var leftMenu = document.querySelector('.yunnex-left-menu-ul'),
                contentWrap = document.querySelector('.content-wrap'),
                content = document.querySelector('.body-content'),
                selectedLi = document.querySelector('.js_second_menu_ul .leaf-selected'),
                selectedUl,
                selectedArrow,
                timer;

            if (!leftMenu.querySelectorAll('li').length) {
                //没有左侧菜单时让内容区水平居中显示
                dom.addClass(contentWrap, 'ac');
            }
            timer = setTimeout(function checkMenuHeight() {
                if (leftMenu.offsetHeight < content.offsetHeight) {
                    //保证左侧菜单高度>=右侧内容区高度
                    dom.css(leftMenu, 'minHeight', content.offsetHeight + 'px');
                    timer = setTimeout(checkMenuHeight, 500);
                }else {
                    clearTimeout(timer);
                    timer = null;
                }
            }, 500);
            //自动展开已选中的菜单
            selectedUl = selectedLi && dom.parent(selectedLi, 'ul');
            selectedArrow = selectedUl && selectedUl.querySelector('.js_menu_arrow');
            if(selectedUl) {
                dom.show(selectedUl);
                selectedUl.setAttribute('second-menu-show', '1');
            }
            if (selectedArrow) {
                dom.removeClass(selectedArrow, 'arrow-down');
                dom.addClass(selectedArrow, 'arrow-up');
            }
        }
    };
</script>