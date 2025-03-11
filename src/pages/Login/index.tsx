import { Button, Form, Input, message } from 'antd';
import { useEffect } from 'react';
import styles from './index.less';
import bg1 from '@/assets/login/lbx.png';
import bg2 from '@/assets/login/jt.png';
import bg3 from '@/assets/login/map.png';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { subTitle, title } from '../Header';
import { useNavigate } from '@umijs/max';


const LoginPage: React.FC<any> = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = (values: any) => {
    const { userName, password } = values;
    if (userName === 'shanwenlv') {
      if (password === 'SWL2025') {
        message.destroy();
        message.success('登录成功');
        localStorage.setItem('user-logined', 'true');
        setTimeout(() => {
          navigate(`/home`, { replace: true });
          window.location.reload();
        }, 300);
      } else {
        message.destroy();
        message.error('密码错误', 5);
      }
    } else {
      message.destroy();
      message.error('账号错误', 5);
    }
  };

  return (
    <div className={`flex-box-center ${styles.loginPage}`}>
      <div className="login-map1 rotationBox"><img src={bg1} /></div>
      <div className="login-map2 rotationReserveBox"><img src={bg2} /></div>
      <div className="login-map3"><img src={bg3} /></div>
      <div className="login-title">
        {title}
        <div className='login-title-sub'>{subTitle}</div>
      </div>
      <Form
        name="basic"
        form={form}
        onFinish={onFinish}
        autoComplete="off"
        layout="vertical"
      >
        <Form.Item
          label=""
          name="userName"
          rules={[{ required: true, message: '请输入用户名!' }]}
        >
          <Input prefix={<UserOutlined />} size="large" />
        </Form.Item>

        <Form.Item
          label=""
          name="password"
          rules={[{ required: true, message: '请输入正确的密码!' }]}
        >
          <Input.Password prefix={<LockOutlined />} size="large" />
        </Form.Item>

        {/* <Form.Item name="remember" valuePropName="checked">
          <Checkbox>Remember me</Checkbox>
        </Form.Item> */}
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            block
          >
            登录
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginPage;
