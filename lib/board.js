'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Board = exports.Board = function () {
	function Board(numberOfRows, numberOfColumns, numberOfBombs) {
		_classCallCheck(this, Board);

		this._numberOfBombs = numberOfBombs;
		//Number of TIles is going to be used when there are no more tiles and the game is over
		this._numberOfTiles = numberOfRows * numberOfColumns;
		this._playerBoard = Board.generatePlayerBoard(numberOfRows, numberOfColumns);
		this._bombBoard = Board.generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs);
	}

	_createClass(Board, [{
		key: 'flipTile',
		value: function flipTile(rowIndex, columnIndex) {
			//Check if the tile that the user flips is not empty
			if (this._playerBoard[rowIndex][columnIndex] !== ' ') {
				return 'This tile has already been flipped!';
			}
			//Check if the tile flipped contains a bomb
			else if (this._bombBoard[rowIndex][columnIndex] === 'B') {
					//If there is a bomb at the location then update it in the users board.
					this._playerBoard[rowIndex][columnIndex] = 'B';
				} else {
					this._playerBoard[rowIndex][columnIndex] = this.getNumberOfNeighborBombs(rowIndex, columnIndex);
				}
			this._numberOfTiles--;
		}
	}, {
		key: 'getNumberOfNeighborBombs',
		value: function getNumberOfNeighborBombs(rowIndex, columnIndex) {
			var _this = this;

			var neighborOffsets = [];
			for (var i = 0; i < 8; i++) {
				//Add eight empty arrays to our offset arrays
				neighborOffsets.push([]);
			}
			neighborOffsets[0].push(-1, -1);
			neighborOffsets[1].push(-1, 0);
			neighborOffsets[2].push(-1, 1);
			neighborOffsets[3].push(0, 1);
			neighborOffsets[4].push(0, -1);
			neighborOffsets[5].push(1, -1);
			neighborOffsets[6].push(1, 0);
			neighborOffsets[7].push(1, 1);
			//Get the dimensions of the bomb board
			var numberOfRows = this._bombBoard.length;
			var numberOfColumns = this._bombBoard[0].length;
			//Variable to keep track of the number of bombs adjacent to the tile
			var numberOfBombs = 0;
			neighborOffsets.forEach(function (offset) {
				var neighborRowIndex = rowIndex + offset[0];
				var neighborColumnIndex = columnIndex + offset[1];
				//Check if the tile flipped is vlaid
				if (neighborRowIndex >= 0 && neighborRowIndex < numberOfRows && neighborColumnIndex >= 0 && neighborColumnIndex < numberOfColumns) {
					// Check if the space adjacent contains a Bomb
					if (_this._bombBoard[neighborRowIndex][neighborColumnIndex] === 'B') {
						numberOfBombs++;
					}
				}
			});
			return numberOfBombs;
		}
	}, {
		key: 'hasSafeTiles',
		value: function hasSafeTiles() {
			return this._numberOfTiles === this._numberOfBombs;
		}
	}, {
		key: 'print',
		value: function print(board) {
			var newBoard = board.map(function (row) {
				return row.join(' | ');
			}).join('\n');
			console.log(newBoard);
		}
	}, {
		key: 'playerBoard',
		get: function get() {
			return this._playerBoard;
		}
	}], [{
		key: 'generatePlayerBoard',
		value: function generatePlayerBoard(numberOfrows, numberOfColumns) {
			var board = [];
			for (var i = 0; i < numberOfrows; i++) {
				var row = [];
				for (var j = 0; j < numberOfColumns; j++) {
					row.push(' ');
				}
				board.push(row);
			}
			return board;
		}
	}, {
		key: 'generateBombBoard',
		value: function generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs) {
			var bombBoard = [];
			for (var i = 0; i < numberOfRows; i++) {
				var row = [];
				for (var j = 0; j < numberOfColumns; j++) {
					row.push(null);
				}
				bombBoard.push(row);
			}
			var numberOfBombsPlaced = 0;
			var randomRowIndex = void 0;
			var randomColumnIndex = void 0;
			while (numberOfBombs > numberOfBombsPlaced) {
				randomRowIndex = Math.floor(Math.random() * numberOfRows);
				randomColumnIndex = Math.floor(Math.random() * numberOfColumns);
				//Before placing a bomb check if there is a bomb at that index
				if (bombBoard[randomRowIndex][randomColumnIndex] !== 'B') {
					bombBoard[randomRowIndex][randomColumnIndex] = 'B';
					numberOfBombsPlaced++;
				}
			}
			return bombBoard;
		}
	}]);

	return Board;
}();