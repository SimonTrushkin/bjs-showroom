import {IUniqueParts} from "@classes/App/AppTID";
import {Engine, Scene} from "@babylonjs/core";

export abstract class SceneCreationTools {
    public static PrepareSceneView(nameUID:keyof IUniqueParts):Scene{
        let engine = SceneCreationTools.CreateEngine(
            SceneCreationTools.CreateCanvas(nameUID)
        );
        let scene = SceneCreationTools.CreateScene(
            engine
        )
        return scene;
    }

    private static CreateCanvas(id:string):HTMLCanvasElement{
        let cvs:HTMLCanvasElement = document.getElementById(id) as HTMLCanvasElement;
        if(!cvs){
            console.log('AAA');
            cvs          = document.createElement('canvas');
            cvs.style.width  = '100vw';
            cvs.style.height = '100vh';
            cvs.style.display = 'block';
            cvs.style.position = 'fixed';
            cvs.style.top = "0";
            cvs.style.top = '0';
            cvs.id = id;
            document.body.appendChild(cvs);
        }
        return cvs;
    }

    private static CreateEngine(canvas:HTMLCanvasElement):Engine{
        let engine = new Engine(canvas, true, {});
        window.addEventListener('resize',()=>{
            console.log('rss');
            engine.resize();
        });
        return engine;
    }

    private static CreateScene(engine:Engine):Scene{
        return new Scene(engine,{})
    }
}
