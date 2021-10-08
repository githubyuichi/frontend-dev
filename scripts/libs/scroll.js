class ScrollObserver {
    constructor(els, cb, options){
        this.els = document.querySelectorAll(els);
        const defaultOptions = {
            root: null,
            rootMargin: "0px",
            threshold: 0,
            once: true
        };
        this.cb = cb;
        this.options = Object.assign(defaultOptions,options);  //Object.assign　第一引数に元となる配列群を入れ、第二引数に渡ってくる配列を入れる。第一引数はdefalutのようなもので、第二引数は各自設定が出来、上書きがされるようなもの
        this.once = this.options.once;  //once: true が上書きされなければ、そのままthis.onceはtrueになる。if文のunobserveは起動する。
        this._init();  //_initに分けた理由としてはconstruct内では入れる処理を書くため、ここでは関数を実行する分を書いて、他で関数として書くようにするのが一般的
    }

    _init(){
        const callback = function (entries, observer) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.cb(entry.target,true);  //isIntersecting trueであれば交差している

                    if (this.once) {
                        observer.unobserve(entry.target);
                    }
                    
                } else {
                    this.cb(entry.target,false);
                }
            });
        };

        this.io = new IntersectionObserver(callback.bind(this), this.options); //callback内にあるthisは、window.intersectionobserverの方を参照してしまうので、bindが必要です。thisを付けることで、constrctor内のoptionsを参照します
        this.io.POLL_INTERVAL = 100;  //スクロールをms毎に監視。polyfillを使ってintersebtionobserverが機能しない環境でも補完してあげよう。
        
        this.els.forEach(el => this.io.observe(el));
    }

    destroy() {
        this.io.disconnect();  //intersectionobserverの監視が止まる

    }
}