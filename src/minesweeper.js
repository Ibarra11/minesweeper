const generatePlayerBoard = (numberOfrows, numberOfColumns) =>{
	let board = [];
	for(let i = 0; i < numberOfrows; i++){
		let row = [];
		for(let j = 0; j < numberOfColumns; j++){
			row.push(' ');
		}
		board.push(row);
	}
	return board;
};

const generateBombBoard = (numberOfRows, numberOfColumns, numberOfBombs) =>{
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
		console.log('Row: ' +randomRowIndex);
		console.log('Column: ' + randomColumnIndex)
		bombBoard[randomRowIndex][randomColumnIndex] = 'B';
		numberOfBombsPlaced++;
	}
	return bombBoard
};

const printBoard = (board) =>{
	let newBoard = board.map((row) =>{
		return row.join(' | ')
	}).join('\n');
	console.log(newBoard);
};

let playerBoard = generatePlayerBoard(3,4);
let bombBoard = generateBombBoard(3,4,5);
console.log('Player Board: ');
printBoard(playerBoard);

console.log('Bomb Board: ');
printBoard(bombBoard);






