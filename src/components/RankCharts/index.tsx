import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Progress } from 'antd';
import styles from './index.less';
import TooltipDiv from '../TooltipDiv';

interface Props {
    data: any;
    title?: string;
    pageSize?: number;
    reverse?: boolean;
    colorList?: any[];
    time?: number;
    onlyFont?: boolean;
    startNum?: number;
}

const RankCharts: React.FC<Props> = (props: any) => {
    let {
        title, data = [], reverse = false, pageSize = 5, startNum = 0,
        colorList = [
            ['rgba(251,74,33,1)', 'rgba(202,75,31,0.6)'],
            ['rgba(247,199,27,1)', 'rgba(245,198,24,0.6)'],
            ['rgba(202,137,19,1)', 'rgba(202,157,19,0.6)']
        ],
        time = 5000, onlyFont = false, ...rest } = props;
    const domRef = useRef<any>();
    const [timeIndex, setTimeIndex] = useState(0);

    const maxValue = useMemo(() => {
        let num = 0;
        data.forEach?.((item: any) => {
            let { value } = item;
            const number = ('' + value)?.indexOf('¥') > -1 ? ('' + value)?.split('¥')?.[1]?.replace(',', '') : ('' + value)?.replace(',', '');
            const value1 = Number(number);
            if (num < value1) {
                num = value1;
            }
        });
        return num;
    }, [data]);
    useEffect(() => {
        const page = Math.ceil(data?.length / pageSize);
        let timer: any = null;
        if (!!domRef.current) {
            timer = setInterval(() => {
                setTimeIndex((pre) => {
                    if ((pre + 1) < page) {
                        return (pre + 1);
                    } else {
                        return 0;
                    };
                });
            }, time);
        };

        return () => {
            !!timer && clearInterval(timer);
        }
    }, [domRef.current, data, time]);

    return (
        <div ref={domRef} className={`flex-box-column ${styles.rankCharts}`} {...rest}>
            {
                !!title ?
                    <div className="rank-charts-title">
                        <div className="rank-charts-title-bg"></div>
                        {title}
                    </div>
                    : null
            }
            {(data || [])
                ?.sort((a: any, b: any) => (reverse ? b.order - a.order : a.order - b.order))
                ?.slice(timeIndex * pageSize, (timeIndex + 1) * pageSize)
                ?.map?.((item: any, index: number) => {
                    let { name, value } = item;
                    const number = ('' + value)?.indexOf('¥') > -1 ? ('' + value)?.split('¥')?.[1]?.replace(',', '') : ('' + value)?.replace(',', '');
                    const value1 = Number(number);
                    index += timeIndex * pageSize + startNum;
                    return (
                        <div
                            className={`flex-box rank-charts-item-box`}
                            id={`rank-charts-item-box-${index}`}
                            key={`rank-charts-item-box-${index}`}
                            style={{ height: `calc(${100 / (pageSize + (!!title ? 1 : 0))}% - 0.8rem)` }}
                        >
                            <div
                                className="flex-box-center rank-charts-item-box-icon"
                                style={{
                                    backgroundImage: !!colorList?.[index] ?
                                        `linear-gradient(to right, ${colorList[index][0]}, ${colorList[index][1]}` :
                                        `linear-gradient(to right, rgba(39,90,235,0.8), rgba(41,100,200,1))`,
                                }}
                            >
                                {index + 1}
                            </div>
                            <div className="rank-charts-item-box-right">
                                <div className="flex-box-justify-between rank-charts-item-box-right-name">
                                    <TooltipDiv style={(onlyFont && index < 3 && !!colorList?.[index]) ? { color: colorList[index][0] } : {}}> {name} </TooltipDiv>
                                    {
                                        !!onlyFont ?
                                            null
                                            :
                                            `${('' + value)?.indexOf('¥') > -1 ? '' : '¥'}${Number(value)?.toFixed(3)}`
                                    }
                                </div>
                                {
                                    !!onlyFont ?
                                        null
                                        :
                                        <Progress
                                            strokeColor={
                                                index < 3
                                                    ? { from: colorList[index][1], to: colorList[index][0] }
                                                    : {
                                                        from: 'rgba(39,97,235,0.6)',
                                                        to: 'rgba(56,200,234,1)',
                                                    }
                                            }
                                            percent={(value1 / maxValue || 0) * 100}
                                            showInfo={false}
                                            trailColor="rgba(144,144,144,0.5)"
                                            status="active"
                                        />
                                }
                            </div>
                        </div>
                    );
                })}
        </div >
    );
};

export default RankCharts;
