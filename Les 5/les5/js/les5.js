"use strict";
/*global $ */

$(function () {
	// menu opzetten en de voorbeelden verbergen
	$(".voorbeeld > h2 span").clone().prependTo("#menu").wrap("<li></li>").wrap("<a></a>");
	$("#menu").menu();
	$('.voorbeeld').hide();

	// de menuitems automatisch naar de juiste voorbeelden laten linken
	$("nav a").attr({
		onmousedown : function (index) {// pas de id aan
			return "javascript:toonVb(" + index + ");";
		}
	});

	/*
	 *
	 * vb 1
	 *
	 */

	$('#voorbeeld1 img').each(
        // each is een eenvoudige methode om door alle elementen van een
        // verzameling te lopen.
        function () {
            // als de afbeelding hoger is dan 300, dan verkleinen we ze
            // in html tot 300 px hoogte
            if ((this).height > 300) {
                $(this).height(300);
            }
        }
    );

	/*
	 *
	 * vb 2
	 *
	 */
	$(window).on("load", function () {
		$('#voorbeeld2 img').each(
            // each is een eenvoudige methode om door alle elementen van een
            // verzameling te lopen.
            function () {
                // als de afbeelding hoger is dan 300, dan verkleinen we ze
                // in html tot 300 px hoogte
                if ((this).height > 300) {
                    $(this).height(300);
                }
                    
            }
        );
	});
	/*
	 *
	 * vb 3
	 *
	 */
	
	$('#voorbeeld3 img').on("error", function () {
		//$(this).parent().html("Deze foto is niet gevonden.");
		$(this).parent().html("<img src='img/404-error.png'>");
	});
	
	
	/*
    *
    * vb 3.5
    *
    */
    
    $('#voorbeeld35 img').on("error", function () {
        //$(this).parent().html("Deze foto is niet gevonden.");
        $(this).parent().html("<img src='img/404-error.png'>");
    });
    

	/*
	 *
	 * vb 4
	 *
	 */
	var aantal = 0;
    // Merk op dat aangezien we maar 1 variabele gebruiken
    // om de aantallen bij te houden, deze in ieder voorbeeld zullen verder
    // optellen
    
    function nieuweRegel() {
		aantal += 1;
		var regel = "<tr><td>regel " + aantal + "</td></tr>";
		$("#voorbeeld4 table").append(regel);
	}
    	
	$("#nieuweregel").click(nieuweRegel);
	

	/*
	 *
	 * vb 5
	 *
	 */
	
    function nieuweRegel2() {
		aantal += 1;
		var regel = "<tr><td>regel " + aantal + "</td><td><button>verwijderen</button></td></tr>";
		$("#voorbeeld5 table").append(regel);
	}

	function verwijderRegel() {
		$(this).parent().parent().remove();
	}
    
	$("#nieuweregel2").click(nieuweRegel2);
	// de volgende regel zal geen effect hebben : wanneer document ready is,
	// zitten die knoppen nog niet eens in de pagina : er kan geen link
	// gelegd worden tussen een onbestaande knop en een functie via een event
   
    $("#voorbeeld5 table tr button").click(verwijderRegel);
	
		

	/*
	 *
	 * vb 6
	 *
	 */
	    
    function nieuweRegel3() {
		aantal += 1;
		var regel = "<tr><td>regel " + aantal + "</td><td><button>verwijderen</button></td></tr>";
		$("#voorbeeld6 table").append(regel);
	}

	function verwijderRegel2() {
		$(this).parent().parent().remove();
	}
    	
	$("#nieuweregel3").on("click", nieuweRegel3);
	$("#voorbeeld6 table").on("click", "button", verwijderRegel2);
	


	/*
	 *
	 * vb 7
	 *
	 */
    
	$("#voorbeeld7 .artikel").on("click", function () {
		$("#voorbeeld7 .artikel h2").toggleClass("verborgen2");
		$("#voorbeeld7 .artikel p").toggleClass("verborgen2");
	});
	
	/*
	 *
	 * vb 8
	 *
	 */
	
	$("#voorbeeld8 .artikel").on("click", function (event) {
		if (event.target === this) {
            $("#voorbeeld8 .artikel h2").toggleClass("verborgen2");
            $("#voorbeeld8 .artikel p").toggleClass("verborgen2");
		}
	});
	
	/*
	 *
	 * vb 9
	 *
	 */
    
    function verwerkKeypress(event) {
		var bericht = "karakter:" + String.fromCharCode(event.which);
		$("#logKeyPress").text($("#logKeyPress").text() + bericht + "\r\n");
	}

	function verwerkKeydown(event) {
		var bericht = "code:" + event.which;
		$("#logKeyDown").text($("#logKeyDown").text() + bericht + "\r\n");
	}

	function verwerkKeyup(event) {
		var bericht = "code:" + event.which;
		$("#logKeyUp").text($("#logKeyUp").text() + bericht + "\r\n");
	}

	$("#invoer").keypress(verwerkKeypress);
	$("#invoer").keydown(verwerkKeydown);
	$("#invoer").keyup(verwerkKeyup);
	
	


   /*
    *
    * vb 10
    *
    */
    var startTimer, posX, posY, bericht;
    
    function resetTimer() {
        startTimer = new Date().getTime();
    }
    
    
    function verwerkTouchstart(event) {
        resetTimer();
        // met originalEvent kunnen we aan het originele, niet door jQuery aangepaste event
        // touches is een array, want er kan meer dan 1 aanraking zijn (multitouch!!!)
        // in dit geval testen we enkel de eerste aanraking (1 vinger dus)
        posX = event.originalEvent.touches[0].pageX;
        posY = event.originalEvent.touches[0].pageY;
        bericht = "TS:" + startTimer + " x:" + posX + " y:" + posY;
        $("#logTouchstart").text($("#logTouchstart").text() + bericht + "\r\n");
    }
    function verwerkTouchend(event) {
        posX = event.originalEvent.changedTouches[0].pageX;
        posY = event.originalEvent.changedTouches[0].pageY;
        bericht = "TE:" + (new Date().getTime() - startTimer) + " x:" + posX + " y:" + posY;
        $("#logTouchend").text($("#logTouchend").text() + bericht + "\r\n");
    }
    function verwerkClick(event) {
        posX = event.originalEvent.offsetX;
        posY = event.originalEvent.offsetY;
        bericht = "click:" + " x:" + posX + " y:" + posY;
        $("#logClick").text($("#logClick").text() + bericht + "\r\n");
    }
    
    
    $("#klikMij").on("touchstart", verwerkTouchstart);
    $("#klikMij").on("touchend", verwerkTouchend);
    $("#klikMij").on("click", verwerkClick);

});

function toonVb(itemNr) {
	// verberg alle elementen met de klasse voorbeeld
	$('.voorbeeld').hide();
	// toon het element met klasse voorbeeld dat op positie itemNr staat
	$('.voorbeeld').eq(itemNr).show();

}