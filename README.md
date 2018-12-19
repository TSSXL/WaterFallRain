#### Example 
http://sipeng.net/yanshi/WaterFallRain-master/index.html

插件使用-------------------------------------

1>引入Waterfall.js文件 ( import Waterfall.js to project )

2>调用waterfall.open()方法 ( call global waterfall.open() method go to open )

3>参数  ( params )

 	调用方式(参数可均可选) ( All optional )
  	waterfall.open({
 		text:'显示的文字', ( text:String/ show text content )
 		fontSize:'字体的大小', ( fontSize:Number/ font size )
 		speed:'下落的速度', ( sped:Number/ text decline speed )
 		preAction:true//是否显示预加载动画 ( preAction:Boolean/ Whether to display preload animation )
 		color:'字体颜色', ( color:String/ font color )
 		fontFamily: '字体样式' ( fontFamily:String/ font family)
 	});
4>关闭瀑布雨 ( close waterfall rain )
  waterfall.close();
