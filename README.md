# helper
House helper app

# TODO

## IE "Unhandled promise rejection, Syntax error, Zone"

* refer : https://docs.google.com/document/d/14L_h4G4OQaIepy470G1zSrenzj7KA9QOL0A8BA_3dUk/edit#heading=h.3xaxvn2cubay



## Cache for posts

일반적으로 LocalStorage 는 약 5M 의 용량이 가능한데,

보통 글 하나에 1KBytes 내외라면,

약 5 천개의 글을 쓸 수 있다.

이정도면 충분하다.

* 처음 접속시, 최근 1천개의 글과 그 코멘트들을 다운로드 한다.
* 최근 2천개의 글을 유지하고 더 많은 데이터를 보기 위해서는 인터넷에 연결해야 한다고 한다.
* 용량이 다 차면, 기존의 데이터를 제거하는 루틴을 만든다.



  
## Is it bug that on deskstop browser, click event on list-item is not fired on first click. it works on second click.

* double check this error.

## back-button
It is okay not to show back-button on top.
but when a user touches back-button on the device, the back button should work.


## What to do on next

* Philippines App
refer : http://dev.withcenter.com/wordpress/2016/09/21/philippines-app/ 

* Homebase Enlgish Teacher
refer : http://dev.withcenter.com/wordpress/2016/09/21/homebased-english-teachers-app/


* English Tutorial App
refer :http://dev.withcenter.com/wordpress/2016/09/21/english-app-online-english-tutorial-app/


## don't move when home button clicked if the user is at home already.


## Put back button on top left. "<-"

Ionic 2's natural navigation is to use "<-" back button.

But somehow it disappeared.

put it back.

## Translate all language

* by web view language
* by user's choice


# INSTALLATION

## replace app folder with http://github.com/thruthesk/helper

  rm -rf app
  git clone https://github.com/thruthesky/helper app


## install NG2-Translate for ionic 2

  npm install ng2-translate@2.2.2 --save --save-exact

## install lodash

  npm install -g typings
  npm install lodash --save
  typings install lodash --save


## install file upload for web browser.

  npm install ng2-file-upload --save
  


## copy gulpfile

* linux / mac
cp app/etc/install/gulpfile.js . 

* windows
copy app\etc\install\gulpfile.js .


## install npm modules

npm install


## uninstall browser platform before installing camera plugin

ionic platform rm browser

## install camera plugin

  ionic plugin add cordova-plugin-camera

## install browser platform after comera plugin

ionic platform add browser



## Option : Live Reload on Browser Platform

This is an option.

* see : https://docs.google.com/document/d/1DSNPw2De2kkjfhTXwvBgdjc0pCPDu8_XoOUBxeW4Mm8/edit#heading=h.oemfaqquhmhh

### Copy app/etc/install/ionic.config.json to app root at your own risk.

This will cause problem.

If you don't know what you are doing, don't do it.



# Coding Guide


## 워드프레스와 동일한 함수를 사용한다.

  그래야지만 워드프레스 공부를 같이 할 수 있다.

  함수명, 인자, 기능을 동일하게 맞춘다.

  예를 들어 함수명을 파스칼 형식으로 하지 말고 그냥 워드프레스 방식으로

  'get_post()' 와 같이 사용한다. 'getPost()' 와 같이 하지 않는다.

## How to get categories from wordpress



* it is important to use 'res.forEach(...)', because we don't know which one will resoved first.

    private categories: Array<xi.Category> = [];

    var catQuery: xi.CategoryQueryArgument = {};
    catQuery.search = "its";
    this.x.get_categories( catQuery, (res: xi.Categories) : void => {
      res.forEach( c => this.categories.push( c ) );
    },
    (x) => console.log(x));
    catQuery.search = "my";
    this.x.get_categories( catQuery, (res: xi.Categories) : void => {
      res.forEach( c => this.categories.push( c ) );
    },
    (x) => console.log(x));


## How get posts from wordpress


    var postQuery: xi.PostQueryArgument = {};
    this.x.get_posts( postQuery, ( res: xi.Posts ) : void => {
      console.log(res);
    },
    (x) => console.log(x));

## Component and Service Initialization

@todo fix problem.

Since every component and service instantiates on every view,

  code that must be initialized only one time should be coded like below.


## Language Tranlsation

This is a wrapper of NG2-Translate and is more handy to use.

* You don't have to put 'translate.setDefaultLang()', 'translate.use()' on every component class.


### prep

  import { Language, TranslatePipe } from '../../providers/language/language';
  @Component({
    providers: [Language],
    pipes: [TranslatePipe]
  })

### service

  constructor( private language: Language) {
      language.get('forum.title', (re)=> this.appTitle = re);
    language.get('forum.title', {name: 'QnA'}, (re)=> this.appTitle = re);
  }


### pipe

  {{ 'forum.title' | translate:{name: 'Free Talk'} }}


## Settings

If user language has chagned, all the language in all page has to change.

It is not a good idea to refresh or reload the app since it takes loading time and it flashes.

But when it comes to change the language in all page, it looks 'reloading' is the most convient way to set all the languages.

so, changing language is an exception to reload the app.

## Core

### Core event

    constructor( private core: Core ) {
        Core.event.subscribe( ( x: string ) => this.coreEvent( x ));
    }
    coreEvent( x: string ) {
        if ( x == 'language-set' ) this.translate();
    }

## Lifecycle of Language Setting.

* core.ts will initialize 'lanugage' only one time on its very first instantiation and reuse it.

* home.ts 
