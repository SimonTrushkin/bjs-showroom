import {PartialDeep} from "type-fest";

export interface TPluginsAccordance {}
export type TPluginBuilderInput = {
    [key in keyof TPluginsAccordance]: {id:key,cfg:PartialDeep<Parameters<TPluginsAccordance[key]['init']>[0]>}
}[keyof TPluginsAccordance];

export interface IPluginBuilder {
    init(...args:any[]):void;
    build(cfg:TPluginBuilderInput[]):void;
}