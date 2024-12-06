const BASE_URL_API = "http://localhost:3015/api/"
const apiRoutes = {
    login:`${BASE_URL_API}user/login`,
    profile:`${BASE_URL_API}user/profile/`,
    register: `${BASE_URL_API}user/register`,
    changePassword: `${BASE_URL_API}user/change-password`,
    logout: `${BASE_URL_API}user/logout`,
    forgotPassword: `${BASE_URL_API}user/forgot-password`,
};

export default apiRoutes;