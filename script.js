function init(){
  //Chiamata per avere la lista da api
  getItems();

  // Azione per aggiungere un item alla lista Su API
  $('#new-to-do').click(postItem);



  //Azione per eliminare un elemento dalla lista
  $(document).on("click", ".delete", function(){

    var thisid = $(this).data("id");
    deleteItem(thisid);
  });


};

$(document).ready(init);


// Prendo la ToDoList da una chiamata GET
function getItems(){

  var target = $('ul.container');

  $.ajax({
    url: "http://157.230.17.132:3000/todos",
    method: "GET",

    success: function(data){
      //Ripulisco il campo di input
      $('#new-input').val("");
      //Ripulisto il container degli elementi in HTML
      $('ul.container .box').remove();
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
      console.log("NEW INPUT LENGTH", newinput.length);
      if (newinput.length === 0) {
        alert("inserisci un valore numerico");
      }else{
        //Richiamo la funzione per ottenere i nuovi dati dall'api
        getItems();
      }

    },
    error: function(error){
      alert("Errore chiamata POST: ", error);
      console.log("POST ITEM" ,error);
    }
  });
}

//Elimino Item della ToDoList in base al click
function deleteItem(id){

  console.log("THIS id: ", id);
  $.ajax({

    url: "http://157.230.17.132:3000/todos/" + id,
    method: "DELETE",

    success: function(data){

      //Se tutto va bene richiamo la funzione per ristampare gli elementi aggiornati
      getItems();
      console.log("id Item Cancellato: ", id);
    },
    error: function(error){
      alert("errore chiamata DELETE");
      console.log("ERROR DELETE:", error);
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
