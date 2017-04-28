'use strict';

(function () {

   var apiUrl = window.location.origin + '/api/:id/mypolls';



   $.ajax({
    type: "get",
    url: apiUrl, 
    dataType: "json",
}).done(function ( teste ) {
    console.log("ajax callback response:" + teste);

      console.log(teste);
      $('#polllist').append(teste.name);
  //    data.forEach(function(item){
    //      $('#polllist').append("<a href=\"#\" class=\"list-group-item\">"+item.name+"</a>");

     // })
     
});

})();
