var AgileGrenobleApp = AgileGrenobleApp || {};
AgileGrenobleApp.service('ThemeService', function () {

    var dictionary =
    {
    		tech : "Technique",
    		scrummaster : "Scrum master",
    		tous: "Pour tous",
    		manager: "Manager",
    		po: "PO",
    		rex: "Retour d'experience",
    		debutnat: "Debutant"
/*
        tech: "Nouveaux savoir-faire & competences",
        development: "Developpement personnel & collectif",
        mom21: "Organisation & management du 21eme siecle",
        pleasure: "Bien-etre au travail"
*/
    };

    this.findName = function (theme) {
        return dictionary[theme];
    }

    this.themeDictionary = function() {
        return _.clone(dictionary);
    }


});

