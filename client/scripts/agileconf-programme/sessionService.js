var AgileGrenobleApp = AgileGrenobleApp || {};
AgileGrenobleApp.service('SessionService', function (ThemeService) {

    /// Divers traitements pour afficher correctement les sessions
    this.fixSessionData = function (session) {
        cleanUpSpeakers(session);
        session.themeName = ThemeService.findName(session.theme);
        addLackingHttp(session);
        suppressDuplicateDescription(session);
    };

    /// Ajoute http:// au début de l'url des orateurs si absent (sinon c'est traité en url relative)
    var addLackingHttp = function (session) {
        for (var speakerIndex in session['speakers-detail']) {
            var speaker = session['speakers-detail'][speakerIndex];
            if (speaker && speaker.website && speaker.website.substr(0, 4) != "http") {
                speaker.website = "http://" + speaker.website
            }
        }
    };

    /// Supprime doublon entre description courte et longue (si la longue est égale ou commence par la courte)
    var suppressDuplicateDescription = function (session) {
        if (session.description == session.abstract) {
            session.description = "";
        } else if (session.description.substr(0, session.abstract.length) == session.abstract) {
            session.description = session.description.substr(session.abstract.length);
        }
    };

    /// Remove speaker with no data (produces a ":" in the session)
    var cleanUpSpeakers = function (session) {
        for (var speakerIndex in session['speakers-detail']) {
            if (!session['speakers-detail'][speakerIndex]) {
                delete session['speakers-detail'][speakerIndex];
            }
        }
    };

});
