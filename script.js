function init(){

  getItems();



};

$(document).ready(init);


// Prendo la ToDoList da una chiamata GET
function getItems(){

  var target = $('ul.container');

  $.ajax({
    url: "http://157.230.17.132:3000/todos",
    method: "GET",

    success: function(data){

      for (var i = 0; i < data.length; i++) {
        var d = data[i];

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

// Funzione per stampare tramite handlebars
function itemTemplate(obj, target){


  var source = $("#item-template").html();
  var template = Handlebars.compile(source);

  var context = obj;

  var html = template(context);
  target.append(html)
}
