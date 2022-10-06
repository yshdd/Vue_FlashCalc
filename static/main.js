const App = {
    data(){
        return {
            digits:1, //桁数指定
            kosuu:1, // 表示する項数
            showSec: 1, //１個の数字が表示される時間
            Nums: [],   //表示された数字を格納するリスト
            TorF: "",    //正解・不正解の表示
            msg:"",
            Num:null,   //表示される数字
            count: 0,   //何個の数字を表示したか
            timer: null, //タイマー. 画面に表示される数字の切り替えを管理
            usrAns:" ",  //ユーザーの入力した答え
            isActive: false,  //スタートボタンの状態管理
            cd_sec: 4         //カウントダウンで表示する文字列
        }
    },
    methods:{
        initialState(){
            return {
                digits:1,
                kosuu:1,
                showSec: 1,
                Nums: [],
                TorF: "",
                msg: "",
                Num:null,
                count: 0,
                timer: null,
                usrAns: " ",
                isActive: false,
                cd_sec: 4
            }
        },
        //スタートボタンをクリックした後の挙動
        StartFlash(){
            if (!this.isActive){
            this.isActive = true;
            this.digits = document.flash.set1.value;
            this.kosuu = document.flash.set2.value;
            this.showSec = document.flash.set3.value;
            
            console.log(this.kosuu);
            //カウントダウンスタート
            this.countDown();

            //this.timer = setInterval(this.showNums, this.showSec*1000);
            //this.showNums();
            }
        },
        //画面に数字を表示させるメソッド
        showNums(){
            this.count += 1;
            if (this.kosuu < this.count ){
                this.stopFlash();
            }
            else{
                let r = Math.random();
                r = Math.floor(r * Math.pow(10,this.digits));
                this.Num = r;
                this.Nums.push(r);

                this.timer = setTimeout(this.showBlank, this.showSec*1000);
            }
            
        },
        //数字の間に空白を入れ、同じ数字が連続してもわかるようにする
        showBlank(){
            this.Num = "";
            this.timer = setTimeout(this.showNums, 100);
        },
        //Flashを停止するメソッド
        stopFlash(){
            clearInterval(this.timer);
            //document.flash.b_start.disabled = false;
            console.log("stop Flash");
            let total = this.Nums.reduce((sum, ele)=>sum+ele, 0);
            console.log(this.Nums, total);
            this.Num = null;
            console.log(this.isActive);
        },

        checkAns(){
            let input_num = document.ans.usrAns.value;
            //let input_num = this.$ref.ans.usrAns.value;
            //console.log(this.userAns, document.ans.usrAns.value, input_num);
            if(!isNaN(input_num)){
                let total = this.Nums.reduce((sum, ele)=>sum+ele, 0);
                this.usrAns = Number(input_num);
                console.log(this.usrAns);
                if(this.usrAns == total){
                    let arr = "";

                    //this.msg = `正解!:\n ${this.Nums}の和は${total}です`
                    this.TorF = '正解!!';
                    this.msg = '['+ this.Nums + ']の和は'+total+'です。'
                }else{
                    //this.msg = `不正解:\n ${this.Nums}の和は${total}です`
                    this.TorF = '不正解!';
                    this.msg = '['+ this.Nums + ']の和は'+total+'です。'
                }

            }else{
                this.msg = "整数を入力"
                this.userAns = 0;
            }
        },
        reset(){
            this.$refs.ans.reset();
            //Object.keys(this.$data).forEach(key => delete this.$data[key])
            Object.assign(this.$data, this.initialState());
        },

        //カウントダウン機能
        countDown(){
            display = ["スタート", "➀", "②", "③"]
            this.cd_sec -= 1;
            if (this.cd_sec>=0){
                this.Num = display[this.cd_sec];
                this.timer = setTimeout(this.countDown, 800);
            }else{
                //カウントダウン終了後、暗算する数字の表示を開始する
                this.timer = setTimeout(this.showNums, 500);
            }

        }
    },
    
}
Vue.createApp(App).mount('#app')