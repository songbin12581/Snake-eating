//存放游戏里用到的所有全局性变量


//游戏区域大小
var td = 30; //列数
var tr = 30; //行数

//方块的宽度
var squareWidth = 20; //宽高都会用这个值

//游戏区域的坐标（左上角的坐标）
var positionX = 200;
var positionY = 100;

//蛇移动的时间间隔
var intervalTime = 300; //毫秒

//整个游戏区域方块的构造函数
function Square(x, y, width, height, dom) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.viewContent = dom || document.createElement('div');
};

Square.prototype.upDate = function (x, y) {
    this.x = x;
    this.y = y;
    this.viewContent.style.left = x * squareWidth + 'px';
    this.viewContent.style.top = y * squareWidth + 'px';
};

//创建元素
//Ground是整个游戏的场景，承载所有元素
var Ground = tool.single(Square);
var Floor = tool.extends(Square);//地板
var Wall = tool.extends(Square);//围墙
var SnakeHead = tool.single(Square);//蛇头
var SnakeBody = tool.extends(Square);//蛇身
var Snake = tool.single();//整条蛇
var Food = tool.single(Square); // 食物

var Game = tool.single();


//给工厂里的小方块打上标签，用于进行判断
var collideType = {
    move: 'move',
    eat: 'eat',
    die: 'die',
}