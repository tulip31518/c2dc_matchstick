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

        game_pan:{
            default:null,
            type: cc.Node
        },

        btn_backhome:{
            default:null,
            type: cc.Node
        },

        toppan_title:{
            default:null,
            type: cc.Label
        },

        passed_stages:{
            default:null,
            type: cc.Label
        },

        level: 1,
        stage: 1,
        curent_level: 1,
        curent_stage: 1,
        hints:15,
        blevel_detail: false,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.level = this.curent_level = 2;
        this.stage = this.curent_stage = 15;
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
            if(this.lvl_detail_pan.active)
            {
                this.lvl_large_pan.active = true;
                this.lvl_detail_pan.active = false;
                this.toppan_title.string = "LEVEL";
                this.passed_stages.string = (this.level - 1) * 50 + this.stage;
            }
            else
            {
                this.home_pan.active = true;
                this.top_pan.active = false;
                this.level_pan.active = false;            
                this.level_pan.position = cc.v2(0, -100);               
            }            
        }, this);
        
    },

    load_game_pan: function()
    {
        this.game_pan.active = true;
        this.top_pan.active = false;
        this.lvl_detail_pan.active = false;
        
    },

    load_dlg_get_hint: function()
    {

    },

    load_level_detail_pan: function()
    {        
        this.blevel_detail = true;
        this.lvl_large_pan.active = false;
        this.lvl_detail_pan.active = true;

        this.toppan_title.string = "LEVEL " + this.curent_level;
        this.passed_stages.string = this.stage;

        this.level_pan.position = cc.v2(0, -100);
        this.level_pan.runAction(cc.sequence(
            cc.moveBy(0.2, cc.v2(0, 50)),
            this.comein_levelAction
        ));
        var btns = this.lvl_detail_pan.getComponentsInChildren("stage_button");
        for(var i = 0; i < btns.length; i++) 
            btns[i].brefresh = true;
    },

    load_game_menu: function()
    {
        this.home_pan.active = false;
        this.top_pan.active = true;
        this.level_pan.active = true;
        this.toppan_title.string = "LEVEL";
        this.passed_stages.string = (this.level - 1) * 50 + this.stage;

        this.level_pan.runAction(cc.sequence(
            cc.moveBy(0.2, cc.v2(0, 50)),
            this.comein_levelAction
        )); 
    },

    start () {

    },

    // update (dt) {},
});
