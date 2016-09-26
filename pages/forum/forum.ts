import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AppHeader } from '../../templates/app-header';
import { TranslatePipe } from 'ng2-translate/ng2-translate';
import { Core, app } from '../../providers/core/core';
import { Xapi } from '../../providers/xapi/xapi';
import * as xi from '../../providers/xapi/interfaces';
import { PostListPage } from '../post-list/post-list';
@Component({
  templateUrl: 'build/pages/forum/forum.html',
  directives: [ AppHeader, PostListPage ],
  pipes: [TranslatePipe]
})
export class ForumPage implements OnInit {
  private appTitle: string = "Forum";
  private categories: xi.Categories = [];
  constructor(
    private navCtrl: NavController,
    private x: Xapi
  ) {
    console.log("ForumPage::constrcutor()");
    app.title( 'forum.title', this );
    // Core.translate( 'forum.title', (x) => this.appTitle = x );
    // language.get('forum.title', (x)=> this.appTitle = x);

  }


  ngOnInit () {
    console.log("ForumPage::ngOnInit()");
    var catQuery: xi.CategoryQueryArgument = {};
    catQuery.search = "its";
    this.x.get_categories( catQuery, (res: xi.Categories) : void => {
      res.forEach( c => this.categories.push( c ) );
      //this.testOpenPostListPage();
    },
    (x) => console.log(x));
    catQuery.search = "my";
    this.x.get_categories( catQuery, (res: xi.Categories) : void => {
      res.forEach( c => this.categories.push( c ) );
    },
    (x) => console.log(x));

/*
    var postQuery: xi.PostQueryArgument = {};
    this.x.get_posts( postQuery, ( res: xi.Posts ) : void => {
      console.log(res);
    },
    (x) => console.log(x));
*/

  }

  testOpenPostListPage( ) {
    console.log( "ForumPage::testOpenPostListPage()");
    let index = this.categories.findIndex( (x:xi.Category) => x.id == 223 );
    let category = this.categories[ index ];
    console.log ( category );
    setTimeout ( () => this.navCtrl.push( PostListPage, category ), 1000 );
    setTimeout ( () => this.navCtrl.push( PostListPage, category ), 2000 );
  }


  


  onClickForum( category: xi.Category ) {
    console.log( category );
    this.navCtrl.push ( PostListPage, category );
  }
}
