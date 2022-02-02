import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  SearchOutlined,
} from "@ant-design/icons";

import { Button, Card, Form, Input, Popconfirm, Space, Table } from "antd";

import Modal from "antd/lib/modal/Modal";

import { useEffect, useState } from "react";

import {
  getBannersAPI,
  addBannerAPI,
  editBannerByIdAPI,
  delBannerByIdAPI,
} from "../../API/bannersAPI";

import { dalImg } from "../../NET/tools";
import MyUpload from "../../components/MyUpload";

function Banners() {
  // 定义列表
  const [list, setlist] = useState();
  // 定义总数，初始为0
  const [total, setTotal] = useState(0);
  // 定义query查询条件, name page,初始为空
  const [query, setQuery] = useState({});
  // 定义弹出层是否显示
  const [isShow, setIsShow] = useState(false);
  // 定义表单
  const [editForm] = Form.useForm();
  // 当currentId为-1时，新增，当currentId>0时，修改
  const [currentId, setCurrentId] = useState(-1);

  const [imageUrl, setImageUrl] = useState("");

  // 监听query查询条件，获取轮播图
  useEffect(() => {
    getBannersAPI(query).then((res) => {
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
      render(d, r, i) {
        return i + 1;
      },
      align: "center",
      width: 80,
    },
    {
      title: "名字",
      align: "center",
      dataIndex: "name",
    },
    {
      title: "主图",
      align: "center",
      render(v) {
        return (
          <img
            style={{ width: "80%", maxHeight: "120px" }}
            alt={v.name}
            src={dalImg(v.coverImage)}
          />
        );
      },
    },
    {
      title: "操作",
      align: "center",
      width: 120,
      render(v) {
        return (
          <Space>
            <Button
              type="primary"
              icon={<EditOutlined />}
              onClick={() => {
                setCurrentId(v.id);
                setIsShow(true);
                setImageUrl(v.coverImage); // 设置一下当前主图的图片
                editForm.setFieldsValue(v); // 设置表单的数据
              }}
            />
            <Popconfirm
              title="是否确认删除此项"
              okText="是"
              cancelText="否"
              onConfirm={async () => {
                // 调接口
                await delBannerByIdAPI(v.id + "");
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
      title="轮播图"
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
        onFinish={(v) => {
          setQuery({ page: 1, ...v });
        }}
      >
        <Form.Item name="name" label="轮播图">
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
              await addBannerAPI({
                ...v,
                coverImage: imageUrl,
              });
            } else {
              // 修改
              await editBannerByIdAPI(currentId + "", {
                ...v,
                coverImage: imageUrl,
              });
            }
            setIsShow(false);
          }}
        >
          <Form.Item
            label="名字"
            name="name"
            rules={[{ required: true, message: "名字不能为空" }]}
          >
            <Input placeholder="请输入名字" />
          </Form.Item>

          <Form.Item label="简介" name="desc">
            <Input.TextArea placeholder="请输入简介" />
          </Form.Item>

          <Form.Item label="主图">
            <MyUpload imageUrl={imageUrl} setImageUrl={setImageUrl} />
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
}

export default Banners;
