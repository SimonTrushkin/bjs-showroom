import {REGISTRY_VIEW_PLUGIN} from "@classes/Part/PluginSystem/Plugins/Builders/View/ViewPluginsBuilder";
import {Color4, CubeTexture, Texture} from "@babylonjs/core";
import {TViewPluginCfg} from "@classes/Part/PluginSystem/Plugins/ViewPluigns/IViewPlugin";
import {AbstractViewPlugin} from "@classes/Part/PluginSystem/Plugins/ViewPluigns/AbstractViewPlugin";

const NAME = 'V_Env'

declare module '@classes/Part/PluginSystem/Plugins/Builders/Base/IPluginBuilder' {
    export interface TPluginsAccordance {
        [NAME] : V_Env
    }
}

const TV_EnvCfg = <TViewPluginCfg&{
    name        :   string
    url         :   string,
    intensity   :   number,
    rotationY   :   number,
    invertZ     :   boolean,
    clearColor  :   string,
    level       :   number
}>{
    name        :   'defaultEnvName',
    url         :   '',
    intensity   :   1,
    rotationY   :   0,
    invertZ     :   false,
    clearColor  :   '#ffffffff',
    level       :   1
}

@REGISTRY_VIEW_PLUGIN(NAME, TV_EnvCfg)
export class V_Env extends AbstractViewPlugin<typeof TV_EnvCfg>{
    private _env: CubeTexture;

    async build() {
        this.createEnv().then(()=>{
            this.setProperties();
            this._scene.clearColor = Color4.FromHexString(this._cfg.clearColor);
        })
    }

    private createEnv():Promise<void>{
        return new Promise<void>((resolve)=>{
            this._env =new CubeTexture(this._cfg.url,this._scene);
            Texture.WhenAllReady([this._env],()=>{
                this._scene.environmentTexture = this._env;
                this._scene.environmentIntensity = this._cfg.intensity;
                resolve();
            })
        })
    }

    private setProperties():void{
        this.directAssign(
            this._env
        )
    }
}
