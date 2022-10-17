import {IPart3D} from "@classes/Part/PartTID";
import {Constructor} from "type-fest";
import {PromiseMap} from "@classes/common/PromiseMap";

export const PartContainer = new PromiseMap<string, Constructor<IPart3D,[]>>();

export function REGISTRY_PART(UID:keyof IUniqueParts){
    return function (target:Constructor<IPart3D>){
        PartContainer.set(UID,target);
    }
}

export interface IUniqueParts {}
