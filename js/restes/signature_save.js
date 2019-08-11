$(function() {

 // signature du formulaire 
    // evenements signature

    $('#signature').bind('touchstart mousedown', function(e){ // position de la souris au click 

	    var xClick = e.pageX - this.offsetLeft; // position de la souris dans le canvas 
	    var yClick = e.pageY - this.offsetTop;

	   paint = true; 

	    addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop); // envoyer coordonnee souris 
	    redraw(); // dessiner 
	     
	}); 


	$('#signature').bind('touchmove mousemove', function(e){ // position de la souris en temps reel

	    if(paint){

		   	addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true); // envoyer coordonnees souris 
		   	redraw();    // dessiner 
	    }
	});


	$('#signature').bind('touchend mouseup', function(e){ // arreter le dessin au lever de la souris 

	    paint = false;

	}); 


	$('#signature').bind('touchend mouseleave', function(e){ // arreter le dessin a la sortie du cadre


	     paint = false; 

	}); 

	$('#recommencer').bind('touchstart click', function(){ // effacer la signature  

	    clearDraw();
	});

	var clickX = new Array(); // tableaux contenant les coordonnees de la souris 
	var clickY = new Array();
	var clickDrag = new Array();
	var paint; 


	function addClick(x, y, dragging){ // templir les tableaux contenant les coordonnees de la souris 

		clickX.push(x);				// coordonnees
		clickY.push(y);
		clickDrag.push(dragging);   // valeurs de paint 
	}

	canvas = document.querySelector('#signature'); // delcarer le canvas et le contexte 
	context = canvas.getContext('2d');

	function redraw(){

	    //this.clickDrag.push(dragging);

	    $('#signature').addClass('envoyer');

	     // context.clearRect(0, 0, context.canvas.width, context.canvas.height);

	      context.strokeStyle = "#00000"; // style du trait 
	      context.lineJoin = "round";
	      context.lineWidth = 4;
	     
	    for(var i = 0 ; i < clickX.length ; i++){ // lecture des tableaux 

	         context.beginPath(); // debut du dessin 

	        if(clickDrag[i] && i){ // boucle sur le booleen pour que Bool soit = true pendant tout le deplacement de ls souris
	                            // ainsi le dessin se fait en continue et non en pointilles  

	            context.moveTo(clickX[i-1], clickY[i-1]); // -1 pour repositionner le depart a chaque deplacement de la souris 
	        }
	        else {

	            context.moveTo(clickX[i] - 1, clickY[i]); // si on leve la souris, le dessin recommence depuis la nouvelle position
	        }                                             // de la souris. Evite a la nouvelle ligne dessinnee 
	                                                      // de se raccorder avec une ancienne
	        context.lineTo(clickX[i], clickY[i]);

	        context.closePath(); // fin du dessin 
	        context.stroke();

	     }
	}

	function clearDraw(){ // supprimer la signature precedente 

	    context.clearRect(0, 0, context.canvas.width, context.canvas.height); // suppression de la signature actuelle  

	    for(i = 0 ; i < clickX.length ; i++){ // suppression du tableau de coordonnee pour eviter que la signature reaparaisse 

	        delete clickX[i];
	    }

	    $('#signature').removeClass('envoyer'); // bloque l'inscription si pas de signature 
	}

	class Inscription {

		constructor(message){

			this.message = message; // message a afficher dans le pied de page 

			this.nameStation = $('#name_station'); // divou afficher les donnees de l'API
			this.span3 = $('#span_3');
			this.span4 = $('#span_4');

			this.titreFooter = $('.infos_piedDepage_titre p'); // station de reservation 
			this.infoFooter = $('.infos_piedDepage');		   // pour la couleur de fond du pied de page  
			this.temps = $('#temps_restant');				   // pour l'affichage du timer  

			sessionStorage.nomAcutel = this.nameStation.text();	// stockage du nom de la station ou a lieu la reservation
			sessionStorage.veloAcutel = this.span3.text();   	// stockage du nombre de velo apres reservation 
			sessionStorage.emplacementAcutel = this.span4.text(); // stockage du nb d'emplacements apres reservation  

			sessionStorage.nomOrigin;	// stockage du nom du marker clique en temps reel != emplacement reserve  				
			sessionStorage.veloOrigin;	// stockage du nombre de velo avant la reservation 
			sessionStorage.emplacementOrigin; // stockage du nb d'emplacements avant la reservation 

		}

		// affiche du pied de page, de sa couleur et des messages appropries 
		Message(){

			var message = this.message; // message recu dans le constructeur  

			switch(message) { //pour chaque message une couleur de pied de page et une animation sont associees 

				case 'votre reservation est enregistree':
				this.infoFooter.animate({opacity:'1'}, 1000).css('background', 'rgba(0, 128, 0, 0.7)');
				break; 

				case 'il faut d\'abord signer !':
				this.infoFooter.css('background', 'rgba(244, 47, 52, 0.7)').css('transition', '1s ease-in-out').css('opacity', '1');
				break;

				case 'Plus de velos disponibles':
				this.infoFooter.css('background', 'rgba(244, 47, 52, 0.7)').css('transition', '1s ease-in-out').css('opacity', '1');
				break;

				case 'votre reservation est terminee':
				this.infoFooter.css('transition', '1s ease-in-out').css('background', 'rgba(244, 47, 52, 0.7)');
				break;
			}

			var affiche = this.titreFooter.text(message);

			return affiche; 

		}

		EnvoyerInscription(){ // genere l'inscription 

			if(sessionStorage.nomAcutel != sessionStorage.nomOrigin){ // si on ne vient pas de reserver sur cette station
																	  // a la reservation, on ajoute +1 emplacement 
																	  // et on a retranche -1 velo  

		    	var velo = sessionStorage.veloOrigin; 	// on recupere nb de velo de la station de reservation 						
		    	velo = Number(velo); 				    // on retranche -1 velo 
	      		velo = velo - 1;
	      		this.span3 .text(velo);

	      		var emplacement = sessionStorage.emplacementOrigin; // on recupere nb de velo de la station de reservation
	      		emplacement = Number(emplacement);					// on retranche +1 emplacement
	      		emplacement = emplacement + 1; 
	      		this.span4.text(emplacement); 
		    }

      		clearDraw(); // au moment de la reservation, on vide le canvas 

      		//this.message = 'votre reservation est enregistree'; // on affiche le pied de page, le message et la couleur appropriee 

	    	//this.Message();  

			// activer le bouton annuler 
			$('#annuler').prop('disabled', false);	// on active le bouton "annuler"

			sessionStorage.nomActuel = sessionStorage.nomOrigin;	// on stocke le nom de la station de reservation 
			this.nameStation.text(" " + sessionStorage.nomActuel);  // et on l'affiche 

		}

		AnnulerInscription(){ // annulation inscription ou inscription expiree 

			// desactiver le bouton annuler 
			$('#annuler').prop('disabled', true); // desactivation du bouton "annuler"

			this.resetTime();	// on vide les div contenant les infos de reservation 

			//this.message = 'votre reservation est terminee'; // on affiche le message approprie 
			this.Message();  
		}

		resetTime(){	// pour vider les infos de reservation ou les remettre a zero 

			sessionStorage.nomActuel = " ";	// on vide le nom de la station de reservation 
			this.nameStation.text(" ");

			var veloRetour = sessionStorage.veloOrigin; 	// on retablit le nombre originel de velos et d'emplacements 
			this.span3.text(veloRetour); 

			var emplacementRetour = sessionStorage.emplacementOrigin; 
			this.span4.text(emplacementRetour);
		}

	}



	var min = 19;
	var sec = 60;

	function Timer(){

		if(min >= 0 && sec >= 1){ // si min et sec ne sont pas nuls ou arrives a expiration 

			sec -= 1;	// on retranche -1 sec 

			if(sec == 0){ // a chaque fois que sec = 0 

				min -= 1; // alors on ped 1 minute 
				sec = 60; // et on repart pour decompter 60 sec 

				// cela jusqu'au moment ou sec = 0 et min = 0
			}
		}

		if(min == 0 && sec == 1){ // si on est arrive au bout du timer 

			sec = 0;  // on met tout a zero 
			min = 0;

			var arreter = new Inscription(); // et on envoie les messages appropries 
			arreter.AnnulerInscription();
		}

		sessionStorage.time = min + " : " + sec; // on stocke le timer en train de s'ecouler 

		$('#temps_restant').text(" " + sessionStorage.time); // et on l'affiche dans le pied de page 
	}

	
    // reservation

   	$('#annuler').prop('disabled', true);  // bouton "annuler" desactive 

    $('#envoyer').bind('touchstart click', function(){ // au click sur le bouton "envoyer"

    	nombreVelosOrigin = sessionStorage.veloOrigin;  // on verifie que le nb de velos de la station != 0
		nombreVelosActuel = sessionStorage.veloActuel; 

    	if(!$('#signature').hasClass('envoyer')){ // on verifie qu'il y a bien une signature 

    		var message1 = new Inscription('il faut d\'abord signer !');
			message1.Message();

			//clearInterval(mon_interval);
    	}

    	else if(nombreVelosOrigin <= 0){

			var message1 = new Inscription('Plus de velos disponibles');
			message1.Message();
    	}

    	else {

    		var message1 = new Inscription('votre reservation est enregistree');	// on affiche les messages de reservation 
	  		message1.Message();
	  		message1.EnvoyerInscription();
	  		
	  		mon_interval = setInterval(Timer, 1000); // on lance le timer de 20mn 

			// si le temps est a 0, au click, on relance le timer de 20mn du debut 
			if( (min == 0 && sec == 0)){

				clearInterval(mon_interval);

				sec = 60;
				min = 19;

	    	}

	    	// si on click pendant le decompte, le timer de 20mn repart du debut 
	    	if(sec < 60 && sec > 0){

				clearInterval(mon_interval);

				sec = 60;
				min = 19;
	    	}

    	}
      
    });


    $('#annuler').bind('touchstart click', function(){ // annuler la redervation 

    	sec = 0;	// au click sur annuler, le compter est remis a 0 
		min = 0;

		var annuler = new Inscription('votre reservation est terminee'); // on affiche les messages appropries 
		annuler.AnnulerInscription();    // et on vide les div d'infos de reservation 

    });

});