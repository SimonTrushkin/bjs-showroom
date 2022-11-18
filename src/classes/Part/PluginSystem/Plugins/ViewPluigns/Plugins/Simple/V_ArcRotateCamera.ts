/*
import {Quaternion, Vector3 } from "@babylonjs/core/Maths/math.vector";
import {REGISTRY_VIEW_PLUGIN} from "@classes/Part/PluginSystem/Plugins/Builders/View/ViewPluginsBuilder";
import {TViewPluginCfg} from "@classes/Part/PluginSystem/Plugins/ViewPluigns/IViewPlugin";
import {AbstractViewPlugin} from "@classes/Part/PluginSystem/Plugins/ViewPluigns/AbstractViewPlugin";
import { UniversalCamera } from "@babylonjs/core/Cameras/universalCamera";
import {ArcRotateCamera} from "@babylonjs/core";

const NAME = 'V_ArcRotateCamera'

declare module '@classes/Part/PluginSystem/Plugins/Builders/Base/IPluginBuilder' {
    export interface TPluginsAccordance {
        [NAME] : V_ArcRotateCamera
    }
}

const TV_UniversalCameraCfg = <{
    name                :   string,
    getCamera           :   string

    position            :   Vector3,
    rotation            :   Vector3,
    rotationQuaternion  :   Quaternion|null,
    lockedTarget        :   Vector3,

    minZ                :   number,
    maxZ                :   number,
    fov                 :   number,
    speed               :   number,

    activateOnCreation      :   boolean,
    attachControlOnCreation :   boolean,

    useWASDControl      : boolean,

    checkCollisions     : boolean
}&TViewPluginCfg>{
    name                :   'defaultCamera',
    getCamera           :   '',

    position            :   new Vector3(0,0,0),
    rotation            :   new Vector3(0,0,0),
    rotationQuaternion  :   null,
    lockedTarget        :   new Vector3(0,0,0),

    minZ                :   0.1,
    maxZ                :   5000,
    speed               :   1,

    activateOnCreation      :   true,
    attachControlOnCreation :   true,

    useWASDControl      : true,

    checkCollisions     : false
}

@REGISTRY_VIEW_PLUGIN(NAME,TV_UniversalCameraCfg)
export class V_ArcRotateCamera extends AbstractViewPlugin<typeof TV_UniversalCameraCfg>{
    private _camera: ArcRotateCamera;

    async build() {
        this.createCamera();
    }

    private createCamera():void{
        this._camera = this._scene.getCameraById(this._cfg.getCamera) as ArcRotateCamera;
        if(!(this._camera && (this._camera.getClassName()=='ArcRotateCamera'))){
            this._camera = new ArcRotateCamera(this._cfg.name,this._cfg.position,this._scene);
            this.directAssign(this._camera,true);
        }else{
            this.directAssign(this._camera,false);
        }
        this._cfg.attachControlOnCreation ? this.attachControl() : undefined;
        this._cfg.activateOnCreation ? this.activate() : undefined;
        this._cfg.useWASDControl?this.enableWASDControl():undefined;
        this._eventsFlow.next({
            type:'READY',
            payload: this._cfg.uid
        })
    }

    private enableWASDControl():void{
        this._camera.keysUp.push(87); //forwards
        this._camera.keysDown.push(83); //backwards
        this._camera.keysLeft.push(65);
        this._camera.keysRight.push(68);
    }

    private attachControl():void{
        this._camera.attachControl();
    }

    private activate():void{
        this._scene.activeCamera = this._camera;
        this._scene.activeCameras?.push(this._camera);
    }
}
*/
