import { copyText } from "@/utils";
import { CheckOutlined, CopyOutlined } from "@ant-design/icons";
import { message } from "antd";
import { useState } from "react";

export default function CopyComponent({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    copyText(text).then((success) => {
      if (success) {
        setCopied(true);
        message.success("Copied");
        setTimeout(() => setCopied(false), 2000);
      } else {
        message.error("Copy failed");
      }
    });
  };
  return (
    <span onClick={handleCopy} className="cursor-pointer">
      {copied ? <CheckOutlined /> : <CopyOutlined />}
    </span>
  );
}
