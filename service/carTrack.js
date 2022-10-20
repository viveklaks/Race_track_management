
const tracksSlotSet = require("./tracksSlotSet.js")
const numberOfTracksAvailable = require("../constants/numberOfTracksAvailable.js")
const trackType = require("../constants/trackType.js")
const trackRates= require("../constants/trackRates.js")
const minimumBookingTime = require("../constants/minimumBookingTime.js")
const checkSlot = require("../constants/checkSlot.js")
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
        let check_Slot = checkSlot.CHECK_SLOT 
        for(check_Slot.CHECK_SLOT;check_Slot<= numberOfTracksAvailable.REGULAR_CAR_TRACKS_AVAILABLE;check_Slot++){
         if(this.regularTracks.get(check_Slot).occupied==0){
                 return {
                     trackType: trackType.REGULAR_CAR_TRACK,
                     slotNumber: check_Slot,
                     slotAvailable: true
                 }
         }
         else if(this.regularTracks.get(checkSlot).exitTime<=bookTimeInMinutes){
            return {
                trackType: trackType.REGULAR_CAR_TRACK,
                slotNumber: check_Slot,
                slotAvailable: true
            }
        }
         else{
             continue
         }
        }
        let vipCheckSlot = checkSlot.VIP_CHECK_SLOT
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
        
        
        if(trackType.VIP_CAR_TRACK == slotSpot.trackType){
            this.vipTracks.set(slotSpot.slotNumber,{
                occupied:1,
                entryTime: entryTime,
                exitTime : entryTime+minimumBookingTime.MINIMUM_BOOKING_TIME_IN_MINUTE
            })
            return {slotSpotBooked:true,
                vipInitialBookingBill: trackRates.VIP_CAR_TRACKS_RATE*3
                }
        }
        else if(trackType.REGULAR_CAR_TRACK == slotSpot.trackType) {
            this.regularTracks.set(slotSpot.slotNumber,{
                occupied:1,
                entryTime: entryTime,
                exitTime : entryTime+minimumBookingTime.MINIMUM_BOOKING_TIME_IN_MINUTE
            })
            return {slotSpotBooked:true,
                initialBookingBill: trackRates.REGULAR_CAR_TRACKS_RATE*3
                }

        }
         
 
     }
}
module.exports.carTrack = Object.freeze(new CarTrack())