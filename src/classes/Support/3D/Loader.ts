import {Scene} from '@babylonjs/core/scene';
import {SceneLoader} from '@babylonjs/core/Loading/sceneLoader';
import {Node} from '@babylonjs/core/node';
import {ISceneLoaderAsyncResult,ISceneLoaderPlugin,ISceneLoaderPluginAsync,ISceneLoaderProgressEvent} from '@babylonjs/core/Loading/sceneLoader';
import _ from "lodash";
import {
    GLTF2,
    GLTFFileLoader,
    GLTFLoaderAnimationStartMode,
    GLTFLoaderCoordinateSystemMode
} from '@babylonjs/loaders/glTF/';

export type TLoadGLTFInput = {
    useRHS?: boolean,
    animationStartMode?: GLTFLoaderAnimationStartMode,
    deleteGLTFRoot?: boolean,
    onProgressEvent?: (e: ISceneLoaderProgressEvent) => void
}

export type TLoadGLTFSceneOutput = ISceneLoaderAsyncResult & {
    nodes            : Node[]
}

export abstract class Loader {

    private static readonly DefaultInputOptions = {
        useRHS : true,
        animationStartMode : GLTFLoaderAnimationStartMode.ALL
    }

    public static async LoadGLTF(
        scenePath   : string,
        scene       : Scene,
        options     : TLoadGLTFInput
    ):Promise<TLoadGLTFSceneOutput>{
        return new Promise<TLoadGLTFSceneOutput>(
            async (resolve)=>{
                options = _.defaultsDeep(options,Loader.DefaultInputOptions);
                Loader.RegisterPlugin(options);
                let loadingSet = await Loader.ImportGLTFScene(scenePath,scene,options);
                GLTF2.GLTFLoader.UnregisterExtension("ClickONGLTFExtension");
                (loadingSet as TLoadGLTFSceneOutput).nodes = (loadingSet.transformNodes as Node[]).concat(
                    loadingSet.meshes
                ).concat(loadingSet.lights);
                resolve(loadingSet as TLoadGLTFSceneOutput)
            }
        )
    }

    private static RegisterPlugin(options:TLoadGLTFInput){
        let plg: (ISceneLoaderPluginAsync|ISceneLoaderPlugin|null) = new GLTFFileLoader().createPlugin();
        if(plg){
            SceneLoader.RegisterPlugin(plg);
        }
        plg = null;
        SceneLoader.OnPluginActivatedObservable.add(plugin=> {
            if (plugin.name === "gltf" && plugin instanceof GLTFFileLoader) {
                plugin.animationStartMode = options.animationStartMode!;
                plugin.compileMaterials = true;
                plugin.coordinateSystemMode = options.useRHS ? GLTFLoaderCoordinateSystemMode.FORCE_RIGHT_HANDED : GLTFLoaderCoordinateSystemMode.AUTO;
            }
        });
    }

    private static async ImportGLTFScene(scenePath:string,scene:Scene,options:TLoadGLTFInput):Promise<ISceneLoaderAsyncResult>{
        SceneLoader.ShowLoadingScreen = false;
        let path = scenePath.split("/");
        let fileName = path.pop();
        let importData = SceneLoader.ImportMeshAsync(
            '',
            path.join("/")+"/",
            fileName,
            scene,
            (e)=>{
                options.onProgressEvent?.(e);
            },
            '.glb'
        )
        if(options.useRHS) scene.useRightHandedSystem = true;

        let root = scene.getMeshById("__root__");
        if(root){
            root.getChildren(undefined,true).forEach((e)=>{
                e.parent = null;
            });
            root.dispose();
        }

        return importData;
    }
}