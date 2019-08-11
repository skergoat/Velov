$(function(){

	class slider {

		constructor(nb, angle1, divId1, divId5) {

			this.nb = nb;  // id du bouton clique ("droite" ou "gauche")
			this.angle1 = angle1; // angle de rotation du cube (+90 deg ou -90 deg)
			this.divId1 = divId1; // id de la face presente du cube 
			this.divId2 = 0; // id de la face cachee droite 
			this.divId3 = 0; // id de la face cachee gauche  
	
		}

		titres(){

			// descente du titre de la face visible du cube 

			$('#titre_' + this.divId1).animate({'top' : '+=160px'}, {queue : false, duration:400}).animate({'opacity':'1'}, 350).animate({'top'  : '-=20px'}, 200).animate({'top'  : '+=10px'}, 200).addClass('descendu');
				
			// selon le bouton clique, remonte du titre des faces precedemment visibles du cube 

			if(this.nb == "gauche"){

				$('#titre_' + this.divId2).animate({'opacity':'0'},250).animate({'top' : '0px'},  {queue:false, duration:450});
			}
			if(this.nb == "droite"){

				$('#titre_' + this.divId3).animate({'opacity':'0'},250).animate({'top' : '0px'},  {queue:false, duration:450});
			}

		}

		ombrage(){

			// calcul id des faces droite et gauche 

			if(this.divId1 == 4) { this.divId3 = 1; } else { this.divId3 = this.divId1 + 1; } 

			if(this.divId1 == 1) { this.divId2 = 4; } else { this.divId2 = this.divId1 - 1; } 

					
			console.log("id 3 = " + this.divId3); 
			console.log("id 1 = " + this.divId1);
			console.log("id 2 = " + this.divId2);

			// brillance ou obscurcissement des faces selon leur id 

			$('#' + this.divId3).css('filter', 'brightness(50%)').css('transition', '1s ease-in-out');

			$('#' + this.divId1).css('filter', 'brightness(100%)').css('transition', '1s ease-in-out');

			$('#' + this.divId2).css('filter', 'brightness(50%)').css('transition', '1s ease-in-out');

		}

		// rotation du cube 

		rotate(){

			$('.rotate').prop('disabled', true); // rendre les boutons inactifs le temps de la rotation 

			$('.slider').css('transform', 'rotateY(' + this.angle1 + 'deg)'); // rotation du cube 

			setTimeout(function(){

				$('.rotate').prop('disabled', false); // boutons actifs apres la rotation 

			}, 1000);
	
		}

	}

	var angle1 = 0;  // angle de depart du cube 
	var divId1 = 1; // id de depart des faces du cube 

	$('.titre').css('opacity', '0').css('box-shadow', '1px 1px 10px #555'); // position de depart des titres du slider 
	$('#titre_1').css('opacity', '1').css('top', '160px');

	$(".rotate").click(function(e){


		var nb = this.id; 


		if(nb === "droite"){

			angle1 -= 90; // le cube tourne de - 90 deg

			if(divId1 <= 1) { divId1 = 4; } else { divId1 -= 1; } // calcul de l'id de la face visible du cube
																  // permet ensuite de calculer les id des faces cachees droite et gauche
																  // et de les eclairer ou les obscurcir selon la position du cube
		}

		if(nb === "gauche") {

			if(divId1 > 3) { divId1 = 1; } else { divId1 += 1; } // idem 

			angle1 += 90; // le cube tourne de + 90 deg

		}

		var newSlider = new slider(nb, angle1, divId1);
		newSlider.rotate(); // rotation du cube 
		newSlider.ombrage(); // obscurcissement et eclaircissement des faces selon la position du cube 

		setTimeout(function(){

			newSlider.titres(); // descente et montee des titres apres rotation du cube 

		}, 500);
		
	}); 

	// reaction aux touches du clavier

	$(document).keydown(function(e){

		var donnee = e.which;
		
		if (donnee == 37){

			var nb = "gauche";

			if(divId1 > 3) { divId1 = 1; } else { divId1 += 1; } // idem 

			angle1 += 90; // le cube tourne de + 90 deg
			
		} 

		if(donnee == 39) {

			var nb = "droite";

			angle1 -= 90; // le cube tourne de - 90 deg

			if(divId1 <= 1) { divId1 = 4; } else { divId1 -= 1; } // calcul de l'id de la face visible du cube
																  // permet ensuite de calculer les id des faces cachees droite et gauche
															      // et de les eclairer ou les obscurcir selon la position du cube	
		}

		var newSlider = new slider(nb, angle1, divId1);
		newSlider.rotate(); // rotation du cube 
		newSlider.ombrage(); // obscurcissement et eclaircissement des faces selon la position du cube 

		setTimeout(function(){

			newSlider.titres(); // descente et montee des titres apres rotation du cube 

		}, 500);

	});

});