import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Core, app } from '../../providers/core/core';
import { AppHeader } from '../../templates/app-header';
import { Xapi } from '../../providers/xapi/xapi';
import * as xi from '../../providers/xapi/interfaces';
/*
  Generated class for the PostListPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/post-list/post-list.html',
  directives: [ AppHeader ]
})
export class PostListPage implements OnInit {
  private appTitle: string;
  private posts: xi.Posts = [];
  private page: number = 0;
  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private x: Xapi
  ) {
    console.log("PostList::constructor()");
    this.appTitle = this.navParams.get('name') ;
  }


  ngOnInit () {
    console.log("PostList::ngOnInit()");
    // console.log(this.navParams.data);


    this.getPostData();
  }

  getPostData(callback?) {
    var postQuery: xi.PostQueryArgument = {};
    postQuery.categories = this.navParams.data.id;
    postQuery.per_page = 10;
    postQuery.page = ++ this.page;
    this.x.get_posts( postQuery, ( res: xi.Posts ) : void => {
      this.onRecvPostData( res );
      if ( callback ) callback();
    },
    (x) => console.log(x));
  }
  onRecvPostData ( posts: xi.Posts ) {
    console.log("PostList::onRecvPostData()");
    posts.forEach( ( post:xi.Post ) => {
      console.log(post.title.rendered);
      this.posts.push( post );
      console.log( "length: " + this.posts.length );
    });
  }


  doInfinite(infiniteScroll) {
    console.log("PostListPage::doInfinite()");
    this.getPostData( () => infiniteScroll.complete() );
  }



}
