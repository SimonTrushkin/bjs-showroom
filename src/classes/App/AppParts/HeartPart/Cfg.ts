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
                {id: 'Heart',text:'Сердце', href:'/anatomy', desc:'Сердце — полый фиброзно-мышечный орган, обеспечивающий посредством повторных ритмичных сокращений ток крови по кровеносным сосудам. Присутствует у всех живых организмов с развитой кровеносной системой, включая всех позвоночных, в том числе и человека.'},
                {id: 'Vena',text:'Вена', href:'/anatomy', desc:'Вена — кровеносный сосуд, по которому кровь движется к сердцу. Вены получают кровь из посткапиллярных венул. Вены объединяются в венозную систему, часть сердечно-сосудистой системы. Сосуды, по которым кровь течёт от сердца, называются артериями.'},
                {id: 'Aorta',text:'Аорта', href:'/anatomy', desc:'Аорта — самый большой непарный артериальный сосуд большого круга кровообращения. Аорту подразделяют на три отдела: восходящую часть аорты, дугу аорты и нисходящую часть аорты, которая, в свою очередь, делится на грудную и брюшную части.'}
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
            url: '/assets/common/env/environment.env',
            name: 'EnvironmentTx',
            intensity: 2.5,
            waitForReadyByUID: [0],
            clearColor: "#000000FF"
        }
    }
]