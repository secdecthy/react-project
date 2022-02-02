export const serverUrl = "http://localhost:1337";
// 基址
export const uploadUrl = serverUrl + "/api/v1/common/upload_file";
// 上传文件地址

// 设置token
export const setToken = (token) => sessionStorage.setItem("token", token);
// 获取token
export const getToken = () => sessionStorage.getItem("token");
// 移除token
export const removeToken = () => sessionStorage.removeItem("token");

// 处理图片路径
export const dalImg = (url) => {
  if (url) {
    if (url.startsWith("http")) {
      return url;
    }
    return serverUrl + url;
  }
  return "https://img0.baidu.com/it/u=1658053502,2325281247&fm=253&fmt=auto&app=138&f=JPEG?w=395&h=500";
};
