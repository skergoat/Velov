//$('html, body').animate({ scrollTop:$('#carte').offset().top + 600 }, 1000);


//var offset = $("nav").offset().top; 

//if(scrollTop > offset + 100){}

	


$(function(){

	var offset = $("nav").offset().top; 
	var scrollTop = $(document).scrollTop();

	$(document).scroll(function(){

		var scrollTop = $(document).scrollTop();
		var offset = $("nav").offset().top; 

		tableau($(document).scrollTop());
		scrollTopKnow();

		tableur($("nav").offset().top);
		offsetKnow();



	}); 



	var table = new Array();
	var table2 = new Array();


	function tableau(scrollTop){

		table.push(scrollTop);
		
	}


	function scrollTopKnow(){

		for(i = 0 ; i < table.length ; i++){

			console.log("scroll = " + table[i]);

		}
	}

	function tableur(offset){

		table2.push(offset);
		
	}

	function offsetKnow(){

		for(i = 0 ; i < table2.length ; i++){

			console.log("offset = " + table2[i]);

		}
	}



});

