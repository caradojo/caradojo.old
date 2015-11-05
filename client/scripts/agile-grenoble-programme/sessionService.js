var AgileGrenobleApp = AgileGrenobleApp || {};
AgileGrenobleApp.service('SessionService', function() {

    /// Divers traitements pour afficher correctement les sessions
    this.fixSessionData = function (session) {
	enableCarriageReturn(session);
	addLackingHttp(session);
	suppressDuplicateDescription(session);
    };

    /// Session: sauts de ligne dans description, bio, ...
    var enableCarriageReturn = function(session) {
        session.description = renderCarriageReturn(session.description);
        session.abstract = renderCarriageReturn(session.abstract);
	for (var speakerIndex in session['speakers-detail']) {
	    speaker = session['speakers-detail'][speakerIndex];
	    if(speaker) speaker.bio = renderCarriageReturn(speaker.bio);
	}
    };
    /// @return: carriage return -> <BR>
    var renderCarriageReturn = function(txt) {
	return txt.replace(new RegExp('\n', 'g'),'<br>\n');
    };

    /// Ajoute http:// au début de l'url des orateurs si absent (sinon c'est traité en url relative)
    var addLackingHttp = function(session) {
	for (var speakerIndex in session['speakers-detail']) {
	    speaker = session['speakers-detail'][speakerIndex];
	    if(speaker && speaker.website!='' && speaker.website.substr(0,4)!="http" ) {
		speaker.website = "http://" + speaker.website
	    }
	}
    };

    /// Supprime doublon entre description courte et longue (si la longue est égale ou commence par la courte)
    var suppressDuplicateDescription = function (session) {
        if (session.description == session.abstract) {
	    session.description = null;
	} else if (session.description.substr(0, session.abstract.length) == session.abstract) {
	    session.description = session.description.substr(session.abstract.length);
	}
    };

});
