$(document).ready(function () {

    // Declaration of characters
    var obiWanKenobi = {};
    var lukeSkywalker = {};
    var darthSidious = {};
    var darthMaul = {};

    var fighter = null;
    var defender = null;
    var numOfAttacks = 0;

    window.onload = function () {

        // Assigns each character's stats when page is first loaded
        setCharacterStats(obiWanKenobi, "#obi-wan-kenobi", "Obi-Wan Kenobi");
        setCharacterStats(lukeSkywalker, "#luke-skywalker", "Luke Skywalker");
        setCharacterStats(darthSidious, "#darth-sidious", "Darth Sidious");
        setCharacterStats(darthMaul, "#darth-maul", "Darth Maul");
        // $(".reset").hide();
    }

    function setCharacterStats(character, cardID, name) {
        // Sets healthPoints to random value from 100 - 200
        character.healthPoints = 100 + Math.floor(Math.random() * 101);
        // Sets attack to random value from 6 - 20
        character.attack = 6 + Math.floor(Math.random() * 15);
        // Sets counterAttack to random value from 10 - 30
        character.counterAttack = 10 + Math.floor(Math.random() * 21);
        character.name = name;


        // Associates character with the corresponding bootstrap card
        $(cardID).data(character);
        $(cardID).find(".health-points").text(character.healthPoints);
    }

    // Selects fighter and defender
    $(".character").on("click", function () {
        // If fighter hasn't been chosen, choose as fighter
        if (!fighter) {
            fighter = this;

            $(".character").each(function (i) {
                if (this !== fighter) {
                    $("#enemies-to-attack").append(this);
                    $(".character").detach(this);
                }
            })
        } else if (!defender) { // If defender hasn't been chosen, choose as defender
            defender = this;
            $("#defender").append(defender);
            $(".character").remove(this);
        }
    })

    // Fighter attacks, and defender counterattacks if valid
    $(".attack").on("click", function () {
        // If fighter and defender have already been chosen
        if (fighter && defender) {
            numOfAttacks++;
            console.log("attack!!");
            // Fighter attacks defender
            $(defender).data().healthPoints -= $(fighter).data().attack * numOfAttacks;

            // Defender counterattacks fighter
            $(fighter).data().healthPoints -= $(defender).data().counterAttack;

            var statusUpdate = "";

            // If fighter still has HP, update on screen
            if ($(fighter).data().healthPoints > 0) {
                $(fighter).find(".health-points").text($(fighter).data().healthPoints);
                statusUpdate += "<p>" + $(defender).data().name + " has attacked you back for " + $(defender).data().counterAttack + " damage.</p>";
            } else { // If defender has no HP, user has lost
                $(fighter).find(".health-points").text(0);
                statusUpdate += "<p>You have lost!!</p>";
                $(".reset").show();
            }

            // If defender still has HP, update on screen
            if ($(defender).data().healthPoints > 0) {
                $(defender).find(".health-points").text($(defender).data().healthPoints);
                statusUpdate = "<p>You have attacked " + $(defender).data().name + " for " + ($(fighter).data().attack * numOfAttacks) + " damage.</p>" + statusUpdate;
            } else { // If defender doesn't have HP, clear out defender, display message
                statusUpdate += "<p>Defender has been defeated!</p>";
                $(defender).hide();
                defender = null;
            }

            $(".status").html(statusUpdate);
        }
    })

    // Resets game, hides button afterwards
    $(".reset").on("click", function(){
        resetGame();
        $(".reset").hide();
    })

    function resetGame(){
        numOfAttacks = 0;
        setCharacterStats(obiWanKenobi, "#obi-wan-kenobi", "Obi-Wan Kenobi");
        setCharacterStats(lukeSkywalker, "#luke-skywalker", "Luke Skywalker");
        setCharacterStats(darthSidious, "#darth-sidious", "Darth Sidious");
        setCharacterStats(darthMaul, "#darth-maul", "Darth Maul");
    }

})