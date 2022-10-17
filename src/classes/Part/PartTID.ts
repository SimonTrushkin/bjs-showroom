import {IDisposable, IInitable} from "@classes/common/TID";
import {IUniqueParts} from "@classes/App/AppTID";

export interface IPart3D extends IInitable,IDisposable {
    enable()        : void;
    disable()       : void;
    get partUID()   : keyof IUniqueParts;
}
