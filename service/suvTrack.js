
const tracksSlotSet = require("./tracksSlotSet.js")
const numberOfTracksAvailable = require("../constants/numberOfTracksAvailable.js")
const trackType = require("../constants/trackType.js")
const trackRates= require("../constants/trackRates.js")
const minimumBookingTime = require("../constants/minimumBookingTime.js")
const check_Slot = require("../constants/checkSlot.js")
class SuvTrack {
    constructor(){
        if(SuvTrack.instance == null){
            this.regularSuvTrackAvailability= new Map()
            this.regularTracks = tracksSlotSet.tracksSlotSet.setTracksSlot(this.regularSuvTrackAvailability,numberOfTracksAvailable.REGULAR_SUV_TRACKS_AVAILABLE);
            this.vipSuvTrackAvailability= new Map()
            this.vipTracks = tracksSlotSet.tracksSlotSet.setTracksSlot(this.vipSuvTrackAvailability,numberOfTracksAvailable.VIP_SUV_TRACKS_AVAILABLE);
            SuvTrack.instance = this
        }
        return SuvTrack.instance

    }
    checkSlotAvailablity(bookTimeInMinutes){
        let checkSlot = check_Slot.CHECK_SLOT
        for(checkSlot ;checkSlot<= numberOfTracksAvailable.REGULAR_SUV_TRACKS_AVAILABLE;checkSlot++){
         if(this.regularTracks.get(checkSlot).occupied==0){

                 return {
                     trackType: trackType.REGULAR_SUV_TRACK,
                     slotNumber: checkSlot,
                     slotAvailable: true
                 }
         }else if(this.regularTracks.get(checkSlot).exitTime<=bookTimeInMinutes){
            return {
                trackType: trackType.REGULAR_SUV_TRACK,
                slotNumber: checkSlot,
                slotAvailable: true
            }
        }
         else{
             continue
         }
        }
        let vipCheckSlot = check_Slot.VIP_CHECK_SLOT
        for( vipCheckSlot ;vipCheckSlot<= numberOfTracksAvailable.VIP_SUV_TRACKS_AVAILABLE;vipCheckSlot++){
           
            if(this.vipTracks.get(vipCheckSlot).occupied==0){
                    return {
                        trackType: trackType.VIP_SUV_TRACK,
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
         trackType: trackType.VIP_SUV_TRACK,
         slotNumber: NaN,
         slotAvailable: false
     }
         
     }
     setSlot(slotSpot,entryTime){
        
        
        if(trackType.VIP_SUV_TRACK == slotSpot.trackType){
            this.vipTracks.set(slotSpot.slotNumber,{
                occupied:1,
                entryTime: entryTime,
                exitTime : entryTime+minimumBookingTime.MINIMUM_BOOKING_TIME_IN_MINUTE
            })
            return {slotSpotBooked:true,
                vipInitialBookingBill: trackRates.VIP_SUV_TRACKS_RATE*3
                }
        }
        else if(trackType.REGULAR_SUV_TRACK == slotSpot.trackType)  {
            this.regularTracks.set(slotSpot.slotNumber,{
                occupied:1,
                entryTime: entryTime,
                exitTime : entryTime+minimumBookingTime.MINIMUM_BOOKING_TIME_IN_MINUTE
            })
            return {slotSpotBooked:true,
                initialBookingBill: trackRates.REGULAR_SUV_TRACKS_RATE*3
                }

        }
 
     }

}
module.exports.suvTrack = Object.freeze(new SuvTrack())