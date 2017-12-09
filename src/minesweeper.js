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
		if(bombBoard[randomRowIndex][randomColumnIndex] !== 'B'){
		bombBoard[randomRowIndex][randomColumnIndex] = 'B';
		numberOfBombsPlaced++;
		}	
	}
	return bombBoard
};

const getNumberOFNeighborBombs = (bombBoard, rowIndex, columnIndex) =>{
	const neighborOffsets = [];
	for(let i = 0; i < 8; i++){
		//Add eight empty arrays to our offset arrays
		neighborOffsets.push([]);
	}
	neighborOffsets[0].push(-1,1);
	neighborOffsets[1].push(-1,0);
	neighborOffsets[2].push(-1,1);
	neighborOffsets[3].push(0,1);
	neighborOffsets[4].push(0,-1);
	neighborOffsets[5].push(1,-1);
	neighborOffsets[6].push(1,0);
	neighborOffsets[7].push(1,1);
	//Get the dimensions of the bomb board
	let numberOfRows = bombBoard.length;
	let numberOfColumns = bombBoard[0].length;
	//Variable to keep track of the number of bombs adjacent to the tile
	let numberOfBombs = 0;
	neighborOffsets.forEach((offset) =>{
		const neighborRowIndex = rowIndex + offset[0];
		const neighborColumnIndex = columnIndex + offset[1];
		//Check if the tile flipped is vlaid
		if(neighborRowIndex >= 0 && neighborRowIndex < numberOfRows && neighborColumnIndex >= 0 && neighborColumnIndex < numberOfColumns){
			// Check if the space adjacent contains a Bomb
			// console.log(bombBoard[neighborRowIndex][neighborColumnIndex]);
			if(bombBoard[neighborRowIndex][neighborColumnIndex] === 'B'){
				numberOfBombs++;
			}
		}
		
	});
	return numberOfBombs;
};

const flipTile = (playerBoard, bombBoard, rowIndex, columnIndex) =>{
	//Check if the tile that the user flips is not empty
	if(playerBoard[rowIndex][columnIndex] !== ' '){
		return 'This tile has already been flipped!';
	}
	//Check if the tile flipped contains a bomb
	else if(bombBoard[rowIndex][columnIndex] === 'B'){
		//If there is a bomb at the location then update it in the users board.
		playerBoard[rowIndex][columnIndex] = 'B';
	}
	else{
		playerBoard[rowIndex][columnIndex] = getNumberOFNeighborBombs(bombBoard, rowIndex, columnIndex);
	}
};

const printBoard = (board) =>{
	let newBoard = board.map((row) =>{
		return row.join(' | ')
	}).join('\n');
	console.log(newBoard);
};


let playerBoard = generatePlayerBoard(3,4);
let bombBoard = generateBombBoard(3,4,3);
console.log('Player Board: ');
printBoard(playerBoard);

console.log('Bomb Board: ');
printBoard(bombBoard);

flipTile(playerBoard, bombBoard, 0 , 0);
console.log('Updated Player Board:');
printBoard(playerBoard);




