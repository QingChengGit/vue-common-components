<template>
    <div class="pagination-component">
        <ul class="page-num" onselectstart="return false;">
            <li class="shou-page" :class="{'no-active': isStartPage}" @click="onePage">首页</li>
            <li class="prev-page" :class="{'no-active': isStartPage}" @click="prevPage">上一页</li>
            <li v-for="(val, index) in pageArr" :key="index" :class="{'page-active': isPageAce == val}" @click="pageClick(val)"> {{ val
                <=0 ? '....' : val}} </li>
                    <li class="prev-page" :class="{'no-active': isEndPage}" @click="nextPage">下一页</li>
                    <li class="shou-page" :class="{'no-active': isEndPage}" @click="endPage">尾页</li>
        </ul>
        <div class="right-elevator" v-if="isGreaterFifteen">
            <div class="elevator-main">
                <span>到第</span>
                <input class="page-input" v-model.number="pageNum" type="number">
                <span>页</span>
                <button class="page-btn" @click="pageBtn">确定</button>
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
        }
    },
    data() {
        return {
            pageCount: '', // 总页码
            everyPageSize: '',
            curPage: '', // 当前页
            nowShowPage: 9, // 每次切换的页码
            pageNum: '',
            isGreaterFifteen: false
        }
    },
    mounted() {
        this.curPage = this.nowPage;
        this.everyPageSize = this.pageSize;
        this.pageCount = Math.ceil(this.dataCount / this.everyPageSize);
        if (this.pageCount >= 15) {
            this.isGreaterFifteen = true;
        }
    },
    watch: {
        'dataCount': function (n, o) {
            this.pageCount = Math.ceil(n / this.everyPageSize);
            if (this.pageCount >= 15) {
                this.isGreaterFifteen = true;
            }
        },
        'nowPage': function (n, o) {
            this.curPage = n;
        }
    },
    computed: {
        pageArr: function () {
            var startL = 1,
                endR = this.pageCount,
                tempArr = [];
            if (this.pageCount > this.nowShowPage) {
                if (this.curPage > 4 && this.curPage < this.pageCount - 4) {
                    startL = this.curPage - 4;
                    endR = this.curPage + 4;
                } else {
                    if (this.curPage <= 4) {
                        startL = 1;
                        endR = 9;
                    } else {
                        startL = this.pageCount - 8;
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
        isPageAce: function () {
            return this.curPage;
        },
        isStartPage: function () {
            if (this.curPage == 1) {
                return true;
            } else {
                return false;
            }
        },
        isEndPage: function () {
            if (this.curPage == this.pageCount) {
                return true;
            } else {
                return false;
            }
        }
    },
    methods: {
        pageClick(val) {
            console.log(val)
            if (val > 0) {
                this.curPage = val;
            }
            if (val == 0) {
                this.curPage += 4;
            }
            if (val == -1) {
                this.curPage -= 4;
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
    .page-num {
        float: left;
        list-style: none;
        -moz-user-select: none;
        font-size: 14px;
        li {
            float: left;
            width: 25px;
            height: 25px;
            margin-right: 8px;
            border: 1px solid #ccc;
            line-height: 23px;
            text-align: center;
            border-radius: 3px;
            cursor: pointer;
            &.shou-page {
                width: 42px;
                &:hover {
                    border-color: #1ab394;
                }
            }
            &.prev-page {
                width: 55px;
                &:hover {
                    border-color: #1ab394;
                }
            }
            &.page-active {
                background-color: #1ab394;
                color: #fff;
            }
            &.no-active {
                cursor: not-allowed;
                &:hover {
                    border-color: #ccc;
                }
            }
        }
    }
    .right-elevator {
        float: left;
        margin-right: 20px;
        font-size: 14px;
        .elevator-main {
            float: left;
            .page-input {
                width: 40px;
                height: 24px;
                margin: 0 5px;
                border: 1px solid #ccc;
                padding-left: 5px;
            }
            .page-btn {
                width: 50px;
                height: 26px;
                margin-left: 8px;
                background-color: #fff;
                border: 1px solid #ccc;
                cursor: pointer;
                &:hover {
                    border-color: #1ab394;
                }
            }
        }
    }
}
</style>
