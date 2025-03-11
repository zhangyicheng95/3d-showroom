
import { useCallback, useEffect, useState } from 'react';
import ItemBody from '../ItemBody';
import bg1 from '@/assets/tradingPlatform/bg-1.svg';
import bg2 from '@/assets/tradingPlatform/bg-2.svg';
import arrow from '@/assets/tradingPlatform/arrow.svg';
import circle from '@/assets/tradingPlatform/circle.svg';
import bgItem2 from '@/assets/tradingPlatform/bg-item2.png';

const Item5: React.FC<any> = (props: any) => {
    let { data } = props;

    return (
        <ItemBody title={'技促业升 双擎驱动'}>
            <div className="flex-box-center trading-platform-box">
                <div className="flex-box trading-platform-box-top">
                    <div className="trading-platform-box-top-left">
                        <img src={bg1} alt="" className='imgPosition left-bg' />
                        <div className="trading-platform-box-top-left-title">
                            全国旅游资源交易平台
                        </div>
                        <div className="runningBorder" style={{
                            top: '30%',
                            bottom: '29%',
                            left: '1%',
                            right: 0,
                        }} />
                        <div className="flex-box-justify-between trading-platform-box-top-left-bottom">
                            {
                                ['互联互通', '全垒资源', '规模交易', '全城整合']?.map((i: string, index: number) => {
                                    return <div
                                        className={`trading-platform-box-top-left-bottom-item-${index}`}
                                        key={`trading-platform-box-top-left-bottom-item-${index}`}
                                    >
                                        {i}
                                        <img src={bgItem2} alt="" />
                                    </div>
                                })
                            }
                        </div>
                    </div>
                    <div className="trading-platform-box-top-right">
                        <img src={bg2} alt="" className='imgPosition right-bg' />
                        <div className="runningBorder" style={{
                            top: '30%',
                            bottom: '27%',
                            left: '1%',
                            right: 0,
                        }} />
                        <div className="flex-box-center trading-platform-box-top-right-top">
                            <div className="trading-platform-box-top-right-top-type">
                                架构
                            </div>
                            <div className="trading-platform-box-top-right-top-content">
                                全整合
                                <div>深度融合</div>
                                半融合
                                <div>全对接</div>
                            </div>
                            <div className="flex-box-center trading-platform-box-top-right-top-arrow">
                                <img src={arrow} alt="" className='imgPosition' />
                                数据抽取
                                <div>数据融合</div>
                            </div>
                            <div className="trading-platform-box-top-right-top-title">
                                <img src={circle} alt="" className='imgPosition title-bg' />
                                全国旅游资源融合平台
                            </div>
                        </div>
                        <div className="flex-box-justify-between trading-platform-box-top-right-bottom">
                            {
                                ['平台赋能', '资源梳理', '资源聚合', '平台交易']?.map((i: string, index: number) => {
                                    return <div
                                        className={`trading-platform-box-top-right-bottom-item-${index}`}
                                        key={`trading-platform-box-top-right-bottom-item-${index}`}
                                    >
                                        {i}
                                    </div>
                                })
                            }
                        </div>
                    </div>
                </div>
                <div className="flex-box-center trading-platform-box-bottom">
                    <div>交易产生利润，服务产生价值</div>
                    <div>优化产品供给，创新产业生态</div>
                </div>
            </div>
        </ItemBody>
    );
};

export default Item5;
