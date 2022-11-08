import {IUniqueParts, REGISTRY_PART} from "@classes/App/AppTID";
import {IPart3D} from "@classes/Part/PartTID";
import {Part3D} from "@classes/Part/Part3D";

const NAME = 'TestPart_2';
declare module '@classes/App/AppTID' {
    export interface IUniqueParts {
        [NAME]:TestPart_2
    }
}

@REGISTRY_PART(NAME)
export class TestPart_2 extends Part3D implements IPart3D{
    disable(): void {
        console.log('DISABLE_TEST_PT_2');
    }

    dispose(): void {
        console.log('DISPOSE_TEST_PT_2');
    }

    enable(): void {
        console.log('ENABLE_TEST_PT_2');
    }

    init(...arg: any): Promise<void> {
        console.log('INIT_TEST_PT_2');
        return Promise.resolve(undefined);
    }

    get partUID(): keyof IUniqueParts {
        return NAME;
    }

}
