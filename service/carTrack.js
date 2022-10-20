
const tracksSlotSet = require("./tracksSlotSet.js")
const numberOfTracksAvailable = require("../constants/numberOfTracksAvailable.js")
const trackType = require("../constants/trackType.js")
const trackRates= require("../constants/trackRates.js")
class CarTrack {
    constructor(){
        if(CarTrack.instance == null){
            this.regularCarTrackAvailability = new Map()
            this.regularTracks = tracksSlotSet.tracksSlotSet.setTracksSlot(this.regularCarTrackAvailability,numberOfTracksAvailable.REGULAR_CAR_TRACKS_AVAILABLE);
            this.vipCarTrackAvailability = new Map()
            this.vipTracks = tracksSlotSet.tracksSlotSet.setTracksSlot(this.vipCarTrackAvailability,numberOfTracksAvailable.VIP_CAR_TRACKS_AVAILABLE);
            CarTrack.instance = this
        }
        return CarTrack.instance

    }
    checkSlotAvailablity(bookTimeInMinutes){
        let checkSlot = 1
        for(checkSlot;checkSlot<= numberOfTracksAvailable.REGULAR_CAR_TRACKS_AVAILABLE;checkSlot++){
         if(this.regularTracks.get(checkSlot).occupied==0){
                 return {
                     trackType: trackType.REGULAR_CAR_TRACK,
                     slotNumber: checkSlot,
                     slotAvailable: true
                 }
         }
         else if(this.regularTracks.get(checkSlot).exitTime<=bookTimeInMinutes){
            return {
                trackType: trackType.REGULAR_CAR_TRACK,
                slotNumber: checkSlot,
                slotAvailable: true
            }
        }
         else{
             continue
         }
        }
        let vipCheckSlot = 1
        for(vipCheckSlot;vipCheckSlot<= numberOfTracksAvailable.VIP_CAR_TRACKS_AVAILABLE;vipCheckSlot++){
            if(this.vipTracks.get(vipCheckSlot).occupied==0){
                    return {
                        trackType: trackType.VIP_CAR_TRACK,
                        slotNumber: vipCheckSlot,
                        slotAvailable: true
                    }
            }else if(this.vipTracks.get(vipCheckSlot).exitTime<=bookTimeInMinutes){
                return {
                    trackType: trackType.VIP_CAR_TRACK,
                    slotNumber: vipCheckSlot,
                    slotAvailable: true
                }
            }
            else{
                continue
            }
           }
        return {
         trackType: trackType.VIP_CAR_TRACK,
         slotNumber: NaN,
         slotAvailable: false
     }
         
     }
     setSlot(slotSpot,entryTime){
        const minumumMinuteOfBooking = 180
        
        if(trackType.VIP_CAR_TRACK == slotSpot.trackType){
            this.vipTracks.set(slotSpot.slotNumber,{
                occupied:1,
                entryTime: entryTime,
                exitTime : entryTime+minumumMinuteOfBooking
            })
            return {slotSpotBooked:true,
                vipInitialBookingBill: trackRates.VIP_CAR_TRACKS_RATE*3
                }
        }
        else if(trackType.REGULAR_CAR_TRACK == slotSpot.trackType) {
            this.regularTracks.set(slotSpot.slotNumber,{
                occupied:1,
                entryTime: entryTime,
                exitTime : entryTime+minumumMinuteOfBooking
            })
            return {slotSpotBooked:true,
                initialBookingBill: trackRates.REGULAR_CAR_TRACKS_RATE*3
                }

        }
         
 
     }
}
module.exports.carTrack = Object.freeze(new CarTrack())