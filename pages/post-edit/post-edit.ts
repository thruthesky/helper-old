import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AppHeader } from '../../templates/app-header';
import { Core, app } from '../../providers/core/core';
import { TranslatePipe } from 'ng2-translate/ng2-translate';
import * as xi from '../../providers/xapi/interfaces';
import { Xapi } from '../../providers/xapi/xapi';
import * as share from '../../providers/share/share';
import { Camera } from 'ionic-native';
import { AlertController } from 'ionic-angular';



/*
  Generated class for the PostEditPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/post-edit/post-edit.html',
  directives: [ AppHeader ],
  providers: [ Xapi ],
  pipes: [ TranslatePipe ]
})
export class PostEditPage {
  private appTitle: string = 'POSTWRITE';
  private post: xi.PostEdit = <xi.PostEdit> {};
  private urlPrimaryPhoto: string = "assets/img/person.jpg";
  constructor(
    private navCtrl: NavController,
    private alertCtrl: AlertController,
    private x: Xapi
  ) {
  }
  ngOnInit () {
    app.title( this.appTitle, this);
    this.post.first_name = 'JaeHo';
    this.post.last_name = 'Song';
    this.post.middle_name = '';
    this.post.address = 'Unit 309, 2016 st., Pasineer cor., Quezone city, Philippines.';
    this.post.password = '1234';
    this.post.mobile = '09174678603';
    this.post.birthday = '1973/10/16';
    this.post.gender = 'M';
    this.post.title = "Title: I am looking for a japanese boss.";
    this.post.content = "Will it really give me a boss?";
    this.onClickPost();

  Camera.getPicture({destinationType: 2, saveToPhotoAlbum:true}).then((imageData) => {
    // imageData is either a base64 encoded string or a file URI
    // If it's base64:
      let base64Image = 'data:image/jpeg;base64,' + imageData;
        console.log( imageData );
        this.urlPrimaryPhoto = imageData;
      }, (err) => {
    // Handle error
    });
  }

  onClickPost() {
    // console.log( this.post );
    this.post.category = 'housemaid';
    this.x.post_insert( this.post,
      ( res: xi.Post ) => { console.log( res ); },
      ( e ) => { console.log( e ); }
    );

  }

 onClickPrimaryPhoto() {
    let confirm = this.alertCtrl.create({
      title: 'PHOTO UPLOAD',
      message: 'Do you want to take photo? or choose photo from gallery?',
      cssClass: 'alert-primary-photo',
      buttons: [
        {
          text: 'Camera',
          handler: () => {
            console.log('camera clicked');
          }
        },
        {
          text: 'Gallery',
          handler: () => {
            console.log('gallery clicked');
          }
        },
        {
          text: 'Cancel',
          handler: () => {
            console.log('cancel clicked');
          }
        }
      ]
    });
    confirm.present();
  }
}
