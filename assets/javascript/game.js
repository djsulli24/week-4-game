$(document).ready(function(){

    //-------------------------------VARIABLES------------------------------

    // This object remains unaltered through the course of the game, so that
    // its values can be accessed to overwrite the values in the  "players" object, 
    // when the game ends and is reset.
    var playersReset = {
        harry: {
            health:340,
            base_attack:6,
            attack:6,
            counter_attack:25,
            dead:false,
            status: "#allplayers"
        },
        hermione: {
            health:340,
            base_attack:8,
            attack:8,
            counter_attack:20,
            dead:false,
            status: "#allplayers"            
        },
        draco: {
            health:340,
            base_attack:8,
            attack:8,
            counter_attack:10,
            dead:false,
            status: "#allplayers"            
        },
        voldemort: {
            health:340,
            base_attack:10,
            attack:10,
            counter_attack:30,
            dead:false,
            status: "#allplayers"            
        }
    };
    
    // This object starts off with the exact same values as the playersReset object above,
    // but is altered through the course of the game. When the resetGame() runs,
    // All the values from playersReset are copied into this object
    var players = {
        harry: {
            health:340,
            base_attack:6,
            attack:6,
            counter_attack:25,
            dead:false,
            status: "#allplayers"
        },
        hermione: {
            health:340,
            base_attack:8,
            attack:8,
            counter_attack:20,
            dead:false,
            status: "#allplayers"            
        },
        draco: {
            health:340,
            base_attack:8,
            attack:8,
            counter_attack:10,
            dead:false,
            status: "#allplayers"            
        },
        voldemort: {
            health:340,
            base_attack:10,
            attack:10,
            counter_attack:30,
            dead:false,
            status: "#allplayers"            
        }
    };

    // This array stores the two user-selected players who are competing 
    // against each other, the hero and the enemy
    var competitors = [];

// ---------------------CLICK EVENTS------------------------------

    // If a user clicks one of the characters in the "all players" section,
    // That character is moved up to either the "hero", or "enemy" section

    $("#allplayers").on("click",".player",function() {

        var playerName = $(this).attr("id");
        if (competitors.length === 0) {
            players[playerName]["status"] = "#hero";
            competitors[0] = playerName;
        }
        else if (competitors.length === 1) {
            players[playerName]["status"] = "#enemy";
            competitors[1] = playerName;
        }
        printResults();
    });

    // When the attack button is clicked, it simulates an attack from the 
    // hero to the enemy

    $("#attack").click(function() {
        attack(competitors[0],competitors[1]);
    });

    // If no attack has happened between the two characters, the user can
    // click the enemy to move it back to the all players pool and choose
    // a different enemy
    $("#enemy").on("click",".player",function() {
        
        var playerName = $(this).attr("id");
        if (players[playerName]["health"] === playersReset[playerName]["health"]) {
            // Change character status back to allplayers
            players[playerName]["status"] = "#allplayers";
            // remove that player from index 1 of the array
            competitors.pop();
        }
        printResults();
    });

    // If no enemy is selected, and no attacks have happened, the user can click
    // the hero to return it to the all players pool and choose a different one
    $("#hero").on("click",".player",function() {
        
        var playerName = $(this).attr("id");
        if (players[playerName]["health"] === playersReset[playerName]["health"] && competitors.length === 1) {
            // Change character status back to allplayers
            players[playerName]["status"] = "#allplayers";
            // remove that player from index 0 of the array
            competitors.pop();
        }
        printResults();
    });    

    // ---------------------FUNCTIONS------------------------------

    // The attack function alters the following values of the hero and
    // the enemy: health, attack
    function attack(hero, enemy) {
        players[enemy]["health"] -= players[hero]["attack"];        
        players[hero]["health"] -= players[enemy]["counter_attack"];
        players[hero]["attack"] += players[hero]["base_attack"];

        // If the hero dies, the game is over
        if (players[hero]["health"] < 1) {
            gameOver();
        }
        // If the enemy dies, they're removed from the page
        else if (players[enemy]["health"] < 1) {
            players[enemy]["dead"] = true;
            players[enemy]["status"] = "#dead"
            competitors.pop();
        }
        // All the players and their statuses are printed on the page
        printResults();
    }

    // This alerts the user that the game is over
    function gameOver() {
        alert("Game Over");
    }
    
    // This resets all health/attack values for all characters in the game
    function resetGame() {
        // This will reset the game, and reset all values for the players object
        copyResetPlayers();
        printResults();
    }

    // This function checks each character's "status" in the players object. This
    // status will match one of the div id's on the page (either hero, enemy, or allplayers).
    // Each character (and their health score) is printed to the appropriate div, based
    // on their status
    function printResults () {
        $("#allplayers").empty();
        $("#hero").empty();
        $("#enemy").empty();
        $(players.harry.status).append("<div class='player' id='harry'>Harry " + players.harry.health + "</div>");
        $(players.hermione.status).append("<div class='player' id='hermione'>Hermione " + players.hermione.health + "</div>");
        $(players.draco.status).append("<div class='player' id='draco'>Draco " + players.draco.health + "</div>");
        $(players.voldemort.status).append("<div class='player' id='voldemort'>Voldemort " + players.voldemort.health + "</div>");        
    }

    // This copies all values from playersReset, which remains unaltered during the
    // game, and copies them into the players object, which resets all health, 
    // attack, etc. values
    function copyResetPlayers() {
        players.harry = Object.assign({}, playersReset.harry);
        players.hermione = Object.assign({}, playersReset.hermione);
        players.draco = Object.assign({}, playersReset.draco);
        players.voldemort = Object.assign({}, playersReset.voldemort);
    }

    // -------------------------RUNNING----------------------

    resetGame();
})