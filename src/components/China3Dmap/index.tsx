import { useCallback, useEffect, useRef, useState } from 'react';
import { initStatus } from './config';
import styles from './index.less';
import { World } from "./map";
import nanhaiIcon from './南海诸岛.svg';
import eventBus from '@/hooks/eventBus';
import * as _ from 'lodash-es';

interface Props {
    flyData?: any;
    onChange?: any;
}
const China3Dmap: React.FC<Props> = (props: any) => {
    const { onChange, flyData } = props;

    const appRef = useRef<any>(null);
    const updateTimer = useRef<any>(null);
    const childrenCity = useRef<any>(false);
    const [state, setState] = useState<any>(initStatus);
    const [currentCity, setCurrentCity] = useState({ adcode: 610000, name: '陕西省' });

    const setEffectToggle = (type: any) => {
        if (["bar", "flyLine", "scatter", "card", "path"].includes(type) && appRef.current && appRef.current.currentScene === "childScene") {
            return;
        }
        // 设置按钮状态
        const result = Object.entries(state)?.reduce((pre: any, cen: any) => {
            return {
                ...pre,
                [cen[0]]: false,
            }
        }, {});
        result[type] = !state[type];
        setState(result);
        appRef.current.barGroup.visible = false;
        appRef.current.setLabelVisible("labelGroup", false);
        appRef.current.particles.enable = false;
        appRef.current.particles.instance.visible = false;
        appRef.current.flyLineGroup.visible = false;
        appRef.current.flyLineGroup?.forEach((item: any) => {
            item.visible = false;
        });
        appRef.current.flyLineFocusGroup.visible = false;
        appRef.current.scatterGroup.visible = false;
        appRef.current.setLabelVisible("badgeGroup", false);
        appRef.current.pathLineGroup.visible = false;
        if (type === "bar") {
            appRef.current.barGroup.visible = result[type];
            appRef.current.setLabelVisible("labelGroup", result[type]);
        };
        if (type === "particle") {
            appRef.current.particles.enable = result[type];
            appRef.current.particles.instance.visible = result[type];
        };
        if (type === "flyLine") {
            appRef.current.flyLineGroup.visible = result[type];
            appRef.current.flyLineGroup?.forEach((item: any) => {
                item.visible = result[type];
            });
            appRef.current.flyLineFocusGroup.visible = result[type];
        };
        if (type === "scatter") {
            appRef.current.scatterGroup.visible = result[type];
        };
        if (type === "card") {
            appRef.current.setLabelVisible("badgeGroup", result[type]);
        };
        if (type === "mirror") {
            appRef.current.groundMirror.visible = result[type];
        };
        if (type === "path") {
            appRef.current.pathLineGroup.visible = result[type];
        };
    };
    // 返回上一级
    const goBack = useCallback(() => {
        childrenCity.current = false;
        appRef.current && appRef.current.goBack();
    }, [appRef.current]);
    useEffect(() => {
        if (!!flyData?.length) {
            appRef.current = new World(document.getElementById("canvas"), {
                geoProjectionCenter: [108.55, 34.32],
                antialias: true,
                alpha: true,
                flyData: flyData,
            });
        }
        const handleMouseOver = (param: any) => {
            if (!!updateTimer.current) {
                clearTimeout(updateTimer.current);
            };
            updateTimer.current = setTimeout(() => {
                const { type, mesh } = param;
                if (type === 'mousedown') {
                    // 点击选中了某个省
                    setCurrentCity(mesh?.userData);
                    childrenCity.current = true;
                } else if (type === 'mouseover') {
                    if (childrenCity.current) {
                        // 代表已经进入省内地图了  在这里只展示当前省份的数据
                        setCurrentCity(mesh?.userData);
                    } else {
                        // 代表全国地图，鼠标over事件
                        if (!!mesh?.userData?.adcode) {
                            // 有省份信息的才做处理
                            setCurrentCity(mesh?.userData);
                        };
                    };
                } else if (type === 'mouseout') {
                    if (childrenCity.current) {
                        // 代表已经进入省内地图了，不做处理
                    } else {
                        // 鼠标移出，默认展示中心数据
                        setCurrentCity({ adcode: 610000, name: '陕西省' });
                    };
                };
            }, 200);
        };
        eventBus.on('canvas-mouseover', handleMouseOver);

        return () => {
            appRef.current && appRef.current.destroy();
            setEnable: () => { }
            eventBus.off('canvas-mouseover', handleMouseOver);
        }
    }, [flyData]);

    useEffect(() => {
        !!onChange && onChange(currentCity);
    }, [currentCity]);

    return (
        <div className={`flex-box ${styles.china3Dmap}`}>
            <div className="flex-box-center map-level">
                <canvas id="canvas"></canvas>
                <div className="return-btn" onClick={() => goBack()}>返回上一级</div>
                <div className="map-btn-group">
                    {/* <div className={`btn ${state.bar ? 'active' : ''}`} onClick={() => setEffectToggle('bar')}>交易数据</div> */}
                    <div className={`btn ${state.flyLine ? 'active' : ''}`} onClick={() => setEffectToggle('flyLine')}>出发到达</div>
                    {/* <div className={`btn ${state.scatter ? 'active' : ''}`} onClick={() => setEffectToggle('scatter')} > 渠道分布</div >
                    <div className={`btn ${state.card ? 'active' : ''}`} onClick={() => setEffectToggle('card')} > 省级数据</div >
                    <div className={`btn ${state.path ? 'active' : ''}`} onClick={() => setEffectToggle('path')} > 热门轨迹</div > */}
                    {/* <div className={`btn ${state.mirror ? 'active' : ''}`} onClick={() => setEffectToggle('mirror')} > 倒影</div > */}
                </div >
            </div >
            <div className="nanhai">
                <img src={nanhaiIcon} alt="" />
            </div>
        </div >
    );
};

export default China3Dmap;
