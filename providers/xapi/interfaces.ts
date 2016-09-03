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



/**
 * Category schema
 * @refer http://v2.wp-api.org/reference/categories/
 */
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

/**
 * Category schema array
 */
export type Categories = Array<Category>;


/**
 * Category list query arguments.
 * @refer http://v2.wp-api.org/reference/categories/
 */
export interface CategoryQueryArgument {
  include?: string;
  search?: string;
  parent?: number;
  slug?: string;
}

/**
 * 
 * post list query argument.
 * @refer http://v2.wp-api.org/reference/posts/
 */
export interface PostQueryArgument {
  page?: number;
  per_page?: number;
  search?: string;
  after?: string;
  author?: number;
  offset?: number;
  orderby?: 'date' | 'id' | 'include' | 'title' | 'slug';
  order?: 'asc' | 'desc';
  slug?: string;
  categories?: string;
  context?: 'view' | 'embed' | 'edit';
  author_exclude?: string;
  before?: string;
  exclude?: string;
  include?: string;
  status?: 'publish';
  // filter?: Array< Array<{ key: string, value: string}>>;
  tags?: string;
}

export interface Post {
  date: string;
  date_gmt: string;
  guid: { rendered: string };
  id: number;
  link: string;
  modified: string;
  modified_gmt: string;
  password: string;
  slug: string;
  status: 'publish' | 'future' | 'draft' | 'pending' | 'private';
  type: string;
  title: { rendered: string };
  content: { rendered: string };
  author: number;
  excerpt: { rendered: string };
  featured_media: number;
  comment_status: 'open' | 'close';
  ping_status: 'open' | 'close';
  format: 'standard' | 'aside' | 'chat' | 'gallery' | 'link' | 'image' | 'quote' | 'status' | 'video' | 'audio';
  sticky: boolean;
  categories: Array<number>;
  tags: Array<string>;
  _links: any;
  
}
export type Posts = Array<Post>;