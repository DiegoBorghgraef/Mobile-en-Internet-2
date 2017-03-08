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
	// attribuut aanpassen (alt bestaat al in html)
	$("#foto").attr("alt", "jQuery ... write less, do more!");
	// attribuut toevoegen (title bestaat nog niet in html)
	$("#foto").attr("title", "jQuery ... write less, do more!");

	/*
	 *
	 * vb 2
	 *
	 */
	$("#foto2").attr({
		alt : "jQuery ... write less, do more too!",
		title : "jQuery ... write less, do more too!"
	});

	/*
	 *
	 * vb 3
	 *
	 */
	$("#voorbeeld3 a").attr({
		target : "_blank",
		id : function (index, oudeWaarde) {// pas de id aan
			return oudeWaarde + "-" + index;
		},
		title : function (index) {// pas de title aan
			return "link" + "-" + index;
		}
	});

	/*
	*
	* vb 4
	*
	*/
	//pas de inhoud dynamisch aan (merk op : we starten met 5 hoofdstukken)
	$("#inhoud").html("<li>Hoofdstuk 1</li><li>Hoofdstuk 2</li><li>Hoofdstuk 3</li>");
	// Pas de tekst van de h2 dynamisch aan op basis van het aantal
	// li elementen dat in het element #inhoud zit
	// let op : we doen dit hier met een functie
	$("#voorbeeld4 h2").html(function () {
		var aantal = $("#inhoud li").length;
		return "Het boek heeft " + aantal + " hoofdstukken.";
	});

	/*
	*
	* vb 5.1
	*
	*/
	// de bezoeker moet op de vraag kunnen klikken en direct naar het
	// juiste antwoord navigeren :

	// geef ieder antwoord een uniek id, gebaseerd op de volgorde
	$("#antwoorden div").attr({
		id : function (index, waarde) {
			return "antwoord-" + index;
		}
	});
	// link nu vragen naar deze antwoorden, op basis van de volgorde
	$("#vragen a").attr({
		href : function (index, waarde) {
			return "#antwoord-" + index;
		}
	});

	/*
	*
	* vb 5.2
	*
	*/
	// de bezoeker moet op de vraag kunnen klikken en direct naar het
	// juiste antwoord navigeren :

	// geef ieder antwoord een uniek id, gebaseerd op de volgorde
	$("#antwoorden2 div").attr({
		id : function (index, waarde) {
			return "antwoord2-" + index;
		}
	});
	// link nu vragen naar deze antwoorden, op basis van de volgorde
	$("#vragen2 a").attr({
		href : function (index, waarde) {
			return "#antwoord2-" + index;
		}
	});
	// plaats onder elk antwoord een link die de bezoeker naar de lijst van
	// de vragen stuurt
	$("#antwoorden2 div").append("<a href='#vragen2'>terug naar de vragen</a>");

	/*
	*
	* vb 5.3
	*
	*/
	// de bezoeker moet op de vraag kunnen klikken en direct naar het
	// juiste antwoord navigeren :

	// geef ieder antwoord een uniek id, gebaseerd op de volgorde
	$("#antwoorden3 div").attr({
		id : function (index, waarde) {
			return "antwoord3-" + index;
		}
	});
	// link nu vragen naar deze antwoorden, op basis van de volgorde
	$("#vragen3 a").attr({
		href : function (index, waarde) {
			return "#antwoord3-" + index;
		}
	});
	// plaats onder elk antwoord een link die de bezoeker naar de lijst van
	// de vragen stuurt
	$("<a href='#vragen3'>terug naar de vragen</a>").appendTo("#antwoorden3 div");

	/*
	*
	* vb 5.4
	*
	*/
	// de bezoeker moet op de vraag kunnen klikken en direct naar het
	// juiste antwoord navigeren :

	// geef ieder antwoord een uniek id, gebaseerd op de volgorde
	$("#antwoorden4 div").attr({
		id : function (index, waarde) {
			return "antwoord4-" + index;
		}
	});
	// link nu vragen naar deze antwoorden, op basis van de volgorde
	$("#vragen4 a").attr({
		href : function (index, waarde) {
			return "#antwoord4-" + index;
		}
	});
	// plaats onder elk antwoord een link die de bezoeker naar de lijst van
	// de vragen stuurt. let op het verschil tussen after en append !
	// kijk na dmv  de inspectors!
	$("#antwoorden4 div").after("<a href='#vragen4'>terug naar de vragen</a>");

	/*
	*
	* vb5.5
	*
	*/
	// we hernemen de vragen van vragen4 en plaatsen deze in #vragen5
	$("#vragen4").children().clone().appendTo("#vragen5");

	// de bezoeker moet op de vraag kunnen klikken en direct naar het
	// juiste antwoord navigeren :

	// geef ieder antwoord een uniek id, gebaseerd op de volgorde
	$("#antwoorden5 div").attr({
		id : function (index, waarde) {
			return "antwoord5-" + index;
		}
	});
	// link nu vragen naar deze antwoorden, op basis van de volgorde
	$("#vragen5 a").attr({
		href : function (index, waarde) {
			return "#antwoord5-" + index;
		}
	});
	// plaats onder elk antwoord een link die de bezoeker naar de lijst van
	// de vragen stuurt. let op het verschil tussen after en append !
	// kijk na dmv  de inspectors!
	$("#antwoorden5 div").after("<a href='#vragen5'>terug naar de vragen</a>");

});

function toonVb(itemNr) {
	// verberg alle elementen met de klasse voorbeeld
	$('.voorbeeld').hide();
	// toon het element met klasse voorbeeld dat op positie itemNr staat
	$('.voorbeeld').eq(itemNr).show();

}