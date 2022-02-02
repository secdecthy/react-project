import { post } from "../NET/request";
// 登录
export const loginAPI = (data) => post("/api/v1/auth/manager_login", data);
