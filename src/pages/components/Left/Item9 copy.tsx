
import { useCallback, useEffect, useState } from 'react';
import ItemBody from '../ItemBody';
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

const Item9Base: React.FC<any> = (props: any) => {
    const { data } = props;

    return (
        <ItemBody title={'集纳资源 互联互通'}>
            <div className="flex-box-column model-box">
                <div className="flex-box-center model-box-top">
                    <div className="model-box-top-icon-1" />
                    <div className="model-box-top-icon-2" />
                    <div className="model-box-top-icon-3" />
                </div>
                <div className="flex-box-center model-box-center">
                    {
                        (data?.num + '')?.split('')?.map((i: any, index: number) => {
                            return <div className="flex-box-center model-box-center-item" key={`model-box-center-item-${index}`}>
                                {i}
                            </div>
                        })
                    }
                    <div className="flex-box-center model-box-center-item model-box-center-item-last">
                        +{data?.add * 100}%
                        <div>同比</div>
                    </div>
                </div>
                <div className="flex-box-justify-between model-box-bottom">
                    {
                        (data?.list || [])?.map((item: any, index: number) => {
                            const { name, num } = item;
                            return <div className="flex-box-column model-box-bottom-item" key={`model-box-bottom-item-${index}`}>
                                {num * 100}%
                                <div className='model-box-bottom-item-name'>
                                    {name}
                                </div>
                            </div>
                        })
                    }
                </div>
            </div>
        </ItemBody>
    );
};

export default Item9Base;
