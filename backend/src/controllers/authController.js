const AuthService = require("../services/authService");
const asyncHandler = require("../helpers/asyncHandler");

/*
|--------------------------------------------------------------------------
| Register
|--------------------------------------------------------------------------
*/

const register = asyncHandler(async (req, res) => {
  const response = await AuthService.register(req.body);

  return res.status(response.statusCode).json({
    success: response.success,
    message: response.message,
    token: response.token,
    user: response.user,
  });
});

/*
|--------------------------------------------------------------------------
| Login
|--------------------------------------------------------------------------
*/

const login = asyncHandler(async (req, res) => {
  const response = await AuthService.login(req.body);

  return res.status(response.statusCode).json({
    success: response.success,
    message: response.message,
    token: response.token,
    user: response.user,
  });
});

/*
|--------------------------------------------------------------------------
| Get Logged In User Profile
|--------------------------------------------------------------------------
*/

const getProfile = asyncHandler(async (req, res) => {
  const response = await AuthService.getProfile(req.user.id);

  return res.status(response.statusCode).json({
    success: response.success,
    message: response.message,
    user: response.user,
  });
});

/*
|--------------------------------------------------------------------------
| Update Profile
|--------------------------------------------------------------------------
*/

const updateProfile = asyncHandler(async (req, res) => {
  console.log("Body:", req.body);
  console.log("File:", req.file);
  console.log(req.headers["content-type"]);
  console.log(req.file);
  console.log(req.body);
  const response = await AuthService.updateProfile(
    req.user.id,
    req.body,
    req.file,
  );

  return res.status(response.statusCode).json({
    success: response.success,
    message: response.message,
    user: response.user,
  });
});

module.exports = {
  register,
  login,
  getProfile,
  updateProfile,
};
