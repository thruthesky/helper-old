import { HomePage } from '../../pages/home/home';
import { LoginPage } from '../../pages/login/login';
import { RegisterPage } from '../../pages/register/register';
import { ForumPage } from '../../pages/forum/forum';
import { SettingPage } from '../../pages/setting/setting';
import { PostEditPage } from '../../pages/post-edit/post-edit';


interface PanelMenu {
  title: string;
  component: any;
  icon?:string;
}

export type PanelMenus = Array<PanelMenu>;

export let panelMenus: PanelMenus = [
      { title: 'HOME',      component: HomePage, icon : 'home' },
      { title: 'LOGIN',     component: LoginPage, icon : 'person-add' },
      { title: 'FORUM',     component: ForumPage, icon : '' },
      { title: 'SETTING',   component: SettingPage },
      { title: 'REGISTER',  component: RegisterPage },
      { title: 'POSTEDIT',  component: PostEditPage }
    ];
