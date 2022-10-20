const fs = require("fs")
const InputFormat = require("./inputFormat")
const book = require("./book")
const trackSelector = require("./service/trackSelector")

const filename = process.argv[2]

fs.readFile(filename, "utf8", (err, data) => {
    if (err) throw err
    var inputLines = data.toString().split("\n")
    var inputCommands = InputFormat.inputFormat.formatInput(inputLines);
  
    for(eachCommand in inputCommands){
        const BOOK=0
        const ADDITIONAL=0
        const REVENUE =0
        
        const INPUT_LIST= inputCommands[eachCommand]
        if(INPUT_LIST[BOOK] == 'BOOK'){
            const VEHICLE_NUMBER =2
            book.booking.setBookingStatus(INPUT_LIST,VEHICLE_NUMBER)
            console.log(book.booking.bookingVehicleData.get(INPUT_LIST[VEHICLE_NUMBER]).bookingStatus)
            
        }
        
        else if(INPUT_LIST[ADDITIONAL] == 'ADDITIONAL'){
            
            const VEHICLE_NUMBER = 1
            book.booking.addtionalTimingExtension(INPUT_LIST,VEHICLE_NUMBER)
            console.log(book.booking.bookingVehicleData.get(inputCommands[eachCommand][VEHICLE_NUMBER]).isValidExitTime)
        }
        else if(INPUT_LIST[REVENUE] == 'REVENUE'){
            console.log(book.booking.revenueCalculator())

        }
        
    }
    
    
})




