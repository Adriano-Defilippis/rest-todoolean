function init(){

  getItems();

  // Azione per aggiungere un item alla lista Su API
  $('#new-to-do').click(postItem);


};

$(document).ready(init);


// Prendo la ToDoList da una chiamata GET
function getItems(){

  var target = $('ul.container');

  $.ajax({
    url: "http://157.230.17.132:3000/todos",
    method: "GET",

    success: function(data){

      // Ciclo tutti i dati della lista per estrapolere i valori da dare ad Handlebars
      for (var i = 0; i < data.length; i++) {

        var d = data[i];
        // Funzione template di HANDLEBARS
        itemTemplate(
          {
           id: d.id,
           text: d.text
          }, target);

      }

    },
    error: function(error){
      alert("errore chiamata api");
      console.log(error);
    }
  });

}

//Aggiungo un ToDoItem da chiamata POST
function postItem(){

  var newinput = $('#new-input').val();

  $.ajax({

    url: "http://157.230.17.132:3000/todos",
    method: "POST",

    data:{
      text: newinput,
    },

    success: function(data){
      //Ripulisto il container degli elementi in HTML
      $('ul.container .box').remove();
      //Richiamo la funzione per ottenere i nuovi dati dall'api
      getItems();
    },
    error: function(error){
      alert("Errore chiamata POST: ", error);
      console.log("POST ITEM" ,error);
    }
  });
}

// Funzione per stampare tramite handlebars
function itemTemplate(obj, target){


  var source = $("#item-template").html();
  var template = Handlebars.compile(source);

  var context = obj;

  var html = template(context);
  target.append(html)
}
