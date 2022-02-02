import { get, post, put, del } from "../NET/request";

//  获取列表
export const getCategoryAPI = (params) =>
  get("/api/v1/admin/productcategory", params);

//  新增
export const addCategoryAPI = (data) =>
  post("/api/v1/admin/productcategory", data);

//  根据id修改
export const editCategoryByIdAPI = (id, data) =>
  put("/api/v1/admin/productcategory/" + id, data);

//  根据id删除
export const delCategoryByIdAPI = (id) =>
  del("/api/v1/admin/productcategory/" + id);
