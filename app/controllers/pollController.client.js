'use strict';

(function () {

   var question_name = $('#question-name');
   var question_owner =$('#question-owner'); 
   var apiUrl = appUrl + '/api/item/'+getId();


   function updatePoll (data) {
      console.log("Client");
      //console.log(JSON.parse(data));
      console.log(data);
      var data_parsed = JSON.parse(data);
      
      question_name.text(data.name);
      question_owner.text("by " + data_parsed.question_owner);
   }

   ajaxFunctions.ready(ajaxFunctions.ajaxRequest('GET', apiUrl, updatePoll));
/**
   addButton.addEventListener('click', function () {

      ajaxFunctions.ajaxRequest('POST', apiUrl, function () {
         ajaxFunctions.ajaxRequest('GET', apiUrl, updatePoll);
      });

   }, false);

   deleteButton.addEventListener('click', function () {

      ajaxFunctions.ajaxRequest('DELETE', apiUrl, function () {
         ajaxFunctions.ajaxRequest('GET', apiUrl, updatePoll);
      });

   }, false);
**/

function getId()
{
    var id_array = window.location.href.split('/');
    return id_array[id_array.length -1];
}
})();
