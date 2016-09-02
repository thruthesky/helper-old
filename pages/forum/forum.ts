import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AppHeader } from '../../templates/app-header';
import { TranslatePipe } from 'ng2-translate/ng2-translate';
import { Core, app } from '../../providers/core/core';
import { Xapi } from '../../providers/xapi/xapi';
import * as xi from '../../providers/xapi/interfaces';
@Component({
  templateUrl: 'build/pages/forum/forum.html',
  directives: [ AppHeader ],
  pipes: [TranslatePipe]
})
export class ForumPage implements OnInit {
  private appTitle: string = "Forum";
  private categories: Array<xi.Category> = [];
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
    
    let args: xi.CategoryListArgument = {};
    args.search = "its";
    this.x.get_categories( args, (res: Array<xi.Category>) => {
      res.forEach( c => this.categories.push( c ) );
    });
    args.search = "my";
    this.x.get_categories( args, (res: Array<xi.Category>) => {
      res.forEach( c => this.categories.push( c ) );
    });
    
  }
}
