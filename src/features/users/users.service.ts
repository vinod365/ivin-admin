import axiosInterceptorInstance from "@/config/axios";

export const createUser = (user: { email: string; name: string }) => {
  axiosInterceptorInstance.post("/users", user);
};

export const getUser = (email: string) => {
    axiosInterceptorInstance.get(`/users/${email}`)
}
