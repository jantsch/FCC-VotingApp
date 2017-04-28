'use strict';

(function () {

   var apiUrl = window.location.origin + '/api/:id/mypolls';



   $.ajax({
    type: "get",
    url: apiUrl, 
    dataType: "json",
}).done(function ( data ) {
    console.log("ajax callback response:" + data);

      console.log(data);
      
      data.forEach(function(item){
          $('#polllist').append("<a href=\"#\" class=\"list-group-item\">"+item.name+"</a>");

      })
     
});

})();
