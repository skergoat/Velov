$(function(){

	class Map {

		constructor(mot, id){

			this.mot = mot;
			this.id = id; 

		}

		// descend ou monte au formulaire selon taille de la fenetre, si click sur marker  
		descend(largeur){

			if(largeur > 1200) { // si la taille de la fenetre immobile est grande
        					  // alors, au click sur le marqueur, smooth scoll
        					  // jusqu'au top de la map 

				$('html, body').animate({
						scrollTop:$('#carte').offset().top - 80
					}, 700);

				return false;
			}
			else {			// si la fenetre est petite, smooth scroll
							// jusqu'a la fenetre d'inscription responsive 

				$('html, body').animate({
						scrollTop:$('#carte').offset().top + 600
					}, 1000);

				return false;
			}
		}

		// ouvre le formulaire au click 
		openFormulaire(largeur){

			$('.formulaire').css('display', 'block').addClass('etendForm').removeClass('fermerForm');

			this.descend(largeur); // activation de la montee ou descente 
		}

		remonte(largeur){

			// si petit ecran, a l'ouverture de la fenetre d'inscription, la fenetre scroll dessus 
        	if(largeur < 1200) { // si la fenetre est petite, alors on remonte de 40px vers le haut
        					 // a la fermeture de la fenetre d'inscription	

	        	$('html, body').animate({
					scrollTop:$('#carte').offset().top - 40 
				}, 1000);

				// permettre le scroll 
				// car l'animation bloque la fenetre sur le scroll

				setTimeout(function(){

					$('html, body').stop();

				}, 900);
			}
		}

		// ferme le formulaire 
		closeFormulaire(largeur){ 

			$('.formulaire').addClass('fermerForm').removeClass('etendForm'); // fermeture de la fenetre d'inscription

        	setTimeout(function(){

        		$('.formulaire').css('display', 'none'); // disparition du formulaire apres fermeture

        	}, 900);

        	this.remonte(largeur); // activation de la remontee au formulaire
		}

		filtreTexte(){ // filtrer le nom des stations 


	      	if(this.mot.indexOf("#" + this.id + " - ") == 0){

	      		this.mot = this.mot.replace("#" + this.id + " - ","");
	      	}

	      	if(this.mot.indexOf(this.id + " - ") == 0){

	      		this.mot = this.mot.replace(this.id + " - ","");

	      	}

	      	if(this.mot.indexOf(this.id + "- ") == 0){

	      		this.mot = this.mot.replace(this.id + "- ","");
	      	}

	      	if(this.mot.indexOf("#" + this.id + "- ") == 0){

	      		this.mot = this.mot.replace("#" + this.id + "- ","");
	      	}

	      	return this.mot; 

		}

		// filtrer le status 

		filtreStatus(){

			if(this.mot == "OPEN"){

      			this.mot = "ouverte";
      		}
      		if(this.mot == "CLOSED"){

      			this.mot = "en travaux";
      		}

      		return this.mot

		}

	}


	// creation de la map 

	// style de la map 
	var styledMapType = new google.maps.StyledMapType(
    [ { "elementType": "geometry", "stylers": [ { "color": "#E9EBEC" } ] }, { "elementType": "labels.icon", "stylers": [ { "visibility": "off" } ] }, { "elementType": "labels.text.fill", "stylers": [ { "color": "#616161" } ] }, { "elementType": "labels.text.stroke", "stylers": [ { "color": "#f5f5f5" } ] }, { "featureType": "administrative.land_parcel", "elementType": "labels.text.fill", "stylers": [ { "color": "#bdbdbd" } ] }, { "featureType": "poi", "elementType": "geometry", "stylers": [ { "color": "#C9D1D5" } ] }, { "featureType": "poi", "elementType": "labels.text.fill", "stylers": [ { "color": "#757575" } ] }, { "featureType": "poi.park", "elementType": "geometry", "stylers": [ { "color": "#C9D1D5" } ] }, { "featureType": "poi.park", "elementType": "labels.text.fill", "stylers": [ { "color": "#C9D1D5" } ] }, { "featureType": "road", "elementType": "geometry", "stylers": [ { "color": "#ffffff" } ] }, { "featureType": "road.arterial", "elementType": "labels.text.fill", "stylers": [ { "color": "#757575" } ] }, { "featureType": "road.highway", "elementType": "geometry", "stylers": [ { "color": "#dadada" } ] }, { "featureType": "road.highway", "elementType": "labels.text.fill", "stylers": [ { "color": "#616161" } ] }, { "featureType": "road.local", "elementType": "labels.text.fill", "stylers": [ { "color": "#9e9e9e" } ] }, { "featureType": "transit.line", "elementType": "geometry", "stylers": [ { "color": "#e5e5e5" } ] }, { "featureType": "transit.station", "elementType": "geometry", "stylers": [ { "color": "#eeeeee" } ] }, { "featureType": "water", "elementType": "geometry", "stylers": [ { "color": "#ABCDD4" } ] }, { "featureType": "water", "elementType": "labels.text.fill", "stylers": [ { "color": "#9e9e9e" } ] } ],
    	{name: 'Styled Map'}
    );

	// la mnap 
	var map = new google.maps.Map(document.getElementById('carte'), {

      center: {lat: 45.764043, lng: 4.835658999999964}, 
      zoom: 16,
      mapTypeControl:false,
      mapTypeControlOptions: {
        mapTypeIds: ['roadmap', 'satellite', 'hybrid', 'terrain',
                'styled_map']
      }

    }); 

	// integration du style 
    map.mapTypes.set('styled_map', styledMapType);
    map.setMapTypeId('styled_map');

     $.ajax({ // appel ajax 

	    type: 'GET',
	    url: 'https://api.jcdecaux.com/vls/v1/stations?contract=Lyon&apiKey=958e5bbec14f9c960b83ec8ad8383bec71fb59db', // API JCDecaux 
	    timeout: 3000,

	    success: function(data) {

	       	for(var i = 0 ; i < data.length ; i++){ // lecture des donnees de l'API

	       		// recuperation des donnees a transmettre au marqueur Google Maps 
	     		var latStation = data[i].position.lat; 
	     		var lngStation = data[i].position.lng; 
	     		var nombre = data[i].number; 
	     		var nom = data[i].name; 
	     		var address = data[i].address;
	     		var velo = data[i].available_bikes;
	     		var emplacement = data[i].available_bike_stands;
	     		var status = data[i].status;

	     		// position des marqueurs 
	     		var LatLngStation = {lat: latStation, lng: lngStation};

	     		var marker = new google.maps.Marker({ // boucle pour afficher un marqueur pour chaque coordonnee

		        	map: map, // creation des marqueurs 
		        	position: LatLngStation,
		        	icon: new google.maps.MarkerImage("assets/img/velo.png"),
		        	name: nom,
		        	id:nombre, 	
		        	address:address,
		        	velo:velo,
		        	emplacement:emplacement,
		        	status:status,

		        });

		        marker.addListener('click',function() {

					// affiche les infos fournies par l'API

					// stockage des informations des markers dans le navigateur 
					sessionStorage.idOrigin = this.id;

					sessionStorage.nomOrigin = this.name;

					var nomFiltre = new Map(this.name, this.id);

					var nouveauNom = nomFiltre.filtreTexte(); // filtrage du nom pour retir l'id
					sessionStorage.nomOrigin = nouveauNom;   

					sessionStorage.addressOrigin = this.address;
					sessionStorage.veloOrigin = this.velo;
					sessionStorage.emplacementOrigin = this.emplacement;

					var statusFiltre = new Map(this.status); // filtre le status de la station

					var nouveauStatus = statusFiltre.filtreStatus();
					sessionStorage.status = nouveauStatus;  
					

					// creation des information dans le fenetre d'inscription 
		    		$('#span_1').text(sessionStorage.nomOrigin);
			      	$('#span_2').text(sessionStorage.addressOrigin);
			      	$('#span_3').text(sessionStorage.veloOrigin);
			      	$('#span_4').text(sessionStorage.emplacementOrigin);
			      	$('#span_5').text(sessionStorage.status);

			      	var largeur = $(document).width(); // largeur de la fenetre pour le scroll automatique 
									   				   // a l'ouverture ou fermetrue de la fenetre 
	
					var carte1 = new Map(); // instancier un nouvel objet pour que la fonction 	
													      // marche correctement 
			      	
			      	carte1.openFormulaire(largeur); // ouverture du formulaire 

				});
		    }
	    },
	     error: function() { // message d'erreur ajax 

             alert('La requête n\'a pas abouti'); 
      	}

	});

     // fermeture du formulaire 

    $('.bouton_fermer').bind('touchstart click', function(){ 

    	var largeur = $(document).width(); // largeur de la fenetre pour le scroll automatique 
									   // a l'ouverture ou fermetrue de la fenetre 

		var carte2 = new Map();	// instancier un nouvel objet pour que la fonction 	
						   			// marche correctement 

		carte2.closeFormulaire(largeur);

    	if(sessionStorage.time == "0 : 0") { // disparition de la fenetre de reservation a la fermeture si timer = 0;

    		$('.infos_piedDepage').css('transition', '1s ease-in-out').css('opacity', '0');	
    	}

    });

});

