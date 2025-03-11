
import { useCallback, useEffect, useState } from 'react';
import ItemBody from '../ItemBody';
import rateUp from '@/assets/images/rate-up.jpg';
import rateDown from '@/assets/images/rate-down.jpg';
import { Statistic } from 'antd';

const Item6Base: React.FC<any> = (props: any) => {
    let { data } = props;
    data = {
        top: [
            {
                name: '月均销售额',
                value: 5713666,
                unit: '元',
                rate: '12%',
                rateType: 'down'
            },
            {
                name: '总订单数',
                value: 5713666,
                unit: '个',
                rate: '12%',
                rateType: 'up'
            },
            {
                name: '月均销售额',
                value: 5713666,
                unit: '元',
                rate: '12%',
                rateType: 'down'
            },
            {
                name: '总订单数',
                value: 5713666,
                unit: '个',
                rate: '12%',
                rateType: 'up'
            }
        ],
        center: {
            aName: '今年订单量',
            aValue: 9564000,
            aUnit: '个',
            bName: '本年支出金额',
            bValue: 10910000,
            bRate: '15%',
            bRateType: 'up',
            cName: '今年交易笔数',
            cValue: 783,
            cUnit: '笔',
        },
        bottom: [
            {
                name: '已完成',
                value: 8564000,
                unit: '个',
            },
            {
                name: '在途订单',
                value: 1000000,
                unit: '个',
            },
            {
                name: '已废弃',
                value: 17,
                unit: '个',
            },
            {
                name: '交易笔数',
                value: 453895,
                unit: '笔',
            },
            {
                name: '产品数量',
                value: 23456,
                unit: '个',
            }
        ]
    };
    return (
        <ItemBody title={'订单数据'}>
            <div className="flex-box-center order-data-box">
                <div className="flex-box order-data-box-top">
                    {
                        (data?.top || [])?.map((item: any, index: number) => {
                            const { name, value, unit, rate, rateType } = item;
                            return <div className="flex-box-column order-data-box-top-item" key={`order-data-box-top-item-${index}`}>
                                <div className="order-data-box-top-item-name">
                                    {name}({unit})
                                </div>
                                <div className="flex-box order-data-box-top-item-number">
                                    {unit === '元' ? '¥' : ''}
                                    <Statistic value={value} />
                                </div>
                                <div className="order-data-box-top-item-rate">
                                    <img src={rateType === 'down' ? rateDown : rateUp} alt="" /> {rate}
                                </div>
                            </div>
                        })
                    }
                </div>
                <div className="flex-box order-data-box-center">
                    <div className="flex-box-column order-data-box-center-left">
                        <div className="order-data-box-center-left-name">
                            {data?.center?.aName}
                        </div>
                        <div className="flex-box order-data-box-center-left-number">
                            {data?.center?.aValue} {data?.center?.aUnit}
                        </div>
                    </div>
                    <div className="flex-box-column order-data-box-center-right">
                        <div className="order-data-box-center-right-name">
                            {data?.center?.bName}
                        </div>
                        <div className="order-data-box-center-right-number-1">
                            <Statistic value={data?.center?.bValue} />
                        </div>
                        <div className="flex-box order-data-box-center-right-rate">
                            <img src={data?.center?.bRateType === 'down' ? rateDown : rateUp} alt="" />{data?.center?.bRate}
                        </div>
                    </div>
                    <div className="flex-box-column order-data-box-center-right">
                        <div className="order-data-box-center-right-name">
                            {data?.center?.cName}
                        </div>
                        <div className="flex-box order-data-box-center-right-number-2">
                            <Statistic value={data?.center?.cValue} /> {data?.center?.cUnit}
                        </div>
                        <div className="flex-box order-data-box-center-right-rate">

                        </div>
                    </div>
                </div>
                <div className="flex-box order-data-box-bottom">
                    {
                        (data?.bottom || [])?.map((item: any, index: number) => {
                            const { name, value, unit } = item;
                            return <div className="flex-box-center order-data-box-bottom-item" key={`order-data-box-bottom-item-${index}`}>
                                <div className="order-data-box-bottom-item-name">
                                    {name}({unit})
                                </div>
                                <div className="order-data-box-bottom-item-number">
                                    <Statistic value={value} />
                                </div>
                            </div>
                        })
                    }
                </div>
            </div>
        </ItemBody>
    );
};

export default Item6Base;
