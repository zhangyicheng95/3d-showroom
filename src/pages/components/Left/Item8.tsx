
import { useCallback, useEffect, useState } from 'react';
import chutianyoulun from '@/assets/brandLogo/楚天游轮.svg';
import dishini from '@/assets/brandLogo/迪士尼.svg';
import feijingongsi from '@/assets/brandLogo/飞鲸公司.svg';
import haihangjituan from '@/assets/brandLogo/海航集团.svg';
import hutiejituan from '@/assets/brandLogo/呼铁集团.svg';
import huazhujituan from '@/assets/brandLogo/华住集团.svg';
import huanqiuyingcheng from '@/assets/brandLogo/环球影城.svg';
import huangjiajialebiyoulun from '@/assets/brandLogo/皇家加勒比邮轮.svg';
import jinjiangjituan from '@/assets/brandLogo/锦江集团.svg';
import lanmengyoulun from '@/assets/brandLogo/蓝梦邮轮.svg';
import longjianghangkong from '@/assets/brandLogo/龙江航空公司.svg';
import lushan from '@/assets/brandLogo/庐山.svg';
import nanshanwenhualvyou from '@/assets/brandLogo/南山文化旅游.svg';
import shoulvjituan from '@/assets/brandLogo/首旅集团.svg';
import wutiejituan from '@/assets/brandLogo/乌铁集团.svg';
import xijiangqianhumiaozhai from '@/assets/brandLogo/西江千户苗寨.svg';
import xitiejituan from '@/assets/brandLogo/西铁集团.svg';
import xingtuyoulun from '@/assets/brandLogo/星途邮轮.svg';
import yaduojituan from '@/assets/brandLogo/亚朵集团.svg';
import yangzijiangyoulun from '@/assets/brandLogo/扬子江游轮.svg';
import changlonglvyoudujiaqu from '@/assets/brandLogo/长隆旅游度假区.svg';
import ItemBody from '../ItemBody';
import BasicBanner from '@/components/BasicBanner';

const list = [
    chutianyoulun, dishini, feijingongsi, haihangjituan, hutiejituan, huazhujituan, huanqiuyingcheng,
    huangjiajialebiyoulun, jinjiangjituan, lanmengyoulun, longjianghangkong, lushan, nanshanwenhualvyou, shoulvjituan,
    wutiejituan, xijiangqianhumiaozhai, xitiejituan, xingtuyoulun, yaduojituan, yangzijiangyoulun, changlonglvyoudujiaqu
];
const Item8: React.FC<any> = (props: any) => {
    let { data } = props;

    return (
        <ItemBody title={'品牌联盟 合作共赢'}>
            <div className="flex-box-column ota-box">
                {
                    Array.from({ length: 3 })?.map((item: any, index: number) => {
                        const number = list?.length / 3;
                        return <div className="ota-box-item" key={`ota-box-item-${index}`}>
                            <BasicBanner list={list.slice(index * number, (index + 1) * number)} time={20} />
                        </div>
                    })
                }
            </div>
        </ItemBody>
    );
};

export default Item8;
