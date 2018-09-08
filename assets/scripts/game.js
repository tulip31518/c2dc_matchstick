// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },

        daily_gift:{
            default:null,
            type: cc.Node
        },

        btn_sound:{
            default:null,
            type: cc.Node
        },

        btn_cap:{
            default:null,
            type: cc.Node
        },

        btn_bucket:{
            default:null,
            type: cc.Node
        },

        btn_share:{
            default:null,
            type: cc.Node
        },

        level_pan:{
            default:null,
            type: cc.Node
        },

        home_pan:{
            default:null,
            type: cc.Node
        },

        top_pan:{
            default:null,
            type: cc.Node
        },

        lvl_large_pan:{
            default:null,
            type: cc.Node
        },

        lvl_detail_pan:{
            default:null,
            type: cc.Node
        },

        btn_backhome:{
            default:null,
            type: cc.Node
        },

        // btn_lpan1:{
        //     default:null,
        //     type: cc.Node
        // },

        // btn_lpan2:{
        //     default:null,
        //     type: cc.Node
        // },

        // btn_lpan3:{
        //     default:null,
        //     type: cc.Node
        // },

        // btn_lpan4:{
        //     default:null,
        //     type: cc.Node
        // },

        // btn_lpan5:{
        //     default:null,
        //     type: cc.Node
        // },

        // btn_lpan6:{
        //     default:null,
        //     type: cc.Node
        // },
        level: 1,
        stage: 1,
        cur_level: 1,
        cur_stage: 1,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.level = 2;
        this.stage = 15;
        this.actions();
        this.events();
    },

    actions: function()
    {
        this.comein_levelAction = cc.moveBy(0.1, cc.v2(0, 50)).easing(cc.easeElasticInOut(3.0));
    },

    events: function()
    {
        this.home_pan.on(cc.Node.EventType.TOUCH_END, function () {            
            this.load_game_menu();                   
        }, this);

        this.btn_backhome.on(cc.Node.EventType.TOUCH_END, function () {
            if(this.blevel_detail)
            {
                this.lvl_large_pan.active = true;
                this.lvl_detail_pan.active = false;
                this.blevel_detail = false;
            }
            else
            {
                this.home_pan.active = true;
                this.top_pan.active = false;
                this.level_pan.active = false;            
                this.level_pan.position = cc.v2(0, -100);
            }            
        }, this);

        // this.btn_lpan1.on(cc.Node.EventType.TOUCH_END, function () {
        //     this.stage = 1;
        //     this.load_level_detail_pan();
        // }, this);

        // this.btn_lpan2.on(cc.Node.EventType.TOUCH_END, function () {
        //     this.stage = 2;
        //     this.load_level_detail_pan();
        // }, this);

        // this.btn_lpan3.on(cc.Node.EventType.TOUCH_END, function () {
        //     this.stage = 3;
        //     this.load_level_detail_pan();
        // }, this);

        // this.btn_lpan4.on(cc.Node.EventType.TOUCH_END, function () {
        //     this.stage = 4;
        //     this.load_level_detail_pan();
        // }, this);

        // this.btn_lpan5.on(cc.Node.EventType.TOUCH_END, function () {
        //     this.stage = 5;
        //     this.load_level_detail_pan();
        // }, this);

        // this.btn_lpan6.on(cc.Node.EventType.TOUCH_END, function () {
        //     this.stage = 6;
        // }, this);
    },



    load_level_detail_pan: function()
    {        
        this.blevel_detail = true;
        this.lvl_large_pan.active = false;
        this.lvl_detail_pan.active = true;
        this.level_pan.position = cc.v2(0, -100);
        this.level_pan.runAction(cc.sequence(
            cc.moveBy(0.2, cc.v2(0, 50)),
            this.comein_levelAction
        )); 
    },

    load_game_menu: function()
    {
        this.home_pan.active = false;
        this.top_pan.active = true;
        this.level_pan.active = true;
        this.level_pan.runAction(cc.sequence(
            cc.moveBy(0.2, cc.v2(0, 50)),
            this.comein_levelAction
        )); 
    },

    start () {

    },

    // update (dt) {},
});
