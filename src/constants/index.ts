export const DEFAULT_NAME = '数字化大屏';

export const lineColorList = [
    // ['rgb(55,162,218)', 'rgba(55,162,218,0.1)'],
    ['rgba(50,197,233,1)', 'rgba(144,144,144,0.1)'],
    ['rgba(159,230,184,1)', 'rgba(144,144,144,0.1)'],
    ['rgba(252,132,82,1)', 'rgba(144,144,144,0.1)'],
    ['rgba(255,219,92,1)', 'rgba(144,144,144,0.1)'],
    ['rgba(251,114,147,1)', 'rgba(144,144,144,0.1)'],
];
export const colorList = [
    {
        "type": "linear",
        "x": 0,
        "y": 0,
        "x2": 0,
        "y2": 1,
        "colorStops": [{
            "offset": 0,
            "color": "rgba(242,107,19,1)"
        },
        {
            "offset": 1,
            "color": "rgba(83,78,225,0.4)"
        }
        ],
        "global": false
    },
    {
        "type": "linear",
        "x": 0,
        "y": 0,
        "x2": 0,
        "y2": 1,
        "colorStops": [{
            "offset": 0,
            "color": "rgba(236,214,79,1)"
        },
        {
            "offset": 1,
            "color": "rgba(236,214,79,0.4)"
        }
        ],
        "global": false
    },
    {
        "type": "linear",
        "x": 0,
        "y": 0,
        "x2": 0,
        "y2": 1,
        "colorStops": [{
            "offset": 0,
            "color": "rgba(0,228,240,1)"
        },
        {
            "offset": 1,
            "color": "rgba(0,228,240,0.4)"
        }
        ],
        "global": false
    },
    {
        "type": "linear",
        "x": 0,
        "y": 0,
        "x2": 0,
        "y2": 1,
        "colorStops": [{
            "offset": 0,
            "color": "rgba(68,209,109,1)"
        },
        {
            "offset": 1,
            "color": "rgba(68,209,109,0.4)"
        }
        ],
        "global": false
    },
    {
        "type": "linear",
        "x": 0,
        "y": 0,
        "x2": 0,
        "y2": 1,
        "colorStops": [{
            "offset": 0,
            "color": "rgba(247,199,27,1)"
        },
        {
            "offset": 1,
            "color": "rgba(18,78,145,0.4)"
        }
        ],
        "global": false
    },
    {
        "type": "linear",
        "x": 0,
        "y": 0,
        "x2": 0,
        "y2": 1,
        "colorStops": [{
            "offset": 0,
            "color": "rgba(189,196,20,1)"
        },
        {
            "offset": 1,
            "color": "rgba(189,196,20,0.4)"
        }
        ],
        "global": false
    },
    {
        "type": "linear",
        "x": 0,
        "y": 0,
        "x2": 0,
        "y2": 1,
        "colorStops": [{
            "offset": 0,
            "color": "rgba(200,204,165,1)"
        },
        {
            "offset": 1,
            "color": "rgba(200,204,165,0.4)"
        }
        ],
        "global": false
    }
];
// 省级名称代码转换
export const prvinceFormatToString: any = {
    beijing: '110000',
    tianjin: '120000',
    hebei: '130000',
    shanxi: '140000',
    neimenggu: '150000',
    liaoning: '210000',
    jilin: '220000',
    heilongjiang: '230000',
    shanghai: '310000',
    jiangsu: '320000',
    zhejiang: '330000',
    anhui: '340000',
    fujian: '350000',
    jiangxi: '360000',
    shandong: '370000',
    henan: '410000',
    hubei: '420000',
    hunan: '430000',
    guangdong: '440000',
    guangxi: '450000',
    hainan: '460000',
    chongqing: '500000',
    sichuan: '510000',
    guizhou: '520000',
    yunnan: '530000',
    xizang: '540000',
    shaanxi: '610000',
    gansu: '620000',
    qinghai: '630000',
    ningxia: '640000',
    xinjiang: '650000',
    taiwan: '710000',
    hongkong: '810000',
    macau: '820000'
};