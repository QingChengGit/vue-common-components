<template>
    <div class="container" :class="pageClass">
        <frame-header :menu-list="topMenu" :user-info="userInfo"></frame-header>
        <div class="content-wrap">
            <frame-left :left-menu="leftMenu"></frame-left>
            <div class="body-content">
                <slot name="body-content"></slot>
            </div>
        </div>
        <frame-footer :copy-right="copyRight"></frame-footer>
    </div>
</template>

<style lang="less">
    .container {
        background-color: #f3f3f4;
        .content-wrap {
            width: 1318px;
            margin: 0 auto;
            padding: 0;
            font-size: 0;
        }
        .body-content {
            display: inline-block;
            width: 1124px;
            min-height: 960px;
            padding: 0 0 40px;
            font-size: 12px;
            background-color: #fff;
        }
        .ac {
            text-align: center;
        }
    }
</style>

<script>
    var head = require('./header'),
        left = require('./left-menu'),
        footer = require('./footer'),
        axios = require('libs/axios-proxy'),
        jsonp = require('libs/jsonp'),
        reset = require('common/styles/reset.css'),
        common = require('common/styles/common.less'),
        font = require('common/styles/font-awesome.css'),
        sprite = require('common/styles/frame-work-sprite.css');

    function transformTopMenu(menu) {
        var rs = {};

        rs.isActive = menu.active;
        rs.target = menu.target;
        rs.jumpUrl = menu.url;
        rs.name = menu.name;

        return rs;
    }
    module.exports = {
        data: function() {
            var self = this,
                detailList = [
                    {name: '商家套餐', url: '/saofu-shop-shop/syscfg/overview/shanghu-overview', val: '商户概况', icon: 'icon-package'},
                    {name: '我的SIM卡', url: '/saofu-shop-shop/syscfg/overview/shanghu-overview', val: self.simCard + '张可用', icon: 'icon-sim-card'}
                ];

            return {
                leftMenu: {
                    curTopMenuName: '',
                    list: []
                },
                topMenu: [],
                userInfo: {
                    shopBranch: null,
                    shopSubGroup: null,
                    shop: {
                        logoUrl: '',
                        tel: '',
                        name: ''
                    },
                    shopInfoUrl: '',
                    detailList: detailList,
                    hasBeibaoPermission: false,
                    hasPackageExpire: false
                },
                copyRight: ''
            };
        },
        props: {
            pageClass: {
                type: String
            }
        },
        components: {
            'frame-header': head,
            'frame-left': left,
            'frame-footer': footer
        },
        created: function() {
            var self = this,
                response,
                datas,
                l,
                topMenu,
                targetUri;

            targetUri = localStorage.getItem('curURI') || '/home';
            axios.post('/saofu-shop-shop/menu/list', {
                uri: targetUri
            }).then(function(res) {
                response = res.data;
                datas = response.attach;
                if(response.success){
                    l = datas.length;
                    while(l--) {
                        topMenu = transformTopMenu(datas[l]);
                        self.topMenu.unshift(topMenu);
                        if(datas[l].active && datas[l].subMenus) {
                            self.leftMenu.list = datas[l].subMenus;
                            self.leftMenu.curTopMenuName = topMenu.name;
                        }
                    }
                }else{
                    console.log(response.message);
                }
            });
            axios.post('/saofu-shop-shop/menu/top').then(function(res) {
                //获取用户信息
                response = res.data;
                datas = response.attach;
                if(response.success){
                    self.userInfo.detailList.splice(1, 0, {
                        name: '我的贝宝',
                        val: '0个贝宝',
                        url: '/saofu-shop-shop/marketingtool/web-paycenter',
                        icon: 'icon-paypal'
                    });
                    self.userInfo.shopBranch = datas.shopBranch;
                    self.userInfo.shopSubGroup = datas.shopSubGroup;
                    self.userInfo.detailList[0].val = datas.shopPackName || '商户概况';
                    self.userInfo.shopInfoUrl = datas.__saofu_shop_url;
                    self.userInfo.hasBeibaoPermission = datas.permissionBeibao;
                    self.userInfo.hasPackageExpire = datas.permissionPackageHasExpire;
                    if(datas.shop) {
                        self.userInfo.shop.logoUrl = datas.shop.logoUrl;
                        self.userInfo.shop.account = datas.shop.principal;
                        self.userInfo.shop.name = datas.shop.name;
                    }
                }
            }).then(function() {
                if(self.userInfo.hasBeibaoPermission){
                    jsonp('/saofu-shop-shop/syscfg/beibao/num', {
                        param: 'jsonpcallback'
                    }, function(err, res) {
                        //获取贝宝数量
                        if(res.success){
                            self.userInfo.detailList[1].val = res.attach + '个宝贝';
                        }
                    });
                }
                if(self.userInfo.shopBranch === null && self.userInfo.shopSubGroup === null){
                    jsonp('/saofu-shop-shop/syscfg/shopsim/num', {
                        param: 'jsonpcallback'
                    }, function(err, res) {
                        //获取sim卡数量
                        if(res.success){
                            self.userInfo.detailList[2].val = res.attach + '张可用';
                        }
                    });
                }
            });
            axios.post('/saofu-shop-shop/menu/footer').then(function(res) {
                if(res.data.success){
                    self.copyRight = res.data.attach.shopCopyright;
                }
            });
        }
    };
</script>