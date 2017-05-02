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
                          dataPoints: [
                            {y: 65899660,  legendText: "Barack Obama" },
                            {y: 60929152,  legendText: "Mitt Romney" },
                            {y: 2175850,   legendText: "Others" }      
                          ]
                        }
                    ]
                  });
                  chart.render();
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

                })});

    });

 

  




function getId()
{
    var id_array = window.location.href.split('/');
    return id_array[id_array.length -1];
}
})();
