
import ItemBody from '../ItemBody';
import LineCharts from '../LineCharts';
import RadarCharts from '../RadarCharts';
import PeopleBarCharts from '../PeopleBarCharts';

const Item7: React.FC<any> = (props: any) => {
    let { data } = props;

    return (
        <ItemBody title={'旅客数据'}>
            <div className="flex-box-center channel-transaction-data-box">
                <div className="channel-transaction-data-box-left">
                    <PeopleBarCharts data={data?.rank} />
                </div>
                <div className="channel-transaction-data-box-right">
                    <div className="channel-transaction-data-box-right-top">
                        <RadarCharts data={data?.radar} />
                    </div>
                    <div className="channel-transaction-data-box-right-bottom">
                        <LineCharts data={data?.line} />
                    </div>
                </div>
            </div>
        </ItemBody>
    );
};

export default Item7;
