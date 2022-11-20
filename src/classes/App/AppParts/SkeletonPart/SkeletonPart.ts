import {REGISTRY_PART} from "@classes/App/AppTID";
import {IPart3D} from "@classes/Part/PartTID";
import {Part3D} from "@classes/Part/Part3D";
import {SkeletonSimulator_BUILD_CFG} from "@classes/App/AppParts/SkeletonPart/Cfg";

const NAME = 'SkeletonPart';
declare module '@classes/App/AppTID' {
    export interface IUniqueParts {
        [NAME]:SkeletonPart
    }
}

@REGISTRY_PART(NAME)
export class SkeletonPart extends Part3D implements IPart3D{
    async init(){
        await super.init(SkeletonSimulator_BUILD_CFG);
    }
}
