webpackJsonp([5],{102:function(n,t){n.exports={render:function(){var n=this,t=n.$createElement,e=n._self._c||t;return e("pop",{attrs:{"dialog-config":n.dialogConfig}},[e("div",{slot:"dialog-content"},[n._t("pop-content")],2)])},staticRenderFns:[]}},104:function(n,t){n.exports={render:function(){var n=this,t=n.$createElement,e=n._self._c||t;return e("div",{staticClass:"page-demo-dialog"},[e("span",[n._v("我的名字:"+n._s(n.userName))]),n._v(" "),e("div",{staticClass:"yunnex-btn green-btn",on:{click:n.modifyUserName}},[n._v("修改")]),n._v(" "),e("pop",{attrs:{"dialog-config":n.config}},[e("div",{slot:"pop-content"},[e("p",[n._v("我是弹出框内容")]),n._v(" "),e("span",[n._v("姓名：")]),e("input",{directives:[{name:"model",rawName:"v-model",value:n.inputName,expression:"inputName"}],staticClass:"yunnex-input",attrs:{type:"text"},domProps:{value:n.inputName},on:{input:function(t){t.target.composing||(n.inputName=t.target.value)}}}),n._v(" "),e("div",{staticClass:"operate-btn-area"},[e("div",{staticClass:"yunnex-btn green-btn",on:{click:n.saveUserName}},[n._v("确定")]),n._v(" "),e("div",{staticClass:"yunnex-btn",on:{click:n.cancelModify}},[n._v("取消")])])])])],1)},staticRenderFns:[]}},13:function(n,t,e){function o(n){e(40)}var i=e(0)(e(89),e(104),o,null,null);n.exports=i.exports},20:function(n,t,e){var o=e(2),i=e(1),s=e(13),a=e(3);o.use(i);new o({el:"#app",components:{app:s,frameWork:a}})},38:function(n,t){},40:function(n,t){},53:function(n,t,e){var o=e(0)(e(75),null,null,null,null);n.exports=o.exports},54:function(n,t,e){function o(n){e(38)}var i=e(0)(e(76),e(102),o,null,null);n.exports=i.exports},75:function(n,t,e){var o=e(54);n.exports=o},76:function(n,t,e){var o=e(7);n.exports={props:{dialogConfig:{type:Object,required:!0}},created:function(){this.dialogConfig.closeClass="icon-popup-close-white"},components:{pop:o}}},89:function(n,t,e){var o=e(53);n.exports={data:function(){return{userName:"tom",inputName:"",config:{title:"修改用户姓名",isShow:!1}}},components:{pop:o},methods:{modifyUserName:function(){this.config.isShow=!0},saveUserName:function(){this.userName=this.inputName},cancelModify:function(){this.config.isShow=!1}}}}},[20]);