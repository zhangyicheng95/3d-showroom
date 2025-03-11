
import ItemBody from '../ItemBody';
import ScrollTable from '@/components/ScrollTable';
import options from '@/constants/commonOptions';

const headerColor = {
    0: options.color[0],
    1: options.color[1],
    2: options.color[2],
    3: options.color[3],
    4: options.color[4],
    5: options.color[5],
};

const Item3: React.FC<any> = (props: any) => {
    let { data } = props;

    return (
        <ItemBody title={'特色主题 - 自营'}>
            <div className="flex-box-column feature-theme-box">
                {
                    Object.entries(data)?.map((res: any, index: number) => {
                        return <div
                            key={`feature-theme-box-item-${res[0]}`}
                            className="flex-box feature-theme-box-item"
                        >
                            <div className="flex-box-center feature-theme-box-item-left" style={{ backgroundColor: headerColor[index] }}>
                                {res[1]?.[0]?.type}
                            </div>
                            <div className="feature-theme-box-item-right">
                                <ScrollTable
                                    data={res[1]}
                                    header={[
                                        { label: '名称', value: 'name', width: '49%', color: headerColor[index] },
                                        { label: '出发/目的地', value: 'place', width: '23%', color: headerColor[index] },
                                        { label: '旅客', value: 'number', width: '11%', color: headerColor[index] },
                                        { label: '营收(万)', value: 'value', width: '17%', color: headerColor[index] }
                                    ]}
                                    hiddenHeader={index !== 0}
                                    speed={1}
                                />
                            </div>
                        </div>
                    })
                }
            </div>
        </ItemBody>
    );
};

export default Item3;
