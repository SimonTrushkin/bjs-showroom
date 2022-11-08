export interface IPlugin<buildCfg extends object = object> {
    init(cfg:buildCfg, ...args: any[]):Promise<void>;
    pbBuild():Promise<void>;
    enable():void;
    disable():void;
    dispose():void;
}
