import {TPluginBuilderInput} from "@classes/Part/PluginSystem/Plugins/Builders/Base/IPluginBuilder";
import {Vector3} from "@babylonjs/core/Maths/math.vector";

export const LungsSimulator_BUILD_CFG:TPluginBuilderInput[] = [
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
            url: `/assets/LungsSimulator/models/lungs.glb`,
            uid: 0
        }
    },
    {
        id: 'V_CameraGuide',
        cfg: {
            waitForReadyByUID: [1],
            universalCameraName: 'Camera',
            points: {
                Lungs   : ['Lungs_LookNode'    ,'Lungs_PositionNode'   ],
                Bronhi    : ['Bronhi_LookNode'     ,'Bronhi_PositionNode'    ],
                Gortan   : ['Gortan_LookNode'    ,'Gortan_PositionNode'   ],
                Traheya : ['Traheya_LookNode'    ,'Traheya_PositionNode'   ]
            },
            buttons: [
                {id: 'Lungs',   text:'Лёгкие', href:'/anatomy', desc:'Лёгкие — органы воздушного дыхания у человека, всех млекопитающих, птиц, пресмыкающихся, большинства земноводных, а также у некоторых рыб (двоякодышащих, кистепёрых и многопёровых).'},
                {id: 'Bronhi',  text:'Бронхи', href:'/anatomy', desc:'Бронхи — ветви дыхательного горла, на которые оно разделяется у третьего (у женщин четвертого) грудного позвонка.'},
                {id: 'Gortan',  text:'Гортань', href:'/anatomy', desc:'Гортань — участок дыхательной системы, который соединяет глотку с трахеей и содержит голосовой аппарат. Гортань расположена на уровне 4—6 шейных позвонков и соединяется связками с подъязычной костью. Гортань защищает нижние дыхательные пути от попадания инородных частиц.'},
                {id: 'Traheya',   text:'Трахея', href:'/anatomy', desc:'Трахея — орган позвоночных, в том числе человека, являющийся частью воздухоносных путей; расположен между гортанью и бронхами.'},
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