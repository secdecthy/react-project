import { useState } from "react";
import { Upload, message } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { uploadUrl, dalImg } from "../NET/tools";

function beforeUpload(file) {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt10M = file.size / 1024 / 1024 < 10;
  if (!isLt10M) {
    message.error("Image must smaller than 10MB!");
  }
  return isJpgOrPng && isLt10M;
}
//使用父组件Products.jsx传入的方法和参数
function MyUpload({ imageUrl, setImageUrl }) {
  const [loading, setLoading] = useState(false);

  const handleChange = (info) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      console.log(info);
      console.log(info.file.response.data);
      setLoading(false);
      setImageUrl(info.file.response.data);
    }
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <Upload
      name="file"
      listType="picture-card"
      className="avatar-uploader"
      showUploadList={false}
      action={uploadUrl}
      beforeUpload={beforeUpload}
      onChange={handleChange}
    >
      {imageUrl ? (
        <img src={dalImg(imageUrl)} alt="avatar" style={{ width: "100%" }} />
      ) : (
        uploadButton
      )}
    </Upload>
  );
}

export default MyUpload;
