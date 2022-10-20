class InputFormat{
    instance = null
    constructor(){
        
        if(InputFormat.instance == null){
            InputFormat.instance = this

        }
        return InputFormat.instance
    }
    
    formatInput(inputLines){
        var inputCommands = []
    for(var eachLines in inputLines){
       
        inputCommands.push(inputLines[eachLines].split(" "))
    }
    for(var eachCommand in inputCommands){
       
        for(var eachKeyWord in inputCommands[eachCommand]){
            if((/\r/).test(inputCommands[eachCommand][eachKeyWord])){
                inputCommands[eachCommand].splice(eachKeyWord,1,inputCommands[eachCommand][eachKeyWord].replace(/(\r)/gm,""))
            }   
        }
        
    }
    return inputCommands
    }

}
module.exports.inputFormat = Object.freeze(new InputFormat())

