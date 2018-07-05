/**
 * Created by liuxinxin on 2018/3/16.
 */
/*
	@desc 延迟执行函数模块
	fn  要延迟执行的函数
    performTimeGap  延迟执行的时间,
    fnCtx  函数fn执行时内部this指向的对象
 */
function DeferPerform(fn, performTimeGap, fnCtx) {
	this.stack = [];
	this.fn = fn;
	this.context = fnCtx;
	//默认执行间隔400毫秒
	this.timeGap = performTimeGap ? performTimeGap < 400 ? 400 : performTimeGap : 400;
	this.timer = null;
}

DeferPerform.prototype.pushData = function (data) {
	var args = Array.prototype.slice.call(arguments),
		self = this;
	
	this.stack.push(args);
	if(!this.timer) {
		this.timer = setTimeout(function() {
			var t = arguments;
			self.perform(t);
		}, self.timeGap);
	}
};

DeferPerform.prototype.perform = function () {
	//进行拷贝的目的是为了在执行函数的时刻正好插入了数据
	var arr = this.stack.concat();
	
	this.timer = null;
	//执行函数并清空栈
	this.fn.apply(this.context, arr[arr.length - 1]);
	this.stack = [];
};

module.exports = DeferPerform;