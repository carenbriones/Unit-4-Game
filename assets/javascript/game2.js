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
        setAllCharacterStats();
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

    function setAllCharacterStats() {
        setCharacterStats(obiWanKenobi, "#obi-wan-kenobi", "Obi-Wan Kenobi");
        setCharacterStats(lukeSkywalker, "#luke-skywalker", "Luke Skywalker");
        setCharacterStats(darthSidious, "#darth-sidious", "Darth Sidious");
        setCharacterStats(darthMaul, "#darth-maul", "Darth Maul");
    }

    // Selects fighter and defender
    $(".character").on("click", function () {
        // If fighter hasn't been chosen, choose as fighter
        if (!fighter) {
            fighter = this;

            // Moves all characters aside from the fighter to the Enemies to Attack section
            $(".character").each(function (i) {
                if (this !== fighter) {
                    $(this).appendTo("#enemies-to-attack")
                }
            })

        } else if (!defender) { // If defender hasn't been chosen, choose as defender
            defender = this;
            $(this).appendTo("#defender");
        }
    })

    // Fighter attacks, and defender counterattacks if valid
    $(".attack").on("click", function () {

        // If fighter and defender have already been chosen
        if (fighter && defender) {
            numOfAttacks++;

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
                $(".attack").hide();
                $(".reset").show();
                $(".status").html(statusUpdate);
                return;
            }
            
            statusUpdate = "<p>You have attacked " + $(defender).data().name + " for " + ($(fighter).data().attack * numOfAttacks) + " damage.</p>" + statusUpdate;

            // If defender still has HP, update on screen
            if ($(defender).data().healthPoints > 0) {
                $(defender).find(".health-points").text($(defender).data().healthPoints);
            } else { // If defender doesn't have HP, clear out defender, display message
                statusUpdate += "<p>Defender has been defeated!</p>";
                $(defender).hide();
                defender = null;
                
                // If there are no more enemies to attack, user wins
                if ($("#enemies-to-attack").find(".character").length === 0){
                    statusUpdate += "<p>You've won!</p>";
                    $(".attack").hide();
                    $(".reset").show();
                }
            }

            $(".status").html(statusUpdate);
        }
    })

    // Resets game, hides button afterwards
    $(".reset").on("click", function () {
        numOfAttacks = 0;
        setAllCharacterStats();
        defender = null;
        fighter = null;

        // Resets location of characters
        $("#defender").children().show();
        $("#defender").find(".character").appendTo("#your-character");
        $("#defender").children().appendTo(".your-character");
        $("#enemies-to-attack").find(".character").appendTo("#your-character");

        $(".status").html("");
        $(".reset").hide();
        $(".attack").show();
    })
})