import {IPart3D} from "@classes/Part/PartTID";
import {Engine, Scene} from "@babylonjs/core";
import {IUniqueParts} from "@classes/App/AppTID";
import "@classes/Part/PluginSystem/Plugins/ViewPluigns/PluginsRegistryList";
import {SceneCreationTools} from "@classes/Support/SceneCreationTools";
import {TPluginBuilderInput} from "@classes/Part/PluginSystem/Plugins/Builders/Base/IPluginBuilder";
import {ViewPluginBuilder} from "@classes/Part/PluginSystem/Plugins/Builders/View/ViewPluginsBuilder";

export abstract class Part3D implements IPart3D{
    private _partUID: keyof IUniqueParts;
    protected _scene: Scene;
    private _canvas: HTMLCanvasElement;
    private _engine: Engine;

    constructor(partUID:keyof IUniqueParts) {
        this._partUID = partUID;
    }

    async init(pluginsConfig:TPluginBuilderInput[]){
        this._scene = SceneCreationTools.PrepareSceneView(this._partUID);
        this._scene.useRightHandedSystem = true;
        this._engine = this._scene.getEngine();
        this._canvas = this._scene.getEngine().getRenderingCanvas()!;
        window.document.body.style.overflow = 'hidden';
        let pluginBuilder = new ViewPluginBuilder();
        pluginBuilder.init(this._scene);
        await pluginBuilder.build(pluginsConfig);
    }

    disable():void{
        this._scene.getEngine().stopRenderLoop();
        this._canvas.style.display = 'none';
    }

    enable(): void {
        // this._canvas.style.display = 'block';
        this._scene.getEngine().runRenderLoop(()=>{
            if(this._scene.activeCamera) this._scene.render();
        });
    }

    dispose(): void {
        let engine = this._scene.getEngine();
        this._scene.dispose();
        let cvs = engine.getRenderingCanvas();
        engine.dispose();
        document.removeChild(cvs as HTMLCanvasElement);
    }

    get partUID(): keyof IUniqueParts {
        return this._partUID;
    }
}
