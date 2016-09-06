import { HomePage } from '../../pages/home/home';
import { LoginPage } from '../../pages/login/login';
import { RegisterPage } from '../../pages/register/register';
import { ForumPage } from '../../pages/forum/forum';
import { SettingPage } from '../../pages/setting/setting';
import { PostEditPage } from '../../pages/post-edit/post-edit';
import { PostListPage } from '../../pages/post-list/post-list';
import { PolicyPage } from '../../pages/policy/policy';


interface PanelMenu {
  title: string;
  component: any;
  icon?:string;
}


export type PanelMenus = Array<PanelMenu>;

export let panelMenus: PanelMenus = [
      // { title: 'HOME',      component: HomePage, icon : 'home' },
      { title: 'FORUM',     component: PostListPage, icon : 'chatboxes' },
      { title: 'POST',  component: PostEditPage, icon : 'create' },
      //{ title: 'LOGIN',     component: LoginPage, icon : 'person-add' },
      { title: 'POLICY',     component: PolicyPage, icon : 'person-add' },
      { title: 'SETTING',   component: SettingPage, icon : 'options' }
      // { title: 'REGISTER',  component: RegisterPage },

    ];




export const category: string = 'housemaid';

