<template>
    <div class="page-top-area">
        <div class="top-bar">
            <div class="top-bar-wrap">
                <a class="top-area-item" @mouseover="showUserInfoDetail" @mouseout="hideUserInfoDetail">
                    <span class="top-area-item" :class="{'cursor-pointer': isShop}">
                        <span class="user-brief">
                             {{storeInfo.key + '：'}}
                             <span class="user-name">
                             {{storeInfo.val}}
                            </span>
                            <ul class="user-detail-ul" @mouseover="showUserInfoDetail" @mouseout="hideUserInfoDetail" v-if="isShop">
                                <li class="user-info-item">
                                    <div class="dropdown profile-element">
                                        <span>
                                            <img class="img-circle" :src="userInfo.shop.headImg">
                                        </span>
                                        <!-- 商户总部登录时 -->
                                        <a class="user-information" :href="userInfo.shopInfoUrl + '/syscfg/shanghu/show'">
                                            <span class="clear">
                                                <div class="user-tel">{{userInfo.shop.account}}</div>
                                                <div class="user-detail-name">{{userInfo.shop.name}}</div>
                                            </span>
                                        </a>
                                    </div>
                                </li>
                                <li class="user-info-item" v-for="info in userInfo.detailList">
                                    <a class="item-link" :href="info.url">
                                        <div class="item-left">
                                            <i :class="[info.icon]"></i>
                                            <span class="item-name">{{info.name}}</span>
                                        </div>
                                        <div class="item-right">
                                            <span class="item-value">{{info.val}}</span>
                                            <i class="right-arrow icon-right-arrow"></i>
                                        </div>
                                    </a>
                                </li>
                                <li class="user-info-item" @click="logout" v-if="isShop">
                                    <a class="item-link" href="javascript:(void 0);">
                                        <div class="item-left">
                                            <i class="icon-exit"></i>
                                            <span class="item-name">退出</span>
                                        </div>
                                        <div class="item-right">
                                            <span class="item-value"></span>
                                            <i class="right-arrow icon-right-arrow"></i>
                                        </div>
                                    </a>
                                </li>
                            </ul>
                        </span>
                        <i class="icon-drag-down" v-if="isShop"></i>
                    </span>
                </a>

                <!--商户概况(商户登陆才会显示该链接)-->
                <a class="top-area-item" target="_blank" :href="domainName + '/saofu-shop-shop/common/asynexport-record'">
                    <i class="icon-export"></i>
                    <span class="top-item-text">导出结果</span>
                </a>
                <a class="top-area-item message-center" :href="userInfo.shopInfoUrl + '/shop_message/shop_message_list'"
                   target="_blank" v-if="isShop && userInfo.hasPackageExpire">
                    <i class="icon-message"></i>
                    <span class="top-item-text unread-message" v-if="userInfo.unreadMessageCount">
                        {{userInfo.unreadMessageCount}}
                    </span>
                    <span class="top-item-text">消息中心</span>
                </a>
                <a class="top-area-item j-help-center" href="javascript:void(0);" @click="showCustomerServicePop">
                    <span class="top-item-text">帮助中心</span>
                </a>
                <a class="top-area-item" :class="{'last-top-area-item': isShop}" :href="domainName + '/saofu-shop-shop/switch'">
                    <span class="top-item-text">切换旧版菜单</span>
                </a>
                <a class="top-area-item last-top-area-item" v-if="!isShop" @click="logout"
                   href="javascript:(void 0);">
                    <i class="icon-exit"></i>
                    <span class="top-item-text">退出</span>
                </a>
            </div>
        </div>
        <nav class="navbar-static-top">
            <div class="navbar-static-top-wrap">
                <div class="navbar-header">
                    <a class="logo" :style="{background: 'url(\'' + userInfo.logoUrl + '\')no-repeat'}">掌贝 顾客大数据.智能营销平台</a>
                </div>
                <ul class="navbar-right">
                    <li @click="jumpPage">
                        <!-- 横向一级菜单 -->
                        <div class="top-menu-item" :class="{'top-menu-selected': menu.isActive}"
                             v-for="menu in menuList" :target="menu.target" :menu-uri="menu.jumpUrl">
                            {{menu.name}}
                        </div>
                    </li>
                </ul>
                <!--  功能目录入口  -->
                <div v-if="isShowFunctionDirectory" class="function-directory">
                    <span class="tag function-btn" @click="functionDirectoryLink">功能目录</span>
                </div>
            </div>
        </nav>
        <!-- 客服系统弹框 -->
        <div class="service-pop-wrap" v-show="isShowCustomerServicePop">
            <div class="service-mask"></div>
            <div class="service-pop">
                <h2 class="service-title">掌贝客服系统</h2>
                <a class="btn-contact-us" href="javascript:void(0);" @click="goUserCustomerService">
                    <span class="contact-us-icon"></span>在线咨询</a>
                <!--<#if Session.supportPhone != null>
                    <p>或致电 ${Session.supportDesk}：${Session.supportPhone}</p>
                </#if>-->
                <span class="btn-close-service" @click="closeCustomerServicePop">×</span>
            </div>
        </div>
    </div>
</template>

<style lang="less">
    .page-top-area {
        margin-bottom: 30px;
        .top-bar {
            position: relative;
            z-index: 1001;
            height: 30px;
            line-height: 30px;
            font-size: 0;
            color: #F3F3F5;
            background-color: #1E1A28;
        }
        .top-bar-wrap {
            width: 1318px;
            margin: 0 auto;
            text-align: right;
        }
        .top-area-item {
            display: inline-block;
            margin-left: 30px;
            font-size: 0;
            color: #F3F3F5;
            vertical-align: middle;
        }
        .last-top-area-item {
            margin-right: 15px;
        }
        .user-brief {
            position: relative;
            display: inline-block;
            margin-right: 6px;
            font-size: 12px;
            vertical-align: middle;
        }
        .user-name {
            display: inline;
            color: #F3F3F5;
            vertical-align: baseline;
        }
        .top-item-text {
            display: inline;
            margin-left:3px;
            font-size: 12px;
            vertical-align: middle;
        }
        .message-center {
            position: relative;
        }
        .unread-message {
            position: absolute;
            top: 2px;
            right: -20px;
            line-height: 1;
            padding: 3px 8px;
            -webkit-border-radius: 5px;
            -moz-border-radius: 5px;
            border-radius: 5px;
            font-size: 10px;
            font-weight: 500;
            color: #fff;
            background-color: #e60012;
        }
        .user-detail-ul {
            display: none;
            position: absolute;
            right: -154px;
            top: 30px;
            padding: 0;
            margin: 0;
            width: 276px;
            z-index: 4;
            background-color: #fff;
            border: 1px solid #eee;
            &:before {
                content: '';
                position: absolute;
                left: 50%;
                top: -7.5px;
                margin-left: -7.5px;
                font-size: 0;
                border-bottom: 15px solid #fff;
                border-left: 7.5px solid transparent;
                border-right: 7.5px solid transparent;
            }
        }
        .user-info-item {
            border-bottom: 1px solid #eee;
            list-style: none;
        }
        .profile-element {
            position: relative;
            height: 70px;
            line-height: 70px;
            margin-left: 20px;
            text-align: left;
        }
        .img-circle {
            height: 52px;
            width: 52px;
            border-radius: 50%;
            border: 1px solid #ccc;
            vertical-align: middle;
        }
        .user-information {
            display: inline-block;
            margin-left: 10px;
            vertical-align: middle;
        }
        .user-tel {
            line-height: 1;
            margin: 0;
            font-weight: 600;
            color: #333;
        }
        .user-detail-name {
            line-height: 1;
            margin-top: 8px;
            color: #888;
        }
        .item-link {
            position: relative;
            display: block;
            height: 46px;
            &:hover {
                color: #333;
                background-color: #eee;
            }
        }
        .item-left, .item-right {
            position: absolute;
            top: 50%;
            height: 30px;
            line-height: 30px;
            margin-top: -15px;
        }
        .item-left {
            left: 20px;
        }
        .item-right {
            right: 20px;
            padding-right: 13px;
        }
        .item-name {
            margin-left: 8px;
            color: #333;
        }
        .item-value {
            margin-right: 8px;
            color: #1AB394;
        }
        .right-arrow {
            position: absolute;
            right: 0;
            top: 50%;
            margin-top: -5px;
        }
        .navbar-static-top {
            height: 80px;
            background-color: #fff;
        }
        .navbar-static-top-wrap {
            position: relative;
            width: 1318px;
            margin: 0 auto;
            font-size: 0;
            white-space: nowrap;
        }
        .function-directory {
            position: absolute;
            right: 0;
            top: 50%;
            transform: translate(0, -50%);
            .function-btn {
                color: #1AB394;
                font-size: 16px;
                border-color: #1ab394;
                cursor: pointer;
                &:hover {
                    background-color: #1ab394;
                    color: #fff;
                }
            }
        }
        .navbar-header, .navbar-right {
            position: static;
            display: inline-block;
            font-size: 0;
            vertical-align: middle;
        }
        .navbar-right {
            margin-left: 140px;
        }
        .top-menu-item {
            display: inline-block;
            width: 94px;
            height: 80px;
            line-height: 80px;
            margin-right: 24px;
            font-size: 16px;
            color: #333;
            text-align: center;
            cursor: pointer;
            &:hover {
                color: #1ab394;
                background-color: #f2fbf9;
            }
        }
        .top-menu-selected {
            position: relative;
            color: #1ab394;
            &:after {
                position: absolute;
                left: 0;
                bottom: 0;
                content: '';
                width: 100%;
                height: 3px;
                font-size: 0;
                background-color: #1ab394;
            }
        }
        .logo {
            position: relative;
            top: -5px;
            display: inline-block;
            width: 270px;
            height: 24px;
            margin: 10px 10px 0 0;
            cursor: default;
        }
        .service-pop-wrap {
            .service-mask{
                position: fixed;
                top: 0;
                left: 0;
                z-index: 10001;
                width: 100%;
                height: 100%;
                background-color: #000;
                filter: alpha(opacity=60);
                background: rgba(0, 0, 0, .6);
            }
            .service-pop {
                position: fixed;
                top: 50%;
                left: 50%;
                z-index: 10002;
                width: 400px;
                overflow: hidden;
                margin: -220px 0 0 -200px;
                font: normal 18px/20px 'Microsoft YaHei';
                color: #fff;
                text-align: center;
                background-color: #fff;
                border-radius: 10px;
            }
            .service-title{
                width: 100%;
                height: 240px;
                padding-top: 190px;
                margin: 0;
                font: normal 18px/20px 'Microsoft YaHei';
                background: #42a9f7 url('../../images/common/service.png') no-repeat center 43px;
            }
            .btn-contact-us {
                display: block;
                width: 265px;
                height: 50px;
                margin: 35px auto;
                text-align: center;
                color: #fff;
                line-height: 50px;
                text-decoration: none;
                background-color: #42a9f7;
                border-radius: 25px;
                -webkit-transition: all .12s linear;
                -moz-transition: all .12s linear;
                -ms-transition: all .12s linear;
                transition: all .12s linear;
            }
            .btn-contact-us:hover, .btn-contact-us:focus{
                text-decoration: none;
                color: #fff;
                background-color: #1a95ef;
            }
            .contact-us-icon {
                position: relative;
                top: 4px;
                display: inline-block;
                width: 21px;
                height: 21px;
                margin-right: 8px;
                background: url('../../images/common/icon_service.png') no-repeat 0 -86px;
            }
            .service-pop p {
                margin-bottom: 60px;
                color: #42a9f7;
            }
            .btn-close-service {
                position: absolute;
                top: 20px;
                right: 20px;
                display: block;
                width: 16px;
                height: 16px;
                color: #fff;
                font: normal 24px/16px 'Microsoft YaHei';
                cursor: pointer;
                -webkit-transition: all .12s linear;
                -moz-transition: all .12s linear;
                -ms-transition: all .12s linear;
                transition: all .12s linear;
            }
            .btn-close-service:hover {
                -webkit-transform:translateY(-2px);
                -moz-transform:translateY(-2px);
                -ms-transform:translateY(-2px);
                transform:translateY(-2px);
                color: #e3effb;
            }
        }
    }
</style>

<script>
    var dom = require('common/js/dom'),
        util = require('common/js/util'),
        axios = require('libs/axios-proxy');

    module.exports = {
        data: function() {
        	return {
				isShowCustomerServicePop: false,
                isShowFunctionDirectory: false
            };
        },
        props: {
            menuList: {
                type: Array,
                required: true
            },
            userInfo: {
                type: Object,
                required: true
            },
	        domainName: {
            	type: String
            }
        },
        computed: {
            storeInfo: function() {
                var rs = {
                    key: '',
                    val: ''
                };
                if(this.userInfo.isShopBranch){
                    rs.key = '门店名称';
                    rs.val = this.userInfo.shopBranch.name;
                }else if(this.userInfo.shopSubGroup){
                    rs.key = '分公司名称';
                    rs.val = this.userInfo.shopSubGroup.name;
                }else{
                    rs.key = '商户名称';
                    rs.val = this.userInfo.shop.name;
                }

                return rs;
            },
            isShop: function() {
                return !this.userInfo.shopBranch && !this.userInfo.shopSubGroup;
            }
        },
        mounted () {
            this.getShowFunctionDirectory();
        },
        methods: {
            showUserInfoDetail: function() {
                dom.show(document.querySelector('.user-detail-ul'));
            },
            hideUserInfoDetail: function() {
                dom.hide(document.querySelector('.user-detail-ul'));
            },
            jumpPage: function(evt) {
                var target = evt.target,
                    uri = target.getAttribute('menu-uri');

                    localStorage.setItem('curURI', util.getUrlInfo(uri).pathname.replace(/\/[^\/]+(\/[^\/]+?.*)/, '$1'));
                    if (target.getAttribute('target') === '_blank') {
                        window.open(uri);
                    } else {
                        window.location.href = uri;
                    }
            },
            logout: function() {
                var self = this,
                    domain = self.domainName || '',
                    response;

                axios.post(domain + '/saofu-shop-shop/logout', {}).then(function(res) {
                    response = res.data;
                    if(response.success){
                        window.location.href = '/shpt-frontend/login/html/index/login.html';
                    }else{
                        console.log('调用退出登录接口失败:' + response.message);
                    }
                });
            },
			showCustomerServicePop: function() {
				this.isShowCustomerServicePop = true;
            },
			closeCustomerServicePop: function() {
            	this.isShowCustomerServicePop = false;
            },
			goUserCustomerService: function() {
				this.isShowCustomerServicePop = false;
				window.open('https://yunnex.qiyukf.com/client?k=12e245a5ec4db1934e3835a673bb4965&wp=1&' +
                    'gid=408357&robotShuntSwitch=1', '联系我们', 'width=800,height=600,top=50,toolbar=no,' +
                    'menubar=no,scrollbars=no, resizable=no,location=no, status=no');
            },
            // 请求是否显示功能目录入口
            getShowFunctionDirectory () {
                let _this = this;
                axios.get('/saofu-shop-shop/shopFunction/isShowShopFunction')
                    .then(res => {
                        if (res.data.code === '0') {
                            _this.isShowFunctionDirectory = res.data.attach;
                        }
                    })
            },
            functionDirectoryLink () {
                location.href = "/shpt-frontend/saofu-shop-shop/html/visualization/functional-directory.html";
            }

        }
    };
</script>