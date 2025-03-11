
import ItemBody from '../ItemBody';
import RankBarCharts from '../RankBarCharts';


const Item9: React.FC<any> = (props: any) => {
    let { data } = props;

    return (
        <ItemBody title={'全年 TOP'}>
            <div className="flex-box platfor-retention-box">
                <div className="platfor-retention-box-top">
                    热门出发地TOP10
                    <RankBarCharts
                        data={data?.out}
                    />
                </div>
                <div className="platfor-retention-box-bottom">
                    热门目的地TOP10
                    <RankBarCharts
                        data={data?.in}
                    />
                </div>
            </div>
        </ItemBody>
    );
};

export default Item9;
