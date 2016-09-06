# helper
House helper app

# TODO


## Is it bug that on deskstop browser, click event on list-item is not fired on first click. it works on second click.

## back-button
It is okay not to show back-button on top.
but when a user touches back-button on the device, the back button should work.


## 재택 강사 앱을 따로 만든다.

## 필리핀 앱을 만든다.

헬로필리핀과 나란히 명칭이 "필리핀앱" 인 필리핀앱을 만든다.


## 화상영어 앱 개발.
  * 홈페이지가 워드프레스로 되어져 있으므로, 앱과 워드프레스 글/질문/요청 연결.
  * 앱에 화상솔루션 추가.
  * 선생님 정보 목록, 수업 시간표 확인, 신청, 등.
  * 영어 퀴즈 작성.
  * 영어 회화 교재 작성해서 넣음.
  * 한마디로 토탈 영어 공부 앱.

## 문제 발생.

* 컴포넌트 view 를 보여 줄 때마다, 새로운 컴포넌트 instance 를 생성한다.

  * 이 때, root @Component decorator 에서만 providers 로 service 를 한번만 instance 를 생성하고, 다른 컴포넌트에서는 service 인스턴스를 생성하지 않고 그냥 static 속성만 사용한다.
  * Core 가 바로 그러하다.
  * 이러한 문제는 service 의 constructor() 에 코드가 많이 입력되면 발생한다. 가능한 한 constructor() 에 코드를 넣지 않는다.

* 문제: root component 에서 this.platform.ready.then() 이 호출 되기 전에 DB 접속을 한다.
  * 즉, this.platform.ready().then() 이 호출되어야 plugin 이 사용가능하다고 하는데, 실제로 웹 브라우저에서는 그 전에 plugin 이 사용 가능 한 것 같다.
  * this.platform.ready().then() 이 전에 plugin 이 사용가능한지 확인을 한번 한다.

* 문서화:
  * circular 방식으로 컴포넌트를 import 하고 내부적으로 사용하면, ( 컴포넌트에서 자식 컴포넌트를 포함하는데, 자식 컴포넌트에서 부모 컴포넌트를 import 하려 할 때 에러 발생. )
    온갖 에러가 발생한다.
    * 문제: home.ts 와 app-header.ts 역시 circular 호출인데, 에러가 안난다.
    특히, Unexpected directive value 'undefined' on the View of component 'LoginPage' 와 같은 에러가 발생한다.

  * 또한
    import { NavController } from 'ionic-angular'; // 와 같이하고,
    providers: [ NavController ], // 와 같이하면,

    Uncaught EXCEPTION: Error in ./AppHeader class AppHeader - inline template 4:20 ORIGINAL EXCEPTION: TypeError: this.navCtrl.setRoot is not a function at AppHeader.onClickHome 와 같이 에러가 난다.

    어떤 때에 providers: [...] 에 추가를 해야하는지 말아야하는지,

    또한 에러 메세지가 providers: [ ... ] 와 관련이 없는 메세지라서 에러 메세지 해결이 너무 힘들다.
    

## create wordpress tables.

  * create all the wordpress tables onto app db.
    * first download 50 latest posts with and 10 per each category.
    * after 1 minutes from last download, do the same over and over again.
  * and show posts from load db.
  * show only from local db !!
    * Even if it has to download from remote server, save into local db and display from local db.



## don't move when home button clicked if the user is at home already.


## Put back button on top left. "<-"

Ionic 2's natural navigation is to use "<-" back button.

But somehow it disappeared.

put it back.

## Translate all language

* by web view language
* by user's choice

## 의문점

app.html 의 menu 가 어떤 과정을 거쳐서 메인에 포함되는 것인가?


# INSTALLATION

## replace app folder with http://github.com/thruthesk/helper

  rm -rf app
  git clone https://github.com/thruthesky/helper app


## install NG2-Translate for ionic 2

  npm install ng2-translate@2.2.2 --save --save-exact

## install camera plugin

  ionic plugin add cordova-plugin-camera

## Do not install lodash.

* We will not use external functional functions like Underscore or Lodash.
* ES6 is good enough without Underscore or Lodash.


  // ## install lodash
  // npm install lodash --save
  // typings install lodash --save


## copy gulpfile

* linux / mac
cp app/etc/install/gulpfile.js . 

* windows
copy app\etc\install\gulpfile.js .

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


  export class AppHeader {
    static initialized: boolean = false;
  static sub: any;
    constructor( ... ) {
        
      if ( this.init() ) {
        SettingPage.sub.unsubscribe();
      }
      SettingPage.sub = Core.event.subscribe( (x: string) => this.coreEvent(x) );

    }
    
    init() : boolean {
        if ( AppHeader.initialized ) {
            console.log('AppHeader::constructor() : already initialized !');
            return true;
        }        
        else {
            AppHeader.initialized = true;
            console.log('AppHeader::constructor() : initializing');
            return false;
        }
    }

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
