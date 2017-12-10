class Game{
	constructor(numberOfRows, numberOfColumns, numberOfBombs){
		this._board = new Board(numberOfRows, numberOfColumns, numberOfBombs);
	}

	playMove(rowIndex, columnIndex){
		this._board.flipTile(rowIndex, columnIndex);
		if(this._board.playerBoard[rowIndex][columnIndex] === 'B'){
			console.log('Game Over! Final Board:');
			this._board.print(this._board.playerBoard);
		}
		else if(this._board.hasSafeTiles()){
			console.log('Congratulations you have won!');
		}
		else{
			console.log('Current Board:');
			this._board.print(this._board.playerBoard);
		}
	}
}

class Board{
	constructor(numberOfRows, numberOfColumns, numberOfBombs){
		this._numberOfBombs = numberOfBombs;
		//Number of TIles is going to be used when there are no more tiles and the game is over
		this._numberOfTiles = numberOfRows * numberOfColumns;
		this._playerBoard = Board.generatePlayerBoard(numberOfRows, numberOfColumns);
		this._bombBoard = Board.generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs);
	

	}

	get playerBoard(){
		return this._playerBoard;
	}

	 flipTile (rowIndex, columnIndex){
		//Check if the tile that the user flips is not empty
		if(this._playerBoard[rowIndex][columnIndex] !== ' '){
			return 'This tile has already been flipped!';
		}
		//Check if the tile flipped contains a bomb
		else if(this._bombBoard[rowIndex][columnIndex] === 'B'){
			//If there is a bomb at the location then update it in the users board.
			this._playerBoard[rowIndex][columnIndex] = 'B';
		}
		else{
			this._playerBoard[rowIndex][columnIndex] = this.getNumberOfNeighborBombs(rowIndex, columnIndex);
		}
		this._numberOfTiles--;
	}

	getNumberOfNeighborBombs (rowIndex, columnIndex){
		const neighborOffsets = [];
		for(let i = 0; i < 8; i++){
			//Add eight empty arrays to our offset arrays
			neighborOffsets.push([]);
		}
		neighborOffsets[0].push(-1,-1);
		neighborOffsets[1].push(-1,0);
		neighborOffsets[2].push(-1,1);
		neighborOffsets[3].push(0,1);
		neighborOffsets[4].push(0,-1);
		neighborOffsets[5].push(1,-1);
		neighborOffsets[6].push(1,0);
		neighborOffsets[7].push(1,1);
		//Get the dimensions of the bomb board
		let numberOfRows = this._bombBoard.length;
		let numberOfColumns = this._bombBoard[0].length;
		//Variable to keep track of the number of bombs adjacent to the tile
		let numberOfBombs = 0;
		neighborOffsets.forEach((offset) =>{
			const neighborRowIndex = rowIndex + offset[0];
			const neighborColumnIndex = columnIndex + offset[1];
			//Check if the tile flipped is vlaid
			if(neighborRowIndex >= 0 && neighborRowIndex < numberOfRows && neighborColumnIndex >= 0 && neighborColumnIndex < numberOfColumns){
				// Check if the space adjacent contains a Bomb
				if(this._bombBoard[neighborRowIndex][neighborColumnIndex] === 'B'){
					numberOfBombs++;
				}
			}
			
		})
		return numberOfBombs;
	}

	hasSafeTiles(){
		return (this._numberOfTiles === this._numberOfBombs);		
	}


 	print (board){
		let newBoard = board.map((row) =>{
			return row.join(' | ')
		}).join('\n');
		console.log(newBoard);
	}

	static generatePlayerBoard (numberOfrows, numberOfColumns) {
		let board = [];
		for(let i = 0; i < numberOfrows; i++){
			let row = [];
			for(let j = 0; j < numberOfColumns; j++){
				row.push(' ');
			}
			board.push(row);
		}
		return board;
	}

	static generateBombBoard (numberOfRows, numberOfColumns, numberOfBombs) {
	let bombBoard = [];
	for(let i = 0; i < numberOfRows; i++ ){
		let row = [];
		for(let j = 0; j < numberOfColumns; j++){
			row.push(null);
		}
		bombBoard.push(row);
	}
	let numberOfBombsPlaced = 0;
	let randomRowIndex;
	let randomColumnIndex;
	while(numberOfBombs > numberOfBombsPlaced){
		randomRowIndex = Math.floor(Math.random() * numberOfRows);
		randomColumnIndex = Math.floor(Math.random() * numberOfColumns );
		//Before placing a bomb check if there is a bomb at that index
		if(bombBoard[randomRowIndex][randomColumnIndex] !== 'B'){
		bombBoard[randomRowIndex][randomColumnIndex] = 'B';
		numberOfBombsPlaced++;
		}	
	}
	return bombBoard;
}

}

const g = new Game(3,3,3);
g.playMove(2,1);




