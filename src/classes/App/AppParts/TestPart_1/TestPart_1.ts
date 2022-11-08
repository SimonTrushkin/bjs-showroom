import {IUniqueParts, REGISTRY_PART} from "@classes/App/AppTID";
import {IPart3D} from "@classes/Part/PartTID";
import {Part3D} from "@classes/Part/Part3D";

const NAME = 'TestPart_1';
declare module '@classes/App/AppTID' {
    export interface IUniqueParts {
        [NAME]:TestPart_1
    }
}

@REGISTRY_PART(NAME)
export class TestPart_1 extends Part3D implements IPart3D{
    disable(): void {
        console.log('DISABLE_TEST_PT_1');
    }

    dispose(): void {
        console.log('DISPOSE_TEST_PT_1');
    }

    enable(): void {
        console.log('ENABLE_TEST_PT_1');
    }

    init(...arg: any): Promise<void> {
        console.log('INIT_TEST_PT_1');
        return Promise.resolve(undefined);
    }

    get partUID(): keyof IUniqueParts {
        return NAME;
    }
}
