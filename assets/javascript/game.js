$(document).ready(function(){

    //-------------------------------VARIABLES------------------------------

    // This object remains unaltered through the course of the game, so that
    // its values can be accessed to overwrite the values in the  "players" object, 
    // when the game ends and is reset.
    var playersReset = {
        harry: {
            health:305,
            base_attack:6,
            attack:6,
            counter_attack:25,
            dead:false,
            status: "#allplayers"
        },
        hermione: {
            health:300,
            base_attack:8,
            attack:8,
            counter_attack:20,
            dead:false,
            status: "#allplayers"            
        },
        draco: {
            health:375,
            base_attack:8,
            attack:8,
            counter_attack:10,
            dead:false,
            status: "#allplayers"            
        },
        voldemort: {
            health:250,
            base_attack:10,
            attack:10,
            counter_attack:30,
            dead:false,
            status: "#allplayers"            
        }
    };
    
    // This object starts off blank, but is copied from the above playersReset
    // object via copyResetPlayers(). It is altered through the course of the game. 
    // When the resetGame() runs, All the values from playersReset are copied into this object
    var players = {
        harry: {},
        hermione: {},
        draco: {},
        voldemort: {}
    };

    // Fills in the above object with all values
    copyResetPlayers();

    // This array stores the two user-selected players who are competing 
    // against each other, the hero and the enemy
    var competitors = [];
    var wins = 0;

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
        if (competitors.length !== 2) {
            $(".alerts").empty();
            $(".alerts").text("You must choose your character and an opponent!");
        }
        else {
            $(".alerts").empty();
            attack(competitors[0],competitors[1]);
        }
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
            wins++;
            if (wins === 3) {
                if(confirm("You won! Would you like to play again?")) {
                    resetGame();
                }
            }
        }
        // All the players and their statuses are printed on the page
        printResults();
    }

    // This alerts the user that the game is over
    function gameOver() {
        if(confirm("You lost. Would you like to play again?")) {
            resetGame();
        }
    }
    
    // This resets all health/attack values for all characters in the game
    function resetGame() {
        // This will reset the game, and reset all values for the players object
        copyResetPlayers();
        printResults();
        wins = 0;
        competitors = [];
        $(".alerts").empty();
        $(".alerts").text("First, choose your character. Then, choose your first opponent. Attack until you have defeated that character. Repeat with the rest. Good luck!");
    }

    // This function checks each character's "status" in the players object. This
    // status will match one of the div IDs on the page (either hero, enemy, or allplayers).
    // Each character (and their health score) is printed to the appropriate div, based
    // on their status
    function printResults () {
        $("#allplayers").empty();
        $("#hero").empty();
        $("#enemy").empty();
        $(players.harry.status).append("<div class='player' id='harry'><div class='playerstats'>Harry &nbsp;&nbsp;<span class='glyphicon glyphicon-heart red'></span> " + players.harry.health + "</div></div>");
        $(players.hermione.status).append("<div class='player' id='hermione'><div class='playerstats'>Hermione &nbsp;&nbsp;<span class='glyphicon glyphicon-heart red'></span> " + players.hermione.health + "</div></div>");
        $(players.draco.status).append("<div class='player' id='draco'><div class='playerstats'>Draco &nbsp;&nbsp;<span class='glyphicon glyphicon-heart red'></span> " + players.draco.health + "</div></div>");
        $(players.voldemort.status).append("<div class='player' id='voldemort'><div class='playerstats'>Voldemort &nbsp;&nbsp;<span class='glyphicon glyphicon-heart red'></span> " + players.voldemort.health + "</div></div>");        
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


// PSEUDOCODE

// -----------------VARIABLES------------------

// OBJECT playersReset { holds all the initial values for the characters:
// health points, base attack, attack, counter attack, dead (boolean),
// status (contains the div they'll be written to by jQuery) } 

// OBJECT players { This is the actual object that will be updated
// during the game, when characters attack each other and die. It's
// initially empty but has all the values from the above object copied in }

// ARRAY competitors - holds the character the users plays as, plus the opponent

// VAR wins - increments every time the user defeats another character

// -----------------FUNCTIONS-------------------

// attack(hero, enemy) { 

    // hero loses health points
    // enemy loses health points
    // hero attack power += base attack
    // IF the hero dies, the game is over
    // IF the enemy dies, he/she is removed from the page
    // IF all enemies have been defeated, the game is over
    // printresults();

// }

// gameOver() {
    // Alert, game is over
// }

// resetGame() {Resets the game}
// printResults() {Prints all characters and values on the page}
// copyResetPlayers() {Copies all values from playersReset to players}



