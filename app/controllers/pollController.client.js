'use strict';

(function () {

   var question_name = document.querySelector('#question-name');
   var question_owner = document.querySelector('#question-owner'); 
   var apiUrl = appUrl + '/api/item/:id';
   
   console.log(window.location.href);

   function updatePoll (data) {
      console.log("Client");
      console.log(JSON.parse(data));
      //clickNbr.innerHTML = clicksObject.clicks;
   }

  // ajaxFunctions.ready(ajaxFunctions.ajaxRequest('GET', apiUrl, updatePoll));
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
