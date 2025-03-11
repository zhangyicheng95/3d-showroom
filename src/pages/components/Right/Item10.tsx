
import ItemBody from '../ItemBody';
import RankCharts from '@/components/RankCharts';

const Item10: React.FC<any> = (props: any) => {
    let { data } = props;

    return (
        <ItemBody title={'近30天资源排行'}>
            <div className="flex-box ranking-resources-past-month-box">
                <div className="ranking-resources-past-month-box-left">
                    <RankCharts
                        data={data?.table1}
                        pageSize={5}
                    />
                </div>
                <div className="ranking-resources-past-month-box-right">
                    <RankCharts
                        data={data?.table2}
                        pageSize={5}
                        colorList={[
                            ['rgba(245,147,119,1)', 'rgba(245,147,119,0.5)'],
                            ['rgba(232,230,101,1)', 'rgba(232,230,101,0.5)'],
                            ['rgba(80,225,193,1)', 'rgba(80,225,193,0.5)']
                        ]}
                    />
                </div>
            </div>
        </ItemBody>
    );
};

export default Item10;
