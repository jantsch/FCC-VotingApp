'use strict';

(function () {

   var apiUrl = appUrl + '/api/item/'+getId();



   $.ajax({
    type: "get",
    url: apiUrl, 
    dataType: "json",
}).done(function ( data ) {
    console.log("ajax callback response:" + data);
      $('#question-name').text(data.name);
      $('#question-owner').text("by " + data.owner_name);

      console.log(data.owner_name)
      data.options.forEach(function(item){
          $('#tablebody').append("<tr><td><div class=\"radio\"><label><input type=\"radio\" id='"+item._id+"' name=\"optradio\">" +
                              item.text + "</label></div></td><td></td></tr>");

      })
     
});

$('#submitButton').click( function() {
alert("LEGAL");
})



function getId()
{
    var id_array = window.location.href.split('/');
    return id_array[id_array.length -1];
}
})();
