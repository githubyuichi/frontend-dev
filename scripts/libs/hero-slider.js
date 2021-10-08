class HeroSlider {
    constructor(el){
        this.el = el;
        this.swiper = this._initSwiper();
    }

    _initSwiper(){
                        //元々、this.elは'swiper'があった。  
        return new Swiper(this.el, {
            // Optional parameters
            // direction: 'vertical',
            loop: true,
            grabCursor: true, //カーソルがポインターになる
            effect: 'coverflow', //fadeも可
            centeredSlides: true, //sliderを中央揃えになる。
            slidesPerView: 1,  //表示されるスライダーにいくつの画像を表示するか
            speed: 1000, //スライドからスライドに移行するdurationが1000

            breakpoints: {  //ブレークポイントを作ることで、1024pxの大きさになったらslidesPerViewを 2に変更する
                1024: {
                    slidesPerView: 2,
                }
            },
            // autoplay: { //自動でスライドが切り替わるようにする
            //     delay: 4000, //4sごとにスライドが切り替わる
            //     disableOnInteraction: false //マウスでスライドをした場合でも、自動プレイするように
            // }
        });
    }

    start(options = {}){
        options = Object.assign({
            delay: 4000,
            disableOnInteraction: false
        },options);  //optionsで渡されたやつと、delay等をマージ（統合）する。

        this.swiper.params.autoplay = options;
        this.swiper.autoplay.start();
    }
    stop(){
        this.swiper.autoplay.stop();
    }
}
