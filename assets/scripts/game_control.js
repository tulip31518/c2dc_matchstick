
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

        spr_game_clear:{
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

        hint_btn:{
            default:null,
            type: cc.Node
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

        dlg_mavelous:{
            default:null,
            type: cc.Node
        },

        home_dlg_mavelous:{
            default:null,
            type: cc.Node
        },

        bucket_dlg_mavelous:{
            default:null,
            type: cc.Node
        },

        share_dlg_mavelous:{
            default:null,
            type: cc.Node
        },

        forward_dlg_mavelous:{
            default:null,
            type: cc.Node
        },

        snd_success:{
            default:null,
            type: cc.AudioClip
        },

        snd_select:{
            default:null,
            type: cc.AudioClip
        },

        b_game_on:false,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () 
    {
        this.game = this.canvas.getComponent('game'); 
        this.events();
        this.actions();        
    },

    start () {
        // this.load_game();
    },

    actions: function()
    {
        this.in_pause_Action = cc.moveBy(0.5, cc.v2(0, -750)).easing(cc.easeElasticOut());
    },

    events: function()
    {  
        this.game.hints = 100;
        this.event_dlg_pause();
        this.event_dlg_progress();
        this.event_dlg_mavelous();
        this.restart.on(cc.Node.EventType.TOUCH_END, function(){
            if(this.game.bsound_play)
                cc.audioEngine.play(this.game.snd_btn_click, false, 1);
            if(this.b_game_start_animation || this.b_game_successed) return;
            // this.event_restart();
            this.load_game();
        }, this);

        this.hint_btn.on(cc.Node.EventType.TOUCH_END, function(){
            if(this.game.bsound_play)
                cc.audioEngine.play(this.game.snd_btn_click, false, 1);
            if(this.b_game_start_animation || this.b_game_successed) return;
            this.execute_hint();
            
        }, this);
    },

    event_restart: function()
    {
        if(this.task_info.act_type == "Add")
            for(var i = 0; i < this.arr_added_sticks.length; i++)
                this.remove_stick(this.arr_added_sticks[i]);
        else if(this.task_info.act_type == "Remove")
        {
            for(var i = 0; i < this.arr_removed_sticks.length; i++)
            {
                var index = this.arr_removed_sticks[i].getComponent('stick').index;
                var x = this.task_info.stick_allignments[index].x * this.task_info.unit;
                var y = this.task_info.stick_allignments[index].y * this.task_info.unit;
                var direction = this.arr_removed_sticks[i].getComponent('stick').direction;
                this.add_stick(cc.v2(x, y), direction, index);
            }
            this.arr_removed_sticks = [];
        }    
    },

    event_dlg_progress: function()
    {
        this.progress.on(cc.Node.EventType.TOUCH_END, function () 
        {             
            if(this.b_game_start_animation || this.b_game_successed) return;
            if(this.game.bsound_play)
                cc.audioEngine.play(this.game.snd_btn_click, false, 1);
            this.dlg_progress.active = true;
            this.dlg_progress.getComponent('progress_dialog').update_info();
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

        this.close_dlg_progress.on(cc.Node.EventType.TOUCH_END, function () 
        {       
            if(this.game.bsound_play)
                cc.audioEngine.play(this.game.snd_btn_click, false, 1);
            this.node.runAction(cc.sequence(
                cc.delayTime(0.1),
                cc.fadeIn(0.5)
            ));
            this.background.active = true;
            this.dlg_progress.active = false;  
        }, this);

        this.ok_dlg_progress.on(cc.Node.EventType.TOUCH_END, function () {   
            if(this.game.bsound_play)
                cc.audioEngine.play(this.game.snd_btn_click, false, 1);    
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
        this.pause.on(cc.Node.EventType.TOUCH_END, function () 
        { 
            if(this.b_game_start_animation || this.b_game_successed) return;
            if(this.game.bsound_play)
                cc.audioEngine.play(this.game.snd_btn_click, false, 1);
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
            if(this.game.bsound_play)
                cc.audioEngine.play(this.game.snd_btn_click, false, 1);    
            this.node.runAction(cc.sequence(
                cc.delayTime(0.1),
                cc.fadeIn(0.5)
            ));
            this.background.active = true;
            this.dlg_pause.active = false;  
        }, this);

        this.continue_dlg_pause.on(cc.Node.EventType.TOUCH_END, function () {  
            if(this.game.bsound_play)
                cc.audioEngine.play(this.game.snd_btn_click, false, 1);     
            this.node.runAction(cc.sequence(
                cc.delayTime(0.1),
                cc.fadeIn(0.5)
            ));
            this.background.active = true;
            this.dlg_pause.active = false;  
        }, this);

        this.stage_dlg_pause.on(cc.Node.EventType.TOUCH_END, function () {  
            if(this.game.bsound_play)
                cc.audioEngine.play(this.game.snd_btn_click, false, 1);          
            this.level_pan.active = true;
            this.top_pan.active = true;
            this.diable_game_pan();
            this.game.update_stage_button();
        }, this);

        this.home_dlg_pause.on(cc.Node.EventType.TOUCH_END, function () { 
            if(this.game.bsound_play)
                cc.audioEngine.play(this.game.snd_btn_click, false, 1);  
            this.diable_game_pan();            
            this.home_pan.active = true;               
        }, this);
    },

    event_dlg_mavelous: function()
    {
        this.home_dlg_mavelous.on(cc.Node.EventType.TOUCH_END, function () { 
            if(this.game.bsound_play)
                cc.audioEngine.play(this.game.snd_btn_click, false, 1);
            this.diable_game_pan();            
            this.home_pan.active = true;
            this.dlg_mavelous.active = false;              
        }, this);

        this.bucket_dlg_mavelous.on(cc.Node.EventType.TOUCH_END, function () {   
            if(this.game.bsound_play)
                cc.audioEngine.play(this.game.snd_btn_click, false, 1);    
            this.game.parent_node = this.dlg_mavelous;
            this.game.in_dlg_buy_hint();
        }, this);

        this.forward_dlg_mavelous.on(cc.Node.EventType.TOUCH_END, function () {  
            if(this.game.bsound_play)
                cc.audioEngine.play(this.game.snd_btn_click, false, 1);     
            this.node.runAction(cc.sequence(
                cc.delayTime(0.1),
                cc.fadeIn(0.5)
            ));
            this.background.active = true;
            this.dlg_mavelous.active = false;
            this.load_game();
        }, this);

        this.share_dlg_mavelous.on(cc.Node.EventType.TOUCH_END, function () {    
            if(this.game.bsound_play)
                cc.audioEngine.play(this.game.snd_btn_click, false, 1);        
            cc.loader.loadRes("textures/icon",function(err,data){
                wx.shareAppMessage({
                    title: "Enjoy Matchsticks!",
                    imageUrl: cc.loader.md5Pipe.transformURL(data.url),
                    success(res){
                        console.log(res)
                    },
                    fail(res){
                        console.log(res)
                    }
                })
            }); 
        }, this);
    },

    execute_hint: function()
    {
        if(this.game.hints == 0) return;
        this.game.hints --;
        this.hint.string = this.game.hints;
        this.hint_count ++;
        var hint_add_or_remove = this.task_info.hint[0];
        var hint_move = this.task_info.hint[1];
        if(this.task_info.act_type == "Add")
        {
            this.hint_add_stick(hint_add_or_remove);
        }
        else if(this.task_info.act_type == "Remove")
        {
            this.hint_remove_stick(hint_add_or_remove);
        }
        else 
        {
            this.hint_remove_stick(hint_add_or_remove);
            this.hint_add_stick(hint_move);
        }
    },

    hint_add_stick: function(hint_add_or_remove)
    {
        for(var i = 0; i < this.arr_sticks_shadow.length; i++)
        {
            var stick_script = this.arr_sticks_shadow[i].getComponent('stick'); 
            if(stick_script.index == hint_add_or_remove[this.hint_count - 1])
            {                   
                this.add_stick(this.arr_sticks_shadow[i].position, stick_script.direction, stick_script.index);
            }    
        }    
    },

    hint_remove_stick: function(hint_add_or_remove)
    {
        for(var i = 0; i < this.arr_sticks.length; i++)
        {
            var stick_script = this.arr_sticks[i].getComponent('stick'); 
            if(stick_script.index == hint_add_or_remove[this.hint_count - 1])
            {   
                var stk = this.arr_sticks[i];
                this.arr_sticks.splice(i, 1);
                this.remove_stick(stk);
            }    
        }
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
        if(this.game.bsound_play)
            {
                cc.audioEngine.stopAll();
                cc.audioEngine.play(this.game.snd_home, true, 1);
            }    
    },

    load_game: function()
    {
        if(this.game.bsound_play)
        {
            cc.audioEngine.stopAll();
            switch(this.game.curent_stage % 3)
            {
                case 0:cc.audioEngine.play(this.game.snd_level_1, true, 1);break;
                case 1: cc.audioEngine.play(this.game.snd_level_2, true, 1);break;
                case 2: cc.audioEngine.play(this.game.snd_level_3, true, 1);break;
            }
            
        } 
        this.reset_game();
        this.task_info = this.game.task[this.game.curent_level - 1][this.game.curent_stage - 1];
        this.stage.string = "STAGE " + this.game.curent_stage;
        this.level.string = "LEVEL " + this.game.curent_level;
        this.hint.string = this.game.hints;
        
        if(this.task_info.act_shape != "formula")            
                this.task_content.string = this.task_info.act_type + " " + this.task_info.act_cnt + " matchsticks to create " 
                + this.task_info.act_shape_cnt + "\n" + this.task_info.act_shape + "s." ;
        else
            if(this.task_info.math_string != "")
                this.task_content.string = this.task_info.act_type + " " + this.task_info.act_cnt + " matchsticks \n to " 
                + this.task_info.math_string + "." ;
            else
                this.task_content.string = this.task_info.act_type + " " + this.task_info.act_cnt + " matchsticks to correct the " 
                    + "\n" + this.task_info.act_shape + "." ;

        this.b_game_on = true;        

        this.load_task_sticks(true);     
        for(var j = 0; j < this.arr_sticks_shadow.length; j++)   
            this.change_stick_direction(this.arr_sticks_shadow[j]);

        this.load_task_sticks(false);
        for(var j = 0; j < this.arr_sticks.length; j++)
            this.arr_sticks[j].runAction(cc.sequence(
                cc.delayTime(0.5),
                cc.moveBy(0.2, cc.v2(0, 1400)).easing(cc.easeExponentialOut()), 
                cc.moveBy(0.2, cc.v2(0, -300)).easing(cc.easeExponentialIn()),
                cc.callFunc(this.change_stick_direction, this, this.arr_sticks[j]),
                cc.callFunc(this.start_game, this)
            ));        
        
        this.set_task_sticks_mini();
        
    },

    set_task_sticks_mini: function()
    {
        if(this.task_info.act_type == "Add")
        {
            // this.make_sticks_mini("Remove", true);
            this.make_sticks_mini("Add", true);            
        }
        else if(this.task_info.act_type == "Remove")
        {
            this.make_sticks_mini("Remove", true);
        }
        else
        {
            // this.make_sticks_mini("Remove", false);
            this.make_sticks_mini("Move", true);            
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
            else if(act_type == "Remove")
                item.getComponent('stick_mini').status = 0;
            else
            {
                item.getComponent('stick_mini').status = 0;
                item.active = false;
            }
            item.setPosition(i * 40 - 300, 0);
            // item.active = status;
            
            // if(act_type == "Add")
                this.arr_sticks_mini.push(item);
            // else
            //     this.arr_sticks_mini_shadow.push(item);
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
        this.b_game_start_animation = false;
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
            var yPos = this.task_info.stick_allignments[i].y * this.task_info.unit;
            var xPos = this.task_info.stick_allignments[i].x * this.task_info.unit;
            
            if(!bShadow)
            {
                yPos -= 1100;
                item.getComponent('stick').status = this.task_info.stick_allignments[i].status;
                item.zIndex = 999;
            }
            else
                item.getComponent('stick').status = 0;            

            item.getComponent('stick').direction = this.task_info.stick_allignments[i].direction;
            item.getComponent('stick').scale = this.task_info.scale;
            item.getComponent('stick').index = this.task_info.stick_allignments[i].index;
            item.getComponent('stick').movable = this.task_info.stick_allignments[i].movable;
            item.setPosition(xPos, yPos);
                        
            if(!bShadow)          
                this.arr_sticks.push(item);
            else
                this.arr_sticks_shadow.push(item);
        }
    },

    add_stick: function(pos, direction, index)
    {
        // if(this.game.curent_level == 1 && this.game.curent_stage && !this.hint_hand.active) return;

        this.hint_hand.active = false;
        
        let item = cc.instantiate(this.stick);
        item.getComponent('stick').game = this;
        this.sticks.addChild(item);
        item.getComponent('stick').status = 1;
        item.zIndex = 999;
        this.change_stick_direction(item);

        if(this.task_info.act_type == "Move")
        {
            for(var i = 0; i < this.task_info.stick_allignments.length; i++)
            {
                if(this.task_info.stick_allignments[i].index == index && this.task_info.stick_allignments[i].status == 1)
                {
                    if(this.arr_sticks_mini.length == this.actived_mini_stick_count) break;
                    this.arr_sticks_mini[this.actived_mini_stick_count].active = false;
                    this.actived_mini_stick_count --;
                    break;
                }
            }
        }
                
        var oldPos = cc.v2(0,0);
        for(var i = this.arr_sticks_mini.length - 1; i >= 0; i--)
        {       
            if(this.arr_sticks_mini[i].getComponent('stick_mini').status)
            {
                oldPos = this.arr_sticks_mini[i].position;
                this.arr_sticks_mini[i].getComponent('stick_mini').status = false;
                this.arr_sticks_mini[i].getComponent('stick_mini').update_image();
                
                if(i == 0 && this.task_info.act_type != "Remove")
                    this.b_last_stick = true;
                else
                    this.b_last_stick = false;
                if(this.task_info.act_type == "Move" && this.actived_mini_stick_count != this.arr_sticks_mini.length)
                    this.b_last_stick = false;
                this.progress.getComponent('progress').update_image();
                
                break;
            }
        }
        item.setPosition(cc.v2(oldPos.x, pos.y - 100));
        item.runAction(cc.sequence(
            cc.moveBy(0.1, cc.v2((pos.x - oldPos.x) / 2, 300)).easing(cc.easeExponentialInOut(0.1)),
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
        item.getComponent('stick').index = index;
        this.arr_added_sticks.push(item);
        this.arr_sticks.push(item);
        
        if(this.b_last_stick)
        {            
            this.check_game_result();
        }    
    },

    remove_stick: function(stick)
    {       
        var oldPos = cc.v2(0,0);        
        if(this.task_info.act_type == "Move" && this.actived_mini_stick_count < this.arr_sticks_mini.length)
        {
            this.arr_sticks_mini[this.actived_mini_stick_count].active = true;
            this.actived_mini_stick_count ++;
        }    

        for(var i = 0; i < this.arr_sticks_mini.length; i++)
        {            
            if(!this.arr_sticks_mini[i].getComponent('stick_mini').status)
            {               
                this.arr_sticks_mini[i].getComponent('stick_mini').status = true;                
                this.arr_sticks_mini[i].getComponent('stick_mini').update_image();
                oldPos = this.arr_sticks_mini[i].position;
                if(i == this.arr_sticks_mini.length - 1 && this.task_info.act_type == "Remove")
                    this.b_last_stick = true;
                else
                    this.b_last_stick = false;

                if(this.task_info.act_type == "Move" && this.actived_mini_stick_count != this.arr_sticks_mini.length)
                    this.b_last_stick = false;
                this.progress.getComponent('progress').update_image();
                break;
            }    
        }

        stick.runAction(cc.sequence(
            cc.moveBy(0.1, cc.v2(-(stick.position.x - oldPos.x) / 2, 200)).easing(cc.easeExponentialInOut(0.1)),
            cc.moveBy(0.1, cc.v2(-(stick.position.x - oldPos.x) / 2, -400)).easing(cc.easeExponentialIn(0.1)),
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

    check_game_result: function()
    {  
        this.arr_result = [];
        var arr_stick_indexes = [];
        this.b_shape_count = true;
        for(var i = 0; i < this.arr_sticks.length; i++)
        {            
            arr_stick_indexes.push(this.arr_sticks[i].getComponent('stick').index);
        } 
       
        var result = this.get_pattern_square(this.task_info.result);cc.log(result);
        var temp = [];
        var count = 0;
        for(var i = 0; i < result.length; i++)
        {   
            for(var j = 0; j < result[i].length; j++)
            {       
                var id = arr_stick_indexes.indexOf(result[i][j]);   
                if(id > -1)
                {           
                    temp.push(this.arr_sticks[id]);
                    count++;
                }           
            }
            if(count == result[i].length)
            {  
                this.arr_result.push(temp);
                
            }    
            temp = [];
            count = 0; 
        }
        cc.log(this.arr_result);
        this.check_stick_place_rule(arr_stick_indexes);
        if(this.arr_result.length == this.task_info.act_shape_cnt)
            this.b_shape_count = true;
        else
            this.b_shape_count = false;

        this.progress.getComponent('progress').update_image();

        if(this.b_all_placed && this.b_shape_count && this.b_last_stick)    
            this.success_stage();
    },

    check_stick_place_rule: function(arr_stick_indexes)
    {
        var arr_indexes_of_result = [];
        this.b_all_placed = false;
        for(var i = 0; i < this.arr_result.length; i++)
        {
            for(var j = 0; j < this.arr_result[i].length; j++)
                arr_indexes_of_result.push(this.arr_result[i][j].getComponent('stick').index);
        }

        for(var i = 0; i < arr_stick_indexes.length; i++)
        {
            if(arr_indexes_of_result.indexOf(arr_stick_indexes[i]) == -1)
            {                
                return this.b_all_placed;
            }
        }
        this.b_all_placed = true;
        return this.b_all_placed;
    },

    success_stage: function()
    {        
        if(this.b_game_successed)
            return;
        this.b_game_successed = true;
        
        this.spr_game_clear.position = cc.v2(800, 0);
        this.spr_game_clear.runAction(cc.sequence(
            cc.delayTime(0.5),
            cc.moveBy(0.3, cc.v2(-800, 0)).easing(cc.easeExponentialOut()),
            cc.delayTime(0.5),
            cc.moveBy(0.3, cc.v2(800, 0)).easing(cc.easeExponentialIn()),
            cc.delayTime(0.5),
            cc.callFunc(this.animate_game_result, this)
        ));
    },

    animate_game_result: function()
    {        
        if(this.game.bsound_play)
        {
            cc.audioEngine.stopAll();
            cc.audioEngine.play(this.snd_success, false, 1);
        }                
        var delay = 0.1;  
        for(var i = 0; i < this.arr_result.length; i++)
        {
            var each_result = this.arr_result[i];            
            for(var j = 0; j < each_result.length; j++)
            {
                var stick = each_result[j];
                var seq = cc.sequence(
                    cc.delayTime(delay),
                    cc.moveBy(0.2, cc.v2(0, 25)).easing(cc.easeCubicActionIn()),
                    cc.moveBy(0.2, cc.v2(0, -25)).easing(cc.easeCubicActionIn())
                );

                if(j == each_result.length - 1)
                    seq = cc.sequence(
                        cc.delayTime(delay),
                        cc.moveBy(0.2, cc.v2(0, 25)).easing(cc.easeCubicActionIn()),
                        cc.moveBy(0.2, cc.v2(0, -25)).easing(cc.easeCubicActionIn()),
                        // this.play_sound()
                    );

                if(i == this.arr_result.length - 1)
                    seq = cc.sequence(
                        cc.delayTime(delay),
                        cc.moveBy(0.2, cc.v2(0, 25)).easing(cc.easeCubicActionIn()),
                        cc.moveBy(0.2, cc.v2(0, -25)).easing(cc.easeCubicActionIn()),
                        // this.play_sound(),
                        cc.delayTime(0.5),
                        cc.callFunc(this.in_dlg_mavelous.bind(this))
                    );
                stick.runAction(seq);
            }
            delay += 0.5;
        }
    },

    play_sound: function()
    {

        if(this.game.bsound_play)
        {            
            cc.audioEngine.play(this.snd_select, false, 1);
        }        
    },    

    in_dlg_mavelous: function()
    {
        if(this.b_game_end)
            return;
        this.b_game_end = true;
        this.dlg_mavelous.active = true;    
        this.dlg_mavelous.position = cc.v2(0, 1500);
        this.node.runAction(cc.sequence(
            cc.delayTime(0.1),
            cc.fadeOut(0.2)
        ));
        this.dlg_mavelous.runAction(cc.sequence(
            cc.moveBy(0.3, cc.v2(0, -750)),
            this.in_pause_Action
        ));
        this.background.active = false;
        this.stage_up();
    },

    stage_up: function()
    {
        
        this.game.curent_stage++;
        if(this.game.level == this.game.curent_level)
        {
            if((this.game.curent_stage - 1) % 10 == 0)
                this.game.hints ++;
        }

        if(this.game.curent_level > this.game.level)
            this.game.level++;

        if(this.game.curent_level == this.game.level)        
        {
            if(this.game.curent_stage >= this.game.stage)
                this.game.stage  = this.game.curent_stage;
        }

        if(this.game.level_detail_info != null && this.game.level_detail_info.length < this.game.curent_level)
        {
            var newLevel = [];
            this.game.level_detail_info.push(newLevel);   
        }
        var levelInfo = this.game.level_detail_info[this.game.curent_level - 1];
        if(levelInfo.indexOf(this.game.curent_stage - 1) == -1)
            levelInfo.push(this.game.curent_stage - 1);
        this.game.all_stages ++;
        this.game.save_data();

        if(this.game.curent_stage > 50)
        {  
            this.game.curent_level++;
            this.game.curent_stage = 1;
            this.game.stage = 1;            
        }   
        this.game.update_stage_button();        
    },    

    get_pattern_square: function(index)
    {   

        var result = [                     
            [[0 , 1, 2, 3]],                                                            // 0
            [[0 ,6, 4, 5],[1 ,2, 3 ,6]],
            [[2, 3 ,11, 10],[11 , 4, 5 , 12],[0 ,1, 10, 12, 6,7, 8, 9]],
            [[0, 1, 2, 3, 4, 5]],
            [[0, 8, 10, 7], [1, 2, 9, 8], [0, 1, 2, 3, 4, 5, 6, 7]],                    
            [[0, 1, 2, 8], [9, 8, 3, 4], [6, 7, 9, 5]],                                 // 5
            [[0, 1, 5], [6,2,3], [4,5,6]],
            [[0, 1, 2, 3], [4, 5, 6, 7], [9, 10, 11, 12],[4, 8, 12, 3]],
            [[0, 8, 10, 7], [8, 1, 2, 9], [11, 9, 3, 4],[5, 6, 10, 11],[0,1,2,3,4,5,6,7]],
            [[3, 4, 7, 8, 12, 13, 16, 17, 19, 20, 22, 23, 24]],                         
            [[0,18,3],[3,4,5],[5, 6, 15],[6,7,8],[8,9,10],[10,11,12],[12,13,14],[14,15,16],[16,17,2],[1,2,18],[5,2,17,13,12,6],[3,16,14,8,7,4]],
            [[0,10,16,9],[1,10,11,12],[2,3,11,15],[7,8,13,16],[12,13,14,6],[4,5,14,15],[1,2,3,4,5,6,13,10],[6,7,8,9,0,1,11,14]],   //11
            [[0,2,3,4,5,6]], 
            [[0,1,2],[2,3,4],[4,5,6],[6,7,8]],
            [[0,1,2,3,4,5,6]],
            [[0,6,7],[7,1,8],[8,2,9],[9,3,10],[4,10,11],[5,6,11]],                                    //15
            [[0,3,4,6]],
            [[0,1,2,3,4,5,6,8,9,12,13,14,16,17,21,22]],                                 
            [[0,12,19,11],[10,19,23,18], [8,9,17,18],[1,13,20,12],[20,21,22,23],[22,16,7,17],[2,3,13,14],[21,14,4,15],[5,6,16,15],
                [0,1,13,21,22,18,10,11],[7,8,9,10,19,20,21,16],[1,2,3,4,15,22,23,12],[4,5,6,7,17,23,20,14],[0,1,2,3,4,5,6,7,8,9,10,11]],            
            [[0,15,16,27],[1,16,17,28],[2,17,18,29],[3,4,18,19],[14,26,27,35],[28,35,36,39],[29,30,36,37],[5,19,20,30],[13,25,26,34],
                [33,34,38,39],[31,32,37,38],[6,20,21,31],[11,12,24,25],[10,23,24,33],[9,22,23,32],[7,8,21,22],[0,1,17,36,39,26,14,15],
                [27,28,36,38,33,25,13,14],[10,11,12,13,26,39,38,23],[1,2,18,30,37,39,35,16],[28,29,30,31,32,33,34,35],[39,37,31,22,9,10,24,34],
                [2,3,4,5,20,37,36,17],[29,19,5,6,21,32,38,36],[6,7,8,9,23,38,37,20],[0,1,2,18,30,31,32,33,25,13,14,15],[27,28,29,30,31,22,9,10,11,12,13,14],
                [1,2,3,4,5,6,21,32,33,34,35,16],[28,29,19,5,6,7,8,9,10,24,34,35],[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]],   ///   4*4
            [[0,1,2,3,5,6, 7,8,9,10,11,12,14,15,16,17,21,22,26,27,29,30,31]],               //20
            [[0,1,2,3,5,6, 7,8,10,11,13,14,15, 16,17, 18,19,20,21,22,23,24]],
            [[0,11,12,19],[1,12,13,20],[2,13,14,21],[3,4,14,15],[9,10,18,19],[8,17,18,20],[7,16,17,21],[5,6,15,16],[0,1,13,17,8,9,10,11]
                ,[1,2,14,16,7,8,18,12],[2,3,4,5,6,7,17,13]],
            [[0,1,2,3,4,5,6,8,9,12,13,14,16,17,21,22]],
            [[0,1,2,3,4,5,6,8,10,11,13,14,15,16,17,18,19,20,21,23,24]],
            [[0,2,3,4,5,6,7,8,12,13,16,17,21,22,25,26,27,28,29,30]],                         //25
            [[0,3,4,6 ,7,8 ,10,11,13,14,15, 16,17, 18,19,20,21,23,24]],
            [[0,2,3,4,5,6 ,7 ,11,12,13,14,15, 16,17, 20,21,22,23,24]],
            [[0,1,2,3,4,5,6 ,7,8, 10,11,13,14,15, 16,17, 21,22, 25,26,27,28,29,30]],

            [[0,11,12,19],[1,12,13,20],[2,3,13,14],[4,14,15,21],[5,6,15,16],[7,16,17,22],[8,9,17,18],[10,18,19,23],[20,21,22,23],[0,1,13,21,22,18,10,11]
                ,[1,2,3,4,15,22,23,12],[4,5,6,7,17,23,20,14],[7,8,9,10,19,20,21,16],[0,1,2,3,4,5,6,7,8,9,10,11]],     //29    3*3
            [[0,1,2,3,5,6,7,8,9,10,11,12,14,15,16,17,21,22,26,27,29,30,31]],
            [[0,13,14,25],[1,14,15,26],[2,15,16,27],[3,4,16,17],[5,17,18,24],[6,7,18,19],[8,19,20,30],[9,20,21,29],[10,11,21,28],[12,22,25,28],[26,22,23,29],[23,24,27,30]
                ,[0,1,15,23,29,28,12,13],[1,2,16,24,30,29,22,14],[2,3,4,5,18,30,23,15],[5,6,7,8,20,23,27,17],[8,9,21,22,26,27,24,19],[9,10,11,12,25,26,23,20]
                ,[0,1,2,16,24,19,8,9,10,11,12,13],[1,2,3,4,5,6,7,8,9,21,22,14]],                //31  4*3
            [[0,16,27,15],[1,17,28,16],[2,18,17,29],[3,19,30,18],[4,5,20,19],[6,21,31,20],[7,8,22,21],[9,23,32,22],[10,24,33,23],[11,25,34,24],[12,13,26,25],[14,27,35,26],[28,36,34,35],[29,37,33,36],[30,31,32,37]
                ,[0,1,17,36,34,26,14,15],[1,2,18,37,33,34,35,16],[2,3,19,31,32,33,36,17],[3,4,5,6,21,32,37,18],[6,7,8,9,23,37,30,20],[9,10,24,36,29,30,31,22],[10,11,25,35,28,29,37,23],[11,12,13,14,27,28,36,24]
                ,[0,1,2,18,37,23,10,11,12,13,14,15],[1,2,3,19,31,22,9,10,11,25,35,16],[2,3,4,5,6,7,8,9,10,24,36,17]],        // 5*3
            [[0,3,4,5,7,8,12,13,19,20,23,24,28,29,32,33,34,35,36,37,38]],       //33
            [[2,3,8],[0,3,4],[4,5,9],[1,5,6],[6,7,10],[8,11,12],[12,13,17],[9,13,14],[14,15,18],[10,15,16],[19,20,25],[17,20,21],[21,22,26],[22,23,18],[23,24,27]
                ,[0,1,6,14,13,3],[4,12,17,18,15,5],[8,9,14,21,20,11],[9,10,16,23,22,13],[12,19,25,26,22,13],[14,21,26,27,24,15],[4,12,19,25,26,27,24,15,5]], /// tri 4*3
            [[0,10,9,15],[1,11,16,10],[2,3,12,11],[4,5,13,12],[6,14,16,13],[7,8,15,14],[0,1,11,13,6,7,8,9],[1,2,3,4,5,6,14,10]],     // 35    3*2
            [[0,1,2,3,4,5,6,7,8,9,11,12,13,14,15,16,17,18,21,22,23,26,27,29,30,31]],
            [[0,14,13,23],[1,15,14,24],[2,16,25,15],[3,17,26,16],[4,5,18,17],[6,7,19,18],[8,20,26,19],[9,21,25,20],[10,22,24,21],[11,12,23,22]
                ,[0,1,15,21,10,11,12,13],[1,2,16,20,9,10,22,14],[2,3,17,19,8,9,21,15],[3,4,5,6,7,8,20,16]],   //37      5*2
            [[0,1,2,3,4,5,6,8,10,11,13,14,15,16,17,18,19,20,21,23,24]],
            [[0,1,2,3,5,6,7,8,9,10,11,12,14,16,19,20,22,23,24,25,26,27,28,30,31,33,34,36,37,38,39,40,41,42,43,44]],
            [[0,2,3,4,5,6,7,8,9,11,12,13,14,15,16,17,18,19,20,21,22,23,24,28,29]],     // 40
            [[0,1,2,3,5,6,7,8,10,11,13,14,15,16,17,18,19,20,21,22,23,24]],
            [[0,2,3,4,5,6,7,8,9,12,13,14,16,17,18,19,20,21,23,24,27,28,29,30,31]],   //42
            [[2,3,8],[0,3,4],[4,5,9],[1,5,6],[6,7,10],[8,11,12],[12,13,17],[9,13,14],[14,15,18],[10,15,16],[19,20,25],[17,20,21],[21,22,26],[18,22,23],[23,24,27],[25,28,29],[29,30,34],[30,31,26],[31,32,35],[27,32,33]
                ,[0,1,6,14,13,3],[4,12,17,18,15,5],[8,9,14,21,20,11],[9,10,16,23,22,13],[12,19,25,26,22,13],[14,21,26,27,24,15],[17,18,23,31,30,20],[21,29,34,35,32,22]],         ///tri 4*3
            [[0,3,4,5,7,8,12,13,19,20,23,24,28,29,32,33,34,35,36,37,38]],
            [[0,20,35,19],[1,21,36,20],[2,22,37,21],[3,23,38,22],[4,5,24,23],[6,25,39,24],[7,26,40,25],[8,27,41,26],[9,10,28,27],[11,29,42,28],[12,30,43,29],[13,31,44,30]
                ,[14,15,32,31],[16,33,45,32],[17,34,46,33],[18,35,47,34],[36,48,47,55],[37,49,56,48],[38,39,50,49],[50,40,51,57],[51,41,42,52],[52,43,53,58],[53,44,45,54]
                ,[54,46,55,59],[59,56,58,57],[0,1,21,48,55,34,18,19],[1,2,22,49,56,55,47,20],[2,3,23,39,50,56,48,21],[3,4,5,6,25,50,49,22],[6,7,26,51,57,49,38,24]
                ,[39,40,51,58,59,48,37,38],[49,57,58,54,46,47,36,37],[48,59,54,33,17,18,35,36],[16,17,34,55,59,53,44,32],[45,46,55,56,57,52,43,44],[53,59,56,50,40,41,42,43]
                ,[52,57,50,25,7,8,27,42],[8,9,10,11,29,52,51,26],[11,12,30,53,58,51,41,28],[12,13,31,45,54,58,52,29],[13,14,15,16,33,54,53,30]
                ,[0,1,2,22,49,57,58,54,33,17,18,19],[1,2,3,23,39,40,51,58,54,46,47,20],[2,3,4,5,6,7,26,51,58,59,48,21],[6,7,8,27,42,43,53,59,48,37,38,24]
                ,[39,40,41,42,43,44,45,46,47,36,37,38],[49,57,52,43,44,32,16,17,18,35,36,37],[7,8,9,10,11,12,30,53,59,56,50,25],[40,41,28,11,12,13,31,45,46,55,56,50]
                ,[57,52,29,12,13,14,15,16,17,34,55,56],[0,1,2,3,23,39,40,41,42,43,44,32,16,17,18,19],[1,2,3,4,5,6,7,8,27,42,43,44,45,46,47,20]
                ,[6,7,8,9,10,11,12,13,31,45,46,47,36,37,38,24],[39,40,41,28,11,12,13,14,15,16,17,18,35,36,37,38],[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19]],   ////5*5
            [[0,1,2,3,4,5,6,8,10,11,13,14,15,16,17,18,19,20,21,23,24]],    //46
            [[3,4,7,9,10,12,13,14,16,18,19,21,22,23,24,27,28,29,30,31]],
            [[0,1,2,3,4,5,6,7,12,13,16,17,18,21,22,23]],    // 48
            [[0,3,4,5,7,8,10,11,13,14,15,16,17,18,20,21,22,23,24]],
            [[0,3,4,5,7,8,12,13,16,19,20,22,23,24,26,27,29,30,31,35,36]], // 50
            [[1,2,4,5,6,7,8,9,10,11,12,14,15,17,18,20,21,22,23,24,26,27,29,30,31,33,34,36,37,38]],
            [[3,4,11],[0,4,5],[5,6,12],[1,6,7],[7,8,13],[2,8,9],[9,10,14],[11,15,16],[16,17,23],[12,17,18],[18,19,24],[13,19,20],[20,21,25],[14,21,22]
                ,[26,27,34],[23,27,28],[28,29,35],[24,29,30],[30,31,36],[25,31,32],[32,33,37],[0,1,7,18,17,4],[1,2,9,20,19,6],[11,12,18,28,27,15],[12,13,20,30,29,17]
                ,[13,14,22,32,31,19],[5,16,23,24,19,6],[7,18,24,25,21,8],[16,26,34,35,29,17],[18,28,35,36,31,19],[20,30,36,37,33,21],[0,1,2,9,20,30,29,17,4]
                ,[5,16,26,34,35,36,31,19,6],[7,18,28,35,36,37,33,21,8]],   //52     // tri 3*3
            [[1,2,4,5,6,7,9,10,12,13,14,16,19,20,21,23,24,28,29,32,33,34,35,36,37,38]],
            [[3,4,9,10,11,12,13,14,15,19,20,23,24,25,26,27,28,30,31,33,34,36,37,38,41,42,43,44,45]],   //54
            [[0,2,3,5,6,7,9,10,12,13,14,16,18,19,21,22,23,24,25,27,28,30,31,32,33,34,35,36,37]],
            [[0,2,3,5,6,7,9,10,12,13,14,16,18,19,21,22,23,24,25,27,28,30,31,32,33,34,35,36,37]],  //56
            [[0,18,31,17],[1,19,32,18],[2,20,33,19],[3,21,34,20],[4,5,22,21],[6,23,35,22],[7,24,36,23],[8,9,25,24],[10,26,25,37],[11,27,38,26],[12,28,39,27]
                ,[13,14,29,28],[15,30,40,29],[16,31,41,30],[32,42,47,41],[33,43,48,42],[34,35,44,43],[44,36,37,45],[48,45,38,46],[47,46,39,40],[0,1,19,42,47,30,16,17]
                ,[1,2,20,43,48,47,41,18],[2,3,21,35,44,48,42,19],[3,4,5,6,23,44,43,20],[31,32,42,46,39,29,15,16],[32,33,43,45,38,39,40,41],[33,34,35,36,37,38,46,42]
                ,[34,22,6,7,24,37,45,43],[7,8,9,10,26,45,44,23],[10,11,27,46,48,44,36,25],[11,12,28,40,47,48,45,26],[12,13,14,15,30,47,46,27],[0,1,2,20,43,45,38,39,29,15,16,17]
                ,[11,12,13,14,15,16,31,32,33,43,45,26],[1,2,3,21,35,36,37,38,39,40,41,18],[32,33,34,35,36,25,10,11,12,28,40,41],[2,3,4,5,6,7,24,37,38,46,42,49],[6,7,8,9,10,11,27,46,42,33,34,22]
                ,[0,1,2,3,21,35,36,25,10,11,12,13,14,15,16,17],[1,2,3,4,5,6,7,8,9,10,11,12,28,40,41,18]],    ///5*4
            [[3,4,9,10,11,12,13,14,15,17,18,20,21,22,23,26,27,29,30,31,34,35,36,37,38,39,42,43,44]],    //58
            [[0,2,3,4,5,6,7,8,9,11,12,13,14,15,16,17,18,19,20,21,22,23,24,28,29]],
            [[3,4,7,8,9,10,11,12,13,14,18,19,20,21,22,23,24,25,26,27,28,30,31]],   // 60
            [[0,1,2,3,5,6,7,9,11,12,14,15,16,17,21,22]],
            [[1,2,5],[0,2,3],[3,4,6],[5,7,8],[8,9,11],[6,9,10],[12,13,16],[11,13,14],[14,15,17],[5,6,10,14,13,7],[8,12,16,17,15,9]],
            [[3,4,7,10,11,12,14,19,20,23,26,27,29,30,31,34,35,36,37,38]],
            [[1,2,5,],[0,2,3],[3,4,6],[5,7,8],[8,9,11],[6,9,10],[12,13,16],[11,13,14],[14,15,17],[16,18,19],[19,20,22],[17,20,21],[5,6,10,14,13,7],[8,12,16,17,15,9]],
            [[0,1,2,3,5,6,7,8,10,11,13,14,15,16,17,18,19,21,22,23,24,27,28,29,30,31,33,34,36,37,38]],   //65
            [[2,3,8],[0,3,4],[4,5,9],[1,5,6],[6,7,10],[8,11,12],[12,13,17],[9,13,14],[14,15,18],[10,15,16],[19,20,25],[17,20,21],[21,22,26],[18,22,23],[23,24,27]
                ,[25,28,29],[29,30,34],[30,31,26],[31,32,35],[27,32,33],[34,37,38],[35,39,40],[36,42,37],[38,39,43],[40,41,44]
                ,[0,1,6,14,13,3],[4,12,17,18,15,5],[8,9,14,21,20,11],[9,10,16,23,22,13],[12,19,25,26,22,13],[14,21,26,27,24,15],[17,18,23,31,30,20],[21,29,34,35,32,22]
                ,[29,36,42,43,39,30],[31,38,43,44,41,32],[25,28,37,38,31,26],[26,30,39,40,33,27]
                ,[4,12,19,25,26,27,24,15,5],[8,9,10,11,20,3031,23,16],[21,29,36,42,43,44,41,32,22]], ///tri 5*3 - 66
            [[0,3,4,6, 8,9,11,12,13, 14, 18,19,20,21,22, 24,25,27,28,29, 30,31, 35,36, 39,40,41,42,43,44]],     //67
            [[0,1,2,3,5,6,7,8,9,10,11,12,14,15,16,17,21,22,26,27,29,30,31]],    
            [[0,3,4,5,7,8,12,13,19,20,23,24,28,29,32,33,34,35,36,37,38]],     //69
            [[0,2,3,4,5,6,7,8,9,11,12,13,14,15,16,17,18,19,20,21,22,23,24,28,29]],    //70
            [[0,1,2,3,5,6,7,10,11,13,14,15,16,17,20,21,22,23,24]],
            [[0,1,2,3,4,5,6,7,10,11,13,14,15,16,17,18,21,22,24]],
            [[0,1,2,3,5,6,7,8,9,12,13,15,16,19,20,22,23,24,25,27,28,30,31,32,33,34,35,36,37]],   ///73
            [[0,1,2,3,5,6,7,10,11,13,14,15,16,17,20,21,22,23,24]],
            [[3,4,11],[0,4,5],[5,6,12],[1,6,7],[7,8,13],[2,8,9],[9,10,14],[11,15,16],[16,17,23],[12,17,18],[18,19,24],[13,19,20],[20,21,25],[14,21,22]
                ,[26,27,34],[23,27,28],[28,29,35],[24,29,30],[30,31,36],[25,31,32],[32,33,37],[0,1,7,18,17,4],[1,2,9,20,19,6],[11,12,18,28,27,15],[12,13,20,30,29,17]
                ,[13,14,22,32,31,19],[5,16,23,24,19,6],[7,18,24,25,21,8],[16,26,34,35,29,17],[18,28,35,36,31,19],[20,30,36,37,33,21],[0,1,2,9,20,30,29,17,4]
                ,[5,16,26,34,35,36,31,19,6],[7,18,28,35,36,37,33,21,8]
                ,[34,38,39],[39,40,46],[35,40,41],[41,42,47],[36,42,43],[43,44,48],[44,45,37],[23,24,30,41,40,27],[24,25,32,43,42,29],[28,39,46,47,42,29]
                ,[30,41,47,48,44,31],[11,12,13,20,30,41,40,27,15],[12,13,14,22,32,43,42,29,17],[18,28,39,46,47,48,44,31,19]],     //tri4*3
            [[1,2,4,5,6,7,9,10,12,13,14,16,18,19,20,21,22,23,24,28,29,32,33,34,35,37,38]],    //76
            [[4,5,14],[0,5,6],[6,7,15],[1,7,8],[8,9,16],[2,9,10],[10,11,17],[3,11,12],[12,13,18],[14,19,20],[20,21,29],[15,21,22],[22,23,30],[16,23,24],[24,25,31]
                ,[17,25,26],[26,27,32],[18,27,28],[33,34,43],[29,34,35],[35,36,44],[30,36,37],[37,38,45],[31,38,39],[39,40,46],[32,40,41],[41,42,47]
                ,[43,48,49],[49,50,58],[44,50,51],[51,52,59],[45,52,53],[53,54,60],[46,54,55],[55,56,61],[56,57,47]
                ,[0,1,8,22,21,5],[1,2,10,24,23,7],[2,3,12,26,25,9],[6,20,29,30,23,7],[8,22,30,31,25,9],[10,24,31,32,27,11],[14,15,22,35,34,19],[15,16,24,37,36,21]
                ,[16,17,26,39,38,23],[17,18,28,41,40,25],[20,33,43,44,36,21],[22,35,44,45,38,23],[24,37,45,46,40,25],[26,39,46,47,42,27],[29,30,37,51,50,34]
                ,[30,31,39,53,32,36],[31,32,41,55,54,38],[35,49,58,59,52,36],[37,51,59,60,54,38],[39,53,60,61,56,40],[0,1,2,10,24,37,36,21,5],[1,2,3,12,26,39,38,23,7]
                ,[6,20,33,43,44,45,38,23,7],[8,22,35,44,45,46,40,25,9],[10,24,37,45,46,47,42,27,11],[14,15,16,24,37,51,50,34,19],[15,16,17,26,39,53,52,36,21]
                ,[16,17,18,28,41,55,54,38,23],[22,35,49,58,59,60,54,38,23],[24,37,51,59,60,61,56,40,25],[0,1,2,3,12,26,39,53,52,36,21,5]
                ,[8,22,35,49,58,59,60,61,56,40,25,9]],     ///tri 4*4
            [[1,2,4,5,6,7,8,9,10,11,12,14,15,18,19,20,21,22,23,24,26,27,29,30,31,34,35,36,37,38]],   ///78
            [[0,2,3,5,6,7,8,9,11,12,14,15,18,19,20,21,22,23,24,25,27,28,30,31,32,33,34,35,36,37,38],[2,3,4,5,6,7,8,9,11,12,14,15,16,18,19,21,22,23,24,25,27,28,30,31,32,33,34,35,36,37,38]],
            [[0,3,4,5,7,8,9,10,12,13,14,15,19,20,23,24,25,26,27,28,29,30,31,32,33,34,35,37,38,39,42,43,45]],
            [[0,2,3,4,5,6,7,8,9,10,11,12,13,14,16,19,20,22,23,25,26,27,28,29,30,31,33,34,36,37,38]],    //81
            [[3,4,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,26,27,29,30,31,35,36]],
            [[3,4,7,10,11,13,14,15,17,18,20,21,22,23,24,26,27,29,30,31,32,33,34,35,36,37,38]],   //83
            [[0,1,2,3,4,5,6,7,9,10,12,13,14,16,17,18,19,21,22,23,25,26,28,29,30,31,33,34,36,37,38,39,40,41,42,43,44]],
            [[0,3,4,6,7,9,10,11,12,13,14,17,18,20,21,22,23,26,27,29,30,31,33,34,36,37,38,39,41,42,44,45]],    //85
            [[0,2,3,5,6,7,9,10,11,12,13,14,18,19,20,21,22,25,26,27,28,29,30,31,33,34,36,37,38,39,40,41,42,44,45]],   // 86
            [[0,1,2,3,4,5,6, 7,10,11,12, 14, 17,18,20,21,22, 23,24,25,26,27,28,29, 30,31, 32,34,35,37,38, 39,41,42,43,44,45]], 
            [[0,2,3,4,5,6,7,8,9,12,13,14,16,17,18,19,20,21,23,24,27,28,29,30,31]],   //88
            [[1,2,4,5,6, 7,8,9,10,11,12,13, 14, 19,20, 23,26,27,29, 30,31, 33,34,36,37,38]],  //89            
            [[0,1,2,3,5,6,7,8,12,13,16,19,20,22,23,24,26,27,29,30,31,32,33,34,35,36,37]],  // 90
            [[1,2,4,5,6,10,11,14,15,16,18,19,21,22,23,24,26,27,29,30,31,32,33,34,35,37,38],[1,2,4,5,6,9,10,11,12,13,14,16,18,19,21,22,23,24,28,29,32,33,34,35,36,37,38]],  //91
            [[0,1,2,3,5,6, 7,8, 10,11,13,14,15, 16,18,19,20,21,22, 23,24, 27,28,29,30,31, 32,34,35,37,38]],       //92
            [[0,1,2,3,4,5,6, 7,8,9,10,11,12, 14,15, 19,20, 24,25,27,28,29, 30,31, 32,34,35,36,37,38, 40,41,43,44,45]
                ,[0,2,3,5,6, 7,8,9,10,11,12, 14,15, 16,19,20,22, 24,25,27,28,29, 30,31, 32,34,35,36,37,38, 40,41,43,44,45]],       //93
            [[0,2,3,4,5,6,7,8,9,10,12,13,14,16,17,18,19,20,21,22,23,24,28,29,33,34,36,37,38]],  //94
            [[2,3,4,5,6,9,10,11,12,13,14,15,17,18,20,21,22,23,24,27,28,29,30,31,32,34,35,37,38]],  //95
            [[0,2,3,4,5,6, 7,8,9,10,11,12,13, 14, 16,17,18,19,20,21,22, 23,25,26,28,29, 30,31, 35,36, 41,42,43,44,45]],          //96
            [[0,3,4,6, 7,8,9,10,12,13, 14,15, 16,17, 18,19,21,22, 23,24, 25,27,28,30,31, 33,34, 36,37,38]],                    //97
            [[1,2,4,5,6, 10,11, 14, 19,20, 25,26,27,28,29, 30,31, 32,33,34,35,36,37,38]],           //98
            [[2,3,4,5,6, 10,11, 14,15, 16,17,18,19,20,21,22, 23,24, 27,28,29,30,31, 32,34,35,36,37,38]],           //99
            [[0,1,2,3,4,5,6, 8,9,11,12,13, 14, 18,19,20,21,22, 23,24, 25,28,29,30, 32,34,35,36,37,38]],           //100
            [[0,2,3,4,5,6, 7,8,9,10,12,13, 14, 19,20, 25,26,27,28,29, 30,31, 32,33,34,35,36,37,38, 41,42,43,44,45]],           //101
            [[0,2,3,5,6, 7,8,9,10,12,13, 14,15, 17,18,20,21,22, 23,24, 25,27,28,30,31, 32,33,34,35,36,37,38]],           //102
            [[0,2,3,5,6, 7,10,11,13, 14, 18,19,20,21,22, 23,24,25,26,27,28,29, 30,31, 35,36, 39,40,41,42,44,45]],           //103
            [[0,1,2,3,4,5,6, 7,8, 9,11,12,13,14,15, 16,17, 18,21,22,23, 26,27,29,30,31]],           //104
            [[0,1,2,3,4,5,6, 7,8,9,10,12,13, 14, 16,19,20,21, 23,26,27,29, 30,31, 35,36, 40,41,43,44,45]],           //105
            [[2,3,4,5,6, 10,11, 14,15, 17,18,20,21,22, 24,25,27,28,29, 30,31, 32,34,35,37,38, 41,42,43,44,45]],
            [[0,2,3,4,5,6, 7, 11,12,13,14,15, 16,17, 20,21,22,23,24]],//107
            [[0,2,3,4,5,6, 7,9,10,11,12,13, 14, 16,17,18,19,20,21,22, 23,24, 25,27,28,29,30,31, 35,36]],//108

        ];
        return result[index];
    },

    destroy_stick: function(stk)
    {
        this.destroy_stick_from_array(this.arr_sticks, stk);
        this.destroy_stick_from_array(this.arr_added_sticks,stk);
        this.destroy_stick_from_array(this.arr_removed_sticks, stk);
        this.arr_removed_sticks.push(stk);        
        stk.active = false;
        if(this.b_last_stick)
        {   
            this.check_game_result();
        } 
    },

    destroy_stick_from_array: function(ary, stk)
    {
        for(var i = 0; i < ary.length; i++)
            if(ary[i].getComponent('stick').index == stk.getComponent('stick').index)
            {
                ary.splice(i, 1);
            }
    },

    check_stick_movable: function(status)
    {        
        for(var i = 0; i < this.arr_sticks_mini.length; i++)
        {            
            if(status == 1)
            {
                //Real stick
                if(!this.arr_sticks_mini[i].getComponent('stick_mini').status)
                    return true;
            }
            else
            {
                //Empty stick -- Shadow
                if(this.arr_sticks_mini[i].getComponent('stick_mini').status)
                    return true;                
            }            
        }
        return false;
    },

    reset_game: function()
    {
        this.sticks.removeAllChildren();
        this.footer.removeAllChildren();
        this.b_game_on = false;
        this.b_game_start = false;
        this.b_game_end = false;
        this.b_game_successed = false;
        this.bHintHand = false;
        this.b_stick_movable = true;
        this.b_last_stick = false;
        this.b_all_placed = false;
        this.b_shape_count = false;
        this.b_game_start_animation = true;        

        this.arr_sticks = [];
        this.arr_sticks_shadow = [];
        this.arr_sticks_mini = [];
        this.arr_sticks_mini_shadow = [];
        this.arr_added_sticks = [];
        this.arr_removed_sticks = [];
        this.arr_result = [];
        this.hint_count = 0;        
        this.actived_mini_stick_count = 0;

        this.progress.getComponent('progress').update_image();
    },    

    // update (dt) {},
});
