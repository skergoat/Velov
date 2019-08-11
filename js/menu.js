$(function(){

	class Menu {

		constructor(elem1, elem2, elem3, class1, class2, class3, class4, class5, class6){

			this.elem1 = elem1;
			this.elem2 = elem2;
			this.elem3 = elem3;
			this.class1 = class1; 
			this.class2 = class2; 
			this.class3 = class3; 
			this.class4 = class4; 
			this.class5 = class5;
			this.class6 = class6; 
			
		}

		// fonction d'ouverture et de fermeture de la fenetre 

		openClose(){

			// declenche ouverture au click

			if(! $('#' + this.elem2).hasClass(this.class3)){

				// disparition du bouton open

				$('.cadre').css('transition', '0.5s ease-in-out').css('opacity', '0');
				$('nav').css('background', 'transparent');
				$('button').fadeOut(200);
				$('.textes').css('z-index', '0');
				$('.container_titres').css('transition', '0s').fadeOut(200);

				// supprime le scroll de la page

				$(this.elem3).removeClass(this.class5);
				$(this.elem3).addClass(this.class6);

				// ouvre la page 

				$('#' + this.elem2).removeClass(this.class4);
				$('#' + this.elem2).addClass(this.class3); 

			}

			// declenche fermeture au click 

			else {

				// apparition du bouton open

				$('.cadre').css('transition', '0s ease-in-out').css('opacity', '1');
				$('nav').css('background', 'white');
				$('button').fadeIn(200);
				$('.textes').css('z-index', '10000');
				$('.container_titres').css('transition', '1s').fadeIn(200);

				// restaure le scroll de la page 

				$(this.elem3).removeClass(this.class6);
				$(this.elem3).addClass(this.class5);

				// ferme la page 

				$('#' + this.elem2).removeClass(this.class3); 
				$('#' + this.elem2).addClass(this.class4);   

				var modal = $('#' + this.elem2);

				// remove la classe "close" pour remettre les dimensions de la fenetre a 0 

				setTimeout(function(){

					modal.removeClass('overlay_close'); 

				}, 500);

			}

		}

		// translation des items a l'ouverture du menu modal 

		animationMenu(elem1, class1, class2){

			// afficher les items a l'apparition du menu

			$('#' + elem1).show().css('animation-duration', '0.5s');

			if(!$('#' + elem1).hasClass(class1)) {

				// desactive la redescente des items

				$('#' + elem1).removeClass(class2);

				// declenchement immediat de l'item 1

				$('#' + elem1 + ':nth-child(1)').addClass(class1);

				// delais pour les autres items 

				setTimeout(function(){

					$('#' + elem1 + ':nth-child(2)').addClass(class1);

					setTimeout(function(){

						$('#' + elem1 + ':nth-child(3)').addClass(class1);

						setTimeout(function(){

							$('#' + elem1 + ':nth-child(4)').addClass(class1);

						}, 150);

					}, 100);

				}, 50);

			}
			else {

				$('#' + elem1).removeClass(class1);
				$('#' + elem1).addClass(class2).css('animation-duration', '0.5s');
			}

		}

		// reduction du bouton "open"

		reduiMenu(){

			$('#menu_open').css('transition', 'ease-in-out, 0.2s');
			// changement de style du bouton 
			$('.' + this.elem1).removeClass(this.class1);
			// changement de style du bouton 
			$('.' + this.elem2).addClass(this.class2);
			// le hamburger remonte 
			$('#' + this.elem3).removeClass(this.class3);
			$('#' + this.elem3).addClass(this.class4);

		}

		// agrandissement du bouton "open" 

		agrandiMenu(){

			$('#menu_open').css('transition', 'ease-in-out, 0.2s');
			// changement de style du bouton 	
			$('.' + this.elem1).addClass(this.class1);
			// changement de style du bouton 
			$('.' + this.elem2).removeClass(this.class2);
			// le hamburger descend 
		 	$('#' + this.elem3).addClass(this.class4);
			$('#' + this.elem3).removeClass(this.class3);

		}

	}


	// ouverture du menu modal 

	$('#menu_open').click(function(){

		// ouverture du menu 

		var menu1 = new Menu('menu_open', 'nav_modal', 'html', 'apear', 'disapear', 'overlay_animated', 'overlay_close', 'avecScroll', 'sansScroll'); 
		menu1.openClose(); 

		// apparition des items  

		var menu2 = new Menu();
		menu2.animationMenu('liste_menu ul li', 'remonte', 'descend'); 

	});


	// fermeture du menu modal  
	
	$('#menu_close').click(function(){

		// fermeture du menu

		var menu3 = new Menu('menu_open', 'nav_modal', 'html', 'apear', 'disapear', 'overlay_animated', 'overlay_close', 'avecScroll', 'sansScroll'); 
		menu3.openClose();

		var menu2 = new Menu();
		menu2.animationMenu('liste_menu ul li', 'remonte', 'descend'); 

	});


	// reduction automatique du menu apres scroll 20px au chargement de la page 

	  // instanciation de menu

	if($(document).scrollTop() >= 20){

		var menu4 = new Menu('redui', 'agrandi', 'menu_close', 'agrandi', 'redui', 'haut', 'bas');
		menu4.reduiMenu(); 
	}


	// active la reduction ou l'agrandissement du menu au scroll 

	$(document).on("scroll", function(){


		if($(document).scrollTop() >= 20){

			// reduit le menu
			var menu4 = new Menu('redui', 'agrandi', 'menu_close', 'agrandi', 'redui', 'haut', 'bas');
			menu4.reduiMenu(); 

		}
		else {

			// agrandit le menu

			var menu4 = new Menu('redui', 'agrandi', 'menu_close', 'agrandi', 'redui', 'bas', 'haut');
			menu4.agrandiMenu(); 

		}

	});

	
});
