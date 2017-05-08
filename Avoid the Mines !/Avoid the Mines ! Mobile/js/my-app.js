// Initialize your app
var myApp = new Framework7();

// Export selectors engine
var $$ = Dom7;

// Mijn eigen vars om data bij te houden
var appData = {
    pagesData : {
        testData : ""
    }
};

var dataSerie = null, // placeholder voor de data
    dataSeries = null; // placeholder voor de data



// Add view
var mainView = myApp.addView('.view-main', {
    // Because we use fixed-through navbar we can enable dynamic navbar
    dynamicNavbar: false
});



// Callbacks to run specific code for specific pages, for example for About page:
myApp.onPageInit('about', function (page) {
    // run createContentPage func after link was clicked
    $$('.create-page').on('click', function () {
        createContentPage();
    });
});

myApp.onPageInit('got', function (page) {
    bereidGotVoor();    
});
myApp.onPageInit('gotMaterial', function (page) {
    bereidGotVoor();    
});


function bereidGotVoor(){
    // de JSON data ophalen
    $$.ajax({
        type : "GET",
        url : "http://api.tvmaze.com/singlesearch/shows?q=game-of-thrones",
        success : function (response, status, xhr) {
            // kijk in response wat de structuur is en haal er de juiste
            // stukken informatie uit en toon die op een correcte manier.
            response = JSON.parse(response);
            dataSerie = response; // cachen voor eventueel latere verwerkingen.

            // haal de naam op uit de response
            $$("div header h1").text(response.name);

            // voeg de afbeelding toe voor de h1
            $$("div header").prepend("<div class='rechts'><img src='" + response.image.medium + "'><span> Rating : " + response.rating.average + "/10</span></div>");

            // voeg de samenvatting toe
            $$("#synopsis").prepend(response.summary);
        },
        error : function (response, statusText, xhr) {
            // niet-ok
            console.log("Fout : " + statusText);
        }
    });

    $$("#afleveringen").on("click", function(){
        if( dataSeries === null){
            haalSeriesGegevensOp();
        } else {
            toonSeries();
        }

    });
}
// Generate dynamic page
var dynamicPageIndex = 0;
function createContentPage() {
	mainView.router.loadContent(
        '<!-- Top Navbar-->' +
        '<div class="navbar">' +
        '  <div class="navbar-inner">' +
        '    <div class="left"><a href="#" class="back link"><i class="icon icon-back"></i><span>Back</span></a></div>' +
        '    <div class="center sliding">Dynamic Page ' + (++dynamicPageIndex) + '</div>' +
        '  </div>' +
        '</div>' +
        '<div class="pages">' +
        '  <!-- Page, data-page contains page name-->' +
        '  <div data-page="dynamic-pages" class="page">' +
        '    <!-- Scrollable page content-->' +
        '    <div class="page-content">' +
        '      <div class="content-block">' +
        '        <div class="content-block-inner">' +
        '          <p>Here is a dynamic page created on ' + new Date() + ' !</p>' +
        '          <p>Go <a href="#" class="back">back</a> or go to <a href="services.html">Services</a>.</p>' +
        '        </div>' +
        '      </div>' +
        '    </div>' +
        '  </div>' +
        '</div>'
    );
	return;
}







function haalSeriesGegevensOp() {
    // haal de afleveringen informatie op en toon die
    $$.ajax({
        type : "GET",
        url : "http://api.tvmaze.com/singlesearch/shows?q=game-of-thrones&embed=episodes",
        dataType : 'json',
        success : function (response, status, xhr) {
            // ok
            var tekst = "",
                i;

            dataSeries = response;

            // toon nu de gegevens
            toonSeries();

        },
        error : function (response, statusText, xhr) {
            // niet-ok
            console.log("Fout : " + statusText);
        }
    });
}

function toonSeries() {
    var tekst = "",
        i;

    // haal de reeeks-info op
    for (i = 0; i < dataSeries._embedded.episodes.length; i++){
        tekst += "<div><p><span class='seizoenGetal'>" + dataSeries._embedded.episodes[i].season + " - " + dataSeries._embedded.episodes[i].number + "</span><a onclick='toggleDetails("+i+")'>"+ dataSeries._embedded.episodes[i].name + "</a></p><div class='details hidden'>";
        if (dataSeries._embedded.episodes[i].image !== null) {
            // niet alle afleveringen hebben een image
            tekst += "<img class='rechts' src='" + dataSeries._embedded.episodes[i].image.medium + "'/>";
        }

         tekst += dataSeries._embedded.episodes[i].summary + "</div></div>";
    }

    $$("#series").html(tekst);

}
function toggleDetails(i) {
$$("#series div .details").addClass("hidden").eq(i).toggleClass("hidden");
//$("#series div .details").eq(i).toggleClass("hidden");
}


