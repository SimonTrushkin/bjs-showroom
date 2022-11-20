import {REGISTRY_VIEW_PLUGIN} from "@classes/Part/PluginSystem/Plugins/Builders/View/ViewPluginsBuilder";
import {TViewPluginCfg} from "@classes/Part/PluginSystem/Plugins/ViewPluigns/IViewPlugin";
import {AbstractViewPlugin} from "@classes/Part/PluginSystem/Plugins/ViewPluigns/AbstractViewPlugin";
import {TargetCamera} from "@babylonjs/core";
import {Vector3} from "@babylonjs/core/Maths/math.vector";
import {values} from "lodash";

const NAME = 'V_CameraGuide'

declare module '@classes/Part/PluginSystem/Plugins/Builders/Base/IPluginBuilder' {
    export interface TPluginsAccordance {
        [NAME] : V_CameraGuide
    }
}

type IHavePosAndTarget = {
    position     : Vector3,
    lockedTarget : Vector3
}

const TV_CameraGuideCfg = <
    {
        universalCameraName: string,
        points: {
            [key:string]:[string,string]
        },
        interpolationSpeed: number,
        buttons: {id: string,text:string,desc:string}[],
        buttonsContainerId: string
    }&TViewPluginCfg
>{
    universalCameraName: 'defaultCamera'
}

@REGISTRY_VIEW_PLUGIN(NAME,TV_CameraGuideCfg)
export class V_CameraGuide extends AbstractViewPlugin<typeof TV_CameraGuideCfg>{

    private __cycleFnStore:Array<()=>void> = [];
    private _camera: IHavePosAndTarget;
    private _cameraStartPos: Vector3;
    private _cameraStartLockedTarget: Vector3;

    private _activePosition :Vector3;
    private _activeTarget   : Vector3;
    private _buttons        : HTMLButtonElement[] = [];
    private _descMap        : Map<string,HTMLDivElement> = new Map<string, HTMLDivElement>();
    private _container: HTMLElement | null;
    private _textContainer: HTMLElement | null;

    async build() {

        this._container = document.getElementById("buttons-div");
        this._textContainer = document.getElementById("text-div");

        this.setActivePoint(Object.keys(this._cfg.points)[0]);
        this.getNecessaries();
        this.definePositionLerp();
        this.defineTargetLerp();
        this.generateButtons(
            this._cfg.buttons
        );
        this.generateDescs();
        this._buttons.forEach((bb)=>{
            bb.addEventListener('click',()=>{
                this.setActivePoint(bb.id);
                this._descMap.forEach((value)=>{
                    value.style.opacity = '0';
                })
                if(this._descMap.get(bb.id)) this._descMap.get(bb.id)!.style.opacity = '1';
            })
        })

        //@ts-ignore
        window.cameraGuide = this;

        this.runLerpCycle();

        this._eventsFlow.next({
            type    :   'READY',
            payload :   this._cfg.uid
        })
    }

    private getNecessaries():void{
        this.getCamera();
        this.defineStartState();
    }

    private getCamera():void{
        this._camera = this._scene.getCameraById(this._cfg.universalCameraName) as TargetCamera;
        if(!(this._camera&&this._camera.lockedTarget&&this._camera.position)){
            console.error('No valid Camera find!');
        }
    }

    private defineStartState():void{
        this._cameraStartPos            = this._camera.position.clone();
        this._cameraStartLockedTarget   = this._camera.lockedTarget.clone();
    }

    private definePositionLerp():void{
        this.__cycleFnStore.push(()=>{
            this._camera.position = Vector3.Lerp(this._camera.position,this._activePosition,this._cfg.interpolationSpeed);
        })
    }
    private defineTargetLerp():void{
        this.__cycleFnStore.push(()=>{
            this._camera.lockedTarget = Vector3.Lerp(this._camera.lockedTarget,this._activeTarget,this._cfg.interpolationSpeed)
        })
    }

    private runLerpCycle():void{
        this._scene.onBeforeRenderObservable.add(()=>{
            this.__cycleFnStore.forEach(e=>e());
        })
    }

    private setActivePoint(pointName:string):void{
        let target = this._scene.getTransformNodeById(this._cfg.points[pointName][0]);
        let position = this._scene.getTransformNodeById(this._cfg.points[pointName][1]);
        if(target && position){
            this._activeTarget      = target.absolutePosition;
            this._activePosition    = position.absolutePosition;
        }else{
            console.error(`point ${pointName} is not valid`);
        }
    }

    private generateButtons(buttons:{id:string,text:string}[]):void{
        if(this._container){
            const cvs = this._scene.getEngine().getRenderingCanvas();
            this._container.style.zIndex = String(Number(cvs!.style.zIndex)+1);
            for (let index = 0; index < buttons.length; index++) {
                const element = buttons[index];

                var div = document.createElement("div");
                var button = document.createElement("button");

                button.append(element.id);
                button.id = element.id;
                div.appendChild(button);

                this._buttons.push(button);

                this._container.appendChild(div);
            }
        }
    }
    private generateDescs():void{
        const cvs = this._scene.getEngine().getRenderingCanvas();
        this._cfg.buttons.forEach((b)=>{
            const div  = document.createElement('div') as HTMLDivElement;
            div.style.zIndex = String(Number(cvs!.style.zIndex)+2);
            div.style.opacity = '0';
            div.style.transition = 'opacity 1s ease-in-out';
            div.append(b.desc);
            div.style.position = 'absolute';
            div.style.width = '100%';
            this._descMap.set(b.id,div);
            this._textContainer?.appendChild(div);
        })
    }
}
