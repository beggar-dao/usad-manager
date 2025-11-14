import { request } from "@umijs/max";

export const login = (data: any) => {
  return request("/user/auth", {
    method: "post",
    data,
  });
};

export const userRealName = (data: any) => {
  return request("/user/real-name", {
    method: "get",
    params: data,
  });
};

export const userRealNameDetail = (data: any) => {
  return request(`/user/real-name/get/${data.id}`, {
    method: "get",
    params: data,
  });
};

export const userRealNameAudit = (data: any) => {
  return request(`/user/real-name/audit`, {
    method: "post",
    data,
  });
};

export const userBusinessRealName = (data: any) => {
  return request("/user/business/real-name", {
    method: "get",
    params: data,
  });
};

export const userBusinessRealNameDetail = (data: any) => {
  return request(`/user/business/real-name/get/${data.id}`, {
    method: "get",
    params: data,
  });
};

export const userBusinessRealNameAudit = (data: any) => {
  return request(`/user/business/real-name/audit`, {
    method: "post",
    data,
  });
};

export const userBusinessRealNameMember = (data: any) => {
  return request(`/user/business/real-name/member`, {
    method: "get",
    params: data,
  });
};

export const userBusinessRealNameMemberAudit = (data: any) => {
  return request(`/user/business/real-name/member/audit`, {
    method: "post",
    data,
  });
};

export const userBusinessRealNameMemberAuditDetail = (data: any) => {
  return request(`/user/business/real-name/member/${data.id}`, {
    method: "get",
    params: data,
  });
};

export const bankList = (data: any) => {
  return request(`/wallet/payment/bank`, {
    method: "get",
    params: data,
  });
};

export const transactionList = (data: any) => {
  return request(`/wallet/account/transaction`, {
    method: "get",
    params: data,
  });
};

export const bankAudit = (data: any) => {
  return request(`/wallet/payment/bank/audit`, {
    method: "post",
    data,
  });
};

export const transferList = (data: any) => {
  return request(`/wallet/account/transaction`, {
    method: "get",
    params: data,
  });
};

export const transferAudit = (data: any) => {
  return request(`/wallet/account/transaction/review`, {
    method: "post",
    data,
  });
};
