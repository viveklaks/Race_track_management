class TracksSlotSet {
    constructor(){
        if(TracksSlotSet.instance == null){
            
            TracksSlotSet.instance = this
        }
        return TracksSlotSet.instance
        
    }

   setTracksSlot(track, numberOfSlots){

        for(let slot = 1 ;slot <= numberOfSlots;slot++){
            track.set(slot,{
                occupied:0,
                entryTime: 0,
                exitTime : 0
            })
        }
        return track
    }
}

module.exports.tracksSlotSet = Object.freeze(new TracksSlotSet())