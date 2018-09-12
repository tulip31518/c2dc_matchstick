
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

        stick_spriteList:{
            default:[],
            type: [cc.SpriteFrame]
        },

        canvas:{
            default:null,
            type: cc.Node
        },

        spr_game_start:{
            default: null,
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

        sticks:{
            default:null,
            type: cc.Node
        },

        hint_hand:{
            default:null,
            type: cc.Node
        },

        hint_hand_spriteList:{
            default:[],
            type: [cc.SpriteFrame]
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

        background:{
            default:null,
            type: cc.Node
        },

        close_dlg_pause:{
            default:null,
            type: cc.Node
        },

        continue_dlg_pause:{
            default:null,
            type: cc.Node
        },

        home_dlg_pause:{
            default:null,
            type: cc.Node
        },

        stage_dlg_pause:{
            default:null,
            type: cc.Node
        },

        close_dlg_progress:{
            default:null,
            type: cc.Node
        },

        ok_dlg_progress:{
            default:null,
            type: cc.Node
        },

        level_pan:{
            default:null,
            type: cc.Node
        },

        top_pan:{
            default:null,
            type: cc.Node
        },

        home_pan:{
            default:null,
            type: cc.Node
        },

        b_game_on:false,

        // act_type:    "",
        // act_cnt:     0,
        // act_shape:   "",
        // act_shape_cnt:0,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () 
    {
        this.game = this.canvas.getComponent('game');        
        this.reset_game();
        this.events();
        this.actions();
        this.load_game();
    },

    actions: function()
    {
        this.in_pause_Action = cc.moveBy(0.5, cc.v2(0, -750)).easing(cc.easeElasticOut());
    },

    events: function()
    {  
        this.event_dlg_pause();
        this.event_dlg_progress();
        
    },

    event_dlg_progress: function()
    {
        this.progress.on(cc.Node.EventType.TOUCH_END, function () { 
            this.dlg_progress.active = true;    
            this.dlg_progress.position = cc.v2(0, 1500);
            this.node.runAction(cc.sequence(
                cc.delayTime(0.1),
                cc.fadeOut(0.5)
            ));
            this.dlg_progress.runAction(cc.sequence(
                cc.moveBy(0.5, cc.v2(0, -750)),
                this.in_pause_Action
            ));
            this.background.active = false;
        }, this);

        this.close_dlg_progress.on(cc.Node.EventType.TOUCH_END, function () {       
            this.node.runAction(cc.sequence(
                cc.delayTime(0.1),
                cc.fadeIn(0.5)
            ));
            this.background.active = true;
            this.dlg_progress.active = false;  
        }, this);

        this.ok_dlg_progress.on(cc.Node.EventType.TOUCH_END, function () {       
            this.node.runAction(cc.sequence(
                cc.delayTime(0.1),
                cc.fadeIn(0.5)
            ));
            this.background.active = true;
            this.dlg_progress.active = false;  
        }, this);
    },

    event_dlg_pause: function()
    {
        this.pause.on(cc.Node.EventType.TOUCH_END, function () { 
            this.dlg_pause.active = true;    
            this.dlg_pause.position = cc.v2(0, 1500);
            this.node.runAction(cc.sequence(
                cc.delayTime(0.1),
                cc.fadeOut(0.2)
            ));
            this.dlg_pause.runAction(cc.sequence(
                cc.moveBy(0.3, cc.v2(0, -750)),
                this.in_pause_Action
            ));
            this.background.active = false;
        }, this);

        this.close_dlg_pause.on(cc.Node.EventType.TOUCH_END, function () {       
            this.node.runAction(cc.sequence(
                cc.delayTime(0.1),
                cc.fadeIn(0.5)
            ));
            this.background.active = true;
            this.dlg_pause.active = false;  
        }, this);

        this.continue_dlg_pause.on(cc.Node.EventType.TOUCH_END, function () {       
            this.node.runAction(cc.sequence(
                cc.delayTime(0.1),
                cc.fadeIn(0.5)
            ));
            this.background.active = true;
            this.dlg_pause.active = false;  
        }, this);

        this.stage_dlg_pause.on(cc.Node.EventType.TOUCH_END, function () {            
            this.level_pan.active = true;
            this.top_pan.active = true;
            this.reset_game();
            this.diable_game_pan();
        }, this);

        this.home_dlg_pause.on(cc.Node.EventType.TOUCH_END, function () {       
            this.reset_game();
            this.diable_game_pan();            
            this.home_pan.active = true;
        }, this);
    },

    diable_game_pan: function()
    {
        this.dlg_pause.position = cc.v2(0, 1500);   
        this.dlg_pause.active = false;        
        this.background.active = true;
        this.node.runAction(cc.sequence(
            cc.delayTime(0.1),
            cc.fadeIn(0.1)
        ));
        this.node.active = false;   
    },

    load_game: function()
    {
        this.task_info = {
            act_type:"Add",
            act_cnt: 3,
            act_shape: "square",
            act_shape_cnt: 1,
            scale:  2,
            color:{r:255},
            stick_allignments:[
                {x:-180, y:0, direction:0, status:1},
                {x:180, y:0, direction:0, status:0},
                {x:0, y:-180, direction:90, status:0},
                {x:0, y:180, direction:90, status:0}
            ]
        };

        this.stage.string = "STAGE " + this.game.curent_stage;
        this.level.string = "LEVEL " + this.game.curent_level;
        this.hint.string = this.game.hints;

        this.task_content.string = this.task_info.act_type + " " + this.task_info.act_cnt + " matchmaticks to create " 
            + this.task_info.act_shape_cnt + "\n" + this.task_info.act_shape + "s." ;

        this.b_game_on = true;
        this.arr_sticks = [];
        this.arr_sticks_shadow = [];

        this.load_task_sticks(true);     
        for(var j = 0; j < this.arr_sticks_shadow.length; j++)   
            this.change_stick_direction(this.arr_sticks_shadow[j]);

        this.load_task_sticks(false);
        for(var j = 0; j < this.arr_sticks.length; j++)
            this.arr_sticks[j].runAction(cc.sequence(
                cc.delayTime(0.5),
                cc.moveBy(0.2, cc.v2(0, 1000)).easing(cc.easeExponentialOut()), 
                cc.moveBy(0.2, cc.v2(0, -300)).easing(cc.easeExponentialIn()),
                cc.callFunc(this.change_stick_direction, this, this.arr_sticks[j]),
                cc.callFunc(this.start_game, this)
            ));
        
        this.arr_sticks_mini = [];

        this.set_task_sticks_mini();
        
    },

    set_task_sticks_mini: function()
    {
        if(this.task_info.act_type == "Add")
        {
            this.make_sticks_mini("Remove", true);
            this.make_sticks_mini("Add", true);            
        }
        else if(this.task_info.act_type == "Remove")
        {
            this.make_sticks_mini("Remove", true);
        }
        else
        {
            this.make_sticks_mini("Remove", false);
            this.make_sticks_mini("Add", false);            
        }
    },

    make_sticks_mini: function(act_type, status)
    {
        for(var i = 0; i < this.task_info.act_cnt; i++)
        {
            let item = cc.instantiate(this.stick_mini);
            item.getComponent('stick_mini').game = this;
            this.footer.addChild(item);            
            
            if(act_type == "Add")
            {               
                item.getComponent('stick_mini').status = 1;
            }
            else
                item.getComponent('stick_mini').status = 0;
            item.setPosition(i * 40 - 300, 0);
            item.active = status;
            
            if(act_type == "Add")
                this.arr_sticks_mini.push(item);
        }
    },

    start_game: function()
    {
        if(this.b_game_start)
            return;
        this.b_game_start = true;
        this.spr_game_start.position = cc.v2(800, 0);
        this.spr_game_start.runAction(cc.sequence(
            cc.delayTime(0.5),
            cc.moveBy(0.3, cc.v2(-800, 0)).easing(cc.easeExponentialOut()),
            cc.delayTime(0.5),
            cc.moveBy(0.3, cc.v2(800, 0)).easing(cc.easeExponentialIn()),
            cc.delayTime(0.5),
            cc.callFunc(this.start_hint_hand_animation, this)
        ));        
    },

    start_hint_hand_animation: function()
    {
        if(this.game.curent_level == 1 && this.game.curent_stage == 1)
        {
            this.hint_hand.active = true;
            this.bHintHand = true;
            this.hint_hand.runAction(cc.sequence(                
                cc.callFunc(this.change_hint_hand_image.bind(this)),
                cc.delayTime(1),
            )).repeatForever();
        }
        else
            this.hint_hand.active = false;
    },

    change_hint_hand_image: function()
    {
        var sprite = this.hint_hand.getComponent(cc.Sprite);
        if(this.bHintHand)
            sprite.spriteFrame = this.hint_hand_spriteList[0];
        else
            sprite.spriteFrame = this.hint_hand_spriteList[1];
        this.bHintHand = !this.bHintHand;
    },

    change_stick_direction: function(stk)
    {
        stk.runAction(cc.rotateBy(0, stk.getComponent('stick').direction));
    },

    load_task_sticks: function(bShadow)
    {
        for(var i = 0; i < this.task_info.stick_allignments.length; i++)
        {
            if(this.task_info.stick_allignments[i].status == 0 && !bShadow)
                continue;
            let item = cc.instantiate(this.stick);
            item.getComponent('stick').game = this;
            this.sticks.addChild(item);
            var y = this.task_info.stick_allignments[i].y;
            
            if(!bShadow)
            {
                y -= 700;
                item.getComponent('stick').status = 2;
                item.zIndex = 999;
            }
            else
                item.getComponent('stick').status = 0;

            item.getComponent('stick').direction = this.task_info.stick_allignments[i].direction;
            item.getComponent('stick').scale = this.task_info.scale;
            item.setPosition(this.task_info.stick_allignments[i].x, y);
                        
            if(!bShadow)          
                this.arr_sticks.push(item);
            else
                this.arr_sticks_shadow.push(item);
        }
    },

    add_stick: function(pos, direction)
    {
        // if(this.game.curent_level == 1 && this.game.curent_stage && !this.hint_hand.active) return;

        this.hint_hand.active = false;
        
        let item = cc.instantiate(this.stick);
        item.getComponent('stick').game = this;
        this.sticks.addChild(item);
        item.getComponent('stick').status = 1;
        item.zIndex = 999;
        this.change_stick_direction(item);
                
        var oldPos = cc.v2(0,0);
        for(var i = this.arr_sticks_mini.length - 1; i >= 0; i--)
        {            
            if(this.arr_sticks_mini[i].active)
            {
                oldPos = this.arr_sticks_mini[i].position;               
                this.arr_sticks_mini[i].active = false;
                break;
            }    
        }
        item.setPosition(cc.v2(oldPos.x, pos.y));
        item.runAction(cc.sequence(
            cc.moveBy(0.1, cc.v2((pos.x - oldPos.x) / 2, 200)).easing(cc.easeExponentialInOut(0.1)),
            cc.moveBy(0.1, cc.v2((pos.x - oldPos.x) / 2, -200)).easing(cc.easeExponentialIn(0.1)),
        ));

        item.runAction(cc.sequence(
            cc.scaleBy(0.2, this.task_info.scale, this.task_info.scale),
            cc.delayTime(0.1)
        ));
        
        item.runAction(cc.sequence(
            cc.delayTime(0.1),
            cc.rotateBy(0.1, direction),
        ));
        item.getComponent('stick').direction = direction;
        // item.getComponent('stick').scale = this.task_info.scale;

    },

    remove_stick: function(stick)
    {
        // stick.destroy();
        var oldPos = cc.v2(0,0);
        for(var i = 0; i < this.arr_sticks_mini.length; i++)
        {            
            if(!this.arr_sticks_mini[i].active)
            {                         
                this.arr_sticks_mini[i].active = true;
                oldPos = this.arr_sticks_mini[i].position;
                break;
            }    
        }

        stick.runAction(cc.sequence(
            cc.moveBy(0.1, cc.v2(-(stick.position.x - oldPos.x) / 2, 200)).easing(cc.easeExponentialInOut(0.1)),
            cc.moveBy(0.1, cc.v2(-(stick.position.x - oldPos.x) / 2, -200)).easing(cc.easeExponentialIn(0.1)),
        ));

        stick.runAction(cc.sequence(
            cc.scaleBy(0.2, 1 / this.task_info.scale, 1 / this.task_info.scale),
            cc.delayTime(0.1)
        ));        
        
        stick.runAction(cc.sequence(            
            cc.rotateBy(0.1, -stick.getComponent('stick').direction),
            cc.delayTime(0.1),
            cc.callFunc(this.destroy_stick, this, stick)
        ));
    },

    destroy_stick: function(stk)
    {
        stk.destroy();
    },

    reset_game: function()
    {
        this.sticks.removeAllChildren();
        this.b_game_on = false;
        this.b_game_start = false;
        this.bHintHand = false;
    },

    // start () {

    // },

    // update (dt) {},
});
