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
// 引入商品API
import {
  getProductAPI,
  getProductByIdAPI,
  addProductAPI,
  editProductByIdAPI,
  delProductByIdAPI,
} from "../../API/productsAPI";
//获取商品分类
import { getCategoryAPI } from "../../API/categoriesAPI";
import MyUpload from "../../components/MyUpload";

function products() {
  // 定义商品列表
  const [list, setlist] = useState();
  // 定义商品总数，初始为0
  const [total, setTotal] = useState(0);
  // 定义query查询条件, name page,初始为空
  const [query, setQuery] = useState({});
  // 定义弹出层是否显示
  const [isShow, setIsShow] = useState(false);
  const [editForm] = Form.useForm();
  // 商品分类
  const [categories, setCategories] = useState([]);
  // 当currentId为-1时，新增，当currentId>0时，修改
  const [currentId, setCurrentId] = useState(-1);
  // 图片路径
  const [imageUrl, setImageUrl] = useState("");

  // 初始化时，获取所有商品分类
  useEffect(() => {
    getCategoryAPI().then((res) => {
      // console.log(res.data.data);
      setCategories(res.data.data);
    });
  }, []);

  // 监听query查询条件，获取商品
  useEffect(() => {
    getProductAPI(query).then((res) => {
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
      width: 60,
      render(d, r, i) {
        return i + 1;
      },
    },

    {
      title: "图片",
      width: 140,
      align: "center",
      render(v) {
        return (
          <img
            style={{ width: "100px", maxHeight: "120px" }}
            src={dalImg(v.coverImage)}
            alt={v.name}
          />
        );
      },
    },

    { title: "商品名", align: "center", dataIndex: "name" },

    {
      title: "分类",
      align: "center",
      width: 120,
      render(v) {
        return v.category?.name || "暂无";
      },
    },

    { title: "价格", align: "center", dataIndex: "price", width: 80 },

    {
      title: "库存",
      align: "center",
      dataIndex: "amount",
      width: 80,
    },

    {
      title: "操作",
      align: "center",
      render(v) {
        return (
          <Space>
            <Button
              icon={<EditOutlined />}
              type="primary"
              onClick={async () => {
                const res = await getProductByIdAPI(v.id + ""); // 根据id获取数据
                console.log(res.data);
                setIsShow(true); // 弹窗
                setCurrentId(v.id); // 设置当前id，修改操作的标识位
                setImageUrl(v.coverImage + "");
                editForm.setFieldsValue({
                  ...res.data,
                  category: res.data.category?.id,
                }); // 初始化表单的数据
              }}
            />
            <Popconfirm
              title="是否确认删除此项"
              okText="是"
              cancelText="否"
              onConfirm={async () => {
                // 调接口
                await delProductByIdAPI(v.id + "");
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
      title="商品信息"
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
        <Form.Item name="name" label="商品名字">
          <Input placeholder="请输入商品名字" />
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
              await addProductAPI({
                ...v,
                coverImage: imageUrl,
              });
            } else {
              // 修改
              await editProductByIdAPI(currentId + "", {
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
            rules={[{ required: true, message: "商品名字不能为空" }]}
          >
            <Input placeholder="请输入商品名字" />
          </Form.Item>

          <Form.Item name="category" label="商品分类">
            <Select>
              {categories.map((item) => (
                <Select.Option key={item.id} value={item.id}>
                  {item.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item label="主图">
            <MyUpload imageUrl={imageUrl} setImageUrl={setImageUrl} />
          </Form.Item>

          <Form.Item label="价格" name="price">
            <InputNumber
              prefix="￥"
              placeholder="请输入商品价格"
              style={{ width: "100%" }}
            />
          </Form.Item>

          <Form.Item label="库存" name="amount">
            <InputNumber
              placeholder="请输入商品库存"
              style={{ width: "100%" }}
            />
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
}

export default products;
