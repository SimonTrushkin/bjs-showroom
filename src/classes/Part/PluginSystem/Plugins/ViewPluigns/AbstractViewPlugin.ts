import {Scene} from "@babylonjs/core";
import {filter, ReplaySubject} from "rxjs";
import {TEvent} from "@classes/Part/PluginSystem/Plugins/Base/Types/TEvent";
import {defaultsDeep} from "lodash";
import {IViewPlugin, TViewPluginCfg} from "@classes/Part/PluginSystem/Plugins/ViewPluigns/IViewPlugin";
import {AbstractPlugin} from "@classes/Part/PluginSystem/Plugins/Base/AbstractPlugin";

export abstract class AbstractViewPlugin <buildCfg extends TViewPluginCfg = TViewPluginCfg> extends AbstractPlugin<buildCfg> implements  IViewPlugin<buildCfg>{

    protected _scene:Scene;
    protected _cfg:buildCfg;
    protected _eventsFlow:ReplaySubject<TEvent>;
    private __defCfg: buildCfg;
    private __readyMap: {[key:number]:boolean} = {};

    constructor(defCfg:buildCfg) {
        super();
        this.__defCfg = defCfg;
    }

    async init(cfg:buildCfg, scene:Scene, eventsBus:ReplaySubject<TEvent>):Promise<void>{
        this._cfg = defaultsDeep(cfg,this.__defCfg);
        this._eventsFlow = eventsBus;
        this._scene = scene;
        await super.init(scene);
        this._cfg.waitForReadyByUID?.forEach((uid)=>{
            this.__readyMap[uid]=false;
        })
    }

    //For overwrite
    protected async build():Promise<void>{
    }

    async pbBuild(): Promise<void> {
        await super.pbBuild();
        if(this._cfg.waitForReadyByUID && this._cfg.waitForReadyByUID.length>0){
            this._eventsFlow.pipe(
                filter((e)=>{
                    return (e.type=='READY'&&this._cfg.waitForReadyByUID!.indexOf(e.payload)!=(-1));
                })
            ).subscribe(async (evt)=>{
                this.__readyMap[evt.payload] = true;
                if(Object.values(this.__readyMap).find((e)=>!e)==undefined){
                    // alert(this.constructor.name);
                    await this.build();
                }
            })
        }else{
            // alert(this.constructor.name);
            await this.build();
        }
    }

    disable() {
        super.disable();
        this._eventsFlow.unsubscribe();
    }

    enable(): void{
        super.enable();
    }

    dispose():void {
        super.dispose();
        this._eventsFlow.unsubscribe();
    }

    protected directAssign<T extends object>(targetObject:T,assignEqualProps:boolean=false):void{
        Object.keys(this._cfg).forEach((p)=>{
            if(!assignEqualProps){
                if(this._cfg[p as keyof buildCfg] != this.__defCfg[p as keyof buildCfg]){
                    if(targetObject[p as keyof T]!=undefined){
                        targetObject[p as keyof T] = this._cfg[p as keyof buildCfg] as unknown as T[keyof T];
                    }
                }
            }else{
                if(targetObject[p as keyof T]!==undefined){
                    targetObject[p as keyof T] = this._cfg[p as keyof buildCfg] as unknown as T[keyof T];
                }
            }
        })
    }
}
