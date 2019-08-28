function init(){

  getItems();
  $(document).on("click", ".delete", deleteItem);
  $(document).on("click", "#submit", getInputText);


};

$(document).ready(init);

function clearItems(){

  $(".container").html("");

}


function getItems(){

  clearItems();

  $.ajax({

    url: "http://157.230.17.132:3003/todos",
    method: "GET",

    success: function(data){

      printItems(data);
    },
    error: function(){
      alert("Errore richiesta todolist");
    }
  });
}



function printItems(items){

  var target = $('.container');
  var source = $('#item-template').html();
  var template = Handlebars.compile(source);

  for (var i = 0; i < items.length; i++) {
    var item = items[i];

    var context = {
      text: item.text,
      id: item.id
    };

    var html = template(context);
    target.append(html);

  }
}


function deleteItem(){

  var element = $(this);
  var parent = element.parent();
  var id = element.data("id");

  console.log(id);

  $.ajax({

    url: "http://157.230.17.132:3003/todos/" + id,
    method: "DELETE",

    success: function(){

      console.log("ID elemento eliminato: ", id );

      parent.remove();


    },
  });

}

function getInputText(){

  var newitem = $('#newtodoitem').val();

  console.log("Testo inserito: ", newitem);

  $.ajax({

    url: "http://157.230.17.132:3003/todos",
    method: "POST",
    data: {
      text: newitem
    },

    success: function(data){

      getItems();
    },
    error: function(){
      alert("Errore POST element nel server");
    }
  });
}
