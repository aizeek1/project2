"use strict";
window.onload = function(){
	var puzzlepieces;
	var puzzle = []; // creating an array to hold the puzzle pieces
	var shuff= document.getElementById("shufflebutton");
	puzzlepieces = $$('#puzzlearea div');
    function fixTiles(piece, position){
        positionT(piece, position);
        positionL(piece, position);
        piece.style.backgroundPosition = (400 - getLeft(position)) + "px" + " " + (400 - getTop(position)) + "px";
    }
    
    function layoutPuzzle(){ // creating the layout of the puzzle pieces 

        var counter = 0;
        puzzlepieces.each(function(element)
        {
            element.addClassName('puzzlepiece');
            element.id = counter;
            fixTiles(element, counter);
            puzzle[counter] = 1;
            counter++;
        });
        puzzle[15] = 0;
    }
    
   function emptySpace (){
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
        puzzle[piece.id] = 0;
        piece.id = toMoveTo;
    }
    	
    function movePiece(piece){
        puzzlepieces[piece].onclick = function(){
            var canMoveTo = tileThatCanMove(parseInt(puzzlepieces[piece].id,10));
            if (canMoveTo != -1){
                move(puzzlepieces[piece], canMoveTo);
            }
    
        };
      
    }
    function onMouseHover(p){
        puzzlepieces[p].onmouseover = function(){
            var position = tileThatCanMove(parseInt(puzzlepieces[p].id,10));
            if (position != -1){
                puzzlepieces[p].addClassName('movablepiece');
            }
            else{
                puzzlepieces[p].removeClassName('movablepiece');
            }
        };
    }
    function shuffle(puzzle) {
        var currentIndex = puzzle.length, randomIndex ;

         // While there remain elements to shuffle...
         while (0 !== currentIndex) {
            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            puzzlepieces=$$('#puzzlearea div');
            move(puzzlepieces[randomIndex],emptySpace()); // passing randomIndex and the emptySpace function to move, to move the pieces  */
        }
    }
        shuff.onclick = function(){//when the shuffle button is clicked it initiates this function
        	shuffle(puzzle);
    };
	
    function startGame(){ // this function will be initiated to start the game so that users can in teract with the puzzle
        layoutPuzzle();
        for (var k = 0; k < 15; k++){
            movePiece(k);
            onMouseHover(k);
        }
     }
 
    startGame();    //initiates the game
};
	