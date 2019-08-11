
$(function(){

	// constante qui va recevoir les parametres des elements a animer 
	// et qui va les animer en faisant appel a des classes CSS 	

	const Animation = {

		TimeTest(){

	    	$('.' + this.element).animate({'opacity':'1'}, 1000).addClass(this.classAnimation); 
	    	
		}
	};
  
  	// classe liee a la constante, qui servira a appeler sa methode TimeTest

	class AnimationParam {

		constructor(element, classAnimation){

			this.element = element;
			this.classAnimation = classAnimation; 
		}	

	}

	// classe qui va calculer a quelles hauteurs le scroll delcenchera les animations 
	// et qui animera chaque element avec un interval      

	class AnimationPage {

		constructor(div1, div2, div3, animationScroll, div4){

			this.animationScroll = animationScroll;		// envoie la classe CSS qui contient l'animation 
			this.div1 = div1; 							// envoie l'element a animer  
			this.div2 = div2;
			this.div3 = div3;  
			this.div4 = div4;  
			this.animationScroll4 = 'animationScroll4'; 

			this.offset2 = $(document).height(); 		// hauteur du document pour calculer a quel moment le scroll delcenche l'animation
														// chaque animation est delenchee quand le scroll a atteint un ceratin poucentage de la hauteur de la page 

			// animation des elements "offres"							
			this.heightPourcent1 = this.offset2 * 2.3 / 100;   // moment de declenchement des titres  
			this.heightPourcent2 = this.offset2 * 24 / 100; 
			this.heightPourcent3 = this.offset2 * 9 / 100; 	   // delcenchement des offres  
			this.heightPourcent4 = this.offset2 * 33 / 100; 	
			this.heightPourcent5 = this.offset2 * 20 / 100;    // delenchement du bouton 	
			this.heightPourcent6 = this.offset2 * 39 / 100; 


			// animation des elements "actus"
			this.heightPourcent7 = this.offset2 * 42 / 100 ; 	// moment de declenchement des titres  
			this.heightPourcent8 = this.offset2 * 65.7 / 100; 
			this.heightPourcent9 = this.offset2 * 54 / 100; 	// declenchement des actus  
			this.heightPourcent10 = this.offset2 * 74.7 / 100; 
			this.heightPourcent11 = this.offset2 * 65.7 / 100;  // declenchement du bouton 
			this.heightPourcent12 = this.offset2 * 80.7 / 100; 

		}

		// declenche l'animation du bouton

    	EnvoyerDiv(){

			Object.setPrototypeOf(AnimationParam.prototype, Animation); // lien entre la classe AnimationParam et la constante 

	    	var animationScroll = this.animationScroll; 				// delcaration des variables pour les distribuer dans les intervals
	    	var div1 = this.div1;	
	    	var div2 = this.div2;
	    	var div3 = this.div3; 

	    	setTimeout(function(){										// animation des elements par interval 

	    		var envoyerDiv = new AnimationParam(div1, animationScroll); 	// envoie des donnees du constructeur a la constante 
	    		envoyerDiv.TimeTest();  										// animation de l'element 

	    		setTimeout(function(){

		    		var envoyerDiv = new AnimationParam(div2, animationScroll);
	    			envoyerDiv.TimeTest();  

		    		setTimeout(function(){

			    		var envoyerDiv = new AnimationParam(div3, animationScroll);
	    				envoyerDiv.TimeTest();  

			    	}, 150); 

		    	}, 100);

	    	}, 50);

		}

		EnvoyerTitre(){

			Object.setPrototypeOf(AnimationParam.prototype, Animation);

	    	var animationScroll = this.animationScroll;
	    	var div1 = this.div1;
	    	var div2 = this.div2;
	    	var div3 = this.div3;
	    	var div4 = this.div4; 

	    	setTimeout(function(){

	    		var envoyerTitre = new AnimationParam(div1, animationScroll);
	    		envoyerTitre.TimeTest();  

	    		setTimeout(function(){

		    		var envoyerTitre = new AnimationParam(div2, animationScroll);
	    			envoyerTitre.TimeTest();  

		    		setTimeout(function(){

			    		var envoyerTitre = new AnimationParam(div3, animationScroll);
	    				envoyerTitre.TimeTest(); 

	    				setTimeout(function(){ 

	    					var envoyerTitre = new AnimationParam(div4, animationScroll);
	    					envoyerTitre.TimeTest(); 

	    				}, 100);

			    	}, 80);

		    	}, 60);

	    	}, 30);
	    }

	    // animation du bouton 

	    EnvoyerBouton(bouton){

			Object.setPrototypeOf(AnimationParam.prototype, Animation); // lien entre la classe AnimationParam et la constante 

			var envoyerBouton = new AnimationParam(bouton, this.animationScroll4); // envoie des donnees du constructeur a la constante 
	    	envoyerBouton.TimeTest(); 											   // animation du bouton
		}

		// modifient le moment d'apparition des boutons lorsque $(document) < 500px

	    setHeightPourcent5(){

	    	this.heightPourcent5 = this.offset2 * 28 / 100; 
	    }

	    setHeightPourcent11(){

	    	this.heightPourcent11 = this.offset2 * 73.7 / 100; 
	    }

	}

	
	var offset = $("nav").offset().top;			// position de la nav sur la page en temps reel 
												// permet de delenche l'animation au chargement de la page
												// si l apage se charge sur l'element et que le scroll n'a pas encore eu lieu  

	
												// chargement des animations au chargement de la page, sans scroll 

												// les offres  

	var valeurScroll = new AnimationPage();		// instanciation de la classe 	

	if(offset > valeurScroll.heightPourcent1 && offset < valeurScroll.heightPourcent6) { // on est sur l'element qui devrait normalement apparaitre au scroll
																						 // alors on lance toutes les animations en meme temps 
		// les titres																				
		var animationTitre = new AnimationPage('titre_animated1:nth-child(1)', 'titre_animated1:nth-child(2)','titre_animated1:nth-child(3)', 'animationScroll3', 'titre_animated1:nth-child(4)');
		animationTitre.EnvoyerTitre();

		// les actus 
		var animationDiv = new AnimationPage('div_offres:nth-child(1)', 'div_offres:nth-child(2)', 'div_offres:nth-child(3)', 'animationScroll1');
		animationDiv.EnvoyerDiv();

		// le bouton 
		var animationBouton = new AnimationPage();
		animationBouton.EnvoyerBouton('bouton1');
	}											
												// les actus 


	if(offset > valeurScroll.heightPourcent7 && offset < valeurScroll.heightPourcent12) {

		// les titres 
		var animationTitre = new AnimationPage('titre_animated2:nth-child(1)', 'titre_animated2:nth-child(2)','titre_animated2:nth-child(3)', 'animationScroll3', 'titre_animated2:nth-child(4)');
		animationTitre.EnvoyerTitre();


		// les actus 
		var animationDiv = new AnimationPage('div_actus:nth-child(1)', 'div_actus:nth-child(2)', 'div_actus:nth-child(3)', 'animationScroll2');
		animationDiv.EnvoyerDiv();


		// le bouton 
		var animationBouton = new AnimationPage();
		animationBouton.EnvoyerBouton('bouton2');

	}

	$(window).resize(function(){					// si resize et que les animations ne sont pas chargees 

		var offset = $("nav").offset().top;			// position de la nav sur la page en temps reel 
													// permet de delenche l'animation au chargement de la page
													// si l apage se charge sur l'element et que le scroll n'a pas encore eu lieu  

		
													// chargement des animations au chargement de la page, sans scroll 

													// les offres  

		var valeurScroll = new AnimationPage();		// instanciation de la classe 	

		if(offset > valeurScroll.heightPourcent1 && offset < valeurScroll.heightPourcent6) { // on est sur l'element qui devrait normalement apparaitre au scroll
																							 // alors on lance toutes les animations en meme temps 
			// les titres																				
			var animationTitre = new AnimationPage('titre_animated1:nth-child(1)', 'titre_animated1:nth-child(2)','titre_animated1:nth-child(3)', 'animationScroll3', 'titre_animated1:nth-child(4)');
			animationTitre.EnvoyerTitre();

			// les actus 
			var animationDiv = new AnimationPage('div_offres:nth-child(1)', 'div_offres:nth-child(2)', 'div_offres:nth-child(3)', 'animationScroll1');
			animationDiv.EnvoyerDiv();

			// le bouton 
			var animationBouton = new AnimationPage();
			animationBouton.EnvoyerBouton('bouton1');
		}											
													// les actus 


		if(offset > valeurScroll.heightPourcent7 && offset < valeurScroll.heightPourcent12) {

			// les titres 
			var animationTitre = new AnimationPage('titre_animated2:nth-child(1)', 'titre_animated2:nth-child(2)','titre_animated2:nth-child(3)', 'animationScroll3', 'titre_animated2:nth-child(4)');
			animationTitre.EnvoyerTitre();


			// les actus 
			var animationDiv = new AnimationPage('div_actus:nth-child(1)', 'div_actus:nth-child(2)', 'div_actus:nth-child(3)', 'animationScroll2');
			animationDiv.EnvoyerDiv();


			// le bouton 
			var animationBouton = new AnimationPage();
			animationBouton.EnvoyerBouton('bouton2');

		}

	});


	$(window).scroll(function(){						// au scroll 

		var scrollTop = $(document).scrollTop();		// position du scroll en temps reel. Permet de declarer a quel moment du scroll on lance l'animation  
		var documentWidth = $(document).width();		// largeur de la page en temps reel. permet de modifier l'animation des boutons sur smartphone  	
		

														// animtion des offres 

		var valeurScroll = new AnimationPage();			// instanciation de la classe 

   		if(documentWidth < 520){						// sur smartphone 

   			valeurScroll.setHeightPourcent5();			// on fait apparaitre les boutons plus tard 
   		}

		if(scrollTop > valeurScroll.heightPourcent1 && scrollTop < valeurScroll.heightPourcent2) { // selon la position du scroll sur la page 
																								   // on envoie les donnes au constructeur pour animer les elements 

			// les titres 																					   
			var animationTitre = new AnimationPage('titre_animated1:nth-child(1)', 'titre_animated1:nth-child(2)','titre_animated1:nth-child(3)', 'animationScroll3', 'titre_animated1:nth-child(4)');
	    	animationTitre.EnvoyerTitre();
		}

	   	if(scrollTop > valeurScroll.heightPourcent3 && scrollTop < valeurScroll.heightPourcent4){

	    	// les offres 
	    	var animationDiv = new AnimationPage('div_offres:nth-child(1)', 'div_offres:nth-child(2)', 'div_offres:nth-child(3)', 'animationScroll1');
	    	animationDiv.EnvoyerDiv();

	    }

	    if(scrollTop > valeurScroll.heightPourcent5 && scrollTop < valeurScroll.heightPourcent6){

	    	// le bouton 
	    	var animationBouton = new AnimationPage();
			animationBouton.EnvoyerBouton('bouton1');

	    }
	    
	    																						// animtion des actus 
		var valeurScroll = new AnimationPage();
   		// animation titre 

   		if(documentWidth < 520){																// sur smartphone on fait apparaitre le bouton plus tard 

   			valeurScroll.setHeightPourcent11();
   			
   		} 

		if(scrollTop > valeurScroll.heightPourcent7 && scrollTop < valeurScroll.heightPourcent8) {

			// les titres 
			var animationTitre = new AnimationPage('titre_animated2:nth-child(1)', 'titre_animated2:nth-child(2)','titre_animated2:nth-child(3)', 'animationScroll3', 'titre_animated2:nth-child(4)');
			animationTitre.EnvoyerTitre();
		}

	   	if(scrollTop > valeurScroll.heightPourcent9 && scrollTop < valeurScroll.heightPourcent10){

	    	// les actus 
			var animationDiv = new AnimationPage('div_actus:nth-child(1)', 'div_actus:nth-child(2)', 'div_actus:nth-child(3)', 'animationScroll2');
			animationDiv.EnvoyerDiv();
	    }

	    if(scrollTop > valeurScroll.heightPourcent11 && scrollTop < valeurScroll.heightPourcent12){

	    	// le bouton 
	    	var animationBouton = new AnimationPage();
			animationBouton.EnvoyerBouton('bouton2');

	    }
		       	
	});

});