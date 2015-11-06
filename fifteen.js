"use strict";
window.onload = function(){
	var puzzlepieces;
	var puzzle = []; // creating an array to hold the puzzle pieces
    function fixTiles(piece, position){
        positionT(piece, position);
        positionL(piece, position);
        piece.style.backgroundPosition = (400 - getLeft(position)) + "px" + " " + (400 - getTop(position)) + "px";
    }
    
    function layoutPuzzle(){ // creating the layout of the puzzle pieces 
        puzzlepieces = $$('#puzzlearea div');
        var counter = 0;
        puzzlepieces.each(function(element)
        {
            element.addClassName('puzzlepiece');
            element.id = counter;
            console.log(element.id);
            fixTiles(element, counter);
            puzzle[counter] = 1;
            counter++;
        });
        puzzle[15] = 0;
    }
    
    function emptySpace(){
        for (var tilePos = 0; tilePos < 16; tilePos++){
           if (puzzle[tilePos] === 0){
                return tilePos;
            }
        }
    }
    
    function tileThatCanMove(tilePos) { //deciding which tiles are movable based on position
        var emptyTilePos = emptySpace();
        if ((tilePos % 4 != 0 && tilePos - 1 == emptyTilePos) ||(tilePos % 4 != 3 && tilePos + 1 == emptyTilePos) || (tilePos + 4 == emptyTilePos) || (tilePos - 4 == emptyTilePos)) {
            return emptyTilePos;
        }
        return -1;
    }
    
    function getLeft(position){
        return (position % 4) * 100;
    }
    
    function getTop(position){
        return Math.floor(position / 4) * 100;
    }
    function positionL(piece, position){
        piece.style.left = getLeft(position) + "px";
    }
    
    function positionT(piece, position){
        piece.style.top = getTop(position) + "px";
    }
    
    function move(piece, toMoveTo){
        positionT(piece, toMoveTo);
        positionL(piece, toMoveTo);
        puzzle[toMoveTo] = 1;
        console.log(piece.id);
        console.log(puzzle[piece.id]);
        puzzle[piece.id] = 0;
        piece.id = toMoveTo;
        console.log(piece.id);
    }
    	
    function movePiece(piece){
        puzzlepieces[piece].onclick = function(){
            var canMoveTo = tileThatCanMove(parseInt(puzzlepieces[piece].id,10));
            console.log("INDEX:" + canMoveTo);
            if (canMoveTo != -1){
                move(puzzlepieces[piece], canMoveTo);
            }
        };
    }
    
    function onMouseHover(k){
        puzzlepieces[k].onmouseover = function(){
            var position = tileThatCanMove(parseInt(puzzlepieces[k].id,10));
            if (position != -1){
                puzzlepieces[k].addClassName('movablepiece');
            }
            else{
                puzzlepieces[k].removeClassName('movablepiece');
            }
        };
    }
        function startGame(){ // this function will be initiated to start the game so that users can in teract with the puzzle
        layoutPuzzle();
        for (var k = 0; k < 15; k++){
            movePiece(k);
            onMouseHover(k);
        }
     }
    startGame();    
};
	