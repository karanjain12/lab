import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, User, Eye, EyeOff, CheckCircle } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const fullName = `${formData.firstName} ${formData.lastName}`.trim();
    if (
      fullName &&
      formData.email &&
      formData.password === formData.confirmPassword
    ) {
      signup(fullName, formData.email, formData.password);
      navigate("/dashboard");
    }
  };

  const requirements = [
    { text: "At least 8 characters long", met: formData.password.length >= 8 },
    {
      text: "Contains uppercase and lowercase letters",
      met: /[A-Z]/.test(formData.password) && /[a-z]/.test(formData.password),
    },
    { text: "Contains numbers", met: /[0-9]/.test(formData.password) },
    {
      text: "Passwords match",
      met:
        formData.password === formData.confirmPassword &&
        formData.password.length > 0,
    },
  ];

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-blue-50 to-slate-50">
      {/* Left Side - Info */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 to-blue-700 text-white p-12 flex-col justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="h-10 w-10 rounded-lg bg-white flex items-center justify-center">
            <span className="text-blue-600 font-bold text-lg">S</span>
          </div>
          <span className="font-bold text-2xl">Skills Enhance</span>
        </Link>

        <div>
          <h1 className="text-5xl font-bold mb-6">Start Learning Today</h1>
          <p className="text-blue-100 text-lg leading-relaxed mb-8">
            Join thousands of professionals mastering cloud technologies with
            our comprehensive training platform.
          </p>

          <div className="space-y-6">
            {[
              { icon: "📚", text: "500+ hands-on lab exercises" },
              { icon: "🏆", text: "Industry-recognized certifications" },
              { icon: "👨‍🏫", text: "Expert instructor-led training" },
              { icon: "💼", text: "Career advancement support" },
            ].map((item, idx) => (
              <div key={idx} className="flex items-start gap-4">
                <span className="text-3xl">{item.icon}</span>
                <p className="text-blue-100">{item.text}</p>
              </div>
            ))}
          </div>
        </div>

        <p className="text-blue-200 text-sm">
          © {new Date().getFullYear()} Skills Enhance. All rights reserved.
        </p>
      </div>

      {/* Right Side - Form */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-slate-900 mb-2">
              Create Account
            </h2>
            <p className="text-slate-600 mb-8">
              Join our learning community and transform your career
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name Fields */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    First Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <Input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="John"
                      className="pl-12 h-11"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Last Name
                  </label>
                  <Input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Doe"
                    className="h-11"
                    required
                  />
                </div>
              </div>

              {/* Email Field */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className="pl-12 h-11"
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="w-full pl-12 pr-12 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Confirm Password Field */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="w-full pl-12 pr-12 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Password Requirements */}
              <div className="space-y-2 p-4 bg-slate-50 rounded-lg">
                <p className="text-xs font-semibold text-slate-700">
                  Password requirements:
                </p>
                {requirements.map((req, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 text-xs text-slate-600"
                  >
                    <CheckCircle
                      className={`w-4 h-4 ${
                        req.met ? "text-green-600" : "text-slate-300"
                      }`}
                    />
                    {req.text}
                  </div>
                ))}
              </div>

              {/* Terms */}
              <div className="flex items-start gap-2">
                <input
                  type="checkbox"
                  id="terms"
                  className="w-4 h-4 rounded border-slate-300 text-blue-600 mt-1"
                  required
                />
                <label htmlFor="terms" className="text-sm text-slate-700">
                  I agree to the{" "}
                  <a href="#" className="text-blue-600 hover:underline">
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a href="#" className="text-blue-600 hover:underline">
                    Privacy Policy
                  </a>
                </label>
              </div>

              {/* Sign Up Button */}
              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 h-11 font-semibold mt-6"
              >
                Create Account
              </Button>
            </form>

            {/* Sign In Link */}
            <p className="text-center text-slate-600 mt-8">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-semibold text-blue-600 hover:text-blue-700"
              >
                Sign in here
              </Link>
            </p>
          </div>

          {/* Mobile Logo */}
          <div className="lg:hidden text-center mt-8">
            <Link to="/" className="inline-flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-blue-600 flex items-center justify-center">
                <span className="text-white font-bold text-lg">S</span>
              </div>
              <span className="font-bold text-lg text-slate-900">
                Skills Enhance
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
