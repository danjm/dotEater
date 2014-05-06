$(document).ready(function(){
	$("body > h1").text("Your score: "+score);
	alert("Use the up,down,left and right arrows to move pacman. Eat as many dots as you can in 10 seconds.");
	$("#button").click(function(){

		countDown();
		$(this).css("background-color","#22ee22");
		for (var i=0;i<5;i++)
		{	
		 	addDot();
	 	}
	 	move();
	 	

	});
});

//*******************************************
//***************Move Pacman*****************
//*******************************************
closing = true;
direction = 1;


function displaying(element) {
	var block = "block";
	return element.css('display').localeCompare(block)==0;
}

function rotatePacman(direction){
	var $pacman = $("#pacman");
	var degree = 0;
	switch(direction){
		case 1:
			//changeDirectionOpen(1);
			$pacman.css({ transform: 'rotate(' + degree + 'deg)'});
			break;
		case 2:
			//changeDirectionOpen(2);
			degree = 90;
			$pacman.css({ transform: 'rotate(' + degree + 'deg)'});
			break;
		case 3:
			//changeDirectionOpen(3);
			degree = 180;
			$pacman.css({ transform: 'rotate(' + degree + 'deg)'});
			break;
		case 4:
			//changeDirectionOpen(4);
			degree = 270;
			$pacman.css({ transform: 'rotate(' + degree + 'deg)'});
			break;
	}
}

function littleOpen(){
	$("#pacman div").hide();
	$("#pacman div:nth-child(2)").hide();
}

function littleClose(){
	$("#pacman div").show();
	$("#pacman div:nth-child(2)").show();
}

function changeDirectionOpen(d){
		littleOpen();
		$("#pacman").css({borderRightColor:"transparent"});
		closing=true;
		direction=d;
}

function movePacman(d){
	var pacman = $("#pacman");
	if(direction==d){
		var currentTop = parseInt(pacman.position().top,10);
		var currentLeft = parseInt(pacman.position().left,10);
		var newTop = 0;
		var newLeft = 0;
		switch(d){
			case 1:
				newLeft = currentLeft+10;
				pacman.css({"left":newLeft});
				break;
			case 2:
				newTop = currentTop+10;
				pacman.css({"top":newTop});
				break;
			case 3:
				newLeft = currentLeft-10;
				pacman.css({"left":newLeft});
				break;
			case 4:
				newTop = currentTop-10;
				pacman.css({"top":newTop});
				break;
		}
	} else {
		changeDirectionOpen(d);
		rotatePacman(d);
	}
	contactCheck();
}
//*************End Move Pacman***************


//*******************************************
//****************Dot Maker******************
//*******************************************
dotCount = 0;
wHeight = $(window).height()-50;
wWidth = $(window).width()-50;

dotArray = new Array();

function addDot(){
	var newid = "dot"+dotCount;
		 	
 	var $newDiv = $("<div/>");   
	$newDiv.attr("id", newid);  
	$newDiv.addClass("dot"); 
 	setPosition($newDiv);
 	
 	$('body').append($newDiv);
 	dotArray.push(center($newDiv));
 	dotCount+=1;
}

function setPosition(x){
	var bTop = parseInt($("#button").position().top,10);
	var bLeft = parseInt($("#button").position().left,10)-100;
	var t = randHeight();
	var l = randWidth();
	x.css({"top":t});
	x.css({"left":l});
	var tInt = parseInt(t,10);
	var lInt = parseInt(l,10);
	//$("#display").text("bLeft: " + bLeft + " bTop: " + bTop + " lInt: " + lInt + " tInt: " + tInt);
	while(tInt>bTop-50&&lInt>bLeft-50&&lInt<bLeft+250){
		t = randHeight();
		l = randWidth();
		x.css({"top":t});
		x.css({"left":l});
		tInt = parseInt(t,10);
		lInt = parseInt(l,10);
	}
	
}

function randHeight(){
	
	var rand = Math.floor((Math.random() * wHeight) + 1); 
	return rand+"px";
}

function randWidth(){
	var rand = Math.floor((Math.random() * wWidth) + 1); 
	return rand+"px";
}

//*************End Dot Maker***************


//*******************************************
//**************Contact Check****************
//*******************************************
score = 0;

function center($element){
	var eTop = parseInt($element.position().top,10);
	var eLeft = parseInt($element.position().left,10);
	var eBWidth = parseInt($element.css("borderRightWidth"),10);
	
	var center = [eLeft+eBWidth,eTop+eBWidth];
	return center;
}

function contact(a,b){
	
	var xd = a[0]-b[0];
	var yd = a[1]-b[1];
	var distance = Math.sqrt(xd*xd+yd*yd);
	
	if(distance<=60){
		return true;
	}
	return false;	
}

function contactCheck(){
	var pacmanCenter = center($("#pacman"));
	for(var i = 0;i<dotArray.length;i++){
		if(contact(pacmanCenter,dotArray[i])){
			var dotId = "#dot"+i;
			$(dotId).remove();
			dotArray[i][0] = 10000;
			dotArray[i][1] = 10000;
			addDot();
			score+=1;
			$("body > h1").text("Your score: "+score);
			break;
		} 
	}
}
//*************End Contact Check***************

//*******************************************
//******************Timer********************
//*******************************************
function countDown(){
	$("#button > p").hide();
	$("#timer").show();
	var counter = 0;
	var timeRemaining = 10-counter;
	$("#timer h1").text(timeRemaining);
	
	var interval = setInterval(function() {
	     timeRemaining = 9-counter;
		$("#timer h1").text(timeRemaining);
		
		if(timeRemaining>0&&timeRemaining<4){
			$("#button").css("background-color","#ff6600");
		}	
	     if (timeRemaining == 0) {
	     	$("#button").css("background-color","#ee2222");
			clearInterval(interval);
			$("#timer h1").text("game over");
			$(document).off();
			alert("You ate "+score+"dots! Pretty good! Click 'okay' to try again.");
			refresh();
			$("#button > p").show();
			$("#timer").hide();
			
	    	}
	    	counter++;
	}, 1000);
}



//****************End Timer******************

function move(){$(document).keypress(function(event){
		var mouthTop = $("#pacman div");
		var mouthBottom = $("#pacman div:nth-child(2)");
		if(displaying(mouthTop)){
			littleOpen();
			if(closing){
				$("#pacman").css({borderRightColor:"#FFF000"});
				closing = false;
			} else {
				closing = true;
			}
		} else {
			littleClose();
			if(closing){
				
			} else {
				$("#pacman").css({borderRightColor:"transparent"});
			}
		}
		var key = event.keyCode || event.which;
		
		
		switch(key){
			case 39:
				movePacman(1);
				direction = 1;
				break;
			case 40:
				movePacman(2);
				direction = 2;
				break;
			case 37:
				movePacman(3);
				direction = 3;
				break;
			case 38:
				movePacman(4);
				direction = 4;
				break;
			}
		
		});}
		
function refresh(){
	for(var i = 0;i<dotCount;i++){
		var dotId = "#dot"+i;
		$(dotId).remove();
	}
	score = 0;
	dotCount = 0;
	$("body > h1").text("Your score: "+score);
	dotArray = new Array();
	
}
