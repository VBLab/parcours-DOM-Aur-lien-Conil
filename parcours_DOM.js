**
 * Fonction à appeler au chargement de la page
 * Cette fonction devra exécuter les actions suivantes :
 *    - charger la liste des objets depuis l'API
 *    - charger les données des objets dans la table
 */
function load_components() { // chargement de toutes les données de la table

    console.log("Chargement des données de la page");
    $.get("/objects", function (data) {
        for (let i of data.objects) {
            add_line_to_table(i);
        }
        //console.log(p);
        // Ajouter ici le code permettant de charger dynamiquement les éléments de la page
    });
}


// function add_line_to_table() {                           //ajout d'un seul objet (001)
// let line = '<tr>\
// <th> OBJ_001 </th>\
// <td><image</td>\
// <td>description</td>\
// <td><input type="radio"></td>\
// <th style="width: 100px"><button class="btn-primary">Achetez moi !</button></th>\
// </tr>';

// document.getElementById('table_body').innerHTML += line ;


//}
// $('#table_body').append(line);                   // jquerry

function refresh(){
    //1- vider la table
    document.getElementById('table_body').innerHTML="";
    load_components();
    console.log(document.getElementById('table_body').innserHTML);
    //2 -remplir la table => on sait déjà faire...cf load_components
}

function add_line_to_table(data){
    if (!data.image)
    {
    load_default_image(data);
}
    let checked = "";
    if (data.status) {
        checked = "checked";
    } else {
        checked = "";
    }                                  
    
    // A faire pour remplir la ligne :
//      * 1. tester si l'image est présente
//      * 2. si l'image n'existe pas, appeler la fonction load_default_image
//      * 3. créer une fonction load_default_image
//      * 4. appelez l'API pour récupérer le type de l'objet contenant default_image
//      * 5. retrouvez l'élément contenant l'image
//      * 6. mettez à jour l'image avec default_image
  

    


    let line = '<tr>\
    <th>'+ data.serial + '</th>\
    <th style="width:500px;"><img style="width:500px; heigth:10%; text-align:center;" src=" static/images/' + data.image + '"></th> \
    <th>'+ data.description + '</th>\
    <th><input type="checkbox" '+checked+'></th>\
    <th style="width: 100px"><button class="btn-primary">Achetez moi !</button></th>\
    </tr>';

    document.getElementById('table_body').innerHTML += line;

}
// parcours du DOM en Vanilla
function load_default_image (data_objects) {
    $.get("/data",function (data){
        console.log(data);
    for (let p of document.getElementById('table_body').childNodes) {
                if (p.nodeName == 'TR') {
                    console.log(data.types[data_objects.type].default_image);
                    if (p.childNodes[1].childNodes[0].textContent == data_objects.serial) {
                        p.childNodes[3].childNodes[0].setAttribute('src', '/static/images/' + data.types[data_objects.type].default_image);;
                    }
                }
            }

   });
}
// réécriture de la fonction load_default_image()
function load_default_image (data_objects) {
    $.get("/data",function (data){
        console.log(data);
      $('#table_body > tr > img').each(function()){
          $(this).attr('src') + '/static/images/' + data.types[data_objects.type].default_image)
        }
    });
}