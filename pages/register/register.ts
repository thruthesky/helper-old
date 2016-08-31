import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AppHeader } from '../../templates/app-header';
import { TranslatePipe } from 'ng2-translate/ng2-translate';
import { Xforum } from '../../providers/xforum/xforum';
import { Core, app } from '../../providers/core/core';
@Component({
  templateUrl: 'build/pages/register/register.html',
  providers: [ Xforum ],
  directives: [ AppHeader ],
  pipes: [ TranslatePipe ]
})
export class RegisterPage {

  private appTitle: string = 'R...';
  
  private user_login;
  private user_pass;
  private user_email;
  private mobile;
  private gender;
  private birthday;

  constructor(private navCtrl: NavController,
    private x: Xforum
  ) {
    console.log('RegisterPage::constructor()');
    app.title( 'register.title', this);
  }


  onClickRegister() {
    console.log('RegisterPage::onClickRegister()');

    let user =  {
      user_login: this.user_login,
      user_pass: this.user_pass,
      user_email: this.user_email,
      mobile: this.mobile,
      birthday: this.birthday,
      gender: this.gender
    };

    this.x.register(user, (re) => {
      if ( re.success ) {
        console.log("RegisterPage::onClickRegister::success");
        Core.set( 'user', user, () => { } );
      }
      else {
        console.log("RegisterPage::onClickRegister::error");
      }
    });


    // let data = "forum=user_register&user_login="+this.user_login+"&user_pass="+this.user_pass+"&user_email="+this.user_email+"&birthday=19731016&gener=M";
    // let url = "http://wordpress46b1.org/index.php?" + data;

    // this.http.get( url ).subscribe( (res) => console.log(res.json()) );

    //this.http.get( url ).toPromise().then( (res) => console.log(res.json()) );

  }

}
