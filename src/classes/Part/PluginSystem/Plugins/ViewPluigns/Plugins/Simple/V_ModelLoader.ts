import {REGISTRY_VIEW_PLUGIN} from "@classes/Part/PluginSystem/Plugins/Builders/View/ViewPluginsBuilder";
import {TViewPluginCfg} from "@classes/Part/PluginSystem/Plugins/ViewPluigns/IViewPlugin";
import {AbstractViewPlugin} from "@classes/Part/PluginSystem/Plugins/ViewPluigns/AbstractViewPlugin";
import {Loader} from "@classes/Support/3D/Loader";
import {Scene} from "@babylonjs/core/scene";

const NAME = 'V_ModelLoader'

declare module '@classes/Part/PluginSystem/Plugins/Builders/Base/IPluginBuilder' {
    export interface TPluginsAccordance {
        [NAME] : V_ModelLoader
    }
}

const TV_V_ModelLoaderCfg = <
    {
        url:string,
        useRHS:boolean,
        animationStartMode: 0|1|2
    }&TViewPluginCfg
>{
    url:'',
    useRHS:true,
    animationStartMode: 2
}

@REGISTRY_VIEW_PLUGIN(NAME,TV_V_ModelLoaderCfg)
export class V_ModelLoader extends AbstractViewPlugin<typeof TV_V_ModelLoaderCfg>{
    async build() {
        await Loader.LoadGLTF(
            this._cfg.url,
            this._scene as Scene,
            {
                animationStartMode: this._cfg.animationStartMode,
                useRHS: this._cfg.useRHS,
                deleteGLTFRoot: true
            }
        )

        this._eventsFlow.next({
            type    :   'READY',
            payload :   this._cfg.uid
        })
    }
}
