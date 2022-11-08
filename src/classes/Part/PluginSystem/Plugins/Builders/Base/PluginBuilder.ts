import {IPluginBuilder, TPluginBuilderInput} from "@classes/Part/PluginSystem/Plugins/Builders/Base/IPluginBuilder";

export abstract class PluginBuilder implements IPluginBuilder {
    protected _cfg: TPluginBuilderInput[];

    build(cfg: TPluginBuilderInput[]): void {
        this._cfg = cfg;
    }
    init(...args: any[]): void {

    }
}
