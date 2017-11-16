$(document).ready(function(){

    // Four characters
    // Three different statuses = everyone should start out as enemy. User picks hero
    // Each character has Health Points(changes), Attack Power, Counterattack Power(changes)

    //-------------------------------VARIABLES------------------------------

    var playersReset = {
        harry: {
            health:240,
            base_attack:6,
            attack:6,
            counter_attack:40,
            dead:false,
            status: "#allplayers"
        },
        hermione: {
            health:240,
            base_attack:8,
            attack:8,
            counter_attack:30,
            dead:false,
            status: "#allplayers"            
        },
        draco: {
            health:210,
            base_attack:5,
            attack:5,
            counter_attack:20,
            dead:false,
            status: "#allplayers"            
        },
        voldemort: {
            health:300,
            base_attack:10,
            attack:10,
            counter_attack:75,
            dead:false,
            status: "#allplayers"            
        }
    };

    var players = {
        harry: {
            health:240,
            base_attack:6,
            attack:6,
            counter_attack:40,
            dead:false,
            status: "#allplayers"
        },
        hermione: {
            health:240,
            base_attack:8,
            attack:8,
            counter_attack:30,
            dead:false,
            status: "#allplayers"            
        },
        draco: {
            health:210,
            base_attack:5,
            attack:5,
            counter_attack:20,
            dead:false,
            status: "#allplayers"            
        },
        voldemort: {
            health:300,
            base_attack:10,
            attack:10,
            counter_attack:75,
            dead:false,
            status: "#allplayers"            
        }
    };

    var competitors = [];

// ---------------------FUNCTIONS------------------------------

    $(".player").click(function() {

        var playerName = $(this).val();
        if (competitors.length === 0) {
            // Set player's status to hero
            // add that player to the array at position 0
        }
        else if (competitors.length === 1) {
            // Set that player's status to enemy
            // Add that player to the array at position 1
        }
        printResults();
    });

    function attack(hero, enemy) {
        players[enemy]["health"] -= players[hero]["attack"];        
        players[hero]["health"] -= players[enemy]["counter_attack"];
        players[hero]["attack"] += players[hero]["base_attack"];

        if (players[hero]["health"] < 1) {
            gameOver();
        }
        else if (players[enemy]["health"] < 1) {
            players[enemy]["dead"] = true;
            players[enemy]["status"] = "#dead"
            competitors.pop();
        }
        printResults();
    }

    function gameOver() {
        alert("Game Over");
    }
    
    function resetGame() {
        // This will reset the game, and reset all values for the players object
        copyResetPlayers();
        printResults();
    }

    function printResults () {
        $("#allplayers").empty();
        $("#hero").empty();
        $("#enemy").empty();
        $(players.harry.status).append("<div class='player' value='harry'>Harry " + players.harry.health + "</div>");
        $(players.hermione.status).append("<div class='player' value='hermione'>Hermione " + players.hermione.health + "</div>");
        $(players.draco.status).append("<div class='player' value='draco'>Draco " + players.draco.health + "</div>");
        $(players.voldemort.status).append("<div class='player' value='voldemort'>Voldemort " + players.voldemort.health + "</div>");        
    }

    function copyResetPlayers() {
        players.harry = Object.assign({}, playersReset.harry);
        players.hermione = Object.assign({}, playersReset.hermione);
        players.draco = Object.assign({}, playersReset.draco);
        players.voldemort = Object.assign({}, playersReset.voldemort);
    }

    

    // -------------------------RUNNING----------------------

    resetGame();
})