$(document).ready(function(){
    
    // Declaration of characters
    var obiWanKenobi;
    var lukeSkywalker;
    var darthSidious;
    var darthMaul;

    var fighter;
    var defender;

    function setCharacterStats(character){
        // Sets healthPoints to random value from 100 - 200
        character.healthPoints = 100 + Math.floor(Math.random * 101)
        // Sets attack to random value from 6 - 20
        character.attack = 6 + Math.floor(Math.random * 15);
        // Sets counterAttack to random value from 10 - 30
        character.counterAttack = 10 + Math.floor(Math.random() * 21);
    }

    window.onload = function() {
        
        // Assigns each character's stats when page is first loaded
        setCharacterStats(obiWanKenobi);
        setCharacterStats(lukeSkywalker);
        setCharacterStats(darthSidious);
        setCharacterStats(darthMaul);
    }


})