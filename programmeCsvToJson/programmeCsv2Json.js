// supprime 1ière ligne (headers sur 2ième)
var convert = function (csvInput) {
    csvInput = csvInput.slice(csvInput.indexOf('\n')+1);
    sessionsCsv = $.csv.toObjects(csvInput, csvError);
    sessionsJson = [];
    for (s = 0; s<sessionsCsv.length; s++) {
	session = sessionsCsv[s];
	room = session.room;
	if (room != undefined) {
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

	    slot = session.slot;
	    if (sessionsJson[slot] == undefined) {
		sessionsJson[slot] = {};
	    }
	    sessionsJson[slot][room] = session;
	}
    };
    return sessionsJson;
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
    c = convert(result);
    $('#divResultat').html(JSON.stringify(c));
}

var OnError = function (jqXHR, textStatus, errorThrown) {
    alert('dataLoad ERROR: ' + textStatus + '  ' + errorThrown);
}

dataLoad("https://docs.google.com/spreadsheets/d/1eNbJzyZOHES02YQaBHb5Ikxs6gPi5s8unVCkyIMJVUw/export?format=csv");

