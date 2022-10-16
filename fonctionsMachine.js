function jouer() {

    var niveauJoueur = document.querySelector('input[name=niveau]:checked ').value;
    var mise = document.getElementById('mise').value;
    if (mise == "") {
        alert("Le champ mise ne doit pas etre null");
    } else if (mise > 25000) {
        alert("La mise ne doit pas dépassée 25000");
    } else {
        var temps = new Date().getTime();

        var parametres = "niveau=" + niveauJoueur + "&anticache=" + temps;

        objet_xml_http_request = creation_objet_xml_http_request();

        objet_xml_http_request.open('get', 'gainAleatoire.php?' + parametres, true);

        objet_xml_http_request.onreadystatechange = actualiserPage;

        document.getElementById('button').disabled = true;
        document.getElementById('formulaire').style.visibility = "hidden";
        document.getElementById('commencer').style.visibility = "hidden";
        document.getElementById('charge').style.visibility = "visible";

        objet_xml_http_request.send(null);
    }

}