import {TPluginBuilderInput} from "@classes/Part/PluginSystem/Plugins/Builders/Base/IPluginBuilder";
import {Vector3} from "@babylonjs/core/Maths/math.vector";

export const HeartSimulator_BUILD_CFG:TPluginBuilderInput[] = [
    {
        id:'V_UniversalCamera',
        cfg: {
            name: 'Camera',
            uid : 1,
            fov : 0.61,
            lockedTarget: new Vector3(0,0,0),
            position: new Vector3(12,12,12),
            waitForReadyByUID       :   [0],
            attachControlOnCreation :   true,
            activateOnCreation      :   true,
            useWASDControl          :   true
        }
    },
    {
        id: 'V_ModelLoader',
        cfg: {
            url: `/assets/HeartSimulator/models/heart.glb`,
            uid: 0
        }
    },
    {
        id: 'V_CameraGuide',
        cfg: {
            waitForReadyByUID: [1],
            universalCameraName: 'Camera',
            points: {
                Heart   : ['Heart_LookNode'    ,'Heart_PositionNode'   ],
                Vena    : ['Vena_LookNode'     ,'Vena_PositionNode'    ],
                Aorta   : ['Aorta_LookNode'    ,'Aorta_PositionNode'   ]
            },
            buttons: [
                {id: 'Heart',text:'Heart'},
                {id: 'Vena',text:'Vena'},
                {id: 'Aorta',text:'Aorta'}
            ],
            buttonsContainerId: 'buttons-div',
            interpolationSpeed:0.05
        }
    },
    {
        id: 'V_Fog',
        cfg:{
            min:10,
            max:90,
            color: '#000000'
        }
    },
    {
        id:'V_Env',
        cfg:{
            url: '/assets/HeartSimulator/env/environment.env',
            name: 'EnvironmentTx',
            intensity: 2.5,
            waitForReadyByUID: [0],
            clearColor: "#000000FF"
        }
    }
]