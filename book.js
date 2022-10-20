const trackSelector = require("./service/trackSelector")
const bookingTime = require("./constants/bookingTime")
const availableTime = require("./constants/availableTime")
const bookConstants = require("./constants/bookConstants.js")
const tracksRates = require("./constants/trackRates.js")
const billConstants = require("./constants/billConstants.js")
class Booking {
    constructor(){
        if(Booking.instance ==null){
            this.bookingVehicleData = new Map()
            Booking.instance = this
        }
        return Booking.instance
    }
    bookingVehicleEntry(bookingData){
        const BOOK=bookConstants.BOOK
        const VEHICLE_TYPE =bookConstants.VEHICLE_TYPE
        const VEHICLE_NUMBER =bookConstants.VEHICLE_NUMBER
        const BOOKING_TIME = bookConstants.BOOKING_TIME
        const MINIMUM_BOOKING_HOURS=bookConstants.MINIMUM_BOOKING_HOURS
        const HOUR_PART=bookConstants.HOUR_PART
        const MINUTE_PART=bookConstants.MINUTE_PART
        const DECIMAL_FORMAT = bookConstants.DECIMAL_FORMAT
        const MINUTES_IN_AN_HOUR =bookConstants.MINUTES_IN_AN_HOUR
        if(bookingData[BOOK]=='BOOK'){
            this.bookingVehicleData.set(bookingData[VEHICLE_NUMBER ], {
                vehicleNumber : bookingData[VEHICLE_NUMBER ],
                trackType : bookingData[VEHICLE_TYPE]+'_TRACK',
                StartTime: {
                    hour : parseInt(bookingData[BOOKING_TIME].split(":")[HOUR_PART], DECIMAL_FORMAT ),
                    minute : parseInt(bookingData[BOOKING_TIME].split(":")[MINUTE_PART], DECIMAL_FORMAT ),
                    inMinutes: parseInt(bookingData[BOOKING_TIME].split(":")[HOUR_PART], DECIMAL_FORMAT )*MINUTES_IN_AN_HOUR+parseInt(bookingData[BOOKING_TIME].split(":")[MINUTE_PART], DECIMAL_FORMAT )
                },
                minimumBookingExitTime:{
                    hour : parseInt(bookingData[BOOKING_TIME].split(":")[HOUR_PART], DECIMAL_FORMAT ) +MINIMUM_BOOKING_HOURS,
                    minute :  parseInt(bookingData[BOOKING_TIME].split(":")[MINUTE_PART], DECIMAL_FORMAT ),
                    inMinutes: (parseInt(bookingData[BOOKING_TIME].split(":")[HOUR_PART], DECIMAL_FORMAT )+MINIMUM_BOOKING_HOURS)*MINUTES_IN_AN_HOUR+parseInt(bookingData[BOOKING_TIME].split(":")[MINUTE_PART], DECIMAL_FORMAT )
               
                },
                exitTime:{
                    hour : NaN,
                    minute : NaN,
                },
                isValidBookingTime:this.checkValidBookingTime(bookingData[BOOKING_TIME].split(":")[HOUR_PART],bookingData[BOOKING_TIME].split(":")[MINUTE_PART]),
                bookingStatus: '',
                isValidExitTime:NaN,
                intialBookingBill: billConstants.INITIAL_BOOKING_BILL,
                additionalBill : billConstants.INITIAL_ADDITIONAL_BILL,
                finalBill: billConstants.INITIAL_FINAL_BILL,
                vipIntialBookingBill: billConstants.INITIAL_VIP_INITIAL_BOOKING_BILL,
                vipAdditionalBill : billConstants.INITIAL_VIP_ADDITIONAL_BILL,
                vipFinalBill: billConstants.INITIAL_VIP_FINAL_BILL
    
            })
            

        }
        


    }
    checkValidBookingTime(hour,minute){
        const DECIMAL_FORMAT = bookConstants.DECIMAL_FORMAT
        const hourParsed = parseInt(hour, DECIMAL_FORMAT )
        const minuteParsed = parseInt(minute , DECIMAL_FORMAT )
        if(hourParsed>=bookingTime.BOOKING_OPEN_HOUR && hourParsed<bookingTime.BOOKING_CLOSE_HOUR){
            return 'VALID_ENTRY_TIME'
        }else if(hourParsed==bookingTime.BOOKING_CLOSE_HOUR && minuteParsed==bookingTime.BOOKING_CLOSE_MINUTE){

            return 'VALID_ENTRY_TIME'
        }
        else if(hourParsed==bookingTime.BOOKING_CLOSE_HOUR && minuteParsed >bookingTime.BOOKING_CLOSE_MINUTE){

            return 'INVALID_ENTRY_TIME'
        }
         else{
            return 'INVALID_ENTRY_TIME'
            }

    }
    setBookingStatus(INPUT_LIST,VEHICLE_NUMBER){
        this.bookingVehicleEntry(INPUT_LIST)
            
            if(this.bookingVehicleData.has(INPUT_LIST[VEHICLE_NUMBER])){
                
            
                 const vehicleType = this.bookingVehicleData.get(INPUT_LIST[VEHICLE_NUMBER]).trackType
                 
                 const vehicleTrackSelector = trackSelector.trackSelector.selectTrackByVehicleType(vehicleType)
                 const slotAvailble = vehicleTrackSelector.checkSlotAvailablity(this.bookingVehicleData.get(INPUT_LIST[VEHICLE_NUMBER]).StartTime.inMinutes)
                 
                 if(this.bookingVehicleData.get(INPUT_LIST[VEHICLE_NUMBER]).isValidBookingTime == 'INVALID_ENTRY_TIME'){
                    this.bookingVehicleData.get(INPUT_LIST[VEHICLE_NUMBER]).bookingStatus = "INVALID_ENTRY_TIME"
                 }
                 else if(slotAvailble.slotAvailable){
                    const slotBookedAndBilling = vehicleTrackSelector.setSlot(slotAvailble,this.bookingVehicleData.get(INPUT_LIST[VEHICLE_NUMBER]).StartTime.inMinutes)
                    this.bookingVehicleData.get(INPUT_LIST[VEHICLE_NUMBER]).bookingStatus = "SUCCESS"
                    
                    if(slotBookedAndBilling.initialBookingBill){
                        this.bookingVehicleData.get(INPUT_LIST[VEHICLE_NUMBER]).intialBookingBill = slotBookedAndBilling.initialBookingBill
                    }
                    else{this.bookingVehicleData.get(INPUT_LIST[VEHICLE_NUMBER]).vipIntialBookingBill = slotBookedAndBilling.vipInitialBookingBill}
                 }else{
                    this.bookingVehicleData.get(INPUT_LIST[VEHICLE_NUMBER]).bookingStatus = "RACETRACK_FULL"
                 }
                 

            }

    }
    addtionalHours(exitData){
       
        const VEHICLE_NUMBER  =bookConstants.ADDED_VEHICLE_NUMBER
        const EXIT_TIME =bookConstants.EXIT_TIME
        const HOUR_PART=bookConstants.HOUR_PART
        const MINUTE_PART= bookConstants.MINUTE_PART
        const DECIMAL_FORMAT = bookConstants.DECIMAL_FORMAT
        const MINUTES_IN_AN_HOUR = bookConstants.MINUTES_IN_AN_HOUR
        
            
                return   {vehicleNumber: exitData[VEHICLE_NUMBER],
                    exitTime:{
                        hour : exitData[EXIT_TIME ].split(":")[HOUR_PART] ,
                        minute : exitData[EXIT_TIME ].split(":")[MINUTE_PART],
                        inMinutes: (parseInt(exitData[EXIT_TIME].split(":")[HOUR_PART], DECIMAL_FORMAT ))*MINUTES_IN_AN_HOUR+parseInt(exitData[EXIT_TIME].split(":")[MINUTE_PART], DECIMAL_FORMAT )
                    }} 
        
    }
    checkValidExitTime(hour,minute){
        const DECIMAL_FORMAT  = bookConstants.DECIMAL_FORMAT
        const hourParsed = parseInt(hour, DECIMAL_FORMAT )
        const minuteParsed = parseInt(minute , DECIMAL_FORMAT )
        if(hourParsed>=availableTime.TRACK_OPEN_HOUR && hourParsed<availableTime.TRACK_CLOSE_HOUR ){
            return 'SUCCESS'
        }else if(hourParsed==availableTime.TRACK_CLOSE_HOUR && minuteParsed==availableTime.TRACK_CLOSE_MINUTE){

            return 'SUCCESS'
        }
        else if(hourParsed== availableTime.TRACK_CLOSE_HOUR && minuteParsed >availableTime.TRACK_CLOSE_MINUTE){

            return 'INVALID_EXIT_TIME'
        }
         else{
            return 'INVALID_EXIT_TIME'
            }

    }
    additionalBilling(minimumBookingExitTime,exitTime){
        const gracePeriod = bookConstants.GRACE_PERIOD
        const noAdditionalTime = bookConstants.NO_ADDITIONAL_TIME
        if((exitTime -minimumBookingExitTime) > gracePeriod ){
            const additionalCostPerHour = tracksRates.ADDITIONAL_HOUR 
            const MINUTES_IN_AN_HOUR = bookConstants.MINUTES_IN_AN_HOUR
            const additionBill = Math.ceil((exitTime -minimumBookingExitTime)/MINUTES_IN_AN_HOUR )*additionalCostPerHour
            return additionBill

        }else{
            return noAdditionalTime
        }

        
    }
    addtionalTimingExtension(ADDITIONAL_LIST,VEHICLE_NUMBER){
        
            const addtionalTimeData = this.addtionalHours(ADDITIONAL_LIST)
            
            this.bookingVehicleData.get(ADDITIONAL_LIST[VEHICLE_NUMBER]).exitTime = addtionalTimeData.exitTime
            this.bookingVehicleData.get(ADDITIONAL_LIST[VEHICLE_NUMBER]).isValidExitTime= this.checkValidExitTime(addtionalTimeData.exitTime.hour,addtionalTimeData.exitTime.minute)
            const additionalBill = this.additionalBilling(this.bookingVehicleData.get(ADDITIONAL_LIST[VEHICLE_NUMBER]).minimumBookingExitTime.inMinutes,this.bookingVehicleData.get(ADDITIONAL_LIST[VEHICLE_NUMBER]).exitTime.inMinutes)
           
            
            
            
            if(this.bookingVehicleData.get(ADDITIONAL_LIST[VEHICLE_NUMBER]).isValidExitTime =="SUCCESS" && this.bookingVehicleData.get(ADDITIONAL_LIST[VEHICLE_NUMBER]).intialBookingBill.toString()>0){
                
                this.bookingVehicleData.get(ADDITIONAL_LIST[VEHICLE_NUMBER]).additionalBill =additionalBill
            }else if(this.bookingVehicleData.get(ADDITIONAL_LIST[VEHICLE_NUMBER]).isValidExitTime =="SUCCESS" && this.bookingVehicleData.get(ADDITIONAL_LIST[VEHICLE_NUMBER]).intialBookingBill.toString()>0){
                this.bookingVehicleData.get(ADDITIONAL_LIST[VEHICLE_NUMBER]).vipAdditionalBill =additionalBill
            } 
    }
    revenueCalculator(){
        let regularRevenue = bookConstants.INITIAL_REGULAR_REVENUE;
            let vipRevenue = bookConstants.INITIAL_VIP_REVENUE;
            this.bookingVehicleData.forEach((map)=>{
                regularRevenue += map.intialBookingBill+map.additionalBill
                vipRevenue +=map.vipIntialBookingBill+map.vipAdditionalBill  
            })
            
        return regularRevenue+" "+vipRevenue
    }


}

module.exports.booking = Object.freeze(new Booking())
