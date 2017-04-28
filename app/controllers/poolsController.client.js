'use strict';

(function () {

   var apiUrl = window.location.origin + '/api/polls';



   $.ajax({
    type: "get",
    url: apiUrl, 
    dataType: "json",
}).done(function ( data ) {
    console.log("ajax callback response:" + data);

      console.log(data);
      
      data.forEach(function(item){
          $('#polllist').append("<a href=\"poll/"+item._id +"\" class=\"list-group-item\">"+item.name+"</a>");

      })
     
});

})();
