import {REGISTRY_PART} from "@classes/App/AppTID";
import {IPart3D} from "@classes/Part/PartTID";
import {Part3D} from "@classes/Part/Part3D";
import {LungsSimulator_BUILD_CFG} from "@classes/App/AppParts/LungsPart/Cfg";

const NAME = 'LungsPart';
declare module '@classes/App/AppTID' {
    export interface IUniqueParts {
        [NAME]:LungsPart
    }
}

@REGISTRY_PART(NAME)
export class LungsPart extends Part3D implements IPart3D{
    async init(){
        await super.init(LungsSimulator_BUILD_CFG);
    }
}
