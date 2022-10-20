var assert = require('assert');
var {trackSelector} = require("../service/trackSelector")
const bikeTrack = require("../service/bikeTrack")
const carTrack = require("../service/carTrack")
const suvTrack = require("../service/suvTrack")
  describe('trackSelector', ()=> {
    it('Should select bikeTrack Object',  ()=> {
        var bikeTrackObject= trackSelector.selectTrackByVehicleType("BIKE_TRACK")
        assert.equal(bikeTrackObject, bikeTrack.bikeTrack);
       
    });
    it('Should select carTrack Object',  ()=> {
      var carTrackObject= trackSelector.selectTrackByVehicleType("CAR_TRACK")
      assert.equal(carTrackObject, carTrack.carTrack);
     
  });
  it('Should select suvTrack Object',  ()=> {
    var suvTrackObject= trackSelector.selectTrackByVehicleType("SUV_TRACK")
    assert.equal(suvTrackObject, suvTrack.suvTrack);
   
});
  });