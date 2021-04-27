//管理者区域
function SquareFactory() {};

//方便下边所有流水线调用，这样节省代码
SquareFactory.prototype.init = function (square, color, action) {
  square.viewContent.style.position = 'absolute';
  square.viewContent.style.width = square.width + 'px';
  square.viewContent.style.height = square.height + 'px';
  square.viewContent.style.background = color;


  //left = 列（x） * 宽度
  //top = 行（y） * 高度
  //上边两种计算方式用于计算小方块的left和top值
  square.viewContent.style.left = square.x * squareWidth + 'px';
  square.viewContent.style.top = square.y * squareWidth + 'px';

  //给所有小方块打上标签
  square.collide = action;
};

//流水线区域，创建方块所用
SquareFactory.prototype.Floor = function (x, y, color) {
  var floor = new Floor(x, y, squareWidth, squareWidth);
  this.init(floor, color, collideType.move);

  return floor;
};


SquareFactory.prototype.Wall = function (x, y, color) {
  var wall = new Wall(x, y, squareWidth, squareWidth);
  this.init(wall, color, collideType.die);


  return wall;
};

SquareFactory.prototype.SnakeHead = function (x, y, color) {
  var snakeHead = new SnakeHead(x, y, squareWidth, squareWidth);
  this.init(snakeHead, color, collideType.die);

  //蛇头是单例对象，移动的话需要修改x、y的值
  snakeHead.upDate(x, y);
  return snakeHead;
};

SquareFactory.prototype.SnakeBody = function (x, y, color) {
  var snakeBody = new SnakeBody(x, y, squareWidth, squareWidth);
  this.init(snakeBody, color, collideType.die);

  return snakeBody;
};

SquareFactory.prototype.Food = function (x, y, color) {
  var food = new Food(x, y, squareWidth, squareWidth);
  this.init(food, color, collideType.eat);
  food.upDate(x, y);
  return food;
};




//对外接口，方便外部渲染区域
SquareFactory.create = function (type, x, y, color) {
  if (typeof SquareFactory.prototype[type] == 'undefined') {
    alert('对不起，您传入的数值错误');
  };

  //让流水线继承于管理者
  SquareFactory.prototype[type].prototype = new SquareFactory();

  return new SquareFactory.prototype[type](x, y, color); //创建需要生成的实例对象
};

// var newSquare = SquareFactory.create('Wall', x, y, 'black');
// var newSquare = SquareFactory.create('Floor', x, y, 'gray');