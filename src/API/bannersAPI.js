import { get, post, put, del } from "../NET/request";

// 获取列表
export const getBannersAPI = (params) => get("/api/v1/admin/banner", params);

// 新增
/***
url
	/api/v1/admin/banner
method
	post
parmas
	category，name，link，url，desc，coverImage
 */
export const addBannerAPI = (data) => post("/api/v1/admin/banner", data);

// 根据id获取轮播图
export const getBannerByIdAPI = (id) => get("/api/v1/admin/banner/" + id, {});

// 根据id修改
export const editBannerByIdAPI = (id, data) =>
  put("/api/v1/admin/banner/" + id, data);

// 根据id删除
export const delBannerByIdAPI = (id) => del("/api/v1/admin/banner/" + id);
