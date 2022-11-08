import {Scene} from "@babylonjs/core";
import {PluginBuilder} from "@classes/Part/PluginSystem/Plugins/Builders/Base/PluginBuilder";
import {
    TPluginBuilderInput,
    TPluginsAccordance
} from "@classes/Part/PluginSystem/Plugins/Builders/Base/IPluginBuilder";
import {Constructor} from "type-fest";
import {ReplaySubject} from "rxjs";
import {IViewPlugin, TViewPluginCfg} from "@classes/Part/PluginSystem/Plugins/ViewPluigns/IViewPlugin";

export function REGISTRY_VIEW_PLUGIN(UID:keyof TPluginsAccordance,cfg:object){
    return function (target:Constructor<IViewPlugin>){
        //@ts-ignore
        ViewPluginBuilder.__VIEW_PLUGINS_CONTAINER__.set(UID,{cls:target,defCfg:cfg});
    }
}

export class ViewPluginBuilder extends PluginBuilder{

    private static __VIEW_PLUGINS_CONTAINER__: Map<
        keyof TPluginsAccordance,
        {cls:Constructor<IViewPlugin>,defCfg:object}
    > = new Map<keyof TPluginsAccordance, {cls:Constructor<IViewPlugin>,defCfg:object}>();

    protected _scene:Scene;
    init(scene:Scene) {
        super.init(scene);
        this._scene = scene;
    }
    async build(cfg: TPluginBuilderInput[]):Promise<void> {
        super.build(cfg);
        const eventBus = new ReplaySubject<{type:string,payload:unknown}>(1);

        for (let i = 0; i < this._cfg.length; i++) {
            const pluginCfg = this._cfg[i];
            let plugin = ViewPluginBuilder.__VIEW_PLUGINS_CONTAINER__.get(pluginCfg.id);
            if(plugin){
                const ex = new plugin.cls(plugin.defCfg);
                ex.init((pluginCfg.cfg as unknown as TViewPluginCfg),this._scene,eventBus).then( async ()=>{
                    await ex.pbBuild();
                });
            }
        }
    }
}
