
import React, { useCallback, useEffect, useState } from 'react';
import ItemBody from '../ItemBody';
import shuzirenIcon from '@/assets/intelligencePack/shuziren.png';
import shuzirenBottomIcon from '@/assets/intelligencePack/shuziren-dizuo.png';
import centerQuan from '@/assets/intelligencePack/center-quan.png';
import bottomBg from '@/assets/intelligencePack/bottom-bg.png';
import left3Icon1 from '@/assets/intelligencePack/left-border-1.png';
import left3Icon2 from '@/assets/intelligencePack/left-border-2.png';
import left3Icon3 from '@/assets/intelligencePack/left-border-3.png';
import left3Icon4 from '@/assets/intelligencePack/left-border-4.png';
import left3Icon5 from '@/assets/intelligencePack/left-border-5.png';
import left3Icon6 from '@/assets/intelligencePack/left-border-6.png';
import left3Icon7 from '@/assets/intelligencePack/left-border-7.png';
import left3RightIcon1 from '@/assets/intelligencePack/right-border-1.svg';
import left3RightIcon2 from '@/assets/intelligencePack/right-border-2.jpg';
import left3RightIcon3 from '@/assets/intelligencePack/right-border-3.svg';
import _ from 'lodash';

const iconFormat: any = {
    0: left3Icon1,
    1: left3Icon2,
    2: left3Icon3,
    3: left3Icon4,
    4: left3Icon5,
    5: left3Icon6,
    6: left3Icon7,
    'r0': left3RightIcon1,
    'r1': left3RightIcon2,
    'r2': left3RightIcon3,
};

const Item3: React.FC<any> = (props: any) => {
    let { data } = props;

    return (
        <ItemBody title={'资源聚合 智能打包'}>
            <div className="flex-box-column intelligence-pack-box">
                <div className="flex-box intelligence-pack-box-top">
                    <div className="flex-box-center intelligence-pack-box-top-left">
                        {
                            (data?.left || [])?.map((item: any, index: number) => {
                                const { title } = item;
                                return <div
                                    className="intelligence-pack-box-top-left-item"
                                    key={`intelligence-pack-box-top-left-item-${index}`}
                                >
                                    {title}
                                    <div className="intelligence-pack-box-top-left-item-img">
                                        <img src={iconFormat[index]} alt="" />
                                    </div>
                                </div>
                            })
                        }
                    </div>
                    <div className="flex-box-center intelligence-pack-box-top-center">
                        <img src={shuzirenIcon} alt="" className='imgPosition' style={{ bottom: "15%", height: '85%', opacity: 0.3 }} />
                        <img src={shuzirenBottomIcon} alt="" className='imgPosition' style={{ top: '40%', height: '60%' }} />
                        <img src={centerQuan} alt="" className='imgPosition' style={{ top: '30%', height: '50%' }} />
                        <div style={{ zIndex: 1, textAlign: 'center', fontWeight: 'bold', fontSize: '1.4rem' }}>
                            人工智能
                            <div>大数据模型</div>
                            <div style={{ fontWeight: 300, marginTop: '0.8rem', fontSize: '1.2rem' }}>自动打包产品</div>
                        </div>
                    </div>
                    <div className="flex-box intelligence-pack-box-top-right">
                        {
                            (data?.right || [])?.map((item: any, index: number) => {
                                const { title, children } = item;
                                return <div
                                    className="flex-box intelligence-pack-box-top-right-item"
                                    key={`intelligence-pack-box-top-right-item-${index}`}
                                >
                                    <div className="flex-box-justify-end intelligence-pack-box-top-right-item-img">
                                        <img src={iconFormat[`r${index}`]} alt="" className='imgPosition' />
                                        <div className="flex-box-center intelligence-pack-box-top-right-item-img-title">
                                            {title}
                                        </div>
                                    </div>
                                    <div
                                        className="flex-box-center intelligence-pack-box-top-right-item-title"
                                        style={index === 2 ? {
                                            flexWrap: 'wrap',
                                            justifyContent: 'space-between'
                                        } : { flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'space-around' }}
                                    >
                                        {
                                            (children || [])?.map((child: any, cIndex: number) => {
                                                if (_.isString(child)) {
                                                    return <div
                                                        className="intelligence-pack-box-top-right-item-title-item"
                                                        key={`intelligence-pack-box-top-right-item-title-item-${cIndex}`}
                                                        style={index === 2 ? { width: '50%' } : {}}
                                                    >
                                                        {child}
                                                    </div>
                                                } else {
                                                    const { name, value, unit } = child;
                                                    return <div
                                                        className="intelligence-pack-box-top-right-item-title-item"
                                                        key={`intelligence-pack-box-top-right-item-title-item-${cIndex}`}
                                                        style={index === 2 ? { width: '50%' } : {}}
                                                    >
                                                        <span style={{ fontSize: '1rem' }}>{name}</span>
                                                    </div>
                                                }
                                            })
                                        }
                                    </div>
                                </div>
                            })
                        }
                    </div>
                </div>
                <div className="flex-box-center intelligence-pack-box-bottom">
                    {
                        ['资源', '平台', '渠道']?.map((i: string, index: number) => {
                            return <div
                                className="flex-box-center intelligence-pack-box-bottom-item"
                                key={`intelligence-pack-box-bottom-item-${index}`}
                            >
                                <div className="intelligence-pack-box-bottom-item-title">
                                    {i}
                                </div>
                                <img src={bottomBg} alt="" className='imgPosition' />
                            </div>
                        })
                    }
                </div>
            </div>
        </ItemBody>
    );
};

export default Item3;
