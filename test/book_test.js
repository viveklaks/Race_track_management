var assert = require('assert');

var {booking} = require("../book")

  describe('book', ()=> {
    it('Vehicle Detail Entry should return map with Object with booking vehicle "bike" details',  ()=> {
        var bookingData =["BOOK", "BIKE", "M40", "14:00"]
        booking.bookingVehicleEntry(bookingData)
        assert.equal(booking.bookingVehicleData.get("M40").vehicleNumber , "M40");
        assert.equal(booking.bookingVehicleData.get("M40").StartTime.hour, 14);
        assert.equal(booking.bookingVehicleData.get("M40").StartTime.minute, 0);
        assert.equal(booking.bookingVehicleData.get("M40").trackType, "BIKE_TRACK");
        
    });
    it('Vehicle Detail Entry should return map with Object with booking vehicle "suv" details',  ()=> {
      var bookingData =["BOOK", "SUV", "M40", "14:00"]
      booking.bookingVehicleEntry(bookingData)
      assert.equal(booking.bookingVehicleData.get("M40").vehicleNumber , "M40");
      assert.equal(booking.bookingVehicleData.get("M40").StartTime.hour, 14);
      assert.equal(booking.bookingVehicleData.get("M40").StartTime.minute, 0);
      assert.equal(booking.bookingVehicleData.get("M40").trackType, "SUV_TRACK");
      
  });
  it('Vehicle Detail Entry should return map with Object with booking vehicle "car" details',  ()=> {
    var bookingData =["BOOK", "CAR", "M40", "14:00"]
    booking.bookingVehicleEntry(bookingData)
    assert.equal(booking.bookingVehicleData.get("M40").vehicleNumber , "M40");
    assert.equal(booking.bookingVehicleData.get("M40").StartTime.hour, 14);
    assert.equal(booking.bookingVehicleData.get("M40").StartTime.minute, 0);
    assert.equal(booking.bookingVehicleData.get("M40").trackType, "CAR_TRACK");
    
});
it('Booking time is valid',  ()=> {
  var hour =14
  var minute = 23
  var isValidEntry =booking.checkValidBookingTime(hour,minute)
  assert.equal(isValidEntry  , 'VALID_ENTRY_TIME');
  
  
});
it('Booking time is invalid',  ()=> {
  var hour =17
  var minute = 2
  var isValidEntry =booking.checkValidBookingTime(hour,minute)
  assert.equal(isValidEntry , 'INVALID_ENTRY_TIME');
  
  
});
it('Booking Success for bike',  ()=> {
  var INPUT_LIST =["BOOK", "BIKE", "M10", "14:00"]
  var VEHICLE_NUMBER = 2
  booking.setBookingStatus(INPUT_LIST,VEHICLE_NUMBER)
  assert.equal(booking.bookingVehicleData.get("M10").bookingStatus , 'SUCCESS');
  
  
});
it('Booking Success for car',  ()=> {
  var INPUT_LIST =["BOOK", "CAR", "M50", "14:00"]
  var VEHICLE_NUMBER = 2
  booking.setBookingStatus(INPUT_LIST,VEHICLE_NUMBER)
  assert.equal(booking.bookingVehicleData.get("M50").bookingStatus , 'SUCCESS');
  
  
});
it('Booking Success',  ()=> {
  var INPUT_LIST =["BOOK", "SUV", "M60", "15:00"]
  var VEHICLE_NUMBER = 2
  booking.setBookingStatus(INPUT_LIST,VEHICLE_NUMBER)
  assert.equal(booking.bookingVehicleData.get("M60").bookingStatus , 'SUCCESS');
  
  
});
it("Entered time is valid Exit Time",()=>{
  const hour = 18
  const minute = 19
  var isValidExitTime =  booking.checkValidExitTime(hour,minute)
  assert.equal(isValidExitTime,'SUCCESS')

})
it("Entered time is valid Exit Time",()=>{
  const hour = 20
  const minute = 19
  var isValidExitTime =  booking.checkValidExitTime(hour,minute)
  assert.equal(isValidExitTime,'INVALID_EXIT_TIME')

})
it("Addtional billing amount",()=>{
  const minimumBookingExitTime= 120
  const exitTime = 365
  var additionalBill =   booking.additionalBilling(minimumBookingExitTime,exitTime)
  assert.equal(additionalBill,250)

})
it("nil addtional billing amount",()=>{
  const minimumBookingExitTime= 120
  const exitTime = 135
  var additionalBill =   booking.additionalBilling(minimumBookingExitTime,exitTime)
  assert.equal(additionalBill,0)

})
it("additional hours entry",()=>{
  
  const exitData = ["ADDITIONAL" ,"O34" ,"20:50"]
  var additionalHoursDetailsOfVehicle=   booking.addtionalHours(exitData)
  assert.equal(additionalHoursDetailsOfVehicle.vehicleNumber,"O34")
  assert.equal(additionalHoursDetailsOfVehicle.exitTime.hour,"20")
  assert.equal(additionalHoursDetailsOfVehicle.exitTime.minute,"50")
})
it("calculate revenue",()=>{
  
  
  var total_regular_vip_revenue = booking.revenueCalculator()
  assert.equal(total_regular_vip_revenue,"1140 0")
  
})
  });
