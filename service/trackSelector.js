const bikeTrack = require("./bikeTrack")
const carTrack = require("./carTrack")
const suvTrack = require("./suvTrack")
class TrackSelector{
    constructor(){
        if(TrackSelector.instance == null){
            TrackSelector.instance = this
        }
        return TrackSelector.instance

    }
    selectTrackByVehicleType(VehicleType){
        switch (VehicleType) {
            case "BIKE_TRACK":
                
                return bikeTrack.bikeTrack
                break;
            case "CAR_TRACK":
                
                return carTrack.carTrack
                break;
            case "SUV_TRACK":
                
                return suvTrack.suvTrack
                break;
          }
    }
}
module.exports.trackSelector = Object.freeze(new TrackSelector())