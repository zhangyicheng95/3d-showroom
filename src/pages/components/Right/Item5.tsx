
import { useRef } from 'react';
import ItemBody from '../ItemBody';
import GroupBarCharts from '../GroupBarCharts';
import { Statistic } from 'antd';
import rateUp from '@/assets/images/rate-up.jpg';
import rateDown from '@/assets/images/rate-down.jpg';

const Item5: React.FC<any> = (props: any) => {
    let { data } = props;
    const domRef = useRef<any>(null);

    return (
        <ItemBody title={'近半年交易数据'}>
            <div className="flex-box-center half-year-transaction-box" ref={domRef}>
                <div className="half-year-transaction-box-left">
                    <GroupBarCharts data={data?.bar} grid={{
                        left: '-26%',
                        right: '9%'
                    }} />
                </div>
                <div className="flex-box-center half-year-transaction-box-right">
                    {
                        (data?.statistics || [])?.map((item: any, index: number) => {
                            const { name, value, percent } = item;
                            return <div
                                className="flex-box-center half-year-transaction-box-right-item"
                                key={`half-year-transaction-box-right-item-${index}`}
                            >
                                <div className="half-year-transaction-box-right-item-name">
                                    {name}
                                </div>
                                <div className="flex-box half-year-transaction-box-right-item-number">
                                    ¥<Statistic value={value} />
                                </div>
                                <div className="half-year-transaction-box-right-item-rate">
                                    <img src={percent < 0 ? rateDown : rateUp} alt="" /> {percent}%
                                </div>
                            </div>
                        })
                    }
                </div>
            </div>
        </ItemBody>
    );
};

export default Item5;
