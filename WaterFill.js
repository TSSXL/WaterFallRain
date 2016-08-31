/**
 *  canvas瀑布雨特效插件
 *	author: 思鹏
 *  email: 1163260351@qq.com
 *	date: 2016-8-31
 *  version: 0.0.1
 * 
 *	调用方式(参数可均可选)
 * 	waterfall.open({
 *		text:'显示的文字',
 *		fontSize:'字体的大小',
 *		speed:'下落的速度',
 *		preAction:true//是否显示预加载动画
 *		color:'字体颜色',
 *		fontFamily: '字体样式'
 *	});
 *  关闭瀑布雨
 *  waterfall.close();
 */
(function(win,doc){
	var init = function(){
		//绘制canvas
		this.drawCanvas = function(){
			document.body.appendChild(this.canvas);
			this.canvas.width = this.winWid;
			this.canvas.height = this.winHei;
		}
		//绘制瀑布雨
		this.drawText = function(){		
			this.context().fillStyle = "rgba(0,0,0,0.05)";
			this.context().fillRect(0, 0, this.winWid,this.winHei);
			this.context().font = "700 "+this.fontSize+"px "+this.fontFamily+"";
			this.context().fillStyle  = this.color;

			for(var i = 0; i<this.column(); i++){
				var x = i * this.fontSize;
				var y = this.initTop[i] * this.fontSize;
				var index  = Math.floor(Math.random() * this.text.length);
				//绘制文字
				this.context().fillText(this.text[index],x,y);
				//边界判断	
				if(this.initTop[i] * this.fontSize > this.winHei && Math.random() >　0.9){
					this.initTop[i] = 0;
				}
				this.initTop[i]++;
			}
		}
		this.timer = null;
		//对方暴露的方法声明 
		this.waterfall = function(opts){
			//参数传递
			if(opts){
				this.text = opts.text !== undefined ? opts.text : this.text;
				this.fontSize = opts.fontSize !== undefined ? opts.fontSize : this.fontSize;
				this.speed = opts.speed !== undefined ? opts.speed : this.speed;
				this.preAction = opts.preAction !== undefined ? opts.preAction : this.preAction;
				this.color = opts.color !== undefined ? opts.color : this.color;
				this.fontFamily = opts.fontFamily !== undefined ? opts.fontFamily : this.fontFamily;
			}
			this.styles();
			this.calcTop();
			this.drawCanvas();	
			var _this = this;
			this.timer = setInterval(function(){
				_this.drawText();
			},_this.speed);
		}
		//移除画布
		this.remove = function(){
			doc.body.removeChild(this.canvas);
		}
		//添加全局样式
		this.styles = function(){
			var styleTag = doc.createElement('style');
			styleTag.innerText = "html,body{overflow:hidden;background: #000}";
			doc.head.appendChild(styleTag);
		}
	}
	//默认参数
	init.prototype = {
		canvas: doc.createElement("canvas"),
		context: function(){
			return this.canvas.getContext("2d");
		},
		winWid: win.innerWidth || doc.document.documentElement.clientWidth,	
		winHei: win.innerHeight || doc.document.documentElement.clientHeight,
		fontSize: '15',
		text: '思鹏博客',
		speed: 30,
		preAction:true,
		color: 'green',
		fontFamily: 'Microsoft YaHei',
		initTop: [],
		column: function(){ 
			return this.winWid / this.fontSize;
		},
		calcTop: function(){
			for(var u = 0; u<this.column(); u++){
				this.initTop.push(this.preAction == true ? 0 : this.winHei);	
			 }	
		}
	}
	//对外暴露方法
	window.waterfall = {
		$init: new init(),
		open: function(opts){
			this.$init.waterfall(opts);
		},
		close: function(){
			clearInterval(this.$init.timer);
			this.$init.remove();
		}	
	}
})(window,document);	