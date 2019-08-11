
this.number1 = 350; // delais animation cartes offres
			this.number2 = 0;
			this.number2bis = 0;
			this.number3 = 0;  // delais animation cartes actus
			this.number4 = 6800;
			this.number5 = 0;	// delais animation titre 
			this.number6 = 1900;
			this.number7 = 0;
			this.number8 = 7000;
			this.nbb1 = 0; // delais animation bouton
			this.nbb2 = 0; 
			this.offset1 = 0; // remise a 0 offset si chargement des animations au milieu de la page  
			this.offset2 = 0;



setNumber(){

			var widthDoc = $(document).width();

			var nb2;
			var nb2bis;
			var nb3;
			var nbb1;
			var nbb2;
			var nb5; 
			var nb7; 
			var offset2; 
			
			if(widthDoc >= 1200){

				nb2 = 1600;
				nb2bis = 1800;
				nb3 = 1800;	// delais images actus scroll
				nb5 = 40; // delais animation titres 
				nb7 = 1500;
				nbb1 = 750; // delais animation boutons
				nbb2 = 2300;
				offset2 = -400;	// rectifie le delais de l'animation si chargement au milieu de la page  		
			}

			else if(widthDoc < 1200 && widthDoc > 500) {
	

				nb2 = 1600;
				nb2bis = 1600;
				nb3 = 2200;		
				nb5 = 100;    
				nb7 = 1800;
				nbb1 = 1100;
				nbb2 = 2600;
				offset2 = 0; 
			}

			else {


				nb2 = 2250;
				nb2bis = 1600;
				nb3 = 2700;
				nb5 = 100; 
				nb7 = 2300;
				nbb1 = 1650;
				//nbb1Bis = 1800;
				nbb2 = 4350;
				offset2 = 700; 	
			}

			this.number2 = nb2;
			this.number2bis = nb2bis;
			this.number3 = nb3;
			this.number5 = nb5;
			this.number7 = nb7;
			this.nbb1 = nbb1;
			this.nbb2 = nbb2;
			this.offset2 = offset2;
			
		}