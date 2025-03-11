
import { useCallback, useEffect, useState } from 'react';
import ItemBody from '../ItemBody';
import InfoCenterCharts from '../InfoCenterCharts';
import dishini from '@/assets/aggregatedModel/迪士尼.svg';
import dingyou from '@/assets/aggregatedModel/鼎游.svg';
import dingdanlaile from '@/assets/aggregatedModel/订单来了.svg';
import fangte from '@/assets/aggregatedModel/方特.svg';
import haihangjituan from '@/assets/aggregatedModel/海航集团.svg';
import huazhujituan from '@/assets/aggregatedModel/华住集团.svg';
import jintiane from '@/assets/aggregatedModel/金天鹅.svg';
import jinjiangjituan from '@/assets/aggregatedModel/锦江集团.svg';
import jiutianda from '@/assets/aggregatedModel/九天达.svg';
import leyou from '@/assets/aggregatedModel/乐游.svg';
import longjianghangkong from '@/assets/aggregatedModel/龙江航空公司.svg';
import lvyun from '@/assets/aggregatedModel/绿云.svg';
import piaofutong from '@/assets/aggregatedModel/票付通.svg';
import shoulvjituan from '@/assets/aggregatedModel/首旅集团.svg';
import yaduojituan from '@/assets/aggregatedModel/亚朵集团.svg';
import changlonglvyoudujiaqu from '@/assets/aggregatedModel/长隆旅游度假区.svg';
import zhiyoubao from '@/assets/aggregatedModel/智游宝.svg';
import zhuzhe from '@/assets/aggregatedModel/住哲.svg';

const Item9: React.FC<any> = (props: any) => {
    const { data } = props;
    const list = [
        {
            name: '迪士尼',
            img: dishini,
            desc: {
                type: 1
            },
        },
        {
            name: '鼎游',
            img: dingyou,
            desc: {
                type: 1
            },
        },
        // {
        //     name: '订单来了',
        //     img: dingdanlaile,
        //     desc: {
        //         type: 1
        //     },
        // },
        {
            name: '方特',
            img: fangte,
            desc: {
                type: 1
            },
        },
        {
            name: '海航集团',
            img: haihangjituan,
            desc: {
                type: 1
            },
        },
        {
            name: '华住集团',
            img: huazhujituan,
            desc: {
                type: 1
            },
        },
        {
            name: '金天鹅',
            img: jintiane,
            desc: {
                type: 1
            },
        },
        {
            name: '锦江集团',
            img: jinjiangjituan,
            desc: {
                type: 1
            },
        },
        {
            name: '九天达',
            img: jiutianda,
            desc: {
                type: 1
            },
        },
        {
            name: '乐游',
            img: leyou,
            desc: {
                type: 1
            },
        },
        {
            name: '龙江航空',
            img: longjianghangkong,
            desc: {
                type: 1
            },
        },
        {
            name: '绿云',
            img: lvyun,
            desc: {
                type: 1
            },
        },
        {
            name: '票付通',
            img: piaofutong,
            desc: {
                type: 1
            },
        },
        {
            name: '首旅集团',
            img: shoulvjituan,
            desc: {
                type: 1
            },
        },
        // {
        //     name: '亚朵集团',
        //     img: yaduojituan,
        //     desc: {
        //         type: 1
        //     },
        // },
        // {
        //     name: '长隆旅游',
        //     img: changlonglvyoudujiaqu,
        //     desc: {
        //         type: 1
        //     },
        // },
        // {
        //     name: '智游宝',
        //     img: zhiyoubao,
        //     desc: {
        //         type: 1
        //     },
        // },
        // {
        //     name: '住哲',
        //     img: zhuzhe,
        //     desc: {
        //         type: 1
        //     },
        // },
    ];
    return (
        <ItemBody title={'集纳资源 互联互通'}>
            <div className="flex-box-center aggregated-model-box">
                {/* <div className="aggregated-model-box-title">数据聚合中台</div> */}
                <InfoCenterCharts data={list} />
            </div>
        </ItemBody>
    );
};

export default Item9;
