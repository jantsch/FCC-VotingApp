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
              $("#VoteResults").text("");
              var datapoints =[];
              data.options.forEach(function(element){
                datapoints.push({ "y" : element.votes,"legendText": element.text}); 

              })
               var chart = new CanvasJS.Chart("chartContainer",
                  {
                    backgroundColor: "#eee",
                    animationEnabled: true,     
                    data: [
                    {
                          type: "doughnut",
                          startAngle: 60,                          
                          toolTipContent: "{legendText}: {y} - <strong>#percent% </strong>",          
                          showInLegend: true,
                          dataPoints: datapoints
                        }
                    ]
                  });
                  chart.render();
            }).fail(function(xhr, status, error){
              alert("Impossible to vote: " + xhr.responseText);            
            })})
    

       $('#delPoll').click( function() {
             $.ajax({
                type: "delete",
                url: apiUrl, 
                dataType: "json",
            }).done(function ( data,textStatus ) {
              if(textStatus=="success");
              window.location.replace("https://fcc-votingapp-rj.herokuapp.com/mypolls");
            })})
      
      //$("#twitter-link").attr('href', 'https://twitter.com/intent/tweet?url=https%3A%2F%2Ffcc-votingapp-rj.herokuapp.com%2Fpolls%2F'+getId()+'&amp;text=FCC-Voting-RJ %20%7C%20')

       $.ajax({
                  type: "get",
                  url: apiUrl, 
                  dataType: "json",
            }).done(function ( data ) {
                $('#question-name').text(data.name);
                $('#question-owner').text("by " + data.owner_name);
                $("#twitter-link").attr('href', 'https://twitter.com/intent/tweet?url=https%3A%2F%2Ffcc-votingapp-rj.herokuapp.com%2Fpolls%2F'+getId()+'&amp;text=FCC-Voting-RJ %20%7C%20'+data.name+'%20%7C%20')

            
                data.options.forEach(function(item){
                    $('#tablebody').append("<tr><td><div class=\"radio\"><label><input type=\"radio\" name=\"radios\" value=\""+item._id+"\">" +
                                        item.text + "</label></div></td><td></td></tr>");

                })});

    });

 

  




function getId()
{
    var id_array = window.location.href.split('/');
    return id_array[id_array.length -1];
}
})();
