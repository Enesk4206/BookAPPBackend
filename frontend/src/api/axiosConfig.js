import axios from "axios";


const api = axios.create({
    baseURL:'http://localhost:8080/api',
    headers:{
        "Content-Type":'application/json',
    },
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if(token){
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
})


api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error.response &&
      (error.response.status === 401 || error.response.status === 403) &&
      window.location.pathname !== "/login"
    ) {
      localStorage.removeItem("token");

      // AuthContext'i logout'a zorlamak için event dispatch et
      window.dispatchEvent(new Event("jwt-expired"));

      // Burada window.location.href yerine React Router ile yönlendirme yapacağız
      // Bu yüzden aşağıdaki kısmı kaldır veya devre dışı bırak
      // setTimeout(() => {
      //   window.location.href = "/auth/login";
      // }, 100);

      return Promise.reject(error);
    }

    return Promise.reject(error);
  }
);


export default api;