/**
 * Role
 */
export interface Role {
  /**
   * 创建时间
   */
  createTime?: number;
  /**
   * 创建者
   */
  creator?: number;
  /**
   * 角色描述
   */
  description?: string;
  /**
   * 关联权限 ID
   */
  funcPermissionId?: number;
  /**
   * 角色 ID
   */
  id?: number;
  /**
   * 角色名称
   */
  name?: string;
  /**
   * 更新时间
   */
  updateTime?: number;
}

export interface RoleResponse {
  list: Role[];
  _meta: {
    currentPage: number;
    perPage: number;
    totalCount: number;
    totalPages: number;
  };
}
