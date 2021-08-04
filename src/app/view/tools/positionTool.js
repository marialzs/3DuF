import MouseTool from "./mouseTool";

import Registry from "../../core/registry";
import Feature from "../../core/feature";
import Device from "../../core/device";
import SimpleQueue from "../../utils/simpleQueue";

import paper from "paper";
import Params from "../../core/params";
import Component from "../../core/component";
import { ComponentAPI } from "@/componentAPI";
import MapUtils from "../../utils/mapUtils";

export default class PositionTool extends MouseTool {
    constructor(typeString, setString) {
        super();
        this.typeString = typeString;
        this.setString = setString;
        this.currentFeatureID = null;
        const ref = this;
        this.lastPoint = null;
        this.showQueue = new SimpleQueue(
            function() {
                ref.showTarget();
            },
            20,
            false
        );
        this.up = function(event) {
            // do nothing
        };
        this.move = function(event) {
            ref.lastPoint = MouseTool.getEventPosition(event);
            ref.showQueue.run();
        };
        this.down = function(event) {
            Registry.viewManager.killParamsWindow();
            paper.project.deselectAll();
            ref.createNewFeature(MouseTool.getEventPosition(event));
        };
    }

    createNewFeature(point) {
        const name = Registry.currentDevice.generateNewName(this.typeString);
        const newFeature = Device.makeFeature(
            this.typeString,
            {
                position: PositionTool.getTarget(point)
            },
            name
        );
        this.currentFeatureID = newFeature.ID;
        Registry.currentLayer.addFeature(newFeature);
    }

    /**
     * Returns the 2D vector of the position of the cursor
     * @param point
     * @return {Point}
     */
    static getTarget(point) {
        const target = Registry.viewManager.snapToGrid(point);
        return [target.x, target.y];
    }

    /**
     * Renders the target
     */
    showTarget() {
        const target = PositionTool.getTarget(this.lastPoint);
        Registry.viewManager.updateTarget(this.typeString, this.setString, target);
    }

    /**
     * Creates a new component and adds it to the registry's current device
     * Note: Takes the feature ids as an array
     * TODO: Modify this to take the MINT String as another parameter
     * @param typeString Type of the Feature
     * @param params Map of all the paramters
     * @param featureIDs [String] Feature id's of all the features that will be a part of this component
     */
    createNewComponent(typeString, paramdata, featureIDs) {
        const definition = ComponentAPI.getDefinition(typeString);
        // Clean Param Data
        const cleanparamdata = {};
        for (const key in paramdata) {
            cleanparamdata[key] = paramdata[key].value;
        }
        const params = new Params(cleanparamdata, MapUtils.toMap(definition.unique), MapUtils.toMap(definition.heritable));
        const componentid = ComponentAPI.generateID();
        const name = Registry.currentDevice.generateNewName(typeString);
        const newComponent = new Component(params, name, definition.mint, componentid);
        let feature;

        for (const i in featureIDs) {
            newComponent.addFeatureID(featureIDs[i]);

            // Update the component reference
            feature = Registry.currentDevice.getFeatureByID(featureIDs[i]);
            feature.referenceID = componentid;
        }

        Registry.currentDevice.addComponent(newComponent);
        return newComponent;
    }
}
