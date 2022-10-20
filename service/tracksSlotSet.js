const tracksSlotSetConstants = require("../constants/tracksSlotSetConstants.js")
class TracksSlotSet {
    constructor(){
        if(TracksSlotSet.instance == null){
            
            TracksSlotSet.instance = this
        }
        return TracksSlotSet.instance
        
    }

   setTracksSlot(track, numberOfSlots){
        let slot = tracksSlotSetConstants.INITIAL_SLOT
        for(slot ;slot <= numberOfSlots;slot++){
            track.set(slot,{
                occupied:tracksSlotSetConstants.INITIALLY_OCCUPIED,
                entryTime: tracksSlotSetConstants.INITIALLY_ENTRY_TIME,
                exitTime : tracksSlotSetConstants.INITIALLY_EXIT_TIME
            })
        }
        return track
    }
}

module.exports.tracksSlotSet = Object.freeze(new TracksSlotSet())