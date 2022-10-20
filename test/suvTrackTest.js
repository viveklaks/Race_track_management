var assert = require('assert');

var {suvTrack} = require("../service/suvTrack")

  describe('suvTrack', ()=> {
    it('should return Object with three properties confirm booking of suv slot 1',  ()=> {
        var bookTimeInMinutes =950
        var sampleMap01 = suvTrack.checkSlotAvailablity(bookTimeInMinutes)
        assert.equal(sampleMap01.trackType, "REGULAR_SUV_TRACK");
        assert.equal(sampleMap01.slotNumber, 2);
        assert.equal(sampleMap01.slotAvailable, true);
        
    });
  });