import LLChamber from "../library/llChamber";
 import ThreeDMixer from "../library/threeDMixer";
 import Via from "../library/via";
 import ZigZagMixer from "../HalfCurvedMixer";

 //new

 @@ -123,7 +125,9 @@ export default class FeatureSet {
             DropletGenFlow: { object: new DropletGeneratorFlowFocus(), key: null },
             LogicArray: { object: new LogicArray(), key: "FLOW" },
             LogicArray_control: { object: new LogicArray(), key: "CONTROL" },
             LogicArray_cell: { object: new LogicArray(), key: "CELL" }
             LogicArray_cell: { object: new LogicArray(), key: "CELL" },
             ZigZagMixer: { object: new ZigZagMixer(), key: "FLOW"}, 
             ZigZagMixer_control: {object: new ZigZagMixer(), key: "CONTROL"}
         };

         // this.__checkDefinitions();
