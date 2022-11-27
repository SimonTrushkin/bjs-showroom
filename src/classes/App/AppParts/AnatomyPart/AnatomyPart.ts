import {REGISTRY_PART} from "@classes/App/AppTID";
import {IPart3D} from "@classes/Part/PartTID";
import {Part3D} from "@classes/Part/Part3D";
import {AnatomySimulator_BUILD_CFG} from "@classes/App/AppParts/AnatomyPart/Cfg";

const NAME = 'AnatomyPart';
declare module '@classes/App/AppTID' {
    export interface IUniqueParts {
        [NAME]:AnatomyPart
    }
}

@REGISTRY_PART(NAME)
export class AnatomyPart extends Part3D implements IPart3D{
    async init(){
        await super.init(AnatomySimulator_BUILD_CFG);
    }
}
