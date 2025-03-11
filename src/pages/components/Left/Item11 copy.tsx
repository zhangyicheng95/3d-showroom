
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import ItemBody from '../ItemBody';
import PieCharts from '../PieCharts';
import PieNightingaleCharts from '../PieNightingaleCharts';

const lineColorList = {
    0: 'rgba(251,74,33,1)',
    1: 'rgba(242,107,19,1)',
    2: 'rgba(247,199,27,1)',
    3: 'rgba(8,245,254,1)'
};

const Item11Base: React.FC<any> = (props: any) => {
    let { data } = props;

    return (
        <ItemBody title={'销售洞察 渠道优化'}>
            <div className="flex-box-column supply-arketing-box">
                <div className="flex-box-start supply-arketing-box-header">
                    {
                        (data?.data1 || [])?.map((item: any, index: number) => {
                            const { name, value } = item;
                            return <div
                                className="flex-box-center supply-arketing-box-header-item"
                                key={`supply-arketing-box-header-item-${index}`}
                            >
                                <div className='supply-arketing-box-header-item-value' style={{
                                    color: `${lineColorList[index] || 'rgb(8 245 254 / 80%)'}`
                                }}>{value}</div>
                                {name}
                            </div>
                        })
                    }
                </div>
                <div className="flex-box supply-arketing-box-body">
                    <div className="supply-arketing-box-body-item">
                        <PieCharts data={data?.data2} />
                    </div>
                    <div className="supply-arketing-box-body-item">
                        <PieNightingaleCharts data={data?.data3} />
                    </div>
                </div>
            </div>
        </ItemBody>
    );
};

export default Item11Base;
