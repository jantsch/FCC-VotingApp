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
                    animationEnabled: true,     
                    data: [
                    {
                          //startAngle: 45,
                          indexLabelFontSize: 20,
                          indexLabelFontFamily: "Garamond",
                          indexLabelFontColor: "darkgrey",
                          indexLabelLineColor: "darkgrey",
                          indexLabelPlacement: "outside",
                          type: "doughnut",
                          showInLegend: true,
                          dataPoints: [
                            {  y: 53.37, legendText:"Android 53%", indexLabel: "Android 53%" },
                            {  y: 35.0, legendText:"iOS 35%", indexLabel: "Apple iOS 35%" },
                            {  y: 7, legendText:"Blackberry 7%", indexLabel: "Blackberry 7%" },
                            {  y: 2, legendText:"Windows 2%", indexLabel: "Windows Phone 2%" },
                            {  y: 5, legendText:"Others 5%", indexLabel: "Others 5%" }
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
