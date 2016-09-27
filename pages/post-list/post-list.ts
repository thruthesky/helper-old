import { Component, OnInit, Input } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { Core, app } from '../../providers/core/core';
import { AppHeader } from '../../templates/app-header';
import { Xapi } from '../../providers/xapi/xapi';
import * as xi from '../../providers/xapi/interfaces';
import * as share from '../../providers/share/share';
import { AgeCalculator } from '../../pipes/age-calculator';
import { PostEditPage } from '../post-edit/post-edit';

/*
 Generated class for the PostListPage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  templateUrl: 'build/pages/post-list/post-list.html',
  directives: [ AppHeader ],
  pipes: [ AgeCalculator ]
})
export class PostListPage implements OnInit {
  private appTitle: string;
  private posts: xi.Posts = [];
  private page: number = 0;
  private design:number = 4;
  private moreButton = [];
  private urlDefaultPrimaryPhotoBoy = "assets/img/boy.png";
  private urlDefaultPrimaryPhotoGirl = "assets/img/girl.png";
  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private alertCtrl: AlertController,
    private x: Xapi
  ) {
    console.log("PostList::constructor()");
    app.title('POST LIST', this);
  }

  onSelect(i){
    //console.log( this.moreButton[i] + " " + i );
    this.moreButton[i] = this.moreButton[i] == true ? false : true;
  }


  ngOnInit () {
    console.log("PostList::ngOnInit()");
    // console.log(this.navParams.data);

    this.getPostData();
  }

  getPostData(callback?) {
    var postQuery: xi.PostQuery = xi.postQuery;
    // debugger; // no good to use.
    postQuery.paged = ++ this.page;
    this.x.get_posts( postQuery, ( res: xi.Posts ) : void => {
        this.onRecvPostData( res );
        if ( callback ) callback();
      },
      (x) => console.log(x));
  }
  onRecvPostData ( res ) {
    console.log("PostList::onRecvPostData()");
    if ( res.success ) {
      if ( res.data && res.data.posts ) {
        let posts: xi.Posts = res.data.posts;
        if ( posts.length ) {
          posts.forEach( ( post:xi.Post ) => {
            // console.log( post.title );
            if ( post.images && post.images[0] ) {
              post.urlPrimaryPhoto = post.images[0];
            }
            else {
              if ( post.meta && post.meta.gender && post.meta.gender[0] && post.meta.gender[0] == 'F' ) {
                post.urlPrimaryPhoto = this.urlDefaultPrimaryPhotoGirl;
              }
              else {
                post.urlPrimaryPhoto = this.urlDefaultPrimaryPhotoBoy;
              }
            }
            this.posts.push( post );
            // console.log( "length: " + this.posts.length );
          });
        }
      }
      else {
        console.log("No post exists under the forum.");
      }
    }
    else {
      if ( res.data ) alert( res.data );
      else alert("Error on post list");
    }


  }


  doInfinite(infiniteScroll) {
    console.log("PostListPage::doInfinite()");
    this.getPostData( () => infiniteScroll.complete() );
  }


  onEdit( post_ID ) {
    console.log("PostListPage::onEdit() : " + post_ID );
    this.navCtrl.push( PostEditPage, { 'post_ID' : post_ID } );
  }
  onDelete( post_ID ) {
   let prompt = this.alertCtrl.create({
      title: 'Delete',
      message: "Enter password of the post",
      inputs: [
        {
          name: 'password',
          placeholder: 'Input password'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Delete',
          handler: data => {
            console.log('Delete clicked');
            this.x.delete_post( { post_ID: post_ID, password: data.password }, re => {
              prompt.dismiss();
              if ( re.success ) {
                console.log("PostListPage::onDelete() deleted");
                this.x.alert("SUCCESS", "Your post has been deleted.");
                this.navCtrl.pop();
              }
              else {
                console.log("PostListPage::onDelete() failed to delete");
                this.x.alert('ERROR', re.data );
              }
            }, err => {
              console.log("server error?...")
            })
          }
        }
      ]
    });
    prompt.present();
  }
}
