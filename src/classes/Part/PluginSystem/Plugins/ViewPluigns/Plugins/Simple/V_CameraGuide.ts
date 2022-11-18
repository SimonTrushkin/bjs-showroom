import {REGISTRY_VIEW_PLUGIN} from "@classes/Part/PluginSystem/Plugins/Builders/View/ViewPluginsBuilder";
import {TViewPluginCfg} from "@classes/Part/PluginSystem/Plugins/ViewPluigns/IViewPlugin";
import {AbstractViewPlugin} from "@classes/Part/PluginSystem/Plugins/ViewPluigns/AbstractViewPlugin";
import {TargetCamera} from "@babylonjs/core";
import {Vector3} from "@babylonjs/core/Maths/math.vector";

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
        buttons: {id: string,text:string}[],
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

    async build() {

        this.setActivePoint(Object.keys(this._cfg.points)[0]);
        this.getNecessaries();
        this.definePositionLerp();
        this.defineTargetLerp();
        this.generateButtons(
            this._cfg.buttons
        );
        this._buttons.forEach((bb)=>{
            bb.addEventListener('click',()=>{
                console.log(bb.id);
                this.setActivePoint(bb.id);
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
        let container = document.getElementById("buttons-div");
        if(container){
            const cvs = this._scene.getEngine().getRenderingCanvas();
            container.style.zIndex = String(Number(cvs!.style.zIndex)+1);
            for (let index = 0; index < buttons.length; index++) {
                const element = buttons[index];

                var div = document.createElement("div");
                var button = document.createElement("button");

                button.append(element.id);
                button.id = element.id;
                div.appendChild(button);

                this._buttons.push(button);

                container.appendChild(div);
            }
        }
    }
}
