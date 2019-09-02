/*
    @author Caren Briones <carenpbriones@gmail.com>
    Provides functionalities for Crystal Collector game. 

    September 1, 2019
*/

$(document).ready(function () {

    var randomNumber = Math.floor(Math.random() * 101 + 19);
    var currentTotal = 0;
    var wins = 0;
    var losses = 0;


    // Displays random number and sets crystal values
    window.onload = function () {
        resetGame();
        renderStats();
    }

    // Assigns crystal values
    function assignCrystalValues() {
        for (var i = 0; i <= 3; i++) {
            // Sets randomized value for crystal
            $("#crystal-" + (i + 1)).val(Math.floor(Math.random() * 12 + 1));
            console.log($("#crystal-" + (i + 1)).val());
        }
    }

    //When a crystal is clicked, add to total
    $(".crystal").on("click", function(){
        currentTotal += parseInt($(this).val());
        
        // If currentTotal is still less than randomNumber, continue game
        if (currentTotal < randomNumber){
            $("#current-total").text(currentTotal);
        } else if (currentTotal === randomNumber){ // User wins
            wins++;
            resetGame();
        } else { // User loses
            losses++;
            resetGame();
        }
    })

    // Assigns new random value, sets current total to 0
    function resetGame(){
        assignCrystalValues();
        randomNumber = Math.floor(Math.random() * 101 + 19);
        currentTotal = 0;
        renderStats();
    }

    // Displays wins, losses, current total, and random number on page
    function renderStats(){
        $("#current-total").text(currentTotal);
        $("#random-number").text("Current Total: " +randomNumber);
        $("#wins").text("Wins: " + wins);
        $("#losses").text("Losses: " + losses);
    }

});