import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import * as _ from 'lodash-es';
import Login from './Login';
import HomePage from './Home';
import { useNavigate } from '@umijs/max';

const realScreenWidth = 4096;
const IndexRouter = () => {
    const navigate = useNavigate();
    // 确保在组件渲染时设置rem单位
    const setRemUnit = () => {
        console.log('窗口分辨率变化');
        const baseSize = 16; // 你希望的基准字体大小
        const clientWidth = document.documentElement.clientWidth || window.innerWidth;
        document.documentElement.style.fontSize = (clientWidth / realScreenWidth) * baseSize + 'px';
    };
    useEffect(() => {
        setRemUnit();
        // 监听窗口调整事件
        window.addEventListener('resize', setRemUnit);
    }, []);

    useEffect(() => {
        if (!localStorage.getItem('user-logined')) {
            // 代表没登录，跳到登录页
            navigate(`/login`, { replace: true });
        } else {
            // 代表登录了，显示主页面
            navigate(`/home`, { replace: true });
        }
    }, []);
    return (
        <Routes>
            <Route
                path="/"
                element={
                    <Login />
                }
            />
            <Route
                path="/login"
                element={
                    <Login />
                }
            />
            <Route
                path="/home"
                element={
                    <HomePage />
                }
            />
        </Routes>
    );
};
export default IndexRouter;
