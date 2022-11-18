import { REGISTRY_PART} from "@classes/App/AppTID";
import {IPart3D} from "@classes/Part/PartTID";
import {Part3D} from "@classes/Part/Part3D";
import {HeartSimulator_BUILD_CFG} from "@classes/App/AppParts/TestPart_1/Cfg";

const NAME = 'HeartPart';
declare module '@classes/App/AppTID' {
    export interface IUniqueParts {
        [NAME]:HeartPart
    }
}

@REGISTRY_PART(NAME)
export class HeartPart extends Part3D implements IPart3D{
    async init(){
        console.log('Heart simulator init!');
        await super.init(HeartSimulator_BUILD_CFG);
        //@ts-ignore
        window.scene = this._scene;
    }
}
