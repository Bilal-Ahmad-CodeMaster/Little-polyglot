// const BASE_URL = "https://little-polyglot-backend.onrender.com/api";
const BASE_URL = "http://localhost:3000/api";


export const API_CONFIG: Record<string, string> = {
  login: `${BASE_URL}/auth/signin`,
  logout: `${BASE_URL}/auth/signout`,
  sendOtp: `${BASE_URL}/auth/sendOtp`,
  verifyOtpAndResetPassword: `${BASE_URL}/auth/verifyOtpAndResetPassword`,

  myProfile: `${BASE_URL}/users/me/profile`,
  updateProfile: `${BASE_URL}/users/me/update-profile`,
  changePassword: `${BASE_URL}/users/changePassword`,
  branches: `${BASE_URL}/school-branches`,


  blogs: `${BASE_URL}/blog`,

};