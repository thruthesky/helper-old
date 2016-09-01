export interface UserData {
    code?: string,
    session_id?: string,
    user_login?: string,
    user_nicename?: string
}
export interface UserResponse {
  success: boolean,
  data: UserData
}
export interface LoginResponse {
  success: boolean,
  data: UserData
}
export interface RegisterResponse {
  success: boolean,
  data: UserData
}



export interface UserRegisterData {
    user_login;
    user_pass;
    user_email;
    mobile;
    gender;
    birthday;
}
export let userRegisterData: UserRegisterData = {
    user_login: '',
    user_pass: '',
    user_email: '',
    mobile: '',
    gender:  '',
    birthday: ''
};