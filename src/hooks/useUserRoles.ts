import { useRequest } from '@umijs/max';
import { getRoles } from '@/services/role';
import type { Role } from '@/services/types/role';

interface UseUserRolesResult {
  roles: Role[] | undefined;
  loading: boolean;
  getRoleById: (id: number) => Role | undefined;
  roleOptions: { label: string; value: number }[];
}

export function useUserRoles(): UseUserRolesResult {
  const { data, loading } = useRequest(() => getRoles(), {
    formatResult: (response) => response.data?.list ?? [],
  });

  const getRoleById = (id: number): Role | undefined => {
    return data?.find((role: Role) => role.id === id);
  };

  const roleOptions =
    data?.map((role: Role) => ({
      label: role.name || '',
      value: role.id!,
    })) || [];

  return {
    roles: data,
    loading,
    getRoleById,
    roleOptions,
  };
}
