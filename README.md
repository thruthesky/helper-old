# helper
House helper app

# TODO

## 문제 발생.

* event emitting 을 통해서 작업하는 것이 쉽고 편리하지만, 매우 복잡해 진다.

* 가능하면 event emitting 을 쓰지 않는다.

* 특히 로그인 확인 및 언어 번역에서 event emitting 을 쓰지 않는다.

  * 그냥 각 컴포넌트에서 db 접속 한번만 하면 되는 것이다.

* 새로운 view 에서 모든 service 와 관련 컴포넌트가 새로 생성되는 것이 기본 원칙이다.

* 따라서 그냥 모든 service 와 컴포넌트가 새로 생성되게 한다.

* db 접속 같은 경우만 클래스에서 static 으로 하고 constructor 에서 중복 접속을 피한다.



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


## Do not install lodash.

* We will not use external functional functions like Underscore or Lodash.
* ES6 is good enough without Underscore or Lodash.


  // ## install lodash
  // npm install lodash --save
  // typings install lodash --save


## copy gulpfile

cp app/etc/install/gulpfile.js .


# Coding Guide

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
