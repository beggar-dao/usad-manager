const { ethers } = require("ethers");
console.log(ethers);
/**
 * 简单复制文本函数
 * @param text 要复制的文本
 */
export function copyText(text: string): Promise<boolean> {
  // 现代浏览器使用 Clipboard API
  if (navigator.clipboard) {
    return navigator.clipboard
      .writeText(text)
      .then(() => true)
      .catch(() => false);
  }

  // 兼容旧浏览器
  try {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.style.position = "fixed";
    textarea.style.left = "-9999px";
    document.body.appendChild(textarea);
    textarea.select();
    const success = document.execCommand("copy");
    document.body.removeChild(textarea);
    return Promise.resolve(success);
  } catch (error) {
    return Promise.resolve(false);
  }
}

/**
 * 截取字符串，保留前n位和后m位，中间用指定字符替换
 * @param str - 需要处理的字符串
 * @param prefixLength - 前缀保留长度，默认为4
 * @param suffixLength - 后缀保留长度，默认为8
 * @param replaceChar - 替换字符，默认为'*'
 * @returns 处理后的字符串
 */
export function maskString(
  str: string,
  prefixLength: number = 4,
  suffixLength: number = 8
): string {
  if (!str) return "";
  // 如果字符串长度小于等于前后保留长度之和，则直接返回原字符串
  if (str.length <= prefixLength + suffixLength) {
    return str;
  }

  // 截取前缀和后缀部分
  const prefix = str.substring(0, prefixLength);
  const suffix = str.substring(str.length - suffixLength);

  // 生成中间的替换字符
  const mask = "...";

  // 拼接结果
  return prefix + mask + suffix;
}

// 将wei转换为ether
export function weiToEther(wei: any) {
  return (wei && ethers.formatEther(`${wei || ""}`)) || "";
}

// 将ether转换为wei 大单位转小单位
export function etherToWei(ether: any) {
  return (ether && ethers.parseEther(`${ether || ""}`)) || "";
}
