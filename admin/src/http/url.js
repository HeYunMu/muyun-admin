// login
export const USER_LOGIN = "/admin/login";
export const CHECK_USER_IS_LOGIN = "/admin/islogin";

// user
export const ADMIN_USER_LIST = "/admin/auth/users";
export const ADMIN_USER_CHANGE = "/admin/auth/user";
// export const ADMIN_USER_STATUS = "/admin/auth/user/status";
export const ADMIN_USER_PASS = "/admin/auth/user/pass";

// role
export const ADMIN_ROLE_LIST = "/admin/auth/roles";
export const ADMIN_ROLE_CHANGE = "/admin/auth/role";
export const ADMIN_ROLE_DELETE = (id) => `/admin/auth/role/${id}`;
