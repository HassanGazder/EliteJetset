import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { LogIn, Eye, EyeOff } from "lucide-react";
import MainLayout from "../components/layouts/MainLayout";
import Input from "../components/common/Input";
import Button from "../components/common/Button";
import { useAuth } from "../hooks/useAuth";

interface LocationState {
  message?: string;
}

const LoginPage: React.FC = () => {
  const [formData, setFormData] = useState({
    emailOrUsername: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Check for success message from registration
    const state = location.state as LocationState;
    if (state?.message) {
      setMessage(state.message);
    }
  }, [location]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.emailOrUsername || !formData.password) {
      setError("Please fill in all fields");
      return;
    }
    
    setIsLoading(true);
    
    try {
      const success = await login(formData.emailOrUsername, formData.password);
      
      if (success) {
        // Check user role from auth context or local storage
        const userRole = localStorage.getItem('userRole');
        if (userRole === 'admin') {
          navigate("/admin");
        } else {
          navigate("/dashboard");
        }
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Invalid email/username or password';
      // Check if the error object has response data for more specific messages
      if (typeof error === 'object' && error !== null && 'response' in error && typeof error.response === 'object' && error.response !== null && 'data' in error.response && typeof error.response.data === 'object' && error.response.data !== null && 'message' in error.response.data) {
        setError(error.response.data.message as string);
      } else {
        setError(errorMessage);
      }
      console.error('Login page error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <MainLayout>
      <div className="min-h-screen py-12 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
            <div className="bg-gradient-to-r from-teal-600 to-cyan-700 py-4 px-6">
              <div className="flex items-center justify-center text-white">
                <LogIn className="h-6 w-6 mr-2" />
                <h2 className="text-xl font-bold">Login to Your Account</h2>
              </div>
            </div>
            
            <div className="p-6">
              {message && (
                <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
                  {message}
                </div>
              )}
              
              {error && (
                <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                  {error}
                </div>
              )}
              
              <form onSubmit={handleSubmit}>
                <Input
                  label="Email or Username"
                  type="text"
                  name="emailOrUsername"
                  value={formData.emailOrUsername}
                  onChange={handleChange}
                  placeholder="john@example.com or johndoe"
                  required
                />
                
                <div className="relative">
                  <Input
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-2 top-[38px] text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
                
                <Button
                  type="submit"
                  fullWidth
                  isLoading={isLoading}
                  className="mt-2"
                >
                  Login
                </Button>
                
                <p className="mt-4 text-center text-slate-600">
                  Don't have an account?{" "}
                  <Link to="/register" className="text-teal-600 hover:text-teal-700 font-medium">
                    Register here
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default LoginPage;