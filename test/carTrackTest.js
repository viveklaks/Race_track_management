var assert = require('assert');

var {carTrack} = require("../service/carTrack")

  describe('carTrack', ()=> {
    it('should return Object with three properties confirm booking of car slot 1',  ()=> {
        var bookTimeInMinutes =950
        var sampleMap01 = carTrack.checkSlotAvailablity(bookTimeInMinutes)
        assert.equal(sampleMap01.trackType, "REGULAR_CAR_TRACK");
        assert.equal(sampleMap01.slotNumber, 2);
        assert.equal(sampleMap01.slotAvailable, true);
        
    });
  });