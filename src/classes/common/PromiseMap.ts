export class PromiseMap <K,V> extends Map<K,V>{
    public getViaPromise(key: K): Promise<V>{
        let value = super.get(key);
        return new Promise<V>((resolve, reject)=>{
            if(value){
                resolve(value);
            }else{
                reject();
            }
        })
    }
}
