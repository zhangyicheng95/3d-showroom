
import { useRef } from 'react';
import ItemBody from '../ItemBody';
import RankCharts from '@/components/RankCharts';
import PieCharts from '../PieCharts';
import BasicBanner from '@/components/BasicBanner';

const Item4: React.FC<any> = (props: any) => {
    let { data } = props;
    const domRef = useRef<any>(null);

    return (
        <ItemBody title={'门票 Ticket'}>
            <div className="flex-box-column passenger-volume-past-box" ref={domRef}>
                <div className="flex-box passenger-volume-past-box-top">
                    <div className="passenger-volume-past-box-top-item">
                        {
                            data?.ticket1?.length > 0 &&
                            <RankCharts
                                title="预定景区热度top10"
                                data={data?.ticket1}
                                pageSize={3}
                                onlyFont={true}
                            />
                        }
                    </div>
                    <div className="flex-box-justify-around passenger-volume-past-box-top-item">
                        {
                            Array.from({ length: 3 })?.map((item: any, index: number) => {
                                const number = data?.ticket2?.length / 3;
                                return <div
                                    className="passenger-volume-past-box-top-item"
                                    key={`passenger-volume-past-box-top-item-${index}`}
                                    style={{
                                        width: '100%',
                                        height: '20%'
                                    }}
                                >
                                    <BasicBanner
                                        list={data?.ticket2.slice(index * number, (index + 1) * number)?.map((i: any) => i.name)}
                                        time={20}
                                        text={true}
                                    />
                                </div>
                            })
                        }
                    </div>
                </div>
                <div className="flex-box passenger-volume-past-box-bottom">
                    <div className="passenger-volume-past-box-bottom-item">
                        <PieCharts
                            title="月度线上销售渠道占比"
                            data={data?.ticket3}
                            labelSize={'1.2rem'}
                            radiuSize={[45, 76]}
                            center={['50%', '60%']}
                            grid={{ top: '0%', }}
                        />
                    </div>
                    <div className="passenger-volume-past-box-bottom-item">
                        <RankCharts
                            data={data?.ticket4}
                            pageSize={5}
                            onlyFont={true}
                        />
                    </div>
                </div>
            </div>
        </ItemBody>
    );
};

export default Item4;
