
cc.Class({
    extends: cc.Component,

    properties: {

        stick:{
            default:null,
            type: cc.Prefab
        },

        stick_mini:{
            default:null,
            type: cc.Prefab
        },

        canvas:{
            default:null,
            type: cc.Node
        },

        stage:{
            default:null,
            type: cc.Label
        },

        level:{
            default:null,
            type: cc.Label
        },

        progress:{
            default:null,
            type: cc.Node
        },

        pause:{
            default:null,
            type: cc.Node
        },

        restart:{
            default:null,
            type: cc.Node
        },

        game_board:{
            default:null,
            type: cc.Node
        },

        footer:{
            default:null,
            type: cc.Node
        },

        footer:{
            default:null,
            type: cc.Node
        },

        hint_pan:{
            default:null,
            type: cc.Node
        },

        dlg_progress:{
            default:null,
            type: cc.Node
        },

        dlg_pause:{
            default:null,
            type: cc.Node
        },

        hint:{
            default:null,
            type: cc.Label
        },

        task_content:{
            default:null,
            type: cc.Label
        },

        act_type:    "",
        act_cnt:     0,
        act_shape:   "",
        act_shape_cnt:0,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () 
    {
        this.game = this.canvas.getComponent('game');
        this.init();
        this.events();
        this.actions();
        this.load_game_info();
        this.load_game();
    },

    actions: function()
    {
        this.in_pause_Action = cc.moveBy(0.5, cc.v2(0, -750)).easing(cc.easeElasticOut());
    },

    events: function()
    {
        this.pause.on(cc.Node.EventType.TOUCH_END, function () {   
            cc.log("Pause");
            this.dlg_pause.active = true;    
            this.dlg_pause.position = cc.v2(0, 1500);
            this.node.runAction(cc.sequence(
                cc.delayTime(0.1),
                cc.fadeOut(0.5)
            ));
            this.dlg_pause.runAction(cc.sequence(
                cc.moveBy(0.5, cc.v2(0, -750)),
                this.in_pause_Action
            ));
        }, this);

        this.restart.on(cc.Node.EventType.TOUCH_END, function () {       
            this.reset_game();
            this.load_game();
        }, this);

        this.progress.on(cc.Node.EventType.TOUCH_END, function () {
                             
        }, this);
    },

    init: function()
    {
        this.stage.string = "STAGE " + this.game.curent_stage;
        this.level.string = "LEVEL " + this.game.curent_level;
        this.hint.string = this.game.hints;
    },

    load_game_info: function()
    {
        this.act_type = "Add";
        this.act_cnt = 1;
        this.act_shape = "square";
        this.act_shape_cnt = 1;

        this.task_content.string = this.act_type + " " + this.act_cnt + " matchmaticks to create " 
            + this.act_shape_cnt + "\n" + this.act_shape + "s." ;
    },

    load_game: function()
    {

    },

    reset_game: function()
    {

    },

    start () {

    },

    // update (dt) {},
});
