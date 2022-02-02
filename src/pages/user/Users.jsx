import { useEffect, useState } from "react";
import {
  PlusOutlined,
  SearchOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import {
  Card,
  Table,
  Form,
  Input,
  Button,
  Space,
  Select,
  Popconfirm,
  InputNumber,
} from "antd";
//引入弹出层
import Modal from "antd/lib/modal/Modal";
// 引入图片路径处理
import { dalImg } from "../../NET/tools";

import MyUpload from "../../components/MyUpload";
// 引入用户API
import {
  getUsersAPI,
  addUserAPI,
  editUserByIdAPI,
  delUserByIdAPI,
} from "../../API/usersAPI";

function Users() {
  // 定义用户列表
  const [list, setlist] = useState();
  // 定义用户总数，初始为0
  const [total, setTotal] = useState(0);
  // 定义query查询条件, 初始为空
  const [query, setQuery] = useState({});
  // 定义弹出层是否显示
  const [isShow, setIsShow] = useState(false);
  // 当currentId为-1时，新增，当currentId>0时，修改
  const [currentId, setCurrentId] = useState(-1);
  // 图片路径
  const [imageUrl, setImageUrl] = useState("");
  // 定义表单
  const [editForm] = Form.useForm();

  // 监听query查询条件，获取用户信息
  useEffect(() => {
    getUsersAPI().then((res) => {
      console.log(res.data);
      setlist(res.data.data);
      setTotal(res.data.total);
    });
  }, [query]);

  // 监听isShow弹出层显示
  useEffect(() => {
    // 弹出层隐藏时，重置为新增currentId(-1)，重置查询条件
    if (!isShow) {
      setImageUrl("");
      setCurrentId(-1);
      setQuery({});
    }
  }, [isShow]);

  const columns = [
    {
      title: "序号",
      align: "center",
      width: 100,
      render(d, r, i) {
        return i + 1;
      },
    },

    {
      title: "头像",
      width: 160,
      align: "center",
      render(v) {
        return (
          <img
            style={{ width: "100px", maxHeight: "120px" }}
            src={dalImg(v.avatar)}
            alt={v.userName}
          />
        );
      },
    },

    { title: "用户名", align: "center", dataIndex: "userName" },

    { title: "昵称", align: "center", dataIndex: "nickName" },

    {
      title: "操作",
      width: 160,
      align: "center",
      render(v) {
        return (
          <Space>
            <Button
              icon={<EditOutlined />}
              type="primary"
              onClick={async () => {
                console.log(v);
                setIsShow(true); // 弹窗
                setCurrentId(v.id); // 设置当前id，修改操作的标识位
                setImageUrl(v.avatar + "");
                editForm.setFieldsValue({
                  ...v,
                }); // 初始化表单的数据
              }}
            />
            <Popconfirm
              title="是否确认删除此项"
              okText="是"
              cancelText="否"
              onConfirm={async () => {
                // 调接口
                await delUserByIdAPI(v.id + "");
                setQuery({}); // 重置查询条件
              }}
            >
              <Button type="danger" icon={<DeleteOutlined />} />
            </Popconfirm>
          </Space>
        );
      },
    },
  ];

  return (
    <Card
      title="用户信息"
      style={{ height: "100%", overflow: "auto" }}
      extra={
        <>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setIsShow(true)}
          />
        </>
      }
    >
      <Form
        layout="inline"
        style={{ marginBottom: "16px" }}
        onFinish={async (v) => {
          console.log(v);
          const res = await getUsersAPI(v);
          console.log(res.data.data);
          setlist(res.data.data);
        }}
      >
        <Form.Item name="userName" label="用户名">
          <Input placeholder="请输入关键字" />
        </Form.Item>

        <Form.Item name="nickName" label="昵称">
          <Input placeholder="请输入关键字" />
        </Form.Item>

        <Form.Item>
          <Button htmlType="submit" icon={<SearchOutlined />} type="primary" />
        </Form.Item>
      </Form>

      <Table
        dataSource={list}
        columns={columns}
        rowKey="id"
        bordered={true}
        pagination={{
          total,
          showSizeChanger: false,
          onChange(page) {
            setQuery({ ...query, page });
          },
        }}
      ></Table>

      <Modal
        title="编辑"
        visible={isShow}
        onCancel={() => setIsShow(false)}
        maskClosable={false}
        destroyOnClose={true}
        cancelText="取消"
        okText="保存"
        onOk={() => {
          editForm.submit(); // 触发表单的提交
        }}
      >
        <Form
          form={editForm}
          preserve={false}
          labelCol={{ span: 3 }}
          onFinish={async (v) => {
            // 表单的提交
            console.log(v);
            // currentId == -1为新增
            if (currentId == -1) {
              console.log(imageUrl);
              await addUserAPI({
                ...v,
                avatar: imageUrl,
              });
            } else {
              // 修改
              await editUserByIdAPI(currentId + "", {
                ...v,
                avatar: imageUrl,
              });
            }
            setIsShow(false);
          }}
        >
          <Form.Item
            label="用户名"
            name="userName"
            rules={[{ required: true, message: "用户名不能为空" }]}
          >
            <Input placeholder="请输入用户名" />
          </Form.Item>

          {currentId == -1 ? (
            <Form.Item
              label="密码"
              name="password"
              rules={[{ required: true, message: "密码不能为空" }]}
            >
              <Input placeholder="请输入密码" />
            </Form.Item>
          ) : null}

          <Form.Item label="昵称" name="nickName">
            <Input placeholder="请输入昵称" />
          </Form.Item>

          <Form.Item label="头像">
            <MyUpload imageUrl={imageUrl} setImageUrl={setImageUrl} />
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
}

export default Users;
