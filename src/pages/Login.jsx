import { Form, Input, Button, Checkbox, Row, Col, message } from "antd";
import { useHistory } from "react-router-dom";
// import jpg2022 from "../img/2022.jpg";

import { loginAPI } from "../API/loginAPI";
import { setToken } from "../NET/tools";

function Login() {
  const { replace } = useHistory();

  const onFinish = async (values) => {
    const res = await loginAPI(values);
    console.log(res.data);
    if (res.data.code == 1) {
      setToken(res.data.data);
      message.success("登录成功");
      replace("/admin");
    } else {
      message.error(res.data.data);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div style={{ position: "relative" }}>
      {/* <img
        src={jpg2022}
        alt=""
        style={{ position: "absolute", width: "100vw", height: "100vh" }}
      /> */}
      <Row style={{ paddingTop: "5vh" }}>
        <Col span={10} offset={5}>
          <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="用户名"
              name="userName"
              rules={[
                {
                  required: true,
                  message: "请输入用户名!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="密码"
              name="password"
              rules={[
                {
                  required: true,
                  message: "请输入密码!",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              name="remember"
              valuePropName="checked"
              wrapperCol={{ offset: 8, span: 16 }}
            >
              <Checkbox>保存密码</Checkbox>
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="primary" htmlType="submit">
                登录
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </div>
  );
}

export default Login;
