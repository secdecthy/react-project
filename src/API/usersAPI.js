import { get, post, put, del } from "../NET/request";

// 获取用户列表
export const getUsersAPI = (params) => get("/api/v1/admin/user", params);

// 根据id获取商品详情
export const getUserByIdAPI = (id) => get("/api/v1/admin/user" + id, {});

/** 新增（新用户注册）
 * @param {*} data userName	用户名(必填) assword	密码(必填)
 */
export const addUserAPI = (data) => post("/api/v1/auth/reg", data);

// 根据id修改
export const editUserByIdAPI = (id, data) =>
  put("/api/v1/admin/user/" + id, data);

// 根据id删除
export const delUserByIdAPI = (id) => del("/api/v1/admin/user/" + id);
