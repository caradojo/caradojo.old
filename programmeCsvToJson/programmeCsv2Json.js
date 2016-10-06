'use strict';

/** id=rang d'affichage - ne pas laisser de trous dans la numérotation
*/
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
                       "id" : 
                     }, */
        "Kili 3" : { "capacity" : -24, /*ééé*/
                     "id" : 6
                   },
        "Kili 4" : { "capacity" : -24,
                     "id" : 7
                   },

        "Mt Blanc 1+2" : { "capacity" : -48, /*ééé*/
                           "id" : 8
                         },
        /*"Mt Blanc 3+4" : { "capacity" : -48,
                           "id" : 
                         },*/
        "Mt Blanc 3" : { "capacity" : 24,
                         "id" : 9
                       },
        "Mt Blanc 4" : { "capacity" : 24,
                         "id" : 10
                       }
    };
    /*        "Atrium 1" : { "capacity" : 20,
              "id" : 
              },
              "Atrium 2" : { "capacity" : 30,
              "id" : 
              },*/

/** Filtre les sessions non retenues (=room pas défini)
    Indique les sessions doubles (slot: '.+.') et les salles doubles (salle: 'xxx.+.').
    Prend les noms de champs sur la 2ième ligne

    Pour le programme:
    ,id,status,,room,slot,,,title,theme,,,,,,firstname1,name1,,,,,,firstname2,name2,,,,,,firstname3,name3,,,,,,firstname4,name4,,,,,,,,
    Pour les sessions:
,id,status,,room,slot,level,duration,title,theme,,,abstract,benefits,,firstname1,name1,,,company1,website1,bio1,firstname2,name2,,,company2,website2,bio2,firstname3,name3,,,company3,website3,bio3,firstname4,name4,,,company4,website4,bio4,,,
*/
    var compileObjectFromCsv = function (rooms, csvInput) {
        csvInput = csvInput.slice(csvInput.indexOf('\n')+1);
        var sessionsCsv = $.csv.toObjects(csvInput, csvError);
        var program = [];
        var sessionDetails = {};

        for (var s = 0; s<sessionsCsv.length; s++) {
	    var session = sessionsCsv[s];
	    if (session.room != undefined && session.room != '') {
	        session[''] = undefined;
                moveSpeakersToArray(session);
                sessionDetails[session.id] = session;
                var sessionSummary = getSessionSummary(session);
                sessionToSlots(program, rooms, sessionSummary);
            }
        }
console.log(JSON.stringify(sessionDetails));
        return program; // sessionDetails
    }

    var moveSpeakersToArray = function(session) {
        session['speakers-detail'] = [];
        for (var speakerId=1; speakerId<=4; speakerId++) {
            session['speakers-detail'][speakerId-1] = {};
            for (var field of ['company', 'website', 'bio', 'name']) {
                session['speakers-detail'][speakerId-1][field] = session[field+speakerId];
                session[field+speakerId] = undefined;
            }
            session['speakers-detail'][speakerId-1]['name'] = session['firstname'+speakerId] + ' ' + session['speakers-detail'][speakerId-1]['name'];
            session['firstname'+speakerId] = undefined;
        }
    }

    var getSessionSummary = function(session) {
        var sessionSummary = {};
        for (var field of ['id', 'status', 'room', 'slot', 'title', 'theme'] ) {
            sessionSummary[field] = session[field];
        }
        //speakers ééé
        return sessionSummary;
    }
    
    /** Insère session (cas double créneau et double salle) dans @param program */
    var sessionToSlots = function(program, rooms, session) {
	var room = session.room;
        var room2;
        var nextSlot;

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

        // Salle double?
        var indexPlus = room.indexOf('+');
        if (rooms[room] === undefined &&  indexPlus != -1) {
            room = room.slice(0,indexPlus);
            room2 = room.slice(0,-1) + (Number(room.slice(-1))+1);
        }
        
        // Créneau double?
	if (session.slot.indexOf('+') == -1) {
            session.slot--;
        } else {
	    session.slot = parseInt(session.slot)-1;  // pour tableau (index à partir de 0)
            nextSlot = session.slot+1;
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
	    checkAndInsertSlot(program,session.slot,room2,sessionDouble);
            //console.log(room2,sessionDouble,room);
        }

	// Suite de créneau pour créneau double
        if (nextSlot !== undefined) {
            var sessionSuite = {};
	    //var sessionSuite = JSON.parse(JSON.stringify(session));
            sessionSuite.theme = session.theme;
            sessionSuite.width = session.width;
            sessionSuite.length = session.length;
	    sessionSuite.slot = nextSlot;
	    sessionSuite.type = 'suiteCreneauDouble';
	    sessionSuite.title = '2ième partie (créneau double de 110mn)';
	    checkAndInsertSlot(program,nextSlot,room,sessionSuite);
	}

        // La session elle-même
	var slot = session.slot;
	if (slot != undefined && slot != null) {
	    /* var order = rooms[room].id;
	       if (program[slot][order] === undefined) {
	       program[slot][order] = {};
	       }
	       program[slot][order]: room --> session;*/
	    checkAndInsertSlot(program, slot, room, session);
	}
    }

    /** Vérifie sessions qui se marchent dessus. Insère dans @param program */
    var checkAndInsertSlot = function (program, slot, room, session) {
        if (program[slot] !== undefined && program[slot][room] !== undefined) {
            console.log("EN DOUBLE: " + room + " " + JSON.stringify(program[slot][room]));
            console.log("           " + room + " " + JSON.stringify(session));
            session.title = "ERREUR: les sessions " + program[slot][room].id + " et " + session.id + " SONT SUR LE MEME CRENEAU (" + session.title + ")";
        } 
	if (program[slot] === undefined) {
	    program[slot] = {};
	}
        program[slot][room] = session;
    }

    var csvError = function (err, data){
        if (err) {
	    console.log('*********** CSV ERROR: ' + err);
        } else {
	    console.log('Convert ok: ' + data);
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
        var c = compileObjectFromCsv(rooms, result);
        $('#divResultat').html('angular.callbacks._0({ "rooms": ' + JSON.stringify(rooms) + ', "slots": ' + JSON.stringify(c) + '})');
    }

    var OnError = function (jqXHR, textStatus, errorThrown) {
        alert('dataLoad ERROR: ' + textStatus + '  ' + errorThrown);
    }

    dataLoad("https://docs.google.com/spreadsheets/d/1eNbJzyZOHES02YQaBHb5Ikxs6gPi5s8unVCkyIMJVUw/export?format=csv");

}
