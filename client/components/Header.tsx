import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { cn } from "@/lib/utils";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
  const { currentUser, customRoles, switchActiveRole } = useAuth();

  const baseNavItems = [
    { label: "Home", path: "/" },
    { label: "Guided Labs", path: "/labs" },
    { label: "Certifications", path: "/certifications" },
    { label: "About", path: "/about" },
    { label: "Contact", path: "/contact" },
  ];

  const roleNavItems = currentUser
    ? [
        { label: "Dashboard", path: "/dashboard" },
        ...(currentUser.permissions.manageUsers ||
        currentUser.roles.includes("admin")
          ? [{ label: "Admin", path: "/admin" }]
          : []),
        ...(currentUser.permissions.create ||
        currentUser.roles.includes("writer")
          ? [{ label: "Content", path: "/content" }]
          : []),
        ...(currentUser.permissions.approve ||
        currentUser.roles.includes("approval")
          ? [{ label: "Approval", path: "/approval" }]
          : []),
        ...(currentUser.permissions.supportChat ||
        currentUser.roles.includes("support")
          ? [{ label: "Support", path: "/support" }]
          : []),
      ]
    : [];

  const navItems = [...baseNavItems, ...roleNavItems];

  const getRoleDisplayName = (roleId: string): string => {
    const role = customRoles.find((r) => r.id === roleId);
    return role ? role.name : roleId.charAt(0).toUpperCase() + roleId.slice(1);
  };

  const handleRoleSwitch = (newActiveRole: string) => {
    if (currentUser) {
      switchActiveRole(currentUser.id, newActiveRole);
      setRoleDropdownOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center">
              <span className="text-white font-bold text-lg">S</span>
            </div>
            <span className="font-bold text-xl text-slate-900 hidden sm:inline">
              Skills Enhance
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="px-3 py-2 text-sm font-medium text-slate-700 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            {currentUser ? (
              <>
                <div className="hidden sm:flex items-center gap-2 relative">
                  <button
                    onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-slate-100 transition-colors"
                  >
                    <div className="text-right text-sm">
                      <p className="font-medium text-slate-900">
                        {currentUser.name}
                      </p>
                      <p className="text-xs text-slate-600">
                        {getRoleDisplayName(currentUser.activeRole)}
                      </p>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-sm">
                      {currentUser.avatar}
                    </div>
                  </button>

                  {roleDropdownOpen && currentUser.roles.length > 1 && (
                    <div className="absolute right-0 top-full mt-2 bg-white border border-slate-200 rounded-lg shadow-lg z-50 min-w-48">
                      <div className="p-2">
                        <p className="text-xs font-semibold text-slate-600 px-3 py-2">
                          SWITCH ROLE
                        </p>
                        {currentUser.roles.map((roleId) => (
                          <button
                            key={roleId}
                            onClick={() => handleRoleSwitch(roleId)}
                            className={`w-full text-left px-3 py-2 rounded transition-colors text-sm ${
                              currentUser.activeRole === roleId
                                ? "bg-blue-100 text-blue-700 font-medium"
                                : "text-slate-700 hover:bg-slate-100"
                            }`}
                          >
                            {getRoleDisplayName(roleId)}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                <Link to="/login">
                  <Button
                    variant="outline"
                    size="sm"
                    className="hidden sm:inline-flex"
                  >
                    Logout
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button
                    variant="outline"
                    size="sm"
                    className="hidden sm:inline-flex"
                  >
                    Sign In
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button
                    size="sm"
                    className="hidden sm:inline-flex bg-blue-600 hover:bg-blue-700"
                  >
                    Get Started
                  </Button>
                </Link>
              </>
            )}

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 hover:bg-slate-100 rounded-lg"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden mt-4 space-y-2 pb-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="block px-4 py-2 text-sm font-medium text-slate-700 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="flex gap-2 pt-4">
              {currentUser ? (
                <Link to="/login" className="flex-1">
                  <Button variant="outline" size="sm" className="w-full">
                    Logout
                  </Button>
                </Link>
              ) : (
                <>
                  <Link to="/login" className="flex-1">
                    <Button variant="outline" size="sm" className="w-full">
                      Sign In
                    </Button>
                  </Link>
                  <Link to="/signup" className="flex-1">
                    <Button
                      size="sm"
                      className="w-full bg-blue-600 hover:bg-blue-700"
                    >
                      Get Started
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
