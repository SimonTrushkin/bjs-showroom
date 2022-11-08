import {IPlugin} from "@classes/Part/PluginSystem/Plugins/Base/IPlugin";

export abstract class AbstractPlugin <buildCfg extends object = object> implements IPlugin<buildCfg> {
    async init(...args: any[]):Promise<void>{}

    disable(): void {}

    dispose(): void {}

    //for overwrite
    enable(): void {}

    async pbBuild(): Promise<void> {}
}
