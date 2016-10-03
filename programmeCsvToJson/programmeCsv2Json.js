'use strict';

{
    // supprime 1ière ligne (headers sur 2ième)
    var rooms = {
        "Auditorium" : { "capacity" : 530,
                         "id" : 0
                       },
        "Makalu" : { "capacity" : 110,
                     "id" : 1
                   },
        "Cervin" : { "capacity" : 40,
                     "id" : 2
                   },
        "Everest" : { "capacity" : 40,
                      "id" : 3
                    },
        "Meije" : { "capacity" : -1,
                    "id" : 4
                  },

        "Kili 1+2" : { "capacity" : 55,
                       "id" : 5
                     },
        /* "Kili 3+4" : { "capacity" : 55,
                       "id" : 6
                     }, */
        "Kili 3" : { "capacity" : -24, /*ééé*/
                     "id" : 7
                   },
        "Kili 4" : { "capacity" : -24,
                     "id" : 8
                   },

        "Mt Blanc 1+2" : { "capacity" : -48, /*ééé*/
                           "id" : 9
                         },
        /*"Mt Blanc 3+4" : { "capacity" : -48,
                           "id" : 10
                         },*/
        "Mt Blanc 3" : { "capacity" : 24,
                         "id" : 11
                       },
        "Mt Blanc 4" : { "capacity" : 24,
                         "id" : 12
                       }
    };
    /*        "Atrium 1" : { "capacity" : 20,
              "id" : 10
              },
              "Atrium 2" : { "capacity" : 30,
              "id" : 11
              },*/

/** Filtre les sessions non retenues (room pas défini)
    Prend les noms de champs sur la 2ième ligne
 */
    var convert = function (rooms, csvInput) {
        csvInput = csvInput.slice(csvInput.indexOf('\n')+1);
        var sessionsCsv = $.csv.toObjects(csvInput, csvError);
        var programmeJson = [];
        for (var s = 0; s<sessionsCsv.length; s++) {
	    var session = sessionsCsv[s];
	    //console.log(session);
	    var room = session.room;
	    if (room != undefined && room != '') {
	        if(session.length == undefined) {
		    session.length = 3;
	        }
	        if(session.width == undefined) {
		    session.width = 1;
	        }
	        if(session.type == undefined) {
		    session.type = 'session';
	        }
	        
	        //session.speakers[i]=

                // Nettoie
	        session.room = undefined;
	        session.status = undefined;
	        session[''] = undefined;

                // Salle double?
                var indexPlus = room.indexOf('+');
                if (rooms[room] === undefined &&  indexPlus != -1) {
                    room = room.slice(0,indexPlus);
                    var room2 = room.slice(0,-1) + (Number(room.slice(-1))+1);
                }
                
                // Créneau double?
	        if (session.slot.indexOf('+') == -1) {
                    session.slot--;
                } else {
		    session.slot = parseInt(session.slot)-1;  // pour tableau (index à partir de 0)
                    var nextSlot = session.slot+1;
                }

                // Salle double à mettre sur 2 salles simples
                if (room2 !== undefined) {
                    var sessionDouble = {};
                    sessionDouble.theme = session.theme;
                    sessionDouble.width = session.width;
                    sessionDouble.length = session.length;
		    sessionDouble.slot = session.slot;
		    sessionDouble.type = 'salleDouble';
		    sessionDouble.title = '(salle double)';
		    programmeJson[session.slot][room2] = sessionDouble;
                    console.log(room2,sessionDouble,room);
                }

	        // Suite de créneau pour créneau double
                if (nextSlot !== undefined) {
		    if (programmeJson[nextSlot] === undefined) {
		        programmeJson[nextSlot] = {};
		    }
                    var sessionSuite = {};
		    //var sessionSuite = JSON.parse(JSON.stringify(session));
                    sessionSuite.theme = session.theme;
                    sessionSuite.width = session.width;
                    sessionSuite.length = session.length;
		    sessionSuite.slot = nextSlot;
		    sessionSuite.type = 'suiteCreneauDouble';
		    sessionSuite.title = 'suite (créneau double)';
		    programmeJson[nextSlot][room] = sessionSuite;
	        }

                // La session elle-même
	        var slot = session.slot;
	        if (slot != undefined && slot != null) {
		    if (programmeJson[slot] === undefined) {
		        programmeJson[slot] = {};
		    }
		    /* var order = rooms[room].id;
		       if (programmeJson[slot][order] === undefined) {
		       programmeJson[slot][order] = {};
		       }
		       programmeJson[slot][order]: room --> session;*/
		    programmeJson[slot][room] = session;
	        }
	    }
        };
        return programmeJson;
    }

    var csvError = function (err, data){
        if (err) {
	    alert ('*********** CSV ERROR: ' + err);
        } else {
	    alert('Convert ok: ' + data);
        };
    }


    var dataLoad = function (url) {
        $.ajax({
            type: "GET",
            url: url,
	    dataType: 'text',
            success: OnSuccess,
	    error: OnError
            ,cache: false//
            ,isLocal: true
            //ifModified
        });
    }
    var OnSuccess = function (result) {
        var c = convert(rooms, result);
        $('#divResultat').html('angular.callbacks._0({ "rooms": ' + JSON.stringify(rooms) + ', "slots": ' + JSON.stringify(c) + '})');
    }

    var OnError = function (jqXHR, textStatus, errorThrown) {
        alert('dataLoad ERROR: ' + textStatus + '  ' + errorThrown);
    }

    dataLoad("https://docs.google.com/spreadsheets/d/1eNbJzyZOHES02YQaBHb5Ikxs6gPi5s8unVCkyIMJVUw/export?format=csv");

}
