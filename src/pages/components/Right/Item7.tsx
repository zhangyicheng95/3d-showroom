
import ItemBody from '../ItemBody';
import BarCharts from '../BarCharts';
import PieNightingaleCharts from '../PieNightingaleCharts';
import PieCharts from '../PieCharts';
import LightBarCharts from '../LightBarCharts';

const Item7: React.FC<any> = (props: any) => {
    let { data } = props;

    return (
        <ItemBody title={'旅客数据'}>
            <div className="passenger-data-box">
                <div className="flex-box passenger-data-box-top">
                    <div className="flex-box passenger-data-box-top-left">
                        <div className="flex-box-center passenger-data-box-item-title">性别占比</div>
                        <PieCharts data={data?.passengerGenderRatio} labelSize={'1.2rem'} radiuSize={[49, 85]} />
                    </div>
                    <div className="flex-box passenger-data-box-top-right">
                        <div className="flex-box-center passenger-data-box-item-title">旅客消费</div>
                        <PieNightingaleCharts data={data?.passengerUnitPriceRatio} />
                    </div>
                </div>
                <div className="flex-box passenger-data-box-bottom">
                    <div className="flex-box passenger-data-box-bottom-left">
                        <div className="flex-box-center passenger-data-box-item-title">年龄占比</div>
                        <LightBarCharts data={data?.passengerAgeRatio} />
                    </div>
                    <div className="flex-box passenger-data-box-bottom-right">
                        <div className="flex-box-center passenger-data-box-item-title">旅客人数</div>
                        <BarCharts data={data?.recentHalfYearPassengerNumber} hiddenY={true} />
                    </div>
                </div>
            </div>
        </ItemBody>
    );
};

export default Item7;

const colorList = [
    {
        type: 'linear',
        x: 1,
        y: 0,
        x2: 0,
        y2: 0,
        colorStops: [{
            offset: 0,
            color: 'rgba(158,135,255,0.02)' // 0% 处的颜色
        },
        {
            offset: 1,
            color: 'rgba(158,135,255,0.57)' // 100% 处的颜色
        }
        ],
        globalCoord: false // 缺省为 false
    },
    {
        type: 'linear',
        x: 0,
        y: 1,
        x2: 0,
        y2: 0,
        colorStops: [{
            offset: 0,
            color: 'rgba(252,75,75,0.01)' // 0% 处的颜色
        },
        {
            offset: 1,
            color: 'rgba(252,75,75,0.57)' // 100% 处的颜色
        }
        ],
        globalCoord: false // 缺省为 false
    },
    {
        type: 'linear',
        x: 1,
        y: 1,
        x2: 1,
        y2: 0,
        colorStops: [{
            offset: 0,
            color: 'rgba(253,138,106,0.01)' // 0% 处的颜色
        },
        {
            offset: 1,
            color: '#FDB36ac2' // 100% 处的颜色
        }
        ],
        globalCoord: false // 缺省为 false
    },
    {
        type: 'linear',
        x: 0,
        y: 0,
        x2: 1,
        y2: 0,
        colorStops: [{
            offset: 0,
            color: 'rgba(254,206,67,0.12)' // 0% 处的颜色
        },
        {
            offset: 1,
            color: '#FECE4391' // 100% 处的颜色
        }
        ],
        globalCoord: false // 缺省为 false
    }
];