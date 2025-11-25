// src/pages/Login.jsx
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginText, LOGIN_CONFIG } from '../constants/loginText';
import { ASSETS, COLORS } from '../constants/authConfig';
import { authAPI } from '../services/apiService';
import Input from '../components/common/Input';
const { EMAIL, PASSWORD } = LOGIN_CONFIG;
const { logo, banner } = ASSETS;
const { primaryBlue, secondaryGray, labelColor } = COLORS;

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loginError, setLoginError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Validation
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) return 'Email is required';
    if (!emailRegex.test(email)) return 'Please enter a valid email address';
    if (!email.toLowerCase().includes('@gmail.com') && !email.toLowerCase().includes('@agendaone.com')) {
      return 'Email must be a Gmail or AgendaOne address';
    }
    return '';
  };

  const validatePassword = (password) => {
    if (!password) return 'Password is required';
    if (password.length < 6) return 'Password must be at least 6 characters';
    return '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoginError('');
    setErrors({});

    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);

    if (emailError || passwordError) {
      setErrors({ email: emailError, password: passwordError });
      return;
    }

    setIsLoading(true);

    try {
      const data = await authAPI.login(email, password);

      if (data.access_token) {
        localStorage.setItem('authToken', data.access_token);
      }

      alert("Login Successful!");
      navigate('/dashboard');
    } catch (error) {
      setLoginError(error.message || 'Invalid credentials. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (setter, field) => (e) => {
    setter(e.target.value);
    if (errors[field]) setErrors({ ...errors, [field]: '' });
    if (loginError) setLoginError('');
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div className="flex h-screen bg-white font-sans">
      {/* Left Banner */}
      <div className="w-1/2 hidden lg:block">
        <img src={banner} alt="Login banner" className="w-full h-full object-cover" />
      </div>

      {/* Right Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-16">
        <div className="w-full max-w-sm">
          {/* Logo & Title */}
          <div className="mb-12">
            <img src={logo} className="h-8 mb-6 rounded" alt="AgendaOne Logo" />
            <h1 className="text-4xl font-extrabold" style={{ color: primaryBlue }}>
              {loginText.title}
            </h1>
            <p className="text-lg mt-1" style={{ color: secondaryGray }}>
              {loginText.subtitle}
            </p>
          </div>

          {/* Server Error */}
          {loginError && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm font-medium">{loginError}</p>
            </div>
          )}

          {/* Form */}
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Email */}
            {/* <div>
              <label className="block mb-1 text-sm font-medium" style={{ color: labelColor }}>
                {loginText.emailLabel}
              </label>
              <input
                type="email"
                placeholder={loginText.emailPlaceholder}
                value={email}
                onChange={handleInputChange(setEmail, 'email')}
                disabled={isLoading}
                className={`w-full px-4 py-3 rounded-lg bg-gray-50 border ${
                  errors.email ? 'border-red-500' : 'border-gray-200'
                } focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none placeholder:text-gray-500 disabled:opacity-50`}
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div> */}
            <Input inputProps={{
              ...EMAIL,
              value: email,
              onChange: handleInputChange(setEmail, "email"),
              isDisabled: isLoading,
              errors: errors.email
            }} />

            {/* Password */}
            {/* <div>
              <label className="block mb-1 text-sm font-medium" style={{ color: labelColor }}>
                {loginText.passwordLabel}
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder={loginText.passwordPlaceholder}
                  value={password}
                  onChange={handleInputChange(setPassword, 'password')}
                  disabled={isLoading}
                  className={`w-full px-4 py-3 rounded-lg bg-gray-50 border pr-12 ${
                    errors.password ? 'border-red-500' : 'border-gray-200'
                  } focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none placeholder:text-gray-500 disabled:opacity-50`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
            </div> */}

            <Input
              inputProps={{
                ...PASSWORD,
                value: password,
                onChange: handleInputChange(setPassword, "password"),
                isDisabled: isLoading,
                errors: errors.password
              }}
              showPasswordToggle={true}
              onTogglePassword={togglePasswordVisibility}
              isPasswordVisible={showPassword}
            />

            {/* Forgot Password */}
            <div className="text-right">
              <a href="#" className="text-sm font-medium hover:underline" style={{ color: primaryBlue }}>
                {loginText.forgotPassword}
              </a>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full text-white py-3 rounded-lg font-semibold flex items-center justify-center hover:opacity-90 disabled:opacity-70 disabled:cursor-not-allowed transition"
              style={{ backgroundColor: primaryBlue }}
            >
              {isLoading ? (
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                <span className="mr-2 text-lg">→</span>
              )}
              <span className="text-lg">
                {isLoading ? loginText.buttonLoading : loginText.button}
              </span>
            </button>
          </form>

          {/* Sign Up Link */}
          <p className="text-center text-sm mt-8 text-gray-600">
            {loginText.noAccount}{' '}
            <Link to="/signup" className="font-semibold hover:underline" style={{ color: primaryBlue }}>
              {loginText.signUpLink}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}