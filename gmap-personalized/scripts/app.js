(function(){

    /*
        GLOBAL VARIABLES : 

    */
    var defaultPosition = {
        lat: 28.194217,
        lon: 84.024136,
        icon: 'red',
        title: "Nepal",
        shortDes: "Le Népal, en forme longue la République démocratique fédérale du Népal, en népali Nepāl, नेपाल et Sanghiya Loktantrik Ganatantratmak Nepāl, संघीय लोकतान्त्रिक गणतन्त्रात्मक नेपाल, est un pays enclavé de l'Himalaya, bordé au nord par la Chine (région autonome du Tibet), au sud, à l'ouest et à l'est par l'Inde.",
        longDes: "Le Népal possède une très grande variété de paysages, s'étendant du tropical humide du Teraï, au sud, jusqu'aux plus hautes montagnes du monde, au nord. Le Népal possède huit montagnes parmi les dix plus hautes du monde2, dont l'Everest (Sagarmatha en népalais) qui marque la frontière avec le Tibet. Le Népal a été rendu célèbre pour les possibilités qu'il offre pour le tourisme, le trekking, l'alpinisme, le VTT, les safaris, le rafting et ses nombreux temples et lieux de cultes. Katmandou est la capitale (politique et religieuse) du Népal, dont elle est également la plus grande ville. Les autres principales villes sont Pokhara, Biratnagar, Lalitpur (Patan), Bhaktapur, Birendranagar, Hetauda, Butwal, Bharatpur, Siddhartanagar (Bhairahawa), Birganj, Janakpur, Nepalganj, Dharan, Dhangadhi, et Mahendranagar."
    }
    var Mountains = 
    [
        {
            lat: 27.960364,
            lon: 86.913541,
            icon: 'red',
            height: 8850,
            title: "Mount Everest",
            shortDes: "L’Everest, en tibétain Chomolungma, en népalais Sagarmatha, aussi appelé mont Everest, est une montagne située dans la chaîne de l'Himalaya, à la frontière entre le Népal (Sagarmatha) et la Chine (Tibet).",
            longDes: "L’Everest, en tibétain Chomolungma, en népalais Sagarmatha, aussi appelé mont Everest, est une montagne située dans la chaîne de l'Himalaya, à la frontière entre le Népal (Sagarmatha) et la Chine (Tibet).Il est aperçu par des Européens pour la première fois en 1847 puis, après quelques années d'observations et de calculs, son altitude est établie à 8 848 mètres et il est identifié comme le plus haut sommet du monde au-dessus du niveau de la mer. Cette caractéristique lui vaut d'être baptisé de son nom actuel par les Occidentaux en 1865 et, dès les années 1920, de lui attirer l'intérêt des alpinistes qui se lancent à l'assaut de ses pentes. Plusieurs expéditions, en particulier britanniques, se succèdent depuis le nord. Toutefois, les conditions climatiques extrêmes font leurs premières victimes, parmi lesquelles George Mallory et Andrew Irvine, en 1924, dont on ne saura probablement jamais avec certitude s'ils ont atteint le sommet. En 1950, le Népal autorise l'accès à la montagne depuis le sud offrant des possibilités d'ascension par l'arête Sud-Est, moins périlleuse. Finalement, trois ans plus tard, Edmund Hillary et Tensing Norgay réussissent à vaincre l'Everest. Dès lors, les exploits en tous genres s'enchaînent, alimentant les fantasmes populaires ; mais, en 1996, une série d'accidents mortels vient rappeler les dangers liés à la montagne, portant de nos jours à plus de 200 le nombre de victimes. Pourtant, le tourisme de masse se popularise, fragilisant le milieu malgré les créations du parc national de Sagarmatha en 1976 et de la réserve naturelle du Qomolonma en 1988. Ainsi, plus de 14 000 alpinistes ont tenté l'ascension depuis 1922 et plus de 4 000 l'ont réussie, bien aidés, pour la majorité d'entre eux, par les porteurs sherpas."
        },
        {
            lat: 27.710200,
            lon: 88.119290,
            icon: 'green',
            height: 8586,
            title: "Kanchenjunga",
            shortDes: "Le Kangchenjunga (appelé aussi Kanchenjunga, Kangchen Dzö-nga, Kachendzonga, ou Kangchanfanga) est un sommet de l'Himalaya, sur la frontière indo-népalaise, à l'est du Népal, entre le district de Taplejung et l'État indien du Sikkim où il peut être vu notamment de la capitale Gangtok.", 
            longDes: "Le Kangchenjunga (appelé aussi Kanchenjunga, Kangchen Dzö-nga, Kachendzonga, ou Kangchanfanga) est un sommet de l'Himalaya, sur la frontière indo-népalaise, à l'est du Népal, entre le district de Taplejung et l'État indien du Sikkim où il peut être vu notamment de la capitale Gangtok. Avec une altitude de 8 586 mètres, c'est le troisième plus haut sommet sur Terre, après l'Everest et le K2, et le point culminant de l'Inde. Jusqu'en 1852, il fut considéré comme le plus haut sommet du monde."
        },
        {
            lat: 27.962722, 
            lon: 86.933747, 
            icon: 'red', 
            height: 8516, 
            title: "Lhotse", 
            shortDes: "Sommet de l'Himalaya sur la frontière Népal-Tibet (Chine), le Lhotse est le quatrième plus haut sommet du monde avec une altitude de 8 516 m. Son nom signifie pic du sud en tibétain car c'est un sommet satellite de l'Everest dont il est séparé par le col Sud (7 906 m). Il fait partie des 14 sommets de plus de huit mille mètres.",
            longDes: "Le Lhotse semble sous la coupe de l'Everest, avec lequel il partage une branche orientée nord-sud de la grande chaîne qui s'étend d'est en ouest, dans la partie orientale de l'Himalaya. Cette branche coïncide avec la ligne frontalière qui sépare le bassin de Kangshung, au Tibet, de celui du Khumbu, au Népal. Issue du sommet de l'Everest, une grande dorsale montagneuse part en s'abaissant vers l'ouest, culminant au Pumori (7 145 m). De l'autre côté, l'arête sud de l'Everest va jusqu'au col, 7 900 m. Puis la ligne d'arête remonte jusqu'au Lhotse, où elle bifurque vers l'est pour rejoindre, par le Lhotse Shar le Pethangste (6 730 m) en direction du Makalu. Depuis le sommet du Lhotse se détache une autre crête, vers l'ouest, qui se poursuit sur six kilomètres jusqu'au Nuptse, selon une direction parallèle à la face sud-ouest de l'Everest, encerclant ainsi le vaste cirque glaciaire appelé Western Cwm (combe ouest). Ce glacier rejoint, au niveau de la grande barre de séracs appelé Icefall (cascade de glace), celui du Khumbu dont l'interminable langue s'allonge vers le sud."
        },
        {
            lat: 27.889288,
            lon: 87.087904,
            icon: 'green',
            height: 8463,
            title: "Makalu",
            shortDes: "Le Makalu (au Népal officiellement मकालु, en Chine officiellement Makaru ; en chinois : 马卡鲁山, en pinyin : Mǎkǎlǔ Shān ; en limbu : Makalungma) est le cinquième sommet le plus haut du monde. Il est situé au sud-est de l'Everest sur la frontière tibéto-népalaise à 8 463 mètres d'altitude. Le Makalu est une montagne isolée qui a la forme d'une pyramide à quatre côtés.",
            longDes: "Le Makalu (au Népal officiellement मकालु, en Chine officiellement Makaru ; en chinois : 马卡鲁山, en pinyin : Mǎkǎlǔ Shān ; en limbu : Makalungma) est le cinquième sommet le plus haut du monde. Il est situé au sud-est de l'Everest sur la frontière tibéto-népalaise à 8 463 mètres d'altitude. Le Makalu est une montagne isolée qui a la forme d'une pyramide à quatre côtés. Le Makalu possède deux pics secondaires notables : Kangchungtse ou Makalu II (7 678 m) et Chomo Lonzo (7 804 m). Le Makalu est considéré par les alpinistes comme l'un des sommets les plus techniques de l'Himalaya."
        },
        {
            lat: 28.698865, 
            lon: 83.487564, 
            icon: 'red', 
            height: 8167, 
            title: "Dhaulagiri", 
            shortDes: "Le Dhaulagiri est le septième plus haut sommet du monde, dans la chaîne de l'Himalaya. Plus haute montagne entièrement au Népal, il est localisé dans le centre est du pays. Dhaulagiri vient des mots sanscrits « Dhavali giri » signifiant « Montagne blanche ».",
            longDes: "Le Dhaulagiri est le septième plus haut sommet du monde, dans la chaîne de l'Himalaya. Plus haute montagne entièrement au Népal, il est localisé dans le centre est du pays. Dhaulagiri vient des mots sanscrits « Dhavali giri » signifiant « Montagne blanche ». Après sa découverte par les Européens en 1808, il fut considéré pendant 30 ans comme le plus haut sommet du monde. Le nom de Dhaulagiri se rapporte aussi à cinq sommets satellites du point culminant (8 167 mètres), s'étageant de 7 268 mètres d'altitude pour le Dhaulagiri VI à 7 751 mètres d'altitude pour le Dhaulagiri II. Massif très isolé, le Dhaulagiri fut survolé et photographié en 1949 par le géologue Arnold Heim alors que le Népal était interdit aux Européens."
        },
        {
            lat: 28.550024,
            lon: 84.560624, 
            icon: 'green', 
            height: 8163, 
            title: "Manaslu",
            shortDes: "Le Manaslu (népalais : मनास्लु) est le huitième plus haut sommet du monde. Il est situé au Népal dans la chaîne de l'Himalaya, dans le massif du Gurkha. En tibétain, le sommet est appelé Kutang (Tang désignant un endroit plat). Manaslu vient du mot sanskrit Manasa qui signifie « Montagne de l'esprit ».",
            longDes: "En 1952 une reconnaissance par une expédition japonaise atteint 5 275 mètres d'altitude. L'année suivante une première tentative d'une expédition japonaise de quinze alpinistes atteint 7 750 mètres par le côté est1. Il faut attendre 1956 pour que la première ascension soit réussie le 9 mai par une expédition japonaise organisée par Yuko Maki et dirigée par Toshio Imanishi et comprenant le sherpa Gyalzen Norbu, sur la face nord-est. L'expédition est financée par le grand quotidien Mainichi Shinbun."
        }
    ];


    var city = 
    [
        {
            title: 'Kathmandou',
            lat: 27.711924,
            lon: 85.319867,
            icon: 'red',
            population: 700000,
            color: '#FF0000',
            shortDes : 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam',
            longDes : 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
        }, 
        {
            title: 'Pokhara',
            lat: 28.209076,
            lon: 83.994030,
            icon: 'red',
            population: 264991,
            color: '#FF7000',
            shortDes : 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam',
            longDes : 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
        
        },
        {
            title: 'Biratnagar',
            lat: 26.463735,
            lon: 87.278159,
            icon: 'red',
            population: 204949,
            color: '#FFa000',
            shortDes : 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam',
            longDes : 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
        
        },
        {
            title: 'Bharatpur',
            lat: 27.685608,
            lon: 84.430490,
            icon: 'red',
            population: 147777,
            color: '#FFc000',
            shortDes : 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam',
            longDes : 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
        
        },
        {
            title: 'Birgunj',
            lat: 27.015442,
            lon: 84.883112,
            icon: 'red',
            population: 139068,
            color: '#FFe000',
            shortDes : 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam',
            longDes : 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
        
        }
    ]
    var styles = [
      {
        stylers: [
          { hue: "#ff0000" },
          { saturation: -2 }
        ]
      },{
        featureType: "road",
        elementType: "geometry",
        stylers: [
          { lightness: 5 },
          { visibility: "simplified" }
        ]
      },{
        featureType: "road",
        elementType: "labels",
        stylers: [
          { visibility: "off" }
        ]
      }
    ];
    var marker_icon_red = 'images/marker-bleu.png';
    var marker_icon_green = 'images/marker-green.png';
    var panoramio_iframe = '<iframe style="float: right; margin: 10px" src="http://www.panoramio.com/wapi/template/list.html?tag=_TAG_&amp;width=1000&amp;height=200&amp;rows=1&amp;columns=7&amp;orientation=horizontal" frameborder="0" width="1000" height="200" scrolling="no" marginwidth="0" marginheight="0"> </iframe>'

    window.App = window.App || {};

    App.init = function(){
        this.map = "";
        this.initializeMap();
        this.events();
        this.addDescriptionPlace(defaultPosition);     
    };

    App.events = function(){

        google.maps.event.addListener(App.searchBox, 'places_changed', function() {
            App.searchPlaces();
        });
         
        $('.input-options').find('input').on('change', function(){

            $('body').append('<section class="searchZone"><input type="text" id="location-search"/></section>');

            var mountains,color,trafic,weather,transit,photos,population;
            mountains = color = trafic = weather = transit = photos = population = false;

            $('.input-options').find('input').each(function(index, item){
                if( $(item).prop('checked') ){

                    if($(item).data('show') === "mountains"){
                        mountains = true;
                    }
                    if($(item).data('show') === "color"){
                        color = true;
                    }
                    else if($(item).data('show') === "trafic"){
                        trafic = true;
                    }
                    else if($(item).data('show') === "weather"){
                        weather = true;
                    }
                    else if($(item).data('show') === "transit"){
                        transit = true;
                    }
                    else if($(item).data('show') === "photos"){
                        photos = true;
                    }
                    else if($(item).data('show') === "population"){
                        population = true;
                    }
                }
            });

            App.initializeMap(mountains,color,trafic,weather,transit,photos,population);
        });
    }
    

    App.initializeMap =  function (mountains,color,trafic,weather,transit,photos,population) {
        App.options = {
            mountains: mountains,
            color: color,
            trafic: trafic,
            weather: weather,
            transit: transit,
            photos: photos,
            population: population
        }
        var mapOptions = {
            center: new google.maps.LatLng(defaultPosition.lat, defaultPosition.lon),
            zoom: 7,
            panControl: false,
            zoomControl: true,
            scaleControl: true,
            zoomControlOptions: {},
            mapTypeControlOptions: {},
            //disableDefaultUI: true (disable click elements of default google map)
            styles: (App.options.color)? styles : ''
        };

        App.map = new google.maps.Map(document.getElementById("map-canvas"),
            mapOptions);


        var input =(document.getElementById('location-search'));
        App.map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
        App.searchBox = new google.maps.places.SearchBox(input);


        if(App.options.mountains){
            App.addMountains();
            App.map.setMapTypeId(google.maps.MapTypeId.HYBRID);
        }
        else if(App.options.trafic){
            App.addTraficLayer();
        }
        else if(App.options.weather){
            App.addWeatherLayer();
        }
        else if(App.options.transit){
            App.addTransitLayer();
        }
        else if(App.options.photos){
           App.addPanoramioLayer(); 
        }
        else if(App.options.population){
            App.addPopulationColorShape();
        }
        else{
            App.placeMarker( App.map.getCenter(), defaultPosition);
            App.addIframePanoramio(defaultPosition.title);
        }
    }

    App.placeMarker = function(place, store) {
        if(place == '' || place == "undefined"){
            alert('place is undefined');
            return false;
        } 
        var marker = new google.maps.Marker({
            position: place,
            map: this.map,
            animation: google.maps.Animation.DROP,
            title: store.title+' (click to zoom)',
            icon: (store.icon == "red")? marker_icon_red : marker_icon_green
        });

        var contentString = App.addInfowindowContent(store);

        var infowindow = new google.maps.InfoWindow({
            content: contentString
        });

        google.maps.event.addListener(marker, 'click', function() {
            App.map.setZoom(11);
            App.map.setCenter(marker.getPosition());
            console.log(marker);
            infowindow.open(App.map,marker);
            App.addDescriptionPlace(store);
            App.addIframePanoramio(store.title);
        });
        google.maps.event.addListener(infowindow,'closeclick',function(){
            App.map.setZoom(7);
            var place = new google.maps.LatLng(defaultPosition.lat,defaultPosition.lon);
            App.map.setCenter(place);
        });

        App.map.setCenter(place);
    };
    App.addIframePanoramio = function(tag){
        var tag = tag.toLowerCase();
        var new_panoramio_iframe = panoramio_iframe.replace('_TAG_', tag);
        $('#diaporama').html(new_panoramio_iframe);
    };

    App.addInfowindowContent = function(store){
        console.log(store);
        var contentString = '<div id="content">'+
          '<div id="siteNotice">'+
          '</div>'+
          '<h1 id="firstHeading" class="firstHeading">'+store.title+'</h1>'+
          '<div id="bodyContent">'+
          '<p>'+store.shortDes+'</p>'+
          '</div>'+
          '</div>';

          return contentString;
    };
    App.addDescriptionPlace = function(store){

        $('#description_place').slideUp('slow', function(){
            var $this = $(this);
            $this.find('h2').html(store.title);
            $this.find('p').html(store.longDes);
            $(this).slideDown('slow', function(){ });
        });
    }
    App.searchPlaces = function(){
        var markers = [];            
        var places = App.searchBox.getPlaces();
         for (var i = 0, marker; marker = markers[i]; i++) {
              marker.setMap(null);
            }

            // For each place, get the icon, place name, and location.
            markers = [];
            var bounds = new google.maps.LatLngBounds();
            for (var i = 0, place; place = places[i]; i++) {
              var image = {
                url: place.icon,
                size: new google.maps.Size(71, 71),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(17, 34),
                scaledSize: new google.maps.Size(25, 25)
              };

              // Create a marker for each place.
              var marker = new google.maps.Marker({
                map: App.map,
                icon: image,
                title: place.name,
                position: place.geometry.location
              });

              markers.push(marker);

              bounds.extend(place.geometry.location);
            }
            App.map.fitBounds(bounds);
    }

    App.addMountains = function(){
        for(var i=0; i<Mountains.length; i++){
            var place = new google.maps.LatLng(Mountains[i].lat,Mountains[i].lon);
            App.placeMarker(place, Mountains[i]);
        }
    }

    App.addTraficLayer = function(){
        var trafficLayer = new google.maps.TrafficLayer();
        trafficLayer.setMap(this.map);
    };

    App.addTransitLayer = function(){
        var transitLayer = new google.maps.TransitLayer();
        transitLayer.setMap(this.map);
    };
    
    App.addWeatherLayer = function(){
        var weatherLayer = new google.maps.weather.WeatherLayer({
            temperatureUnits: google.maps.weather.TemperatureUnit.FAHRENHEIT
        });
        weatherLayer.setMap(this.map);
    };

    App.addPanoramioLayer = function(){
        var panoramioLayer = new google.maps.panoramio.PanoramioLayer();
        console.log(panoramioLayer);
        panoramioLayer.setMap(this.map);
    };
    App.addPopulationColorShape = function(){
        for(var i=0; i<city.length; i++){
            var place = {
                center: new google.maps.LatLng(city[i].lat, city[i].lon),
                population: city[i].population,
                color: city[i].color
            }
            bermudaTriangle = new google.maps.Polygon({
                strokeColor: place.color,
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: place.color,
                fillOpacity: 0.35,
                map: this.map,
                center: place.center,
                radius: place.population / 20,
                clickable: true
            });
            var cityCircle = new google.maps.Circle(bermudaTriangle); 

            google.maps.event.addListener(cityCircle,"mouseover",function(){
                 this.setOptions({fillColor: "#00FF00"});
            });
            google.maps.event.addListener(cityCircle,"mouseout",function(){
                 this.setOptions({fillColor: place.color});
            });

            // var infowindow = new google.maps.InfoWindow({
            //     content: '<h3>City: '+place.title+'</h3><p>Population'+place.population+'</p>'
            // });

            // google.maps.event.addListener(cityCircle,"click",function(){
            //      //this.setOptions({fillColor: place.color});
            //      console.log(this.center);
            //      App.map.setZoom(11);
            //      App.map.setCenter(this.center);
            //      this.setOptions({fillColor: 'transparent'});
            // });
            var place = new google.maps.LatLng(city[i].lat,city[i].lon);
            App.placeMarker(place, city[i]);
        }
    };

    if(document.all) {
        App.init();
        
    } else {
        $(function() {
          App.init();
        });
    }

})(jQuery);