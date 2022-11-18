import {REGISTRY_VIEW_PLUGIN} from "@classes/Part/PluginSystem/Plugins/Builders/View/ViewPluginsBuilder";
import {Color3} from "@babylonjs/core";
import {TViewPluginCfg} from "@classes/Part/PluginSystem/Plugins/ViewPluigns/IViewPlugin";
import {AbstractViewPlugin} from "@classes/Part/PluginSystem/Plugins/ViewPluigns/AbstractViewPlugin";

const NAME = 'V_Fog';

declare module '@classes/Part/PluginSystem/Plugins/Builders/Base/IPluginBuilder' {
    export interface TPluginsAccordance {
        [NAME] : V_Fog
    }
}

type TFogMode = {
    min: number,
    max: number,
    density : number,
    color   : string,
    fogMode: 0|1|2|3
};

const TV_FogCfg = <TViewPluginCfg&TFogMode>{
    color: '#ffffff',
    min: 0,
    max: 1000,
    density: 0.1,
    fogMode: 3
}

@REGISTRY_VIEW_PLUGIN(NAME,TV_FogCfg)
export class V_Fog extends AbstractViewPlugin<typeof TV_FogCfg>{
    async build() {
        this._scene.fogEnabled = true;
        this.setProperties();
        this.setReady();
    }

    private setProperties():void{
        this._scene.fogColor    = Color3.FromHexString(this._cfg.color);
        this._scene.fogMode     = this._cfg.fogMode;
        this._scene.fogStart    = this._cfg.min;
        this._scene.fogEnd      = this._cfg.max;
        this._scene.fogDensity  = this._cfg.density;
    }

    private setReady():void{
        this._eventsFlow.next({
            type    :   'READY',
            payload :   this._cfg.uid
        })
    }
}