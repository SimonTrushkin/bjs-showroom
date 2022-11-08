import {IUniqueParts, PartContainer} from "@classes/App/AppTID";
import {PromiseMap} from "@classes/common/PromiseMap";
import {IPart3D} from "@classes/Part/PartTID";

export abstract class App {

    private static CurrentPart:string;
    private static PartStore:PromiseMap<string,IPart3D> = new PromiseMap()

    public static CreatePartByUID(uid:keyof IUniqueParts){
        PartContainer.getViaPromise(uid).then( async (e)=>{
            let part = new e;
            await part.init();
            part.enable();
            App.CurrentPart = uid;
            if(!this.PartStore.get(uid)) this.PartStore.set(uid,part);
        });
    }

    public static SwitchByUID(uid:keyof IUniqueParts){
        console.log("STEP 1", uid);
        App.PartStore.getViaPromise(App.CurrentPart).then((oldPart)=>{
            if(uid!==App.CurrentPart){
                oldPart.disable();
                console.log("STEP 2", oldPart.partUID);
                App.PartStore.getViaPromise(uid).then((neoPart)=>{
                    neoPart.enable();
                    App.CurrentPart = uid;
                    console.log("STEP 3", neoPart.partUID);
                }).catch(()=>{
                    App.CreatePartByUID(uid);
                    console.log("STEP 4");
                })
            }
        });
    }

}
