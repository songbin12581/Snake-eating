//地板的文件
//ground.init用来渲染整个游戏界面
var ground = new Ground(positionX, positionY, td * squareWidth, tr * squareWidth);
ground.init = function () {
  this.viewContent.style.position = 'absolute';
  this.viewContent.style.left = this.x + 'px';
  this.viewContent.style.top = this.y + 'px';
  this.viewContent.style.width = this.width + 'px';
  this.viewContent.style.height = this.height + 'px';
  this.viewContent.style.background = 'orange';
  document.body.appendChild(this.viewContent);

  //将渲染的围墙和地板数据存储起来，判断蛇是否行走和死亡
  //此数组为二位数组
  this.squareTable = [];



  //生成地板和围墙,用嵌套for循环生成
  //y走的是行数 
  for (var y = 0; y < tr; y++) {
    this.squareTable[y] = new Array(td);
    //x走的是列数
    for (var x = 0; x < td; x++) {
      //判断蛇是否走到了围墙
      if (x == 0 || y == 0 || x == td - 1 || y == tr - 1) {
        var newSquare = SquareFactory.create('Wall', x, y, 'black');
      } else {
        var newSquare = SquareFactory.create('Floor', x, y, 'gray');
      }

      this.squareTable[y][x] = newSquare;
      //渲染围墙和地板
      this.viewContent.appendChild(newSquare.viewContent);
    };
  };

  // console.log(this.squareTable);
};


//移除方块
ground.remove = function (x, y) {
  var curSquare = this.squareTable[y][x];
  this.viewContent.removeChild(curSquare.viewContent);
  this.squareTable[y][x] = null;
};

//添加方块
//square是一个对象
ground.append = function (square) {
  this.viewContent.appendChild(square.viewContent);
  this.squareTable[square.y][square.x] = square;
};

