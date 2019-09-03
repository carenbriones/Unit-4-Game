$(document).ready(function(){
    
    // Declaration of characters
    var obiWanKenobi = {};
    var lukeSkywalker = {};
    var darthSidious = {};
    var darthMaul = {};

    var fighter;
    var defender;

    window.onload = function() {
        
        // Assigns each character's stats when page is first loaded
        setCharacterStats(obiWanKenobi, "#obi-wan-kenobi");
        setCharacterStats(lukeSkywalker, "#luke-skywalker");
        setCharacterStats(darthSidious, "#darth-sidious");
        setCharacterStats(darthMaul, "#darth-sidious");
    }

    function setCharacterStats(character, cardID){
        // Sets healthPoints to random value from 100 - 200
        character.healthPoints = 100 + Math.floor(Math.random() * 101);
        // Sets attack to random value from 6 - 20
        character.attack = 6 + Math.floor(Math.random() * 15);
        // Sets counterAttack to random value from 10 - 30
        character.counterAttack = 10 + Math.floor(Math.random() * 21);

        // Associates character with the corresponding bootstrap card
        $(cardID).data(character);
    }



    $(".character").on("click", function(){
        // console.log($(this).data());
        // If fighter hasn't been chosen, choose as fighter
        if(!fighter){
            fighter = this;
            
            $(".character").each(function(i){
                if(this !== fighter){
                    $("#enemies-to-attack").append(this);
                    $(".character").detach(this);
                    
                }
            })
        } else if (!defender){ // If defender hasn't been chosen, choose as defender
            defender = this;
            $("#defender").append(defender);
            $(".character").remove(this);
        }

    })

})