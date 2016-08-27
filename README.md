# helper
House helper app

# TODO


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