
import React from 'react';
import ItemBody from '../ItemBody';
import left4Icon1 from '@/assets/offline/offLine-1.svg';
import left4Icon2 from '@/assets/offline/offLine-2.svg';
import left4Icon3 from '@/assets/offline/offLine-3.svg';
import left4Icon4 from '@/assets/offline/offLine-4.svg';
import left4Icon5 from '@/assets/offline/offLine-5.svg';
import left4Icon6 from '@/assets/offline/offLine-6.svg';
import ThermalDistributionCharts from '../ThermalDistributionCharts';

const iconFormat: any = {
    0: left4Icon1,
    1: left4Icon2,
    2: left4Icon3,
    3: left4Icon4,
    4: left4Icon5,
    5: left4Icon6
};

const Item4: React.FC<any> = (props: any) => {
    let { data } = props;

    return (
        <ItemBody title={'网络拓展 市场覆盖'}>
            <div className="flex-box offline-box">
                <div className="flex-box offline-box-left">
                    {
                        (data || [])?.map((item: any, index: number) => {
                            const { name, value } = item;
                            return <div
                                className="flex-box-center offline-box-left-item"
                                key={`offline-box-left-item-${index}`}
                            >
                                <div className="flex-box-center offline-box-left-item-icon">
                                    <img src={iconFormat[index]} alt="" />
                                </div>
                                <div className="offline-box-left-item-title">
                                    {name}
                                    <div className='offline-box-left-item-title-num'>{value}+</div>
                                </div>
                            </div>
                        })
                    }
                </div>
                <div className="offline-box-right">
                    <ThermalDistributionCharts data={[]} />
                </div>
            </div>
        </ItemBody>
    );
};

export default Item4;
