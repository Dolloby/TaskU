const URL = process.env.REACT_APP_API_URL || 'http://localhost:3015'; 
//const URL = "https://tasku.onrender.com/" //deployment
const apiRoutes = {
    login:`${URL}user/login`,
    profile:`${URL}user/profile/`,
    register: `${URL}user/register`,
    changePassword: `${URL}user/change-password`,
    updateProfile: `${URL}user/update-profile`,
    forgotPassword: `${URL}/user/forgot-password`,
    resetPasswordbackend: `${URL}user/reset-password/:token`,
    resetPassword: `${URL}user/reset-password`,
    addTask: `${URL}task/create-task`,
    getStatus: `${URL}task/status`,
    deleteTask: `${URL}task/delete-task`,
    updateTask: `${URL}task/update-task`,
    // getTasksByStatus: `${URL}task/get-tasks-by-status`,
    // getTasksByTag: `${URL}task/get-tasks-by-tag`,
};

export default apiRoutes;