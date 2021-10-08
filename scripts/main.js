document.addEventListener('DOMContentLoaded', function(){
    // const hero = new HeroSlider('.swiper'); //適用させたいクラスを入れてあげる
    // hero.start({delay: 2000});

    // setTimeout(() => {
    //     hero.stop();
    // },5000);

    
    // const cb = function (el, isIntersecting) {
    //     if (isIntersecting) {
    //         const ta = new TweenTextAnimation(el);
    //         ta.animate();
    //     }
        
    // }

    // const so = new ScrollObserver('.tween-animate-title',cb);
    // so.destroy();

    // const _inviewAnimation = function (el, isIntersecting) {
    //     if (isIntersecting) {
    //         el.classList.add('inview');
    //     }else{
    //         el.classList.remove('inview');
    //     }
        
    // }

    // const so2 = new ScrollObserver('.cover-slide', _inviewAnimation);

    
    
    // const _navAnimation = function (el, isIntersecting) {
    //     if (isIntersecting) {
    //         header.classList.remove('triggerd');
    //     }else{
    //         header.classList.add('triggerd');
    //     }
    // }
    // // 入っている間はtriggerdを消してあげる処理

    // const so3 = new ScrollObserver('.nav-trigger', _navAnimation, {once: false});//classスクロールオブザーバーはデフォルトオプションでonce: trueに設定しているため。
    

    // new MobileMenu();
    const main = new Main();
});

class Main{
    constructor(){
        this.header = document.querySelector('.header');
        this.sides = document.querySelectorAll('.side');
        this._observers = [];
        
        this._init(); //_initの中身をインスタンス化します
    }

    set observers(val) { //valというのは中に入れる値
        this._observers.push(val); //_observersの中に変数で渡ってくるvalを入れる

    }

    get observers(){  //値を取得する方のメソッド
        return this._observers;
    }

    _init() {
        new MobileMenu();
        this.hero = new HeroSlider('.swiper');
        Pace.on('done', this._paceDone.bind(this));
        // Paceはローダーに使用しているpace.jsの中にあるメソッドの事。それがローダーが完了した際に（done）した時に、処理
    }

    _paceDone(){
        this._scrollInit();
    }

    _inviewAnimation(el, isIntersecting) {
        if (isIntersecting) {
            el.classList.add('inview');
        }else{
            el.classList.remove('inview');
        }
        
    }

    _navAnimation(el, isIntersecting) {
        if (isIntersecting) {
            this.header.classList.remove('triggerd');
        }else{
            this.header.classList.add('triggerd');
        }
    }

    _sideAnimation(el, isIntersecting) {
        if (isIntersecting) {
            this.sides.forEach(side => {
                
                side.classList.add('inview');
            });
        }else{
            this.sides.forEach(side => {
                
                side.classList.remove('inview');
            });
        }
    }

    _textAnimation(el, isIntersecting) {
        if (isIntersecting) {
            const ta = new TweenTextAnimation(el);
            ta.animate();
        }
        
    }
    
    // 画面外に出ているときはスウィパーのheroメソッドをstopしてあげる
    _toggleSlideAnimation(el, isIntersecting) {
        if (isIntersecting) {
            this.hero.start();
        }else{
            this.hero.stop();
        }
    }

    _scrollInit(){
        //this.observersとすることで、set.observersを呼ぶことに成り、valの中に右辺側があたる
        this.observers = new ScrollObserver('.nav-trigger',this._navAnimation.bind(this), {once: false});
        this.observers = new ScrollObserver('.cover-slide', this._inviewAnimation);
        this.observers = new ScrollObserver('.tween-animate-title',this._textAnimation);
        this.observers = new ScrollObserver('.swiper',this._toggleSlideAnimation.bind(this), {once: false}); //連続して監視してあげる為のonce:false
        this.observers = new ScrollObserver('.appear',this._inviewAnimation); 
        this.observers = new ScrollObserver('#main-content',this._sideAnimation.bind(this),{once:false, rootMargin: "-300px 0px"}); 
        // rootMargin　上下300px　左右0px　経った時に発火するようにする

        console.log(this.observers); //ゲットの方のメソッドが呼ばれるので、returnした値がかえってくる
        // 代入文のような記述をすれば、セットメソッドが呼ばれるし、値を取得するような記述をすれば、ゲッターメソッドが呼ばれる
        
    }
}
