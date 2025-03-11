
import React, { useCallback, useEffect, useState } from 'react';
import ItemBody from '../ItemBody';
import rightBg from '@/assets/largeModelBase/right-bg.svg';
import CPU1 from '@/assets/largeModelBase/CPU1.png';
import CPUAnimate from '@/assets/largeModelBase/CPU-animate.gif';
import CPU2 from '@/assets/largeModelBase/CPU2.png';

const Item7:  React.FC<any> = (props: any) => {
    let { data } = props;

    return (
        <ItemBody title={'智慧底座 范式革新'}>
            <div className="flex-box-center large-model-base-box">
                <div className="flex-box-column large-model-base-box-left">
                    {
                        (data.left || [])?.map((item: any, index: number) => {
                            const { title, content } = item;
                            return <div
                                className="flex-box-center large-model-base-box-left-item"
                                key={`large-model-base-box-left-item-${index}`}
                            >
                                <div className="large-model-base-box-left-item-title">
                                    {title}
                                </div>
                                <div className="large-model-base-box-left-item-content">
                                    {content}
                                </div>
                            </div>
                        })
                    }
                </div>
                <div className="flex-box-center large-model-base-box-center">
                    <img src={CPU1} alt="" className='imgPosition' />
                    <img src={CPUAnimate} alt="" className='imgPosition' />
                    <img src={CPU2} alt="" className='imgPosition' style={{ width: '66%', height: '66%', top: '17%', right: '17%', bottom: '17%', left: '17%' }} />
                    <div className="flex-box large-model-base-box-center-title">
                        {
                            (data?.center?.title || [])?.split('')?.map((item: any, index: number) => {
                                return <div
                                    className="flex-box-center large-model-base-box-center-title-item"
                                    key={`large-model-base-box-center-title-item-${index}`}
                                >
                                    {item}
                                </div>
                            })
                        }
                    </div>
                    {
                        (data?.center?.content || [])?.map((item: any, index: number) => {
                            return <div
                                className="large-model-base-box-center-item"
                                key={`large-model-base-box-center-item-${index}`}
                            >
                                {item}
                            </div>
                        })
                    }
                </div>
                <div className="flex-box-center large-model-base-box-right">
                    <img src={rightBg} alt="" className='imgPosition' />
                    {
                        (data?.right || [])?.map((item: any, index: number) => {
                            return <div
                                className="large-model-base-box-right-item"
                                key={`large-model-base-box-right-item-${index}`}
                            >
                                <div
                                    dangerouslySetInnerHTML={{ __html: item?.split('、')?.join(`<br/>`) }}
                                />
                            </div>
                        })
                    }
                </div>
            </div>
        </ItemBody>
    );
};

export default Item7;
