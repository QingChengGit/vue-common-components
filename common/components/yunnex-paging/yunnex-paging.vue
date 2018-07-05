<template>
    <div class="pagination-component">
        <div class="pagination-show-info" v-if="isShowPageInfo">
            显示&nbsp;{{startArticle}}&nbsp;-&nbsp;{{endArticle}}&nbsp;条，共&nbsp;{{allArticle}}&nbsp;条。
        </div>
        <div class="pagination-chang-page">
            <ul class="pagination-pageing" onselectstart="return false;">
                <li class="prev-page" :class="{'no-active': isStartPage}" @click="prevPage">上一页</li>
                <li v-for="(val, index) in pageArr" :key="index" :class="{'page-active': isPageAce == val}" @click="pageClick(val)">
                     {{ val <= 0 ? '....' : val}} 
                </li>
                <li class="prev-page next-page" :class="{'no-active': isEndPage}" @click="nextPage">下一页</li>
            </ul>
            <div class="pagination-righe-eleva" v-if="isGreaterFifteen">
                <div class="eleva-main">
                    <span>到第</span>
                    <input class="page-input" v-model.number="pageNum" min="1" :max="pageCount" type="number">
                    <span>页</span>
                    <button class="page-btn" @click="pageBtn">确定</button>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
export default {
    props: {
        'dataCount': {
            type: Number,
            required: true
        },
        'pageSize': {
            type: Number,
            default: 10
        },
        'nowPage': {
            type: Number,
            default: 1
        },
        'isShowPageInfo': {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            pageCount: Math.ceil(this.dataCount / this.pageSize), // 总页码
            everyPageSize: this.pageSize,
            curPage: this.nowPage, // 当前页
            nowShowPage: 7, 
            pageNum: '',
        }
    },
    watch: {
        'dataCount': function(n, o) {
            this.pageNum = '';
            this.pageCount = Math.ceil(parseInt(n) / this.pageSize);
        },
        'nowPage': function (n, o) {
            this.curPage = parseInt(n);
        }
    },
    computed: {
        pageArr: function() {
            var startL = 1,
                endR = this.pageCount,
                tempArr = [];
            if (this.pageCount > this.nowShowPage)  {
                if (this.curPage > 4 && this.curPage < this.pageCount - 4) {
                    startL = this.curPage - 4;
                    endR = this.curPage + 4;
                } else {
                    if (this.curPage <= 4) {    
                        startL = 1;
                        endR = 7;
                    } else {
                        startL = this.pageCount - 7;
                        endR = this.pageCount;
                    }
                }
            }
            
            while (startL <= endR) {
                tempArr.push(startL)
                startL++;
            }
            if (tempArr[0] > 1) {
                tempArr[0] = 1;
                tempArr[1] = -1;
            }
            if (tempArr[tempArr.length - 1] < this.pageCount) {
                tempArr[tempArr.length - 1] = this.pageCount;
                tempArr[tempArr.length - 2] = 0;
            }
            return tempArr;
        },
        isPageAce: function() {
            return this.curPage;
        },
        isStartPage: function() {
            if (this.curPage == 1) {
                return true;
            } else {
                return false;
            }
        },
        isEndPage: function() {
            if (this.curPage == this.pageCount) {
                return true;
            } else {
                return false;
            }
        },
        startArticle: function () {
            return (this.curPage - 1) * this.pageSize + 1;
        },
        endArticle: function () {
            if (this.pageCount < 2 || this.curPage == this.pageCount) {
                if (this.pageCount <=0){
                    return 0;
                }else {
                    return this.dataCount;
                }
            } else {
                return this.curPage * this.pageSize;
            }
        },
        allArticle: function () {
            return this.dataCount.toString().replace(/\B(?=(?:\d{3})+\b)/g, ',');
        },
        isGreaterFifteen: function () {
            if (this.pageCount > 5) {
                return true;
            } else {
                return false;
            }
        }
    },
    methods: {
        pageClick(val) {
            if (val > 0) {
                this.curPage = val;
            }
            if (val == 0) {
                this.curPage += 3;
            }
            if (val == -1) {
                this.curPage -= 3;
            }
            this.$emit('change', this.curPage);
        },
        onePage() {
            if (this.curPage <= 1) {
                return;
            }
            this.pageClick(1)
        },
        prevPage() {
            if (this.curPage <= 1) {
                return;
            }
            this.pageClick(this.curPage - 1)
        },
        nextPage() {
            if (this.curPage >= this.pageCount) {
                return;
            }
            this.pageClick(this.curPage + 1)
        },
        endPage() {
            if (this.curPage >= this.pageCount) {
                return;
            }
            this.pageClick(this.pageCount)
        },
        pageBtn() {
            if (this.pageNum == '') {
                return;
            }
            var r = /^\+?(0|[1-9][0-9]*)$/;
            if (!r.test(this.pageNum)) {
                this.pageClick(1);
            } else {
                if (this.pageNum > this.pageCount) {
                    this.pageClick(this.pageCount);
                } else if (this.pageNum <= 1) {
                    this.pageClick(1);
                } else {
                    this.pageClick(this.pageNum);
                }
            }
        }
    }
}
</script>

<style scoped lang="scss">

button {
    outline: none;
}

 :focus {
    outline: none;
}

.pagination-component {
    width: 100%;
    
    &::after {
        content: "";
        display: block;
        clear: both;
        visibility: hidden;
        height: 0;
    }
    .pagination-show-info {
        float: left;
        font-size: 13px;
        line-height: 34px;
        color: #333;
    }
}
.pagination-chang-page{
    float: right;
    color: #999;
}
.pagination-pageing {
    float: left;
    list-style: none;
    -moz-user-select: none;
    font-size: 13px;
    &::after {
        content: "";
        display: block;
        clear: both;
        visibility: hidden;
        height: 0;
    }
    li {
        float: left;
        width: 36px;
        height: 32px;
        border: 1px solid #d7d7d7;
        border-left: 0;
        line-height: 30px;
        text-align: center;
        cursor: pointer;
        &:nth-child(2){
            border-left: 1px solid #d7d7d7;
        }
        &:hover{
            background-color: #eee;
        }
        &.prev-page {
            width: 58px;
            margin: 0 10px;
            border-left: 1px solid #d7d7d7;
        }
        &.next-page{
            margin-right: 0;
        }
        &.page-active {
            background-color: #1ab394;
            border-color: #1ab394;
            border-radius: 2px;
            color: #fff;
        }
        &.no-active {
            cursor: not-allowed;
        }
    }
}

.pagination-righe-eleva {
    float: left;
    margin-left: 10px;
    font-size: 13px;
    line-height: 34px;
    .eleva-main {
        float: left;
        .page-input {
            width: 36px;
            height: 32px;
            margin: 0 5px;
            border: 1px solid #ccc;
            padding-left: 5px;
        }
        .page-btn {
            width: 66px;
            height: 32px;
            margin-left: 8px;
            background-color: #fff;
            line-height: 30px;
            border: 1px solid #d7d7d7;
            color: #999;
            cursor: pointer;
            &:hover {
                background-color: #eee;
            }
        }
    }
}
</style>
