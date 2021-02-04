# 享元模式

> ### 什么是享元模式？

        享元模式： 运用共享技术有效的支持大量细粒度的对象。

        简单来说，在享元模式中，存在享元池的概念，享元池中存储的是需要被共享的对象，而实际场景中，需要被共享的对象是有限的，一般设计为较小的对象，这些对象就被称为细粒度的对象。同时在享元模式中，区分两种状态：内部状态和外部状态，内部状态是指需要被共享的信息，不随环境的改变而改变，为不变，外部状态是指对象依赖标记，根据环境变化而变化，为变。

> ### 为什么要使用享元模式？

举个简单的例子，在线棋牌游戏中会有围棋、五子棋一类，在棋盘上能下几百个棋子，假如我们每下一颗棋子，都需要去新建一个棋子对象，那么一局棋下来服务器就会创建几百个对象，同时在线玩的不止一两个，由于内存空间有限，如果创建过多的对象，一台服务器只支持少数玩家使用，那么这显然不是我们想要的。

__享元模式解决了对象重复创建，增大内存开销的问题。__

优点： 大大减少了对象的创建，降低了程序内存的占用，提高效率

缺点：提高了系统的复杂度。需要分离出内部状态和外部状态。

享元模式的核心在于享元工厂类，享元工厂类的作用在于提供一个用于存储享元对象的享元池，用户需要对象时，首先从享元池中获取，如果享元池中不存在，则创建一个新的享元对象返回给用户，并在享元池中保存该新增对象。

以围棋例子实现具体代码：
```js
// 具体享元角色
class Piece {
    constructor(color) {
        // 内部状态 棋子颜色
        this.color = color
        // 外部状态 棋子位置
        this.points = []
    }

    setPoint(point) {
        this.points.push(point)
    }
    getPoint() {
        return this.points
    }
}
// 享元工厂
class pieceFactory {
    // 享元池
    constructor() {
        this._hashMap = new Map()
    }

	// 根据享元池是否有该对象，有就从池中取，没有就新建并放入池中
	getPiece(color) {
		let piece = null;
		if (this._hashMap.has(color)) {
			piece = this._hashMap.get(color);
		} else {
			piece = new Piece(color);
			this._hashMap.set(color, piece);
		}
		return piece;
    }
    // 输出棋盘棋子位置
    output() {
        for (const [key, value] of this._hashMap.entries()) {
            const point = value.getPoint()
            console.log(`${key}颜色的棋子位置：`)
            console.log(point)
        }
    }
}

// 客户端
// 启动享元池（由于JS并无静态类实现，这里手动new）
const Factory = new pieceFactory()
// 黑棋下[1,1]
const first = Factory.getPiece('black')
first.setPoint([1, 1])
// 白棋下[2,2]
const second = Factory.getPiece('white')
second.setPoint([2,2])
// 黑棋下[1,2]
const three = Factory.getPiece('black')
three.setPoint([1,2])

Factory.output()
// black颜色的棋子位置：
// [ [ 1, 1 ], [ 1, 2 ] ]
// white颜色的棋子位置：
// [ [ 2, 2 ] ]
```