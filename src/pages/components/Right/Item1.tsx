
import React, { useEffect, useRef, useState } from 'react';
import * as _ from 'lodash-es';
import ItemBody from '../ItemBody';
import icon01 from '@/assets/images/platfor-retention-1.svg';

const Item1: React.FC<any> = (props: any) => {
    let { data } = props;
    const timer = useRef<any>(null);
    const domRef = useRef<any>(null);

    const [tottalNum, setTotalNum] = useState<number>(37891244);

    useEffect(() => {
        let realNum = ('' + data.value)?.split('');
        for (let i = 0; i <= 10 - realNum?.length; i++) {
            realNum.unshift('0');
        };
        setTotalNum(Number(realNum.join('')));
        if (!!timer.current) {
            clearInterval(timer.current);
        };
        timer.current = setInterval(() => {
            setTotalNum((pre: any) => pre + Math.floor(Math.random() * 1000));
        }, 10000);

        return () => {
            !!timer.current && clearInterval(timer.current);
        }
    }, [data?.value]);

    return (
        <ItemBody title={'当年交易额数据'}>
            <div className="flex-box-column transaction-box" ref={domRef}>
                <div className="flex-box-center transaction-box-top">
                    <div className="transaction-box-top-title">
                        2025年平台交易额（GMV）
                    </div>
                    <div className="flex-box-justify-around transaction-box-top-num">
                        {
                            Array.from({ length: 10 - (tottalNum + '')?.length })
                                ?.concat((tottalNum + '')
                                    ?.split(''))
                                ?.map((i: any, index: number) => {
                                    return <div
                                        className="transaction-box-top-num-item"
                                        key={`transaction-box-top-num-item-${index}`}
                                    >
                                        {i || '0'}
                                    </div>
                                })
                        }
                    </div>
                </div>
                <div className="flex-box-justify-between transaction-box-bottom">
                    {
                        (data?.list || [])?.map((item: any, index: number) => {
                            const { name, value } = item;
                            return <div
                                className="flex-box-center transaction-box-bottom-item"
                                key={`transaction-box-bottom-item-${index}`}
                            >
                                <div className="transaction-box-bottom-item-icon">
                                    <img src={icon01} alt="" />
                                </div>
                                <div className="transaction-box-bottom-item-right">
                                    <div className="transaction-box-bottom-item-right-title">
                                        {name}
                                    </div>
                                    <div className="transaction-box-bottom-item-right-num">
                                        {
                                            name?.indexOf('总收入') > -1 ?
                                                (value > (Number(data?.value) / 10000 / 5)) ?
                                                    (Number(data?.value) / 110000).toFixed(0)
                                                    : value
                                                : value
                                        }
                                    </div>
                                </div>
                            </div>
                        })
                    }
                </div>
            </div>
        </ItemBody>
    );
};

export default Item1;
