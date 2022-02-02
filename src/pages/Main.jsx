import React, { useState } from "react";
import { Route, useHistory } from "react-router-dom";
import { Layout, Menu } from "antd";
import {
  HomeOutlined,
  AppstoreOutlined,
  UserOutlined,
  PictureOutlined,
} from "@ant-design/icons";

import "../style/logo.css";
import Home from "./Home";
import Users from "./user/Users";
import Products from "./product/Products";
import Category from "./product/Category";
import Banners from "./banner/Banners";

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

function Main() {
  const [collapsed, setCollapsed] = useState(false);
  const { push } = useHistory();
  return (
    <Layout style={{ height: "100vh", overflow: "hidden" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={() => {
          setCollapsed(!collapsed);
        }}
      >
        <div className="logo">MZ</div>
        <Menu
          theme="dark"
          defaultSelectedKeys={["/admin"]}
          mode="inline"
          onClick={({ key }) => {
            push(key);
          }}
        >
          <Menu.Item key="/admin" icon={<HomeOutlined />}>
            主视图
          </Menu.Item>

          <Menu.Item key="/admin/users" icon={<UserOutlined />}>
            用户管理
          </Menu.Item>

          <SubMenu key="sub2" icon={<AppstoreOutlined />} title="商品管理">
            <Menu.Item key="/admin/products">商品信息</Menu.Item>
            <Menu.Item key="/admin/product/category">商品分类</Menu.Item>
          </SubMenu>

          <Menu.Item key="/admin/banners" icon={<PictureOutlined />}>
            轮播图
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }} />

        <Content style={{ margin: "0 16px" }}>
          <Route path="/admin" exact>
            <Home />
          </Route>
          <Route path="/admin/users">
            <Users />
          </Route>
          <Route path="/admin/products">
            <Products />
          </Route>
          <Route path="/admin/product/category">
            <Category />
          </Route>
          <Route path="/admin/banners">
            <Banners />
          </Route>
        </Content>

        <Footer style={{ textAlign: "center" }}>
          react-project ©2022 Created by MZ
        </Footer>
      </Layout>
    </Layout>
  );
}

export default Main;
