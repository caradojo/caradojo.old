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
      "Kili 3+4" : { "capacity" : 55,
          "id" : 6
        },
      "Kili 3" : { "capacity" : -24, /*ééé*/
          "id" : 7
        },
      "Kili 4" : { "capacity" : -24,
          "id" : 8
        },

      "Mt Blanc 1+2" : { "capacity" : -48, /*ééé*/
          "id" : 9
        },
      "Mt Blanc 3+4" : { "capacity" : -48,
          "id" : 10
        },
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


var convert = function (rooms, csvInput) {
    csvInput = csvInput.slice(csvInput.indexOf('\n')+1);
    var sessionsCsv = $.csv.toObjects(csvInput, csvError);
    var programmeJson = [];
    for (var s = 0; s<sessionsCsv.length; s++) {
	var session = sessionsCsv[s];
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
	    session.room = undefined;
	    session.status = undefined;
	    session[''] = undefined;
	    
	    //session.speakers[i]=

	    var slot = session.slot;
	    if (programmeJson[slot] === undefined) {
		programmeJson[slot] = [];
	    }
	    var order = rooms[room].id;
	    if (programmeJson[slot][order] === undefined) {
		programmeJson[slot][order] = {};
	    }
	    programmeJson[slot][order][room] = session;
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
