import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth, Role, Permission } from "@/context/AuthContext";
import {
  Trash2,
  Edit2,
  Shield,
  Users,
  BarChart3,
  Plus,
  ChevronRight,
  ChevronDown,
} from "lucide-react";
import { useState } from "react";

export default function AdminPanel() {
  const {
    allUsers,
    updateUserRole,
    hasPermission,
    customRoles,
    addCustomRole,
    editCustomRole,
    deleteCustomRole,
    getUsersByRole,
  } = useAuth();

  const {
    getRoleHierarchy,
    addRoleToUser,
    removeRoleFromUser,
    switchActiveRole,
  } = useAuth();

  const [activeTab, setActiveTab] = useState<"users" | "roles">("users");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [editingUserId, setEditingUserId] = useState<string | null>(null);
  const [selectedRoleForUser, setSelectedRoleForUser] = useState<Role>("user");
  const [showCreateRoleModal, setShowCreateRoleModal] = useState(false);
  const [showEditRoleModal, setShowEditRoleModal] = useState(false);
  const [editingRoleId, setEditingRoleId] = useState<string | null>(null);
  const [expandedRoles, setExpandedRoles] = useState<Set<string>>(
    new Set(["root"]),
  );

  // Form state for creating/editing roles
  const [roleName, setRoleName] = useState("");
  const [roleDescription, setRoleDescription] = useState("");
  const [rolePermissions, setRolePermissions] = useState<Permission>({
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
  });

  if (!hasPermission("manageUsers")) {
    return (
      <div className="min-h-screen flex flex-col bg-white">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <Shield className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-slate-900 mb-2">
              Access Denied
            </h1>
            <p className="text-slate-600">Only admins can access this panel</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const filteredUsers = allUsers.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const rolesList = selectedRole
    ? filteredUsers.filter((u) => u.role === selectedRole)
    : filteredUsers;

  const handleRoleUpdate = (userId: string, newRole: Role) => {
    updateUserRole(userId, newRole);
    setEditingUserId(null);
  };

  const handleCreateRole = () => {
    if (roleName.trim()) {
      addCustomRole(roleName, roleDescription, rolePermissions);
      setRoleName("");
      setRoleDescription("");
      setRolePermissions({
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
      });
      setShowCreateRoleModal(false);
    }
  };

  const handleEditRole = () => {
    if (editingRoleId && roleName.trim()) {
      editCustomRole(editingRoleId, roleName, roleDescription, rolePermissions);
      setRoleName("");
      setRoleDescription("");
      setEditingRoleId(null);
      setShowEditRoleModal(false);
    }
  };

  const handleOpenEditRole = (roleId: string) => {
    const role = customRoles.find((r) => r.id === roleId);
    if (role && !role.isPredefined) {
      setEditingRoleId(roleId);
      setRoleName(role.name);
      setRoleDescription(role.description || "");
      setRolePermissions(role.permissions);
      setShowEditRoleModal(true);
    }
  };

  const togglePermission = (permission: keyof Permission) => {
    setRolePermissions((prev) => ({
      ...prev,
      [permission]: !prev[permission],
    }));
  };

  const roleColors: Record<string, string> = {
    admin: "bg-red-100 text-red-700",
    approval: "bg-purple-100 text-purple-700",
    writer: "bg-blue-100 text-blue-700",
    user: "bg-slate-100 text-slate-700",
    support: "bg-green-100 text-green-700",
  };

  const getRoleColor = (roleId: string): string => {
    return roleColors[roleId] || "bg-indigo-100 text-indigo-700";
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-1">
        <div className="bg-gradient-to-br from-blue-50 to-slate-50 py-12 px-4 border-b">
          <div className="container mx-auto">
            <h1 className="text-4xl font-bold text-slate-900 mb-2">
              Admin Control Panel
            </h1>
            <p className="text-slate-600">
              Manage users, roles, and permissions across the platform
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            {[
              { label: "Total Users", value: allUsers.length, icon: Users },
              {
                label: "Admins",
                value: allUsers.filter((u) => u.role === "admin").length,
                icon: Shield,
              },
              {
                label: "Custom Roles",
                value: customRoles.filter((r) => !r.isPredefined).length,
                icon: Edit2,
              },
              {
                label: "Active Roles",
                value: customRoles.length,
                icon: BarChart3,
              },
            ].map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <div
                  key={idx}
                  className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-slate-600 text-sm font-medium mb-1">
                        {stat.label}
                      </p>
                      <p className="text-3xl font-bold text-slate-900">
                        {stat.value}
                      </p>
                    </div>
                    <Icon className="w-8 h-8 text-blue-600" />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Tabs */}
          <div className="flex gap-4 mb-8 border-b border-slate-200">
            <button
              onClick={() => {
                setActiveTab("users");
                setSelectedRole(null);
              }}
              className={`px-6 py-3 font-medium border-b-2 transition-colors ${
                activeTab === "users"
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-slate-600 hover:text-slate-900"
              }`}
            >
              User Management
            </button>
            <button
              onClick={() => setActiveTab("roles")}
              className={`px-6 py-3 font-medium border-b-2 transition-colors ${
                activeTab === "roles"
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-slate-600 hover:text-slate-900"
              }`}
            >
              Role Management
            </button>
          </div>

          {/* Users Tab */}
          {activeTab === "users" && (
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="p-6 border-b border-slate-200">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">
                  User Management
                </h2>
                <div className="relative">
                  <Input
                    placeholder="Search users by name or email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-4 h-11"
                  />
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-50 border-b border-slate-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase">
                        User
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase">
                        Email
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase">
                        Role
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {rolesList.map((user) => (
                      <tr key={user.id} className="hover:bg-slate-50">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center font-bold text-blue-600">
                              {user.avatar}
                            </div>
                            <div>
                              <p className="font-medium text-slate-900">
                                {user.name}
                              </p>
                              <p className="text-xs text-slate-500">
                                ID: {user.id}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-600">
                          {user.email}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-wrap gap-2">
                            {user.roles.map((roleId) => (
                              <span
                                key={roleId}
                                className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${getRoleColor(
                                  roleId,
                                )}`}
                              >
                                {customRoles.find((r) => r.id === roleId)
                                  ?.name || roleId}
                                {editingUserId === user.id &&
                                  user.roles.length > 1 && (
                                    <button
                                      onClick={() =>
                                        removeRoleFromUser(user.id, roleId)
                                      }
                                      className="ml-1 hover:opacity-70"
                                    >
                                      ×
                                    </button>
                                  )}
                              </span>
                            ))}
                          </div>
                          {editingUserId === user.id && (
                            <div className="mt-2 flex gap-2">
                              <select
                                value={selectedRoleForUser}
                                onChange={(e) =>
                                  setSelectedRoleForUser(e.target.value as Role)
                                }
                                className="px-3 py-1 rounded border border-slate-300 text-sm text-xs"
                              >
                                <option value="">Add role...</option>
                                {customRoles
                                  .filter((r) => !user.roles.includes(r.id))
                                  .map((role) => (
                                    <option key={role.id} value={role.id}>
                                      {role.name}
                                    </option>
                                  ))}
                              </select>
                              <Button
                                size="sm"
                                className="bg-blue-600 hover:bg-blue-700 h-8 text-xs"
                                onClick={() => {
                                  if (selectedRoleForUser) {
                                    addRoleToUser(user.id, selectedRoleForUser);
                                    setSelectedRoleForUser("user");
                                  }
                                }}
                              >
                                Add
                              </Button>
                            </div>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                              user.isActive
                                ? "bg-green-100 text-green-700"
                                : "bg-slate-100 text-slate-700"
                            }`}
                          >
                            {user.isActive ? "Active" : "Inactive"}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2">
                            {editingUserId === user.id ? (
                              <Button
                                size="sm"
                                variant="outline"
                                className="h-8"
                                onClick={() => setEditingUserId(null)}
                              >
                                Cancel
                              </Button>
                            ) : (
                              <>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="h-8"
                                  onClick={() => {
                                    setEditingUserId(user.id);
                                    setSelectedRoleForUser(user.role);
                                  }}
                                >
                                  <Edit2 className="w-4 h-4" />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="h-8 text-red-600 hover:text-red-700"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Roles Tab */}
          {activeTab === "roles" && (
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Roles List */}
              <div className="lg:col-span-1 bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col">
                <div className="p-6 border-b border-slate-200">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-slate-900">Roles</h3>
                    <Button
                      size="sm"
                      className="bg-blue-600 hover:bg-blue-700 h-8"
                      onClick={() => setShowCreateRoleModal(true)}
                    >
                      <Plus className="w-4 h-4 mr-1" />
                      Create
                    </Button>
                  </div>
                  <p className="text-xs text-slate-500">
                    {customRoles.length} roles total
                  </p>
                </div>

                <div className="divide-y divide-slate-200 overflow-y-auto flex-1">
                  {customRoles.map((role) => {
                    const userCount = getUsersByRole(role.id).length;
                    const childRoles = customRoles.filter(
                      (r) => r.parentRoleId === role.id,
                    );
                    return (
                      <button
                        key={role.id}
                        onClick={() => setSelectedRole(role.id)}
                        className={`w-full text-left p-4 transition-colors border-l-4 ${
                          selectedRole === role.id
                            ? "bg-blue-50 border-blue-600"
                            : "hover:bg-slate-50 border-transparent"
                        }`}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              {role.isPredefined && (
                                <span className="inline-block w-2 h-2 rounded-full bg-yellow-500" />
                              )}
                              <h4 className="font-semibold text-slate-900">
                                {role.name}
                              </h4>
                            </div>
                          </div>
                          {!role.isPredefined && (
                            <div className="flex gap-1">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleOpenEditRole(role.id);
                                }}
                                className="p-1 hover:bg-blue-100 rounded"
                                title="Edit role"
                              >
                                <Edit2 className="w-4 h-4 text-blue-600" />
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  deleteCustomRole(role.id);
                                  setSelectedRole(null);
                                }}
                                className="p-1 hover:bg-red-100 rounded"
                                title="Delete role"
                              >
                                <Trash2 className="w-4 h-4 text-red-600" />
                              </button>
                            </div>
                          )}
                        </div>
                        <p className="text-xs text-slate-500 mb-2 line-clamp-2">
                          {role.description || "No description"}
                        </p>
                        <div className="flex items-center gap-3 text-xs">
                          <span className="font-medium text-slate-600">
                            {userCount} user{userCount !== 1 ? "s" : ""}
                          </span>
                          {childRoles.length > 0 && (
                            <span className="text-slate-500">
                              {childRoles.length} child role
                              {childRoles.length !== 1 ? "s" : ""}
                            </span>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Role Details */}
              <div className="lg:col-span-3">
                {selectedRole ? (
                  <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                    {(() => {
                      const role = customRoles.find(
                        (r) => r.id === selectedRole,
                      );
                      return (
                        <>
                          <div className="mb-6">
                            <h3 className="text-2xl font-bold text-slate-900 mb-1">
                              {role?.name}
                            </h3>
                            <p className="text-slate-600">
                              {role?.description}
                            </p>
                          </div>

                          {/* Permissions */}
                          <div className="mb-8">
                            <h4 className="text-lg font-semibold text-slate-900 mb-4">
                              Permissions
                            </h4>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                              {Object.entries(role?.permissions || {}).map(
                                ([permission, hasPermission]) => (
                                  <div
                                    key={permission}
                                    className={`p-3 rounded-lg border-2 flex items-center gap-3 ${
                                      hasPermission
                                        ? "bg-green-50 border-green-300"
                                        : "bg-slate-50 border-slate-300"
                                    }`}
                                  >
                                    <input
                                      type="checkbox"
                                      checked={hasPermission}
                                      disabled
                                      className="w-5 h-5"
                                    />
                                    <span className="text-sm font-medium text-slate-900 capitalize">
                                      {permission
                                        .replace(/([A-Z])/g, " $1")
                                        .toLowerCase()}
                                    </span>
                                  </div>
                                ),
                              )}
                            </div>
                          </div>

                          {/* Users with this role */}
                          <div>
                            <h4 className="text-lg font-semibold text-slate-900 mb-4">
                              Users ({getUsersByRole(selectedRole).length})
                            </h4>
                            <div className="space-y-2">
                              {getUsersByRole(selectedRole).length > 0 ? (
                                getUsersByRole(selectedRole).map((user) => (
                                  <div
                                    key={user.id}
                                    className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg"
                                  >
                                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center font-bold text-blue-600 text-xs">
                                      {user.avatar}
                                    </div>
                                    <div className="flex-1">
                                      <p className="font-medium text-slate-900">
                                        {user.name}
                                      </p>
                                      <p className="text-xs text-slate-500">
                                        {user.email}
                                      </p>
                                    </div>
                                    <ChevronRight className="w-4 h-4 text-slate-400" />
                                  </div>
                                ))
                              ) : (
                                <p className="text-slate-500 text-sm">
                                  No users assigned to this role
                                </p>
                              )}
                            </div>
                          </div>
                        </>
                      );
                    })()}
                  </div>
                ) : (
                  <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl shadow-sm border-2 border-dashed border-slate-300 p-16 flex flex-col items-center justify-center text-center">
                    <div className="w-20 h-20 rounded-full bg-slate-200 flex items-center justify-center mb-6">
                      <Shield className="w-10 h-10 text-slate-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-slate-900 mb-2">
                      No Role Selected
                    </h3>
                    <p className="text-slate-600 mb-1">
                      Choose a role from the list to view its details
                    </p>
                    <p className="text-sm text-slate-500 max-w-xs">
                      View permissions, user assignments, and manage role configurations
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Create Role Modal */}
      {showCreateRoleModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-lg max-w-2xl w-full p-6">
            <h3 className="text-2xl font-bold text-slate-900 mb-6">
              Create New Role
            </h3>

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-slate-900 mb-1">
                  Role Name *
                </label>
                <Input
                  placeholder="e.g., Junior Writer, Senior Writer"
                  value={roleName}
                  onChange={(e) => setRoleName(e.target.value)}
                  className="h-10"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-900 mb-1">
                  Description
                </label>
                <Input
                  placeholder="Brief description of this role"
                  value={roleDescription}
                  onChange={(e) => setRoleDescription(e.target.value)}
                  className="h-10"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-900 mb-3">
                  Permissions
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {Object.entries(rolePermissions).map(
                    ([permission, hasPermission]) => (
                      <label
                        key={permission}
                        className="flex items-center gap-2 p-3 rounded-lg border border-slate-300 hover:bg-slate-50 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={hasPermission}
                          onChange={() =>
                            togglePermission(permission as keyof Permission)
                          }
                          className="w-4 h-4 rounded"
                        />
                        <span className="text-sm font-medium text-slate-900 capitalize">
                          {permission.replace(/([A-Z])/g, " $1").toLowerCase()}
                        </span>
                      </label>
                    ),
                  )}
                </div>
              </div>
            </div>

            <div className="flex gap-3 justify-end">
              <Button
                variant="outline"
                onClick={() => setShowCreateRoleModal(false)}
              >
                Cancel
              </Button>
              <Button
                className="bg-blue-600 hover:bg-blue-700"
                onClick={handleCreateRole}
              >
                Create Role
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Role Modal */}
      {showEditRoleModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-lg max-w-2xl w-full p-6">
            <h3 className="text-2xl font-bold text-slate-900 mb-6">
              Edit Role
            </h3>

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-slate-900 mb-1">
                  Role Name *
                </label>
                <Input
                  placeholder="e.g., Junior Writer, Senior Writer"
                  value={roleName}
                  onChange={(e) => setRoleName(e.target.value)}
                  className="h-10"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-900 mb-1">
                  Description
                </label>
                <Input
                  placeholder="Brief description of this role"
                  value={roleDescription}
                  onChange={(e) => setRoleDescription(e.target.value)}
                  className="h-10"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-900 mb-3">
                  Permissions
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {Object.entries(rolePermissions).map(
                    ([permission, hasPermission]) => (
                      <label
                        key={permission}
                        className="flex items-center gap-2 p-3 rounded-lg border border-slate-300 hover:bg-slate-50 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={hasPermission}
                          onChange={() =>
                            togglePermission(permission as keyof Permission)
                          }
                          className="w-4 h-4 rounded"
                        />
                        <span className="text-sm font-medium text-slate-900 capitalize">
                          {permission.replace(/([A-Z])/g, " $1").toLowerCase()}
                        </span>
                      </label>
                    ),
                  )}
                </div>
              </div>
            </div>

            <div className="flex gap-3 justify-end">
              <Button
                variant="outline"
                onClick={() => setShowEditRoleModal(false)}
              >
                Cancel
              </Button>
              <Button
                className="bg-blue-600 hover:bg-blue-700"
                onClick={handleEditRole}
              >
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
