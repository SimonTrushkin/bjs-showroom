import {TPluginBuilderInput} from "@classes/Part/PluginSystem/Plugins/Builders/Base/IPluginBuilder";
import {Vector3} from "@babylonjs/core/Maths/math.vector";

export const AnatomySimulator_BUILD_CFG:TPluginBuilderInput[] = [
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
            url: `/assets/AnatomySimulator/models/anatomy.glb`,
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
                Heart       : ['Heart_LookNode'    ,'Heart_PositionNode'   ],
                Lungs       : ['Lungs_LookNode'     ,'Lungs_PositionNode'    ],
                Distinct    : ['Distinct_LookNode'    ,'Distinct_PositionNode'   ]
            },
            buttons: [
                {id: 'Skeleton',  text:'Скелет',desc:'Совокупность костей, хрящевой ткани и укрепляющих их связок. Старинный метод изготовления скелета — высушивание разделанной туши на солнце или в горячем песке.'},
                {id: 'Heart',   text:'Сердце',desc:'Полый фиброзно-мышечный орган, обеспечивающий посредством повторных ритмичных сокращений ток крови по кровеносным сосудам.'},
                {id: 'Lungs',  text:'Легкие',desc:'В лёгких осуществляется газообмен между воздухом, находящимся в паренхиме лёгких, и кровью, протекающей по лёгочным капиллярам.'},
                {id: 'Distinct',   text:'Пищеварительная система',desc:'Осуществляет переваривание пищи (путём её физической и химической обработки), всасывание продуктов расщепления через слизистую оболочку в кровь и лимфу, выведение непереваренных остатков.'}
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