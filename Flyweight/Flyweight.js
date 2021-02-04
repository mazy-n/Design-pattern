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