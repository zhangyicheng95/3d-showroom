
import FlowingLightEffect from '@/components/FlowingLightEffect';
import React, { useCallback, useEffect, useState } from 'react';
import ItemBody from '../ItemBody';

const Item1: React.FC<any> = (props: any) => {
    let { data } = props;

    return (
        <ItemBody title={'生产改革 短链优化'}>
            <div className="flex-box-center product-relation-box">
                <div className="flex-box-center product-relation-box-sider">
                    <div className="product-relation-box-sider-title">
                        传统模式供应链
                    </div>
                    <div className="product-relation-box-sider-img" style={{ paddingTop: '20%' }}>
                        {
                            (data?.left || [])?.map((i: string, index: number) => {
                                return <div
                                    className="flex-box-center runningBorder"
                                    key={`runningBorder-${index}`}
                                    style={{
                                        top: `${1 + index * 11}%`, bottom: `${82 - index * 11}%`,
                                        left: `${5 + index * 2.6}%`, right: `${5 + index * 2.6}%`,
                                        height: index === 0 ? 0 : `${(100 - 10) / 7}%`,
                                    }}
                                >
                                    {i}
                                </div>
                            })
                        }
                    </div>
                </div>
                <div className="flex-box-center product-relation-box-center">
                    <div className="product-relation-box-center-font">
                        <div>减少中间环节</div>
                        突出价格优势
                    </div>
                </div>
                <div className="flex-box-center product-relation-box-sider">
                    <div className="product-relation-box-sider-title">
                        全国旅游资源交易平台供应链
                    </div>
                    <div className="product-relation-box-sider-img product-relation-box-sider-img2">
                        {
                            (data?.right || [])?.map((i: string, index: number) => {
                                return <div
                                    className="flex-box-center runningBorder"
                                    key={`runningBorder-${index}`}
                                    style={{
                                        top: `${1 + index * 21.5}%`, bottom: `${79 - index * 21}%`,
                                        left: `${2 + index * 6.4}%`, right: `${-1 + index * 6.4}%`,
                                        height: `${22.2 - index * 1}%`,
                                    }}
                                >
                                    {i}
                                </div>
                            })
                        }
                    </div>
                </div>
            </div>
        </ItemBody>
    );
};

export default Item1;
