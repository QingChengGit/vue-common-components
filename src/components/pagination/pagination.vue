<template>
    <ul class="yunnex-pagination" v-on:click="clickPageItem">
        <li :class="{'pagination-item': true, 'disabled': page == 1}" :page="page > 1 ? 'first' : false">首页</li>
        <li :class="{'pagination-item': true, 'disabled': page == 1}" :page="page > 1 ? 'prev' : false">上一页</li>
        <li class="pagination-item" :class="{'selected-item': n === page}" v-for="n in pageList" :page="n">
            {{n}}
        </li>
        <li :class="{'pagination-item': true, 'disabled': page == pageCount}" :page="page < pageCount ? 'next' : false">下一页</li>
        <li :class="{'pagination-item': true, 'disabled': page == pageCount}" :page="page < pageCount ? 'last' : false">尾页</li>
        <li class="pagination-item pagination-desc">
            <span class="page-statistic">
                共{{pageCount}}页
            </span>
            <span class="page-statistic" v-if="typeof dataCount !=='undefined'">
                ,{{dataCount}}条记录
            </span>
            <span class="page-statistic page-jump">
                到<input type="text" class="yunnex-input input-page-number" v-model="inputPage"/>
                <div class="pagin-btn jump-page-btn" v-on:click="jumpPage">确定</div>
            </span>
        </li>
    </ul>
</template>

<style lang="less">
    .selected-page {
        color: #fff;
        background: #007aff;
    }
    .yunnex-pagination {
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        .pagination-item {
            display: inline-block;
            margin: 0 4px;
            padding: 4px 9px;
            border: 1px solid #DDDDDD;
            border-radius: 6px;
            color: #333;
            background-color: #FFFFFF;
            vertical-align: middle;
            cursor: pointer;
            &:hover {
                .selected-page;
            }
            &:first-child {
                margin-left: 0;
            }
            &:last-child {
                margin-right: 0;
            }
        }
        .selected-item {
            .selected-page;
        }
        .pagination-desc {
            border: 0;
            cursor: none;
            &:hover {
                color: #333;
                background-color: #FFFFFF;
            }
        }
        .input-page-number {
            width: 30px;
            height: 25px;
            padding-left: 6px;
            margin-left: 8px;
        }
        .page-statistic {
            vertical-align: middle;
        }
        .page-jump {
            margin-left: 10px;
        }
        .pagin-btn {
            padding: 4px 8px;
            margin-left: 5px;
            border: 1px solid #AAA;
            -webkit-border-radius: 4px;
            -moz-border-radius: 4px;
            border-radius: 4px;
            font-size: 13px;
            color: #333;
            background: #FFF;
            cursor: pointer;
        }
        .jump-page-btn {
            display: inline-block;
            cursor: pointer;
        }
        .disabled {
            border-color: #e3e3e3;
            color: #DDD;
        }
    }
</style>

<script>
    module.exports = {
        data: function() {
            return {
                inputPage: '',
                page: this.currentPage,
                pageList: [],
                paginationItemCount: 5
            };
        },
        props: {
            pageSize: {
                type: Number,
                required: true
            },
            currentPage: {
                type: Number,
                default: 1
            },
            dataCount: {
                type: Number
            }
        },
        computed: {
            pageCount: function() {
                return Math.ceil(this.dataCount / this.pageSize);
            }
        },
        methods: {
            clickPageItem: function(evt) {
                var target = evt.target,
                    currentPage;
                if(target.hasAttribute('page')){
                    currentPage = target.getAttribute('page');
                    if(isNaN(currentPage)){
                        switch (currentPage){
                            case 'first':
                                currentPage = 1;
                                break;
                            case 'prev':
                                currentPage = this.page - 1;
                                break;
                            case 'next':
                                currentPage = this.page + 1;
                                break;
                            case 'last':
                                currentPage = this.pageCount;
                                break;
                        }
                    }
                    this.page = parseInt(currentPage, 10);
                    this.$emit('jump-to-page', this.page);
                    if(this.page % this.paginationItemCount === 0) {
                        this.refreshPageList(this.page, 'next');
                    }else if(this.pageList.indexOf(this.page) === 0) {
                        this.refreshPageList(this.page, 'prev');
                    }
                }
            },
            jumpPage: function() {
                if(!isNaN(this.inputPage) && (this.inputPage >= 1 && this.inputPage <= this.pageCount)){
                    this.page = parseInt(this.inputPage, 10);
                    this.$emit('jump-to-page', this.page);
                    this.refreshPageList(this.page, 'next');
                }else if(/\.+/.test(this.inputPage)){
                    alert('输入的页码不能为非整数!');
                }else{
                    alert('请输入1-' + this.pageCount + '之间的整数页码!');
                }
                this.inputPage = '';
            },
            refreshPageList: function(start, operate) {
                var end,
                    i = 0;

                if(operate === 'next') {
                    end = start + this.paginationItemCount - 1;
                }else {
                    end = start;
                    start = end - this.paginationItemCount + 1;
                    if(start <= 0) {
                        start = 1;
                        end = start + this.paginationItemCount - 1;
                    }
                }
                if(this.pageCount <= end){
                    start = this.pageCount - this.paginationItemCount + 1;
                    start = start <= 0 ? 1 : start;
                    end = this.pageCount;
                }
                this.pageList = [];
                while(start <= end) {
                    this.pageList[i++] = start;
                    start++;
                }
            }
        },
        created: function() {
            var self = this,
                count;

            count = self.pageCount > self.paginationItemCount ? self.pageCount : self.paginationItemCount;
            while(count--) {
                self.pageList[count] = count + 1;
            }
        },
        watch: {
            dataCount: function() {
                this.refreshPageList(1, 'next');
            }
        }
    };
</script>