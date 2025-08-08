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
