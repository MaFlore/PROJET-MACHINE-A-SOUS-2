function creation_objet_xml_http_request() {
    var resultat = null;
    try {
        resultat = new XMLHttpRequest();
    } catch (error) {
        try {
            resultat = new ActiveXObject("Msxlm2.XMLHTTP");
        } catch (error) {
            try {
                resultat = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (error) {
                resultat = null;
            }
        }
    }
    return resultat;
}

function actualiserPage() {

    if (objet_xml_http_request.readyState == 4) {

        if (objet_xml_http_request.status == 200) {

            nouveauGain = objet_xml_http_request.responseText;
            var nouveauResultat = nouveauGain.split(':');
            var niveau = decodeURI(nouveauResultat[0]);
            var gainAleatoire = parseInt(decodeURI(nouveauResultat[1]));
            console.log(gainAleatoire);
            console.log(niveau);

            var message;
            var portefeuille = document.getElementById('gain').textContent;
            console.log(portefeuille);
            var gain = parseFloat(portefeuille);
            var miseJoueur = document.getElementById('mise').value;
            var mise = parseFloat(miseJoueur);
            if (niveau == 'facile') {
                if (gainAleatoire < 50) {

                    gain = gain - mise;
                    message = "Vous avez perdu " + mise;

                } else if (gainAleatoire >= 50 && gainAleatoire < 75) {

                    gain = gain + mise * 0.5;
                    message = "Vous avez gagné " + mise * 0.5;

                } else {

                    gain = gain + mise;
                    message = "Vous avez gagné " + mise;
                }
            } else if (niveau == 'moyen') {

                if (gainAleatoire < 250) {

                    gain = gain - mise;
                    message = "Vous avez perdu " + mise;
                    console.log(gain);

                } else if (gainAleatoire >= 250 && gainAleatoire < 375) {

                    gain = gain + mise * 0.25;
                    message = "Vous avez gagné " + mise * 0.25;
                    console.log(gain);

                } else {

                    gain = gain + mise;
                    message = "Vous avez gagné " + mise;
                    console.log(gain);
                }
            } else if (niveau == 'difficile') {
                if (gainAleatoire < 500) {

                    gain = gain - mise;
                    message = "Vous avez perdu " + mise;

                } else if (gainAleatoire >= 500 && gainAleatoire < 750) {

                    gain = gain + mise * 0.75;
                    message = "Vous avez gagné " + mise * 0.75;

                } else {

                    gain = gain + mise;
                    message = "Vous avez gagné " + mise;
                }

            }
            document.getElementById('resultat').innerHTML = message + " F CFA";
            document.getElementById('resultat').style.visibility = "visible";
            document.getElementById('formulaire').style.visibility = "visible";
            document.getElementById('commencer').style.visibility = "visible";
            document.getElementById('gain').innerHTML = gain;
            document.getElementById('charge').style.visibility = "hidden";
            document.getElementById('button').disabled = false;

            if (gain <= 0) {

                document.getElementById('gain').innerHTML = "Vous avez perdu";
                document.getElementById('button').style.visibility = "hidden";

            } else {
                document.getElementById('gain').innerHTML = gain;
            }

            document.getElementById('info').style.visibility = "visible";
            document.getElementById('nom').style.visibility = "hidden"
            document.getElementById('button').disabled = false;
            document.getElementById('charge').style.visibility = "hidden";
            document.getElementById('gain').style.visibility = "visible";

        } else {

            document.getElementById('info').innerHTML = "Erreur du serveur";
            document.getElementById('info').style.visibility = "hidden";
            document.getElementById('button').disabled = false;
            document.getElementById('charge').style.visibility = "hidden";
            document.getElementById('gain').style.visibility = "hidden";
            document.getElementById('resultat').style.visibility = "hidden";
            document.getElementById('tentative').style.visibility = "hidden";

            objet_xml_http_request.abort();
            objet_xml_http_request = null;
        }
    }
}