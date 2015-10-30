var AgileGrenobleApp = AgileGrenobleApp || {};
AgileGrenobleApp.service('SessionService', function() {

    /// Session: sauts de ligne dans description, bio, ...
    this.enableCarriageReturn = function(session) {
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

});
