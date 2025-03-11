import { useModel } from '@umijs/max';
import TimeShowCharts from '@/components/TimeShowCharts';
import WeatherApp from '@/components/WeatherApp';
import headersubBg from '@/assets/images/sub-header-bg.svg';

export const title = '全国旅游资源交易平台'; //盛景低代码大屏 全国旅游资源交易平台
export const subTitle = '陕西文旅控股有限公司';
const HomeHeader: React.FC<any> = () => {
    const { name } = useModel('global');
    return (
        <div className="flex-box-justify-between home-header">
            <div className='home-header-left'>
                <img src={headersubBg} alt="" />
                <div className="flex-box-justify-between home-header-left-font">
                    <div className='home-header-left-font-title'><WeatherApp /></div>
                    <div className='home-header-left-font-title'>模式创新  科技赋能</div>
                    <div style={{ width: '20%' }} />
                </div>
            </div>
            <div className="flex-box-center home-header-title fontColor">
                <div className="home-header-title-font">
                    {title}
                </div>
                <div className="home-header-title-sub">{subTitle}</div>
            </div>
            <div className='home-header-left'>
                <img src={headersubBg} alt="" />
                <div className="flex-box-justify-between home-header-left-font">
                    <div style={{ width: '20%' }} />
                    <div className='home-header-left-font-title'>规模交易 数据驱动</div>
                    <div className='home-header-left-font-title'>
                        <TimeShowCharts />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomeHeader;
