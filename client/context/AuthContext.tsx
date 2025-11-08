import React, { createContext, useContext, useState } from "react";

export type PredefinedRole =
  | "admin"
  | "approval"
  | "writer"
  | "user"
  | "support";
export type Role = PredefinedRole | string;

export interface Permission {
  create: boolean;
  read: boolean;
  update: boolean;
  delete: boolean;
  publish: boolean;
  approve: boolean;
  manageUsers: boolean;
  manageRoles: boolean;
  viewAnalytics: boolean;
  supportChat: boolean;
}

export interface CustomRole {
  id: string;
  name: string;
  description?: string;
  permissions: Permission;
  isPredefined: boolean;
  parentRoleId?: string;
  createdAt: Date;
}

export interface User {
  id: string;
  name: string;
  email: string;
  roles: Role[];
  activeRole: Role;
  permissions: Permission;
  avatar?: string;
  createdAt: Date;
  isActive: boolean;
}

interface AuthContextType {
  currentUser: User | null;
  login: (email: string, password: string) => void;
  signup: (name: string, email: string, password: string) => void;
  logout: () => void;
  updateUserRole: (userId: string, newRole: Role) => void;
  addRoleToUser: (userId: string, roleId: Role) => void;
  removeRoleFromUser: (userId: string, roleId: Role) => void;
  switchActiveRole: (userId: string, roleId: Role) => void;
  updateUserPermissions: (userId: string, permissions: Permission) => void;
  hasPermission: (permission: keyof Permission) => boolean;
  canCreateContent: () => boolean;
  canApproveContent: () => boolean;
  canManageUsers: () => boolean;
  canSeeAnalytics: () => boolean;
  allUsers: User[];
  setCurrentUser: (user: User | null) => void;
  customRoles: CustomRole[];
  addCustomRole: (
    name: string,
    description: string,
    permissions: Permission,
    parentRoleId?: string,
  ) => void;
  editCustomRole: (
    roleId: string,
    name: string,
    description: string,
    permissions: Permission,
    parentRoleId?: string,
  ) => void;
  deleteCustomRole: (roleId: string) => void;
  getRoleDetails: (roleId: string) => CustomRole | undefined;
  getUsersByRole: (roleId: string) => User[];
  getRoleHierarchy: () => Map<string, CustomRole[]>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const defaultPermissions: Permission = {
  create: false,
  read: true,
  update: false,
  delete: false,
  publish: false,
  approve: false,
  manageUsers: false,
  manageRoles: false,
  viewAnalytics: false,
  supportChat: true,
};

const predefinedRoles: Record<PredefinedRole, Permission> = {
  admin: {
    create: true,
    read: true,
    update: true,
    delete: true,
    publish: true,
    approve: true,
    manageUsers: true,
    manageRoles: true,
    viewAnalytics: true,
    supportChat: true,
  },
  approval: {
    create: false,
    read: true,
    update: false,
    delete: false,
    publish: false,
    approve: true,
    manageUsers: false,
    manageRoles: false,
    viewAnalytics: false,
    supportChat: true,
  },
  writer: {
    create: true,
    read: true,
    update: true,
    delete: true,
    publish: true,
    approve: false,
    manageUsers: false,
    manageRoles: false,
    viewAnalytics: false,
    supportChat: true,
  },
  user: {
    create: false,
    read: true,
    update: false,
    delete: false,
    publish: false,
    approve: false,
    manageUsers: false,
    manageRoles: false,
    viewAnalytics: false,
    supportChat: true,
  },
  support: {
    create: false,
    read: true,
    update: false,
    delete: false,
    publish: false,
    approve: false,
    manageUsers: false,
    manageRoles: false,
    viewAnalytics: false,
    supportChat: true,
  },
};

const createPredefinedRoles = (): CustomRole[] => [
  {
    id: "admin",
    name: "Admin",
    description: "Full access to all features and management",
    permissions: predefinedRoles.admin,
    isPredefined: true,
    createdAt: new Date(),
  },
  {
    id: "writer",
    name: "Writer",
    description: "Can create, edit, and publish content",
    permissions: predefinedRoles.writer,
    isPredefined: true,
    createdAt: new Date(),
  },
  {
    id: "approval",
    name: "Approval",
    description: "Can approve or reject content",
    permissions: predefinedRoles.approval,
    isPredefined: true,
    createdAt: new Date(),
  },
  {
    id: "support",
    name: "Support",
    description: "Can provide support and chat",
    permissions: predefinedRoles.support,
    isPredefined: true,
    createdAt: new Date(),
  },
  {
    id: "user",
    name: "User",
    description: "Basic read-only access",
    permissions: predefinedRoles.user,
    isPredefined: true,
    createdAt: new Date(),
  },
];

const mockUsers: User[] = [
  {
    id: "1",
    name: "Karan Jain",
    email: "karan@skillsenhance.com",
    roles: ["admin", "writer"],
    activeRole: "admin",
    permissions: predefinedRoles.admin,
    avatar: "KJ",
    createdAt: new Date("2024-01-01"),
    isActive: true,
  },
  {
    id: "2",
    name: "Sarah Writer",
    email: "sarah@skillsenhance.com",
    roles: ["writer"],
    activeRole: "writer",
    permissions: predefinedRoles.writer,
    avatar: "SW",
    createdAt: new Date("2024-01-15"),
    isActive: true,
  },
  {
    id: "3",
    name: "John Approver",
    email: "john@skillsenhance.com",
    roles: ["approval", "support"],
    activeRole: "approval",
    permissions: predefinedRoles.approval,
    avatar: "JA",
    createdAt: new Date("2024-01-20"),
    isActive: true,
  },
  {
    id: "4",
    name: "Mike Support",
    email: "mike@skillsenhance.com",
    roles: ["support"],
    activeRole: "support",
    permissions: predefinedRoles.support,
    avatar: "MS",
    createdAt: new Date("2024-02-01"),
    isActive: true,
  },
  {
    id: "5",
    name: "Alice User",
    email: "alice@skillsenhance.com",
    roles: ["user"],
    activeRole: "user",
    permissions: predefinedRoles.user,
    avatar: "AU",
    createdAt: new Date("2024-02-10"),
    isActive: true,
  },
];

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(mockUsers[0]);
  const [allUsers, setAllUsers] = useState<User[]>(mockUsers);
  const [customRoles, setCustomRoles] = useState<CustomRole[]>(
    createPredefinedRoles(),
  );

  const login = (email: string, password: string) => {
    const user = allUsers.find((u) => u.email === email);
    if (user) {
      setCurrentUser(user);
    }
  };

  const signup = (name: string, email: string, password: string) => {
    const newUser: User = {
      id: `user-${Date.now()}`,
      name,
      email,
      roles: ["user"],
      activeRole: "user",
      permissions: predefinedRoles.user,
      avatar: name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2),
      createdAt: new Date(),
      isActive: true,
    };
    setAllUsers((users) => [...users, newUser]);
    setCurrentUser(newUser);
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const hasPermission = (permission: keyof Permission): boolean => {
    if (!currentUser) return false;
    return currentUser.permissions[permission] === true;
  };

  const canCreateContent = (): boolean => {
    return hasPermission("create");
  };

  const canApproveContent = (): boolean => {
    return hasPermission("approve");
  };

  const canManageUsers = (): boolean => {
    return hasPermission("manageUsers");
  };

  const canSeeAnalytics = (): boolean => {
    return hasPermission("viewAnalytics");
  };

  const getPermissionsForRole = (roleId: string): Permission => {
    const role = customRoles.find((r) => r.id === roleId);
    if (role) {
      return role.permissions;
    }
    if (predefinedRoles[roleId as PredefinedRole]) {
      return predefinedRoles[roleId as PredefinedRole];
    }
    return defaultPermissions;
  };

  const updateUserRole = (userId: string, newRole: Role) => {
    const permissions = getPermissionsForRole(newRole);
    setAllUsers((users) =>
      users.map((user) =>
        user.id === userId
          ? {
              ...user,
              roles: [newRole],
              activeRole: newRole,
              permissions,
            }
          : user,
      ),
    );
  };

  const addRoleToUser = (userId: string, roleId: Role) => {
    setAllUsers((users) =>
      users.map((user) =>
        user.id === userId && !user.roles.includes(roleId)
          ? { ...user, roles: [...user.roles, roleId] }
          : user,
      ),
    );
  };

  const removeRoleFromUser = (userId: string, roleId: Role) => {
    setAllUsers((users) =>
      users.map((user) => {
        if (user.id === userId && user.roles.includes(roleId)) {
          const newRoles = user.roles.filter((r) => r !== roleId);
          const newActiveRole =
            user.activeRole === roleId && newRoles.length > 0
              ? newRoles[0]
              : user.activeRole;
          return {
            ...user,
            roles: newRoles,
            activeRole: newActiveRole,
          };
        }
        return user;
      }),
    );
  };

  const switchActiveRole = (userId: string, roleId: Role) => {
    const permissions = getPermissionsForRole(roleId);
    setAllUsers((users) =>
      users.map((user) =>
        user.id === userId && user.roles.includes(roleId)
          ? { ...user, activeRole: roleId, permissions }
          : user,
      ),
    );
    if (currentUser?.id === userId) {
      setCurrentUser((user) =>
        user && user.roles.includes(roleId)
          ? { ...user, activeRole: roleId, permissions }
          : user,
      );
    }
  };

  const updateUserPermissions = (userId: string, permissions: Permission) => {
    setAllUsers((users) =>
      users.map((user) =>
        user.id === userId ? { ...user, permissions } : user,
      ),
    );
  };

  const addCustomRole = (
    name: string,
    description: string,
    permissions: Permission,
    parentRoleId?: string,
  ) => {
    const newRole: CustomRole = {
      id: `custom-${Date.now()}`,
      name,
      description,
      permissions,
      parentRoleId,
      isPredefined: false,
      createdAt: new Date(),
    };
    setCustomRoles((roles) => [...roles, newRole]);
  };

  const editCustomRole = (
    roleId: string,
    name: string,
    description: string,
    permissions: Permission,
    parentRoleId?: string,
  ) => {
    setCustomRoles((roles) =>
      roles.map((role) =>
        role.id === roleId
          ? { ...role, name, description, permissions, parentRoleId }
          : role,
      ),
    );
    setAllUsers((users) =>
      users.map((user) =>
        user.activeRole === roleId ? { ...user, permissions } : user,
      ),
    );
  };

  const deleteCustomRole = (roleId: string) => {
    const role = customRoles.find((r) => r.id === roleId);
    if (role && !role.isPredefined) {
      setCustomRoles((roles) => roles.filter((r) => r.id !== roleId));
    }
  };

  const getRoleDetails = (roleId: string): CustomRole | undefined => {
    return customRoles.find((r) => r.id === roleId);
  };

  const getRoleHierarchy = (): Map<string, CustomRole[]> => {
    const hierarchy = new Map<string, CustomRole[]>();
    customRoles.forEach((role) => {
      const parentId = role.parentRoleId || "root";
      if (!hierarchy.has(parentId)) {
        hierarchy.set(parentId, []);
      }
      hierarchy.get(parentId)!.push(role);
    });
    return hierarchy;
  };

  const getUsersByRole = (roleId: string): User[] => {
    return allUsers.filter((user) => user.roles.includes(roleId));
  };

  const value: AuthContextType = {
    currentUser,
    login,
    signup,
    logout,
    updateUserRole,
    addRoleToUser,
    removeRoleFromUser,
    switchActiveRole,
    updateUserPermissions,
    hasPermission,
    canCreateContent,
    canApproveContent,
    canManageUsers,
    canSeeAnalytics,
    allUsers,
    setCurrentUser,
    customRoles,
    addCustomRole,
    editCustomRole,
    deleteCustomRole,
    getRoleDetails,
    getUsersByRole,
    getRoleHierarchy,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
