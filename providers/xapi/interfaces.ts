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


export interface LoginError {
  success: boolean;
  data: 'wrong-password' | 'wrong-id';
}



export interface Category {
  id: number;
  count: number;
  description: string;
  link: string;
  name: string;
  slug: string;
  taxonomy: string;
  parent: number;
}


export interface CategoryListArgument {
  include?: string;
  search?: string;
  parent?: number;
  slug?: string;
}

export interface PostListArgument {
  page?: number;
  per_page?: number;
  search?: string;
  after?: string;
  author?: number;
  offset?: number;
  orderby?: 'date' | 'id' | 'include' | 'title' | 'slug';
  order: 'asc' | 'desc';
  slug?: string;
  categories: string;
  context?: 'view' | 'embed' | 'edit';
  author_exclude?: Array<number>;
  before?: string;
  exclude?: Array<number>;
  include?: Array<number>;
  status?: 'publish';
  filter?: Array<string>;
  tags?: string;
}

export interface Post {
  title: string;
}
export interface PostList {
  posts: Array<Post>;
}
