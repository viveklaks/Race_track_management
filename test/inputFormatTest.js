var assert = require('assert');

var {inputFormat} = require("../inputFormat")

  describe('inputFormat', ()=> {
    
    it('should return split readable data',  ()=> {
        var inputLines =["ADDITIONAL O34 20:50\r"]
        var readableCommand = inputFormat.formatInput(inputLines)
        
        assert.equal( readableCommand[0][0] , "ADDITIONAL");
        assert.equal( readableCommand[0][1] , "O34");
        assert.equal( readableCommand[0][2] ,  "20:50");
    });
  });