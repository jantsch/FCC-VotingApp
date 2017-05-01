'use strict';

(function () {

   var apiUrl = appUrl + '/api/item/'+getId();

$(document).ready(function(){
      $('#submitVote').click( function() {
             $.ajax({
                type: "post",
                url: apiUrl, 
                data: { option_id: $('input[name=radios]:checked').val()},
                dataType: "json",
            }).done(function ( data ) {
                console.log(data);
                $("#Votes").text(data.totalVotes);

            })})
    

    $('#delPoll').click( function() {
             $.ajax({
                type: "delete",
                url: apiUrl, 
                dataType: "json",
            }).done(function ( data ) {
            
            })
            })
      


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
          $('#tablebody').append("<tr><td><div class=\"radio\"><label><input type=\"radio\" name=\"radios\" value=\""+item._id+"\">" +
                              item.text + "</label></div></td><td></td></tr>");

      })
     
});

    });

 

  




function getId()
{
    var id_array = window.location.href.split('/');
    return id_array[id_array.length -1];
}
})();
