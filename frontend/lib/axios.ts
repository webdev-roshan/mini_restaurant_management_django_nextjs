import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8000/api',
    withCredentials: true,
});

let isRefreshing = false;
let failedQueue: { resolve: (token?: any) => void; reject: (err: any) => void }[] = [];

const processQueue = (error: any, token: any = null) => {
    failedQueue.forEach(prom => {
        if (error) prom.reject(error);
        else prom.resolve(token);
    });
    failedQueue = [];
};

axiosInstance.interceptors.response.use(
    res => res,
    async error => {
        const originalRequest = error.config;

        if (!originalRequest || !error.response) return Promise.reject(error);

        if (
            originalRequest.url.includes('/auth/refresh/') ||
            originalRequest.url.includes('/auth/login/') ||
            originalRequest.url.includes('/auth/register/')
        ) {
            return Promise.reject(error);
        }

        if (error.response.status === 401 && !originalRequest._retry) {
            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                }).then(() => axiosInstance(originalRequest));
            }

            originalRequest._retry = true;
            isRefreshing = true;

            try {
                await axiosInstance.post('/auth/refresh/');
                processQueue(null);
                return axiosInstance(originalRequest);
            } catch (err) {
                processQueue(err, null);
                return Promise.reject(err);
            } finally {
                isRefreshing = false;
            }
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;
