export interface IInitable {
    init(...arg:any):Promise<void>;
}

export interface IDisposable{
    dispose():void;
}

export interface IExecutable {
    execute(...args:any[]):void;
}