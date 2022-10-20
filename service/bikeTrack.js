
const tracksSlotSet = require("./tracksSlotSet.js")
const numberOfTracksAvailable = require("../constants/numberOfTracksAvailable.js")
const trackType = require("../constants/trackType.js")
const trackRates= require("../constants/trackRates.js")
const minimumBookingTime = require("../constants/minimumBookingTime.js")
const check_Slot = require("../constants/checkSlot.js")
class BikeTrack {
    constructor(){
        if(BikeTrack.instance == null){
            this.bikeTrackAvailability= new Map()
            this.regularTracks = tracksSlotSet.tracksSlotSet.setTracksSlot(this.bikeTrackAvailability,numberOfTracksAvailable.REGULAR_BIKE_TRACKS_AVAILABLE);
            BikeTrack.instance = this
        }
        return BikeTrack.instance

    }
    
    checkSlotAvailablity(bookTimeInMinutes){
        let checkSlot = check_Slot.CHECK_SLOT
       for(checkSlot;checkSlot<= numberOfTracksAvailable.REGULAR_BIKE_TRACKS_AVAILABLE;checkSlot++){
        if(this.regularTracks.get(checkSlot).occupied==0){
            
                return {
                    trackType: trackType.REGULAR_BIKE_TRACK,
                    slotNumber: checkSlot,
                    slotAvailable: true
                }
        }
        else if(this.regularTracks.get(checkSlot).exitTime<=bookTimeInMinutes){
            return {
                trackType: trackType.REGULAR_BIKE_TRACK,
                slotNumber: checkSlot,
                slotAvailable: true
            }
        }
        else{
            continue
        }
       }
       return {
        trackType: trackType.REGULAR_BIKE_TRACK,
        slotNumber: NaN,
        slotAvailable: false
    }
        
    }
    setSlot(slotSpot,entryTime){
        
        
        if(trackType.REGULAR_BIKE_TRACK == slotSpot.trackType){
        this.regularTracks.set(slotSpot.slotNumber,{
            occupied:1,
            entryTime: entryTime,
            exitTime : entryTime+minimumBookingTime.MINIMUM_BOOKING_TIME_IN_MINUTE
        })
        
        return {slotSpotBooked:true,
                initialBookingBill: trackRates.REGULAR_BIKE_TRACKS_RATE*3
                }
             } else{
            return false
        }
    }
    

    }


module.exports.bikeTrack = Object.freeze(new BikeTrack())