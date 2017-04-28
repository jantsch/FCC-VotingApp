'use strict';

(function () {

   var question_name = $('#question-name');
   var question_owner =$('#question-owner'); 
   var apiUrl = appUrl + '/api/item/'+id;
   var id_array = window.location.href.split('/');
   var id = id_array[id_array.length -1];
   console.log(id);
   var apiUrl = appUrl + '/api/item/'+id;

   function updatePoll (data) {
      console.log("Client");
      console.log(JSON.parse(data));
      question_name.html(data.name);
      question_owner.html("by " + data.question_owner);
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
})();
