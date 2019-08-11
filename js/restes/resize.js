 
$(function(){

	
    // adaptation du script de fermeture de la fenetre au resize 
    $(window).resize(function(){

    	var largeur = $(document).width();
    	var carte4 = new Map(largeur);
    	carte4.remonte();

    });










	$('#signature').mousedown(function(e){ // position de la souris au click 

	    var xClick = e.pageX - this.offsetLeft; // position de la souris dans le canvas 
	    var yClick = e.pageY - this.offsetTop;

	    paint = true; 
	    addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop); 
	    redraw();
	}); 


	$('#signature').mousemove(function(e){ // position de la souris en temps reel

	    if(paint){

	        addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
	        redraw();
	    }

	});


	$('#signature').mouseup(function(e){ // arreter le dessin au lever de la souris 

	    paint = false; 

	}); 


	$('#signature').mouseleave(function(e){ // arreter le dessin a la sortie du cadre

	    paint = false; 

	}); 

	$('#recommencer').click(function(){

	    clearDraw();

	});


	var clickX = new Array();
	var clickY = new Array();
	var clickDrag = new Array();
	var paint;

	function addClick(x, y, dragging){ // creation de tableaux avec coordonnees et booleens
	                                     // afin de pouvoir derouler les coordonnees pendant le mousedown
	                                     // et eviter les dessin en pointille      
	    clickX.push(x);
	    clickY.push(y);
	    clickDrag.push(dragging);
	}

	

	function redraw(){

		var canvas  = document.querySelector('#signature');
		var context = canvas.getContext('2d');

	    $('#signature').addClass('envoyer');

	     // context.clearRect(0, 0, context.canvas.width, context.canvas.height);

	      context.strokeStyle = "#00000";
	      context.lineJoin = "round";
	      context.lineWidth = 4;
	     
	      for(var i = 0 ; i < clickX.length ; i++){ // lecture des tableaux 

	         context.beginPath();

	        if(clickDrag[i] && i){ // boucle sur le booleen pour que Bool soit = true pendant tout le deplacement de ls souris
	                            // ainsi le dessin se fait en continue et non en pointilles  

	            context.moveTo(clickX[i-1], clickY[i-1]); // -1 pour repositionner le depart a chaque deplacement de la souris 
	        }
	        else {

	            context.moveTo(clickX[i] - 1, clickY[i]); // si on leve la souris, le dessin recommence depuis la nouvelle position
	        }                                             // de la souris. Evite a la nouvelle ligne dessinnee 
	                                                      // de se raccorder avec une ancienne
	        context.lineTo(clickX[i], clickY[i]);

	        context.closePath();
	        context.stroke();

	     }
	}

	function clearDraw(){ // supprimer la signature precedente 

	    context.clearRect(0, 0, context.canvas.width, context.canvas.height); // suppression de la signature actuelle  

	    for(i = 0 ; i < clickX.length ; i++){ // suppression du tableau de coordonnee pour eviter que la signature reaparaisse 

	        delete clickX[i];
	    }

	    $('#signature').removeClass('envoyer');
	}



	var min = 0;
	var sec = 60;

	function Timer(){

		if(min >= 0 && sec >= 1){

			sec -= 1;

			if(sec == 0){

				min -= 1;
				sec = 60;
			}
		}

		if(min == 0 && sec == 1){

			sec = 0;
			min = 0;

			sessionStorage.nomActuel = " ";
			$('#name_station').text(" ");

			var veloRetour = sessionStorage.veloOrigin; 
			$('#span_3').text(veloRetour); 

			var emplacementRetour = sessionStorage.emplacementOrigin; 
			$('#span_4').text(emplacementRetour); 
			
			$('.infos_piedDepage').css('transition', '1s ease-in-out').css('background', 'rgba(0, 128, 0, 0.7)');
			$('.infos_piedDepage_titre p').text("votre reservation est terminee");
		}

		sessionStorage.time = min + " : " + sec;

		$('#temps_restant').text(" " + sessionStorage.time);
	}

	
			
    // reservation

   	$('#annuler').prop('disabled', true); 

    $('#envoyer').click(function(){

    	nombreVelos = sessionStorage.veloOrigin; 

      	if(nombreVelos > 0){

	      	if($('#signature').hasClass('envoyer')){ // si on a signe

	      		sessionStorage.nomAcutel = $('#name_station').text();
			    console.log("nom actuel = " + sessionStorage.nomAcutel);

			    sessionStorage.veloAcutel = $('#span_3').text();
			    console.log("velo actuel = " + sessionStorage.veloAcutel);

			    sessionStorage.emplacementAcutel = $('#span_4').text();
			    console.log("emplacement actuel = " + sessionStorage.emplacementAcutel);

			    console.log("nom origin = " + sessionStorage.nomOrigin);
			    console.log("velo origin = " + sessionStorage.veloOrigin);
			    console.log("emplacement origin = " + sessionStorage.emplacementOrigin);
		    
			    if(sessionStorage.nomAcutel != sessionStorage.nomOrigin){

			    	var velo = sessionStorage.veloOrigin; 
			    	velo = Number(velo); // au click on retire 1 velo 
		      		velo = velo - 1;
		      		$('#span_3').text(velo);

		      		var emplacement = sessionStorage.emplacementOrigin;
		      		emplacement = Number(emplacement);
		      		emplacement = emplacement + 1; 
		      		$('#span_4').text(emplacement); 
			    }

	      		clearDraw(); // vider le canvas 

		    	var mon_interval = setInterval(Timer, 1000); // engendrer le timer de 20mn 

		    	// afficher les infos de reservation  
		    	$('.infos_piedDepage_titre p').text("votre reservation est enregistree");
				$('.infos_piedDepage').animate({opacity:'1'}, 1000).css('background', 'rgba(244, 47, 52, 0.7)');

				// activer le bouton annuler 
				$('#annuler').prop('disabled', false);

				// stocker et afficher le nom de la station ou l'on a reserve 
				sessionStorage.nomActuel = sessionStorage.nomOrigin;
				$('#name_station').text(" " + sessionStorage.nomActuel);

				// si le temps est a 0, au click, on relance le timerde 20mn du debut 
				if(min == 0 && sec == 0){

					clearInterval(mon_interval);

					sec = 60;
					min = 0;
		    		
		    	}

		    	// si on click pendant le decompte, le timer de 20mn repart du debut 
		    	if(sec < 60 && sec > 0){

					clearInterval(mon_interval);

					sec = 60;
					min = 0;
		    	}
	    	}
	    	else { //si on a pas signe 

	    		clearInterval(mon_interval); // on affiche un message d'alerte

	    		$('.infos_piedDepage').css('background', 'rgba(0, 128, 0, 0.7)').css('transition', '1s ease-in-out').css('opacity', '1');
				$('.infos_piedDepage_titre p').text("il faut d'abord signer !");
	    	}
	    }
	    else {

    		$('.infos_piedDepage').css('background', 'rgba(0, 128, 0, 0.7)').css('transition', '1s ease-in-out').css('opacity', '1');
			$('.infos_piedDepage_titre p').text("Plus de velos disponibles");
		
			if(sec < 60 && sec > 0){ // remise a zero du compteur si decompte en cours 

				clearInterval(mon_interval);

				sec = 0;
				min = 0;

	    	}
    	}
    });


    $('#annuler').click(function(){

    	// desactiver le bouton annuler 
		$('#annuler').prop('disabled', true);

    	sec = 0;	// au click sur annuler, le compter est remis a 0 
		min = 0;

		sessionStorage.nomActuel = " ";
		$('#name_station').text(" ");

		var veloRetour = sessionStorage.veloOrigin; 
		$('#span_3').text(veloRetour); 

		var emplacementRetour = sessionStorage.emplacementOrigin; 
		$('#span_4').text(emplacementRetour); 

		// message d'alerte pour avertir de la fin de la resdervation 
		$('.infos_piedDepage').css('transition', '1s ease-in-out').css('background', 'rgba(0, 128, 0, 0.7)');
		$('.infos_piedDepage_titre p').text("votre reservation est terminee"); 

    }); 


});