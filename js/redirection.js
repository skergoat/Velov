
// rediriger apres le click sur les div ".div_offres"

$('.div_offres').click('click', function(e){

	var valeur = this.id; 
	console.log(valeur);

	switch(valeur){

		case "offres1":
		var reidrection = window.location.href="https://velov.grandlyon.com/offers/groups/list#180";
		break; 

		case "offres2":
		window.location.href="https://velov.grandlyon.com/offers/groups/list#190";
		break; 

		case "offres3":
		window.location.href="https://velov.grandlyon.com/offers/groups/list#75190";
		break; 

	}

}); 