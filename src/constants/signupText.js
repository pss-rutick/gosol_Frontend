// src/constants/signupText.js
export const signupText = {
  title: "Create your account",
  subtitle: "Join AgendaOne today",

  usernameLabel: "Username",
  usernamePlaceholder: "Choose a username",

  passwordLabel: "Password",
  passwordPlaceholder: "Enter your password",

  confirmPasswordLabel: "Confirm Password",
  confirmPasswordPlaceholder: "Confirm your password",

  button: "Sign Up",
  buttonLoading: "Creating Account...",

  alreadyHaveAccount: "Already have an account?",
  signInLink: "Sign in",

  successMessage: "Account created successfully! Please log in.",
};

export const SIGNUP_CONFIG = {
  EMAIL: {
    type: "text",
    placeholder: "Username",
    lable: "Email",
    IsReuired: true
  },
  PASSWORD: {
    type: "password",
    placeholder: "******",
    lable: "Password",
    IsReuired: true,
  },
  CNF_PASSWORD: {
    type: "password",
    placeholder: "******",
    lable: "Confirm Password",
    IsReuired: true,
  }
}
