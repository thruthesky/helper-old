import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AppHeader } from '../../templates/app-header';
import { Core, app } from '../../providers/core/core';
import { TranslatePipe } from 'ng2-translate/ng2-translate';
import * as xi from '../../providers/xapi/interfaces';
import { Xapi } from '../../providers/xapi/xapi';
import { Camera } from 'ionic-native';
import { AlertController } from 'ionic-angular';
import * as share from '../../providers/share/share';
import {FileUploader} from 'ng2-file-upload';

import * as _ from 'lodash';

// 
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
  private isCordova: boolean = false;

  // for n2-file-uploader
  private uploader:FileUploader = new FileUploader({ url: share.XAPI_UPLOAD_URL });
  private result:any = null;

  constructor(
    private navCtrl: NavController,
    private alertCtrl: AlertController,
    private x: Xapi
  ) {
    this.isCordova = app.isCordova;
    if ( this.isCordova ) {

    }
    else {
      this.initBrowserUpload();
    }
  }
  ngOnInit () {
    app.title( this.appTitle, this);
    this.post.first_name = 'JaeHo';
    this.post.last_name = 'Song';
    this.post.middle_name = '';
    this.post.address = 'Unit 309, 2016 st., Pasineer cor., Quezone city, Philippines.';
    this.post.password = '1234';
    this.post.mobile = '09174678603';
    this.post.birthday = '19731016';
    this.post.gender = 'M';
    this.post.title = "Title: I am looking for a japanese boss.";
    this.post.content = "Will it really give me a boss?";
    //this.onClickPost();


    let options = {
      sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: Camera.DestinationType.NATIVE_URI,
      quality: 50
    };
    Camera.getPicture( options ).then((imageData) => {
      console.log( imageData );
      this.urlPrimaryPhoto = imageData;
    }, ( message ) => {
      console.log("Error: ", message);
    });
  }

  onClickPost() {
    // console.log( this.post );
    this.post.category = 'housemaid';
    this.x.post_insert( this.post, this.onClickPostComplete,
      ( e ) => { console.log( e ); }
    );
  }
  onClickPostComplete( res: xi.Post ) {
    console.log( res );
  }

onClickPrimaryPhotoBrowser() {
  console.log("onClickPrimaryPhotoBrowser::");
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


  initBrowserUpload() {

      this.uploader.onSuccessItem = (item, response, status, headers) => {
        this.result = {
          "success": true,
          "item": item,
          "response": response,
          "status": status,
          "headers": headers
        };
        console.log( 'onSuccessItem : ', this.result );
      };
      this.uploader.onErrorItem = (item, response, status, headers) => {
        this.result = {
          "success": false,
          "item": item,
          "response": response,
          "status": status,
          "headers": headers
        };
        console.log( 'onSuccessItem : ', this.result );
      };
      this.uploader.onCompleteAll = () => {
          this.onBrowserUploadComplete();
      };
      this.uploader.onAfterAddingFile = ( fileItem ) => {
        console.log('onAfterAddingFile: ', fileItem);
        fileItem.withCredentials = false; // remove credentials
        fileItem.upload(); // upload file.
    }
  }

  /**
   * @note this method is called on file upload success.
   * 
   * @todo let mobile upload to call this method.
   */
  private onFileUpload( file: xi.FileUpload ) {
    this.urlPrimaryPhoto = file.url;
    this.post.file_id = file.id;
  }

  /**
   * This method is called when the uploaded has been finished.
   * 
   * It will do error check up.
   */
  private onBrowserUploadComplete() {
    let response = this.result.response;
    if ( response ) {

      // try {
      //   re = JSON.parse( response );
      // }
      // catch ( e ) {
      //   return this.x.error( "Failed on JSON.parse() try in onBrowserUploadComplete(). Please show this message to admin.", e);
      // }

      let re = this.x.json( response );
      if ( re.success ) this.onFileUpload( re.data );
      else return this.x.errorCode( re.data );
    }
    else return this.errorMaybeTooBigSize();
  }

  onBrowserUpload( $event ) {
    try {
      this.uploader.addToQueue( $event.target.files );
    }
    catch ( e ) {
      this.x.error( "Failed to addToQueue() onBrowserUpload()" );
    }
    finally {
      this.removeUploadIcon();
    }
  }


  removeUploadIcon() {

  }

  errorMaybeTooBigSize() {
    return this.x.error("Please check if the photo size is too big.");
  }

}
