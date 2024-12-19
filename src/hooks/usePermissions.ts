import { useEffect, useState } from "react";
import axios from "@/lib/axios.ts";
import {useUser} from "@clerk/clerk-react";

export type Permission = {
  id: number;
  userId: string;
  permission: string;
  createdAt: string;
  updatedAt: string;
}

const usePermissions = () => {
  const { user } = useUser();
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const permissionsKey = `${user?.id}-permissions`;
  const permissionsCacheTimeKey = `${user?.id}-permissions-cache-time`;

  useEffect(() => {
    const fetchPermissions = async () => {
      const cachedPermissions = localStorage.getItem(permissionsKey);
      const cacheTime = localStorage.getItem(permissionsCacheTimeKey);

      if (cachedPermissions && cacheTime && (Date.now() - parseInt(cacheTime)) < 15 * 60 * 1000) {
        setPermissions(JSON.parse(cachedPermissions));
      } else {
        try {
          const res = await axios.get('/user/permissions');
          const fetchedPermissions = res.data.permissions || [];
          setPermissions(fetchedPermissions);
          localStorage.setItem(permissionsKey, JSON.stringify(fetchedPermissions));
          localStorage.setItem(permissionsCacheTimeKey, Date.now().toString());
        } catch (error) {
          console.error("Failed to fetch permissions", error);
        }
      }
    };

    fetchPermissions().then();
  }, []);

  const can = (permission: string) => {
    return permissions.some(p => p.permission === permission);
  };

  return { permissions, can };
};

export default usePermissions;