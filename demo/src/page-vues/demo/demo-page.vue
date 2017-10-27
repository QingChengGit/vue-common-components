<template>
<div class="page-demo-page">
    <yunnex-page :data-count="dataCount" :page-size="pageSize" :now-page="nowPage" v-on:change="changePage"></yunnex-page>
</div>
  
</template>

<script>

import page from 'common/components/yunnex-page/index'

export default {
    data () {
        return {
            dataCount: 230, // 总条数
            pageSize: 10, // 每页显示的条数
            nowPage: 1 // 当前页
        }
    },
    components: {
        'yunnex-page': page
    },
    methods: {
        changePage: function (num){// 在分页组件中把当前的页码传过来
            console.log(num);
            return this.nowPge = num;
        }
    }
}
</script>

<style>
  .page-demo-page{
      padding-left: 20px;
      margin-top: 20px;
  }
</style>
