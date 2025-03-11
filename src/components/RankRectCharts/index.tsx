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
}

const RankRectCharts: React.FC<Props> = (props: any) => {
    let {
        title, data = [], reverse = false, pageSize = 4,
        colorList = [
            ['rgba(251,74,33,1)', 'rgba(202,75,31,0.6)'],
            ['rgba(247,199,27,1)', 'rgba(245,198,24,0.6)'],
            ['rgba(202,137,19,1)', 'rgba(202,157,19,0.6)']
        ],
        time = 5000, onlyFont = false, ...rest } = props;
    const domRef = useRef<any>();


    return (
        <div ref={domRef} className={`flex-box-column ${styles.rankRectCharts}`} {...rest}>
            {
                !!title ?
                    <div className="rank-rect-charts-title">
                        <div className="rank-rect-charts-title-bg"></div>
                        {title}
                    </div>
                    : null
            }
            {(data || [])
                ?.sort((a: any, b: any) => (reverse ? b.order - a.order : a.order - b.order))
                ?.map?.((item: any, index: number) => {
                    let { name, value } = item;
                    return (
                        <div
                            className={`flex-box-center rank-rect-charts-item-box`}
                            key={`rank-charts-item-box-${index}`}
                            style={{
                                height: `calc(${100 / (pageSize + (!!title ? 1 : 0))}% - 0.8rem)`,
                                backgroundImage: !!colorList[index] ?
                                    `linear-gradient(to right, ${colorList[index][0]}, ${colorList[index][1]}` :
                                    `linear-gradient(to right, rgba(39,90,235,0.8), rgba(41,100,200,1))`,
                                width: `${95 - 15 * index}%`
                            }}
                        >
                            {name}
                        </div>
                    );
                })}
        </div >
    );
};

export default RankRectCharts;
