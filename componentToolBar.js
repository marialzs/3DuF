import * as Colors from "../colors";
 import * as ParameterMenu from "./parameterMenu";
 import * as Registry from "../../core/registry";
 import ZigZagMixer from "../../library/HalfCurvedMixer";

 const inactiveBackground = GREY_200;
 const inactiveText = BLACK;
 @@ -64,7 +65,7 @@ export default class ComponentToolBar {
         this.__dropletgenTButton = document.getElementById("dropletgenT_button");
         this.__dropletgenFlowButton = document.getElementById("dropletgenFlow_button");
         this.__logicarrayButton = document.getElementById("logicarray_button");

         this.__HalfCurvedMixerButton = document.getElementById("HalfCurvedMixer_button")
         //Create all the parameter menu buttons

         this.__channelParams = document.getElementById("channel_params_button");
 @@ -98,6 +99,7 @@ export default class ComponentToolBar {
         this.__alignmentMarksParams = document.getElementById("alignmentmarks_params_button");
         this.__llChamberParams = document.getElementById("llchamber_params_button");
         this.__threeDMixerParams = document.getElementById("3dmixer_params_button");
         this.__HalfCurvedMixerButton = document.getElementById("HalfCurvedMixer_button");

         this.__insertTextDialog = new InsertTextDialog();

 @@ -164,7 +166,8 @@ export default class ComponentToolBar {
             CapacitanceSensor: this.__capacitancesensorButton,
             DropletGenT: this.__dropletgenTButton,
             DropletGenFlow: this.__dropletgenFlowButton,
             LogicArray: this.__logicarrayButton
             LogicArray: this.__logicarrayButton,
             HalfCurvedMixer: this.__HalfCurvedMixerButton
         };


 @@ -474,6 +477,16 @@ export default class ComponentToolBar {

             ref.setActiveButton("LogicArray");
             ref.__viewManagerDelegate.switchTo2D();

         this.__ZigZagMixerButton.onclick =function () {
             Registry.viewManager.activateTool("HalfCurvedMixer"); 

             ref.setActiveButton("HalfCurvedMixer");
             ref.__viewManagerDelegate.switchTo2D();

         }


         };
     }

 @@ -541,6 +554,7 @@ export default class ComponentToolBar {
         this.__dropletgenTParams.onclick = ComponentToolBar.getParamsWindowCallbackFunction("DropletGenT", "Basic");
         this.__dropletgenFlowParams.onclick = ComponentToolBar.getParamsWindowCallbackFunction("DropletGenFlow", "Basic");
         this.__logicarrayParams.onclick = ComponentToolBar.getParamsWindowCallbackFunction("LogicArray", "Basic");
         this.__ZigZagMixerParams.onclick = ComponentToolBar.getParamsWindowCallbackFunction("ZigZagMixer","Basic");
     }

     static getParamsWindowCallbackFunction(typeString, setString, isTranslucent = false) {
