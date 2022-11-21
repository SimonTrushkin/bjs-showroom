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
                Taz         : ['Taz_LookNode'    ,'Taz_PositionNode'   ],
                Bedro       : ['Bedro_LookNode'    ,'Bedro_PositionNode'   ],
                Kluchica    : ['Kluchica_LookNode'    ,'Kluchica_PositionNode'   ],
                Lopatka     : ['Lopatka_LookNode'     ,'Lopatka_PositionNode'    ],
                Plecho      : ['Plecho_LookNode'    ,'Plecho_PositionNode'   ]
            },
            buttons: [
                {id: 'Skeleton',  text:'Скелет',desc:'Совокупность костей, хрящевой ткани и укрепляющих их связок. Старинный метод изготовления скелета — высушивание разделанной туши на солнце или в горячем песке.'},
                {id: 'Cherep',   text:'Черепная коробка',desc:'Костная или хрящевая часть головы у позвоночных животных, каркас головы, защищающий от повреждения наиболее уязвимые органы и служащий местом прикрепления её мягких тканей. Он поддерживает структуры лица и создает защитную полость для мозга.'},
                {id: 'Rebra',  text:'Рёбра',desc:'Одна из парных дугообразных плоских костей, идущих от позвоночника к грудине и составляющих грудную клетку у позвоночных животных.'},
                {id: 'Taz',   text:'Тазовая кость',desc:'Расположенная в основании позвоночника часть скелета человека (и других позвоночных), обеспечивающая прикрепление к туловищу нижних конечностей, а также являющаяся опорой и костным вместилищем для ряда жизненно важных органов.'},
                {id: 'Bedro',  text:'Бедро',desc:'Проксимальная часть нижней конечности человека (задней конечности у других обладающих ею представителей царства животных) между тазобедренным и коленным суставами.'},
                {id: 'Kluchica',   text:'Ключица',desc:'Небольшая трубчатая кость S-образной формы из пояса верхней конечности, соединяющая лопатку с грудиной и укрепляющая плечевой пояс.'},
                {id: 'Lopatka',  text:'Лопатка',desc:'Кость пояса верхних конечностей, обеспечивающая сочленение плечевой кости с ключицей. У человека это плоская кость приблизительно треугольной формы, схожая с формой инструмента труда человека — лопатой. Прилегает к задней поверхности грудной клетки от II до VII ребер.'},
                {id: 'Plecho',   text:'Плечо',desc:'Отдел верхней конечности. Оно располагается между плечевым поясом и предплечьем, и соединяется с ними посредством плечевого сустава и локтевого соответственно.'}
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