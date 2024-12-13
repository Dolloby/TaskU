//const URL = process.env.BASE_URL_API || "http://localhost:3015/"
const URL = "https://tasku.onrender.com/" //deployment
const apiRoutes = {
    login:`${URL}user/login`,
    profile:`${URL}user/profile/`,
    register: `${URL}user/register`,
    changePassword: `${URL}user/change-password`,
    updateProfile: `${URL}user/update-profile`,
    forgotPassword: `${URL}user/forgot-password`,
    resetPasswordbackend: `${URL}user/reset-password/:token`,
    resetPassword: `${URL}user/reset-password`,
    addTask: `${URL}task/create-task`,
};

export default apiRoutes;