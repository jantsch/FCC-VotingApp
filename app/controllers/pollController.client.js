'use strict';

(function () {

   var question_name = document.querySelector('#question-name');
   var question_owner = document.querySelector('#question-owner'); 
   var apiUrl = appUrl + '/api/item/'+id;
   var id_array = window.location.href.split('/');
   var id = id_array[id_array.length -1];
   console.log(id);
   var apiUrl = appUrl + '/api/item/'+id;

   function updatePoll (data) {
      console.log("Client");
      console.log(JSON.parse(data));
      question_name.innerHTML = data.name;
      question_owner.innerHTML = data.name;
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
