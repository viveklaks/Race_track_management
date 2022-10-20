var assert = require('assert');
var trackRates = require("../constants/trackRates")
var {bikeTrack} = require("../service/bikeTrack")

  describe('bikeTrack', ()=> {
    it('should return Object with three properties confirm booking of bike slot 1',  ()=> {
        var bookTimeInMinutes =950
        var sampleMap01 = bikeTrack.checkSlotAvailablity(bookTimeInMinutes)
        assert.equal(sampleMap01.trackType, "REGULAR_BIKE_TRACK");
        assert.equal(sampleMap01.slotNumber, 1);
        assert.equal(sampleMap01.slotAvailable, true);
        
    });
    it('should return Object with three properties confirm booking of bike slot 1',  ()=> {
      var bookTimeInMinutes =950
      var sampleMap01 = bikeTrack.checkSlotAvailablity(bookTimeInMinutes)
      assert.equal(sampleMap01.trackType, "REGULAR_BIKE_TRACK");
      assert.equal(sampleMap01.slotNumber, 1);
      assert.equal(sampleMap01.slotAvailable, true);
      
  });
  
  
  });