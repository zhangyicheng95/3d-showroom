
import RankCharts from '@/components/RankCharts';
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

const Item11: React.FC<any> = (props: any) => {
    let { data } = props;

    return (
        <ItemBody title={'销售洞察 渠道优化'}>
            <div className="flex-box-column supply-arketing-box">
                <RankCharts
                    data={data} pageSize={5} time={8000}
                    colorList={[
                        ['rgba(245,147,119,1)', 'rgba(245,147,119,0.5)'],
                        ['rgba(232,230,101,1)', 'rgba(232,230,101,0.5)'],
                        ['rgba(80,225,193,1)', 'rgba(80,225,193,0.5)']
                    ]}
                />
            </div>
        </ItemBody>
    );
};

export default Item11;
