window.onload = function()
{
	var puzzlearea = document.getElementById("puzzlearea");
	var pieces = puzzlearea.children;
	var positionTop = 0;
	var positionLeft = 0;
	var backgroundPositionLeft = 0;
	var backgroundPositionTop=0;

	for(var i =0; i < pieces.length; i++)
	{
		pieces[i].className = "puzzlepiece";
		pieces[i].style.top= positionTop + "px";
		pieces[i].style.left = positionLeft + "px";
		pieces[i].style.backgroundPosition= backgroundPositionLeft +"px" + backgroundPositionTop +"px";
		

		if(positionLeft < 300 )
		{
			positionLeft = positionLeft + 100;
			backgroundPositionLeft = backgroundPositionLeft - 100;
			
		}
		else
		{
			positionLeft = 0;
			backgroundPositionLeft = 0;
			positionTop = positionTop + 100;
			backgroundPositionTop = backgroundPositionTop - 100;
			
		}	
	}
	

};



