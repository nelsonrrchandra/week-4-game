$(document).ready(function(){

var gameState= "charSelect";

var playerChar= "none";

var oppChar= "none";

var lastAttack= "";

var wins= 0;

$(".btn-combat").hide();

$("#continue-btn").hide();

$("#textDisp").text("Choose a character.");

var charList = [tomias, willow, justinian, helia];

function innitialize (){
	gameState= "charSelect";
	playerChar= "none";
	oppChar= "none";
	lastAttack= "";
	wins= 0;
	$("#select-btn").show();

	$("#select-btn").attr("disabled");

	$("#select-btn").text("Select Character");

	$(".btn-combat").hide();

	$("#continue-btn").hide();

	$("#textDisp").empty();

	$("#textDisp").html("Choose a character.");

	$("#playerChar").empty();

	$("#opponentChar").empty();

	tomias = {
	name: "Tomias",
	title: ", Youngling Vampire",
	hp: 100,
	pow: 8,
	str: 8,
	mag: 6,
	int: 4,
	chosen: false
};

	willow = {
	name: "Willow",
	title: ", Spider Mistress",
	hp: 112,
	pow: 4,
	str: 4,
	mag: 8,
	int: 8,
	chosen: false
};

	justinian = {
	name: "Justinian",
	title: ", Mysterious Priest",
	hp: 136,
	pow: 4,
	str: 6,
	mag: 6,
	int: 6,
	chosen: false
};

	helia = {
	name: "Helia",
	title: ", Witch of the Lantern",
	hp: 120,
	pow: 6,
	str: 4,
	mag: 8,
	int: 4,
	chosen: false
};
}

function killCheck(){
		if (playerChar.hp< 1){
			gameState= "loss"
			
			$("#textDisp").append(
				"<br>"+ playerChar.name+ " was Slain..."
			);

			$("#continue-btn").show();
			$(".btn-combat").hide();
		}
		else{
			if (oppChar.hp<1){
				gameState="win"

				$("#textDisp").append(
				"<br>"+ playerChar.name+ " has defeated "+ oppChar.name +"."
				);

				$("#continue-btn").show();
				$(".btn-combat").hide();
			}
		}

	};

var tomias = {
	name: "Tomias",
	title: ", Youngling Vampire",
	hp: 100,
	pow: 8,
	str: 8,
	mag: 6,
	int: 4,
	chosen: false
};

var willow = {
	name: "Willow",
	title: ", Spider Mistress",
	hp: 112,
	pow: 4,
	str: 4,
	mag: 8,
	int: 8,
	chosen: false
};

var justinian = {
	name: "Justinian",
	title: ", Mysterious Priest",
	hp: 136,
	pow: 4,
	str: 6,
	mag: 6,
	int: 6,
	chosen: false
};

var helia = {
	name: "Helia",
	title: ", Witch of the Lantern",
	hp: 120,
	pow: 6,
	str: 4,
	mag: 8,
	int: 4,
	chosen: false
};

//click on character portrait
$(".charPortait").on("click", function(event){
	switch (gameState){
		case "charSelect":
			$("#select-btn").removeAttr("disabled");

			if (playerChar=="none"){
				var newDiv= "<div id= 'playerStats' class= 'col'></div>"

				$("#textDisp").html(newDiv);
			}

			switch (this.getAttribute("data-value")){
				case "Tomias":
						playerChar= tomias;
				break;

				case "Willow":
						playerChar= willow;
				break;

				case "Justinian":
						playerChar=justinian;
				break;

				case "Helia":
						playerChar=helia;
				break;
			}

			$("#playerChar").html(
				this.getAttribute('data-value')+
				"<br> <div id=playerHealth> Health"+
				playerChar.hp+"</div>"
			);

			$("#playerStats").html(
				"<h3>"+playerChar.name+playerChar.title+"</h3>"+
				"<div> Health: "+playerChar.hp+"</div>"+
				"<div> Power: "+playerChar.pow+"</div>"+
				"<div> Strength: "+playerChar.str+"</div>"+
				"<div> Magic: "+playerChar.mag+"</div>"+
				"<div> Intelligence: "+playerChar.int+"</div>"
			);
			
		break;

		case "enemySelect":
			function updatePortait (x){
				$("#opponentChar").html(
					x.getAttribute('data-value')+
					"<br> <div id=enemyHealth> Health: "+
					oppChar.hp+"</div>"
				);
			};
			
			if (oppChar=="none"){

				newDiv= "<div id= 'oppStats' class= 'col'></div>"
				
				$("#textDisp").append(newDiv);
			}

			switch (this.getAttribute("data-value")){

				case "Tomias":
					if (tomias.chosen==false){
						oppChar= tomias;
						updatePortait(this);
					}
				break;

				case "Willow":
					if (willow.chosen==false) {
						oppChar= willow;
						updatePortait(this);
					}
				break;

				case "Justinian":
					if (justinian.chosen==false){
						oppChar=justinian;
						updatePortait(this);
					}
				break;

				case "Helia":
					if (helia.chosen==false){
						oppChar=helia;
						updatePortait(this);
					}
				break;
			}

			$("#oppStats").html(
				"<h3>"+oppChar.name+oppChar.title+"</h3>"+
				"<div> Health: "+oppChar.hp+"</div>"+
				"<div> Power: "+oppChar.pow+"</div>"+
				"<div> Strength: "+oppChar.str+"</div>"+
				"<div> Magic: "+oppChar.mag+"</div>"+
				"<div> Intelligence: "+oppChar.int+"</div>"
			);

			$("#select-btn").removeAttr("disabled");

		break;
	}
	
});

//click on button
$("button").on("click", function(event){
	var enemyAttack= Math.floor(Math.random()*3);

	while (enemyAttack==lastAttack){
		var enemyAttack= Math.floor(Math.random()*3)
	};

	lastAttack= enemyAttack;

	function damageCalc(attacker, stat, multi){
			return attacker.pow + (stat*multi)
		};

	function dealDamage(){
		playerChar.hp= playerChar.hp- enemyStrike;
		
		$("#playerHealth").html(
			"Health: "+playerChar.hp
		);

		oppChar.hp= oppChar.hp- playerStrike;
		
		$("#enemyHealth").html(
			"Health: "+oppChar.hp
		);
	};

	switch (this.value){
		case "select":
			switch (gameState){
				case "charSelect":
					gameState="enemySelect"

					playerChar.chosen=true;

					var newDiv= "<div class= 'col'> <h2>VS</h2> </div>"

					$("#textDisp").append(newDiv);

					$("#select-btn").attr("disabled");

					$("#select-btn").text("Select an opponent");
				break;

				case "enemySelect":
					if (oppChar.chosen==false){
						gameState="combat"

						oppChar.chosen=true;

						$("#select-btn").hide();

						$(".btn-combat").show();

						$("#textDisp").html(playerChar.name+" challenges "+ oppChar.name+"! <br> Select a method of attack!")
					};
				break;
			};
		break;

		case "strength":
			switch (enemyAttack){
				case 0:
					var playerStrike= damageCalc (playerChar, playerChar.str, 1);
					var enemyStrike= damageCalc (oppChar, oppChar.str, 1);
					dealDamage();

					$("#textDisp").html(
						playerChar.name + " attacked with strength, dealing "+
						playerStrike+ " damage! <br>"+
						oppChar.name+ " counter attacked with strength, dealing "+
						enemyStrike+ " damage!"
						);
				break;

				case 1:
					var playerStrike= damageCalc (playerChar, playerChar.str, 2);
					var enemyStrike= damageCalc (oppChar, oppChar.mag, 0,5);
					dealDamage();

					$("#textDisp").html(
						playerChar.name + " attacked with strength, dealing "+
						playerStrike+ " damage! <br>"+
						oppChar.name+ " counter attacked with magic, dealing "+
						enemyStrike+ " damage!"
						);
				break;

				case 2:
					var playerStrike= damageCalc (playerChar, playerChar.str, 0,5);
					var enemyStrike= damageCalc (oppChar, oppChar.int, 2);
					dealDamage();

					$("#textDisp").html(
						playerChar.name + " attacked with strength, dealing "+
						playerStrike+ " damage! <br>"+
						oppChar.name+ " counter attacked with intelligence, dealing "+
						enemyStrike+ " damage!"
						);
				break;
			};

			killCheck();
		break;

		case "magic":
			switch (enemyAttack){
				case 0:
					var playerStrike= damageCalc (playerChar, playerChar.mag, 0,5);
					var enemyStrike= damageCalc (oppChar, oppChar.str, 2);
					dealDamage();

					$("#textDisp").html(
						playerChar.name + " attacked with magic, dealing "+
						playerStrike+ " damage! <br>"+
						oppChar.name+ " counter attacked with strength, dealing "+
						enemyStrike+ " damage!"
						);
				break;

				case 1:
					var playerStrike= damageCalc (playerChar, playerChar.mag, 1);
					var enemyStrike= damageCalc (oppChar, oppChar.mag, 1);
					dealDamage();

					$("#textDisp").html(
						playerChar.name + " attacked with magic, dealing "+
						playerStrike+ " damage! <br>"+
						oppChar.name+ " counter attacked with magic, dealing "+
						enemyStrike+ " damage!"
						);
				break;

				case 2:
					var playerStrike= damageCalc (playerChar, playerChar.mag, 2);
					var enemyStrike= damageCalc (oppChar, oppChar.int, 0,5);
					dealDamage();

					$("#textDisp").html(
						playerChar.name + " attacked with magic, dealing "+
						playerStrike+ " damage! <br>"+
						oppChar.name+ " counter attacked with intelligence, dealing "+
						enemyStrike+ " damage!"
						);
				break;
			};

			killCheck();
		break;

		case "intelligence":
			switch (enemyAttack){
				case 0:
					var playerStrike= damageCalc (playerChar, playerChar.int, 2);
					var enemyStrike= damageCalc (oppChar, oppChar.str, 0,5);
					dealDamage();

					$("#textDisp").html(
						playerChar.name + " attacked with intelligence, dealing "+
						playerStrike+ " damage! <br>"+
						oppChar.name+ " counter attacked with strength, dealing "+
						enemyStrike+ " damage!"
						);
				break;

				case 1:
					var playerStrike= damageCalc (playerChar, playerChar.int, 0,5);
					var enemyStrike= damageCalc (oppChar, oppChar.mag, 2);
					dealDamage();

					$("#textDisp").html(
						playerChar.name + " attacked with intelligence, dealing "+
						playerStrike+ " damage! <br>"+
						oppChar.name+ " counter attacked with magic, dealing "+
						enemyStrike+ " damage!"
						);
				break;

				case 2:
					var playerStrike= damageCalc (playerChar, playerChar.int, 1);
					var enemyStrike= damageCalc (oppChar, oppChar.int, 1);
					dealDamage();

					$("#textDisp").html(
						playerChar.name + " attacked with intelligence, dealing "+
						playerStrike+ " damage! <br>"+
						oppChar.name+ " counter attacked with intelligence, dealing "+
						enemyStrike+ " damage!"
						);
				break;
			};

			killCheck();
		break;

		case "continue":
			if (gameState=="loss"||gameState=="victory"){
				innitialize();
				$("#select-btn").attr("disabled");
			}
			else{
				if (wins<2){
					gameState= "enemySelect";

					wins++
					console.log(wins);
					playerChar.pow= playerChar.pow+4;
					playerChar.hp= playerChar.hp+20;

					switch (oppChar){
						case tomias:
							playerChar.str= playerChar.str+2;
						break;

						case willow:
							playerChar.int= playerChar.int+2;
						break;

						case justinian:
							playerChar.str= playerChar.str+1;
							playerChar.mag= playerChar.mag+1;
							playerChar.int= playerChar.int+1;
						break;

						case helia:
							playerChar.mag= playerChar.mag+2;
						break;

					}

					var newDiv= "<div id= 'playerStats' class= 'col'></div>"

					$("#textDisp").html(newDiv);

					$("#playerStats").html(
						"<h3>"+playerChar.name+playerChar.title+"</h3>"+
						"<div> Health: "+playerChar.hp+"</div>"+
						"<div> Power: "+playerChar.pow+"</div>"+
						"<div> Strength: "+playerChar.str+"</div>"+
						"<div> Magic: "+playerChar.mag+"</div>"+
						"<div> Intelligence: "+playerChar.int+"</div>"
					);

					newDiv= "<div class= 'col'> <h2>VS</h2> </div>"

					$("#textDisp").append(newDiv);

					$("#select-btn").attr("disabled");

					$("#select-btn").show();

					$("#select-btn").text("Select an opponent");

					$("#continue-btn").hide();

					oppChar= "none";
				}
				else{
					gameState="victory";

					$("#textDisp").html(
						"<div>"+ playerChar.name+ " has defeated all foes! Congraultions! Try again with another character?</div>"
					);
				};
			};
		break;
	};
});

//end
});