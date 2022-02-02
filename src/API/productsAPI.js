import { get, post, put, del } from "../NET/request";

// 获取列表
export const getProductAPI = (params) => get("/api/v1/admin/product", params);

// 根据id获取商品详情
export const getProductByIdAPI = (id) => get("/api/v1/admin/product/" + id, {});

// 新增
export const addProductAPI = (data) => post("/api/v1/admin/product", data);

// 根据id修改
export const editProductByIdAPI = (id, data) =>
  put("/api/v1/admin/product/" + id, data);

// 根据id删除
export const delProductByIdAPI = (id) => del("/api/v1/admin/product/" + id);
