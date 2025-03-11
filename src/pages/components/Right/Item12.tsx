
import { useRef } from 'react';
import Bar3DCharts from '../Bar3DCharts';
import ItemBody from '../ItemBody';
import Pie3DCharts from '../Pie3DCharts';
import BarCharts from '../BarCharts';
import PieCharts from '../PieCharts';
import RankCharts from '@/components/RankCharts';
import icon from '@/assets/images/header-icon.gif';
import RankRectCharts from '@/components/RankRectCharts';

const Item12: React.FC<any> = (props: any) => {
    let { data } = props;
    const domRef = useRef<any>(null);

    return (
        <ItemBody title={'度假 Holiday'}>
            <div className="flex-box holiday-box" ref={domRef}>
                <div className="holiday-box-left">
                    <div className="flex-box holiday-box-left-top">
                        <div className="flex-box-center holiday-box-left-top-left">
                            <img src={icon} alt="" />
                        </div>
                        <div className="flex-box-column holiday-box-left-top-right">
                            已上线度假产品数
                            <div className="holiday-box-left-top-right-number">
                                {data.holiday1}
                            </div>
                        </div>
                    </div>
                    <div className="holiday-box-left-bottom">
                        <RankRectCharts
                            title="出港地省份排行版"
                            data={data.holiday2}
                        />
                    </div>
                </div>
                <div className="holiday-box-right">
                    <div className="holiday-box-right-top">
                        <PieCharts
                            title="出游人群占比"
                            data={data?.holiday3}
                            labelSize={'1.2rem'}
                            radiuSize={[45, 80]}
                            center={['50%', '55%']}
                            grid={{ top: '0%', }}
                        />
                    </div>
                    <div className="holiday-box-right-bottom">
                        <RankCharts
                            title="供应商"
                            data={data?.holiday5}
                            pageSize={5}
                            onlyFont={true}
                        />
                    </div>
                </div>
                <div className="holiday-box-right">
                    <div className="holiday-box-right-top">
                        <PieCharts
                            title="出游方式占比"
                            data={data?.holiday4}
                            labelSize={'1.2rem'}
                            radiuSize={[45, 80]}
                            center={['50%', '55%']}
                            grid={{ top: '0%', }}
                        />
                    </div>
                    <div className="holiday-box-right-bottom">
                        <RankCharts
                            title="分销商"
                            data={data?.holiday6}
                            pageSize={5}
                            onlyFont={true}
                        />
                    </div>
                </div>
            </div>
        </ItemBody>
    );
};

export default Item12;
