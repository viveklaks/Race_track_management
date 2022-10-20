var assert = require('assert');
var {tracksSlotSet} = require("../service/tracksSlotSet")
  describe('tracksSlotSet', ()=> {
    it('should return map with value Object and threee properties',  ()=> {
        var sampleMap = tracksSlotSet.setTracksSlot(new Map(),1)
        assert.equal(sampleMap.get(1).occupied, 0);
        assert.equal(sampleMap.get(1).entryTime, 0);
        assert.equal(sampleMap.get(1).exitTime, 0);
    });
  });