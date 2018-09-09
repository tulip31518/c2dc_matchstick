
cc.Class({
    extends: cc.Component,

    properties: {

        daily_gift:{
            default:null,
            type: cc.Node
        },

        dlg_gift:{
            default:null,
            type: cc.Node
        },

        ok_dlg_gift:{
            default:null,
            type: cc.Node
        },

        lbl_dlg_gift:{
            default:null,
            type: cc.Label
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
        this.in_gift_Action = cc.moveBy(0.5, cc.v2(0, -600)).easing(cc.easeElasticOut());
        this.out_gift_Action = cc.moveBy(0.5, cc.v2(0, 600)).easing(cc.easeElasticOut());
    },

    events: function()
    {
        this.home_pan.on(cc.Node.EventType.TOUCH_END, function (event) 
        {       
            var touches = event.getTouches();
            if(touches[0].getLocation().y > this.daily_gift.position. y + this.daily_gift.height / 2 + this.node.height / 2) 
                this.load_game_menu(); 

        }, this);

        this.event_dlg_gift();

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
                this.level_pan.position = cc.v2(0, -200);          
            }            
        }, this);
        
    },

    event_dlg_gift: function()
    {
        this.daily_gift.on(cc.Node.EventType.TOUCH_END, function () 
        {
            this.dlg_gift.active = true;
            this.hints += 1;
            this.lbl_dlg_gift.string = "The number of hints \nyou have has\n incresed to " + this.hints + ".";
            this.dlg_gift.position = cc.v2(375, 2000);
            this.node.runAction(cc.sequence(
                cc.delayTime(0.1),
                cc.fadeOut(0.5)
            ));
            this.dlg_gift.runAction(cc.sequence(
                cc.moveBy(0.5, cc.v2(0, -600)),
                this.in_gift_Action
            ));
        }, this);

        this.ok_dlg_gift.on(cc.Node.EventType.TOUCH_END, function () {
            this.node.runAction(cc.sequence(
                cc.delayTime(0.1),
                cc.fadeIn(0.5)
            ));
            this.dlg_gift.runAction(cc.sequence(
                cc.moveBy(0.5, cc.v2(0, 600)),
                this.out_gift_Action,

            ));
        }, this);
    },

    load_game_pan: function()
    {
        this.game_pan.active = true;
        this.top_pan.active = false;
        this.level_pan.active = false;
        this.game_pan.getComponent('game_control').load_game_info();
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
       
        this.level_pan.position = cc.v2(0, -200);
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
        this.lvl_detail_pan.active = false;
        this.lvl_large_pan.active = true;
        this.toppan_title.string = "LEVEL";
        this.level_pan.position = cc.v2(0, -200);
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
