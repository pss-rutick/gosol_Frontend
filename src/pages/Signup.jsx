// src/pages/Signup.jsx
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signupText, SIGNUP_CONFIG } from '../constants/signupText';
import { ASSETS, COLORS } from '../constants/authConfig';
import { authAPI } from '../services/apiService';   // ← Only import from here
import Input from '../components/common/Input';

const { logo, banner } = ASSETS;
const { primaryBlue, secondaryGray, labelColor } = COLORS;
const { EMAIL, PASSWORD, CNF_PASSWORD } = SIGNUP_CONFIG

export default function Signup() {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const validate = () => {
    const err = {};
    if (!username.trim()) err.username = 'Username is required';
    else if (username.length < 3) err.username = 'Username too short';

    if (!password) err.password = 'Password is required';
    else if (password.length < 6) err.password = 'Password must be 6+ characters';

    if (password !== confirmPassword) err.confirmPassword = 'Passwords do not match';

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError('');
    setErrors({});

    if (!validate()) return;

    setIsLoading(true);
    try {
      await authAPI.signup(username.trim(), password);   // ← Uses apiService
      alert(signupText.successMessage || 'Account created! Please login.');
      navigate('/login');
    } catch (err) {
      setServerError(err.message || 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-white font-sans">
      <div className="w-1/2 hidden lg:block">
        <img src={banner} alt="Banner" className="w-full h-full object-cover" />
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-sm">
          <div className="mb-12">
            <img src={logo} className="h-8 mb-6 rounded" alt="Logo" />
            <h1 className="text-4xl font-extrabold" style={{ color: primaryBlue }}>
              {signupText.title}
            </h1>
            <p className="text-lg mt-1" style={{ color: secondaryGray }}>
              {signupText.subtitle}
            </p>
          </div>

          {serverError && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm">{serverError}</p>
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Username */}

            <Input inputProps={{
              ...EMAIL,
              value: username,
              onChange: (e) => {
                setUsername(e.target.value)
              },
              disabled: isLoading,
              errors: errors.username
            }} />


            {/* <div>
              <label style={{ color: labelColor }} className="block text-sm font-medium mb-1">
                {signupText.usernameLabel}
              </label>
              <input
                type="text"
                placeholder={signupText.usernamePlaceholder}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={isLoading}
                className={`w-full px-4 py-3 rounded-lg border bg-gray-50 ${errors.username ? 'border-red-500' : 'border-gray-200'} focus:border-blue-500 outline-none`}
              />
              {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username}</p>}
            </div> */}

            {/* Password */}
            <Input inputProps={{
              ...PASSWORD,
              value: password,
              onChange: (e) => {
                setPassword(e.target.value)
              },
              disabled: isLoading,
              errors: errors.password
            }} />

            {/* <div>
              <label style={{ color: labelColor }} className="block text-sm font-medium mb-1">
                {signupText.passwordLabel}
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder={signupText.passwordPlaceholder}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                  className={`w-full px-4 py-3 rounded-lg border bg-gray-50 pr-12 ${errors.password ? 'border-red-500' : 'border-gray-200'} focus:border-blue-500 outline-none`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
            </div> */}

            {/* Confirm Password */}
            <Input inputProps={{
              ...CNF_PASSWORD,
              value: confirmPassword,
              onChange: (e) => {
                setConfirmPassword(e.target.value)
              },
              disabled: isLoading,
              errors: errors.PASSWORD
            }}/>
            {/* <div>
              <label style={{ color: labelColor }} className="block text-sm font-medium mb-1">
                {signupText.confirmPasswordLabel}
              </label>
              <input
                type={showPassword ? "text" : "password"}
                placeholder={signupText.confirmPasswordPlaceholder}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                disabled={isLoading}
                className={`w-full px-4 py-3 rounded-lg border bg-gray-50 ${errors.confirmPassword ? 'border-red-500' : 'border-gray-200'} focus:border-blue-500 outline-none`}
              />
              {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
            </div> */}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-lg text-white font-semibold flex justify-center items-center hover:opacity-90 disabled:opacity-70"
              style={{ backgroundColor: primaryBlue }}
            >
              {isLoading ? 'Creating...' : 'Sign Up'}
            </button>
          </form>

          <p className="text-center text-sm mt-8 text-gray-600">
            {signupText.alreadyHaveAccount}{' '}
            <Link to="/login" className="font-semibold hover:underline" style={{ color: primaryBlue }}>
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}