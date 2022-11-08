import {Scene} from "@babylonjs/core";
import {Subject} from "rxjs";
import {IPlugin} from "@classes/Part/PluginSystem/Plugins/Base/IPlugin";
import {TEvent} from "@classes/Part/PluginSystem/Plugins/Base/Types/TEvent";

export type TViewPluginCfg = {
    uid?:number,
    waitForReadyByUID ?: number[]
}

export interface IViewPlugin<buildCfg extends TViewPluginCfg = TViewPluginCfg> extends IPlugin<buildCfg>{
    init(cfg:buildCfg, scene:Scene, eventsBus:Subject<TEvent>):Promise<void>;
}
