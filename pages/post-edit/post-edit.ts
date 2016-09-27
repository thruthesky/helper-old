import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AppHeader } from '../../templates/app-header';
import { Core, app } from '../../providers/core/core';
import { TranslatePipe } from 'ng2-translate/ng2-translate';
import * as xi from '../../providers/xapi/interfaces';
import { Xapi } from '../../providers/xapi/xapi';
import { Camera, Transfer } from 'ionic-native';
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

  private design: number = 2;

  // for n2-file-uploader
  private uploader:FileUploader = new FileUploader({ url: share.XAPI_UPLOAD_URL });
  private result:any = null;


  // cordova plugin file Transfer
  private fileTransfer: Transfer;


  // post edit id
  private post_ID: number = 0;
  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private alertCtrl: AlertController,
    private x: Xapi
  ) {
    this.isCordova = app.isCordova;
    //this.isCordova = true;
    if ( this.isCordova ) {
      this.initAppUpload(); // app file upload routine is different from web browser.
    }
    else {
      this.initBrowserUpload();
    }


    this.post.single_image = 1;
    console.log( "PostEditPage::constructor()");
    this.post_ID = this.navParams.get('post_ID');
    if ( this.post_ID ) {
      console.log("PostEditPage:: post edit ID=" + this.post_ID);
      this.loadPost(this.post_ID);
    }
  }
  initAppUpload() {
  }
  ngOnInit () {
    app.title( this.appTitle, this);
    /*
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
    //this.onClickPost();

*/
  }

  appFileUpload( filepath : string ) {
    console.log( 'appFileUpload()', filepath );
    this.fileTransfer = new Transfer();
    let options: any;
    options = {
      fileKey: 'file',
      fileName: 'name.jpg',
      headers: {}
    };

    this.fileTransfer.upload( filepath, share.XAPI_UPLOAD_URL, options)
      .then( res => {
        console.log('success', res );
        let re; // result of json parse
        try {
          re = JSON.parse( res.response );
        }
        catch ( e ) {
          this.x.error("JSON parse error on fileTransfer.uploader()");
          return;
        }

        console.log( re );
        this.urlPrimaryPhoto = re.data.url;
        this.onFileUpload( re.data );

      },
      error => {
        console.log('error', error);
      });
  }

  onClickPost() {
    // console.log( this.post );
    this.post.category = 'housemaid';
    this.x.post_insert( this.post, (res) => this.onClickPostComplete(res), (res) => this.onClickPostServerError( res ) );
  }

  onClickPostComplete( res: xi.PostResponse ) {
    console.log( res );
    if ( res.success ) {
      this.x.alert("SUCCESS", "Post upload success");
      this.navCtrl.pop();
    }
    else {
      this.x.alert("ERROR", res.data);
    }
  }

  onClickPostServerError( res ) {
    this.x.error( "Error on Post. Please check if the backend server is alive.", res );
    console.log( res );
  }

onClickPrimaryPhotoBrowser() {
  console.log("onClickPrimaryPhotoBrowser::");
}

 onClickPrimaryPhotoApp() {


    let confirm = this.alertCtrl.create({
      title: 'PHOTO UPLOAD',
      message: 'Do you want to take photo? or choose photo from gallery?',
      cssClass: 'alert-primary-photo',
      buttons: [
        {
          text: 'Camera',
          handler: () => this.onClickCameraButton()
        },
        {
          text: 'Gallery',
          handler: () => this.onClickGalleryButton()
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



  onClickCameraButton() {
    console.log('onClickCameraButton()');
    this.appTakePhoto( Camera.PictureSourceType.CAMERA);
  }
  onClickGalleryButton() {
    console.log('onClickGalleryButton()');
    this.appTakePhoto( Camera.PictureSourceType.PHOTOLIBRARY );
  }

  appTakePhoto( type: number ) {
    let options = {
      sourceType: type,
      destinationType: Camera.DestinationType.NATIVE_URI,
      quality: 100
    };
    Camera.getPicture( options ).then((imageData) => {
      console.log( imageData );
      //this.urlPrimaryPhoto = imageData;
      this.appFileUpload( imageData );
    }, ( message ) => {
      console.log("Error: ", message);
    });
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
    else return this.errorMaybeServerError();
  }

  /**
   * This is called when a user selected a file to upload.
   */
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

  errorMaybeServerError() {
    return this.x.error("Please check if file server is alive and check if the photo size is too big.");
  }

  loadPost( post_ID ) {
    this.x.get_post( post_ID, re => {
      console.log( "PostEditPage::loadPost() success callback. ", re );
      let post = re.data;
      let m = post.meta;

      this.post.first_name = m.first_name ? m.first_name[0] : '' ;
      this.post.last_name = m.last_name ? m.last_name[0] : '';
      this.post.middle_name = m.middle_name ? m.middle_name[0] : '';
      this.post.address = m.address ? m.address[0] : '';
      this.post.mobile = m.mobile ? m.mobile[0] : '';
      this.post.birthday = m.birthday ? m.birthday[0] : '';
      this.post.gender = m.gender ? m.gender[0] : '';
      this.post.title = post.post_title ? post.post_title : '';
      this.post.content = post.post_content ? post.post_content : '';
      this.post.ID = this.post_ID;

      if ( post.images ) {
        if ( post.images[0] && post.images[0].guid ) {
          this.urlPrimaryPhoto = post.images[0].guid;
        }
      }
    },
    err => {
      console.log( "PostEditPage::loadPost() error callback. This may be a server error.", err );
    });
  }
}
