
import { useCallback, useEffect, useState } from 'react';
import ItemBody from '../ItemBody';
import icon2 from '@/assets/coreProcess/bg-2.svg';
import icon6 from '@/assets/coreProcess/bg-6.svg';

const Item6:  React.FC<any> = (props: any) => {
    let { data } = props;

    return (
        <ItemBody title={'精准匹配 高效交易'}>
            <div className="flex-box-center core-process-box">
                <div className="core-process-box-top">
                    六大核心流程贯穿全平台多系统，保障经营效率
                </div>
                <div className="flex-box-column core-process-box-bottom">
                    <div className="flex-box-justify-between core-process-box-bottom-1">
                        {
                            (data[0] || [])?.map((item: any, index: number) => {
                                return <div
                                    className="flex-box-center core-process-box-bottom-1-item"
                                    key={`core-process-box-bottom-1-item-${index}`}
                                >
                                    <div className="core-process-box-bottom-1-item-title">
                                        <span style={{ color: 'red' }}>{item.slice(0, 1)}</span>{item.slice(1)}
                                    </div>
                                </div>
                            })
                        }
                    </div>
                    <div className="flex-box-justify-around core-process-box-bottom-2">
                        {
                            Array.from({ length: 6 })?.map((item, index: number) => {
                                return <div
                                    className="core-process-box-bottom-2-item"
                                    key={`core-process-box-bottom-2-item-${index}`}
                                >
                                    <img src={icon2} alt="" />
                                </div>
                            })
                        }
                    </div>
                    <div className="flex-box-justify-between core-process-box-bottom-3">
                        {
                            (data[2] || [])?.map((item: any, index: number) => {
                                return <div
                                    className="flex-box-center core-process-box-bottom-3-item"
                                    key={`core-process-box-bottom-3-item-${index}`}
                                >
                                    <div className="core-process-box-bottom-3-item-title">
                                        {item}
                                    </div>
                                </div>
                            })
                        }
                    </div>
                    <div className="flex-box-justify-around core-process-box-bottom-2">
                        {
                            Array.from({ length: 6 })?.map((item, index: number) => {
                                return <div
                                    className="core-process-box-bottom-2-item"
                                    key={`core-process-box-bottom-4-item-${index}`}
                                >
                                    <img src={icon2} alt="" />
                                </div>
                            })
                        }
                    </div>
                    <div className="flex-box-justify-between core-process-box-bottom-5">
                        {
                            (data[4] || [])?.map((item: any, index: number) => {
                                return <div
                                    className="flex-box-center core-process-box-bottom-5-item"
                                    key={`core-process-box-bottom-5-item-${index}`}
                                >
                                    <div className="flex-box-center core-process-box-bottom-5-item-title">
                                        {(item || [])?.map((i: string, cIndex: number) => {
                                            return <div
                                                className="core-process-box-bottom-5-item-title-item"
                                                key={`core-process-box-bottom-5-item-title-item-${cIndex}`}
                                            >
                                                {i}
                                            </div>
                                        })}
                                    </div>
                                </div>
                            })
                        }
                    </div>
                    <div className="flex-box-justify-around core-process-box-bottom-2">
                        {
                            Array.from({ length: 6 })?.map((item, index: number) => {
                                return <div
                                    className="core-process-box-bottom-2-item"
                                    key={`core-process-box-bottom-6-item-${index}`}
                                >
                                    <img src={icon6} alt="" />
                                </div>
                            })
                        }
                    </div>
                    <div className="flex-box-justify-between core-process-box-bottom-7">
                        {
                            (data[6] || [])?.map((item: any, index: number) => {
                                return <div
                                    className="flex-box-center core-process-box-bottom-7-item"
                                    key={`core-process-box-bottom-7-item-${index}`}
                                >
                                    <div className="core-process-box-bottom-7-item-title">
                                        {item}
                                    </div>
                                </div>
                            })
                        }
                    </div>
                    <div className="flex-box-justify-between core-process-box-bottom-1 core-process-box-bottom-9">
                        {
                            (data[7] || [])?.map((item: any, index: number) => {
                                return <div
                                    className="flex-box core-process-box-bottom-1-item core-process-box-bottom-9-item"
                                    key={`core-process-box-bottom-9-item-${index}`}
                                >
                                    {
                                        index === 0 ?
                                            <div style={{ width: '100%', height: '100%' }} >
                                                <div className="dashed-line" style={{ width: '0.1rem', height: '1.4rem', marginLeft: '50%', marginTop: '-1.4rem' }} />
                                                <div className="dashed-line" style={{ width: '50%', height: '100%', marginLeft: '50%' }} />
                                            </div>
                                            : index === 1 ?
                                                <div style={{ width: '100%', height: '100%' }} >
                                                    <div className="dashed-line" style={{ width: '0.1rem', height: '1.4rem', marginLeft: '50%', marginTop: '-1.4rem' }} />
                                                    <div className="dashed-line" style={{ width: '100%', height: '100%' }} />
                                                </div>
                                                : index === 2 ?
                                                    <div style={{ width: '100%', height: '100%' }} >
                                                        <div className="dashed-line" style={{ width: '0.1rem', height: '1.4rem', marginLeft: '50%', marginTop: '-1.4rem' }} />
                                                        <div className="dashed-line" style={{ width: '50%', height: '100%', }} />
                                                    </div>
                                                    :
                                                    <div className="dashed-line" style={{ width: '0.1rem', height: '2.8rem', marginLeft: 'calc(50% - 0.3rem)', marginTop: '-0.4rem' }} />
                                    }
                                </div>
                            })
                        }
                    </div>
                    <div className="flex-box-justify-between core-process-box-bottom-1 core-process-box-bottom-8">
                        {
                            (data[8] || [])?.map((item: any, index: number) => {
                                return <div
                                    className="flex-box-center core-process-box-bottom-1-item core-process-box-bottom-8-item"
                                    key={`core-process-box-bottom-8-item-${index}`}
                                >
                                    {
                                        !!item ?
                                            <div className="core-process-box-bottom-8-item-title">
                                                {item}
                                            </div>
                                            :
                                            index === 0 ?
                                                null
                                                :
                                                index === 5 ?
                                                    <div className="dashed-line" style={{ width: '50%', height: '100%', marginRight: '50%' }} />
                                                    :
                                                    <div className="dashed-line" style={{ width: '100%', height: '100%' }} />
                                    }
                                </div>
                            })
                        }
                    </div>
                </div>
            </div>
        </ItemBody>
    );
};

export default Item6;
