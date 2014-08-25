var AgileGrenobleApp = AgileGrenobleApp || {};
AgileGrenobleApp.service('ProgrammeService', function($q, Slots) {
        
        var slots = {};
        var rooms = {};

         var room_info = {
            "Auditorium":{"id": 0, "capacity" : 530},
            "Makalu": {"id":1, "capacity" : 110},  
            "Kili 1+2": {"id":2, "capacity" : 55},
            "Kili 3+4": {"id":3, "capacity" : 55},
            "Cervin": {"id":4, "capacity" : 40},
            "Everest": {"id":5, "capacity" : 40},
            "Mt-Blanc 1": {"id":6, "capacity" : 24},
            "Mt-Blanc 2": {"id":7, "capacity" : 24},
            "Mt-Blanc 3": {"id":8, "capacity" : 24},
            "Mt-Blanc 4": {"id":9, "capacity" : 24},
        };

        var slot_hours = [
            "8h00",
            "8h30",
            "9h00",
            "10h00",
            "10h45",
            "11h05",
            "11h35",
            "11h50",
            "13h20",
            "13h45",
            "14h30",
            "14h50",
            "15h35",
            "16h05",
            "16h50",
            "17h10",
            "17h55",
            "18h15",
        ];

        var MAX_SESSION_LENGTH = 1000;
        var room_length = [];
        var slot_hours_length = [];
        var row_hours_position = [];


        this.get = function() {
            clearDatas();

            var deferred = $q.defer();
            Slots.get(function(datas) {
                slots = datas.slots;
                prepareSlots();

                var datasDeferred = {};
                datasDeferred.slots = slots;
                datasDeferred.rooms = datas.rooms;
                datasDeferred.room_info = room_info;
                datasDeferred.slot_hours_length = slot_hours_length;
                datasDeferred.row_hours_position = row_hours_position;
                datasDeferred.slot_hours = slot_hours;
                deferred.resolve(datasDeferred);
            });
            return deferred.promise;
       };

       var clearDatas = function() {
            room_length = Array.apply(null, Array(Object.keys(room_info).length)).map(function() { return 0 });            
            slot_hours_length = [];
            row_hours_position = [];
            slots = {};
            rooms = {};
       }

       var prepareSlots = function() {
            var rowposition = 0;
            for(var index in slots) {
                var lengthmin = addGridLayoutInformationsToAllSession(slots[index], rowposition);
                slot_hours_length.push(lengthmin);
                row_hours_position.push(rowposition);
                rowposition = parseInt(rowposition) + parseInt(lengthmin);  
            }
        }

        var addGridLayoutInformationsToAllSession = function(slot, rowposition) {
            var minlength = MAX_SESSION_LENGTH;
            for (var prop in slot) {
                if (slot.hasOwnProperty(prop)) {
                    minlength = updateMinSessionLength(slot[prop], minlength);
                    if(prop == 'all') {
                        splitAndCreateAllSession(slot, slot[prop], rowposition);
                    } else {
                        addGridLayoutColumnPositionToSession(slot[prop], prop);
                        updateRoomLength(room_info[prop].id, slot[prop].length, slot[prop].width);
                    }
                    addGridLayoutRowPositionToSession(slot[prop], rowposition);
                }
            }
            return minlength;
        }

       var splitAndCreateAllSession = function(slot, session, rowposition) {
            var width = 0;
            var roomIndex = 0; 
            var isFirst = true;
            while (roomIndex < room_length.length) {
                if(room_length[roomIndex] <= rowposition) {
                    width++;
                    updateRoomLength(roomIndex, session.length, 1);
                } else {
                    isFirst = createAllSessionWithCorrectSize(session, width, isFirst, slot, roomIndex);
                    width = 0;

                }
                roomIndex++;
            }
            createAllSessionWithCorrectSize(session, width, isFirst, slot, roomIndex);
            
       }

       var createAllSessionWithCorrectSize = function(session, width, isFirst, slot, index) {
            if(width > 0) {
                var currentsession = session;
                if(isFirst == false) {
                    currentsession = JSON.parse(JSON.stringify(session));
                    slot["all"+index] = currentsession;
                }
                currentsession.colposition = index - width;
                currentsession.width = width;
                isFirst = false;
            }
            return isFirst;
       }

        var updateRoomLength = function(roomIndex, length, width) {
            for(var index = 0; index < width; index++) {
                room_length[roomIndex+index] = parseInt(room_length[roomIndex+index]) + parseInt(length);   
            }
       }

        var updateMinSessionLength = function(session, minlength) {
            var sessionlength = session.length;
            if(minlength > sessionlength) {
                minlength = sessionlength;
            }
            return minlength;
        }

        var addGridLayoutRowPositionToSession = function(session, rowposition) {
            session.rowposition = rowposition.toString();
        }

       var addGridLayoutColumnPositionToSession = function(session, room) {
            session.colposition = room_info[room].id;
       }
    });