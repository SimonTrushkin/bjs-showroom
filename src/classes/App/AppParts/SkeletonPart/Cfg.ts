import {TPluginBuilderInput} from "@classes/Part/PluginSystem/Plugins/Builders/Base/IPluginBuilder";
import {Vector3} from "@babylonjs/core/Maths/math.vector";

export const SkeletonSimulator_BUILD_CFG:TPluginBuilderInput[] = [
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
            url: `/assets/SkeletonSimulator/models/skeleton.glb`,
            uid: 0
        }
    },
    {
        id: 'V_CameraGuide',
        cfg: {
            waitForReadyByUID: [1],
            universalCameraName: 'Camera',
            points: {
                Skeleton    : ['Skeleton_LookNode'    ,'Skeleton_PositionNode'   ],
                Cherep      : ['Cherep_LookNode'    ,'Cherep_PositionNode'   ],
                Rebra       : ['Rebra_LookNode'     ,'Rebra_PositionNode'    ],
                Taz         : ['Taz_LookNode'    ,'Taz_PositionNode'   ]
            },
            buttons: [
                {id: 'Skeleton',  text:'Скелет',desc:'БЛА БЛА БЛА'},
                {id: 'Cherep',   text:'Черепная коробка',desc:'БЛА БЛА БЛА ... БЛА'},
                {id: 'Rebra',  text:'Рёбра',desc:'БЛА БЛА'},
                {id: 'Taz',   text:'Тазовая кость',desc:'БЛА-БЛА-БЛА БЛА-БЛА'}
            ],
            buttonsContainerId: 'buttons-div',
            interpolationSpeed:0.05
        }
    },
    {
        id: 'V_Fog',
        cfg:{
            min:90,
            max:120,
            color: '#000000'
        }
    },
    {
        id:'V_Env',
        cfg:{
            url: '/assets/common/env/environment.env',
            name: 'EnvironmentTx',
            intensity: 2.5,
            waitForReadyByUID: [0],
            clearColor: "#000000FF"
        }
    }
]