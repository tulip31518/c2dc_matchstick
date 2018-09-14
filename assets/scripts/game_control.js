
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
        this.event_dlg_pause();
        this.event_dlg_progress();
        this.event_dlg_mavelous();
        this.restart.on(cc.Node.EventType.TOUCH_END, function(){
            this.event_restart();
        }, this);

        this.hint_btn.on(cc.Node.EventType.TOUCH_END, function(){
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
        this.progress.on(cc.Node.EventType.TOUCH_END, function () { 
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
            this.diable_game_pan();
            this.game.update_stage_button();
        }, this);

        this.home_dlg_pause.on(cc.Node.EventType.TOUCH_END, function () {   
            this.diable_game_pan();            
            this.home_pan.active = true;
        }, this);
    },

    event_dlg_mavelous: function()
    {
        this.home_dlg_mavelous.on(cc.Node.EventType.TOUCH_END, function () { 
            this.diable_game_pan();            
            this.home_pan.active = true;
            this.dlg_mavelous.active = false;
        }, this);

        this.bucket_dlg_mavelous.on(cc.Node.EventType.TOUCH_END, function () {       
            this.game.parent_node = this.dlg_mavelous;
            this.game.in_dlg_buy_hint();
        }, this);

        this.forward_dlg_mavelous.on(cc.Node.EventType.TOUCH_END, function () {       
            this.node.runAction(cc.sequence(
                cc.delayTime(0.1),
                cc.fadeIn(0.5)
            ));
            this.background.active = true;
            this.dlg_mavelous.active = false;
            this.load_game();
        }, this);

        this.share_dlg_mavelous.on(cc.Node.EventType.TOUCH_END, function () {            
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
        this.hint_count ++;
        this.hints --;
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
                this.remove_stick(this.arr_sticks[i]);
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
    },

    load_game: function()
    {
        this.reset_game();
        // this.task_info = this.get_stage_task();
        this.task_info = this.game.task[this.game.curent_level - 1][this.game.curent_stage - 1];
        this.stage.string = "STAGE " + this.game.curent_stage;
        this.level.string = "LEVEL " + this.game.curent_level;
        this.hint.string = this.game.hints;

        if(this.task_info.act_shape != "formula")
            this.task_content.string = this.task_info.act_type + " " + this.task_info.act_cnt + " matchsticks to create " 
                + this.task_info.act_shape_cnt + "\n" + this.task_info.act_shape + "s." ;
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
                cc.moveBy(0.2, cc.v2(0, 1000)).easing(cc.easeExponentialOut()), 
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
                yPos -= 700;
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
                
        var oldPos = cc.v2(0,0);
        for(var i = this.arr_sticks_mini.length - 1; i >= 0; i--)
        {            
            if(this.arr_sticks_mini[i].getComponent('stick_mini').status)
            {
                oldPos = this.arr_sticks_mini[i].position;               
                // this.arr_sticks_mini[i].active = false;
                this.arr_sticks_mini[i].getComponent('stick_mini').status = false;
                this.arr_sticks_mini[i].getComponent('stick_mini').update_image();
                if(i == 0 && this.task_info.act_type != "Remove")
                    this.b_last_stick = true;
                else
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
        // var b_last_stick = false;
        for(var i = 0; i < this.arr_sticks_mini.length; i++)
        {            
            if(!this.arr_sticks_mini[i].getComponent('stick_mini').status)
            {          
                if(this.task_info.act_type == "Move")
                    this.arr_sticks_mini[i].active = true;               
                this.arr_sticks_mini[i].getComponent('stick_mini').status = true;                
                this.arr_sticks_mini[i].getComponent('stick_mini').update_image();
                oldPos = this.arr_sticks_mini[i].position;
                if(i == this.arr_sticks_mini.length - 1 && this.task_info.act_type == "Remove")
                    this.b_last_stick = true;
                else
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
        

        var result = this.get_pattern_square(); 
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
        // cc.log(this.arr_result); 
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
        this.stage_up();       
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
                )

                if(i == this.arr_result.length - 1)
                    seq = cc.sequence(
                        cc.delayTime(delay),
                        cc.moveBy(0.2, cc.v2(0, 25)).easing(cc.easeCubicActionIn()),
                        cc.moveBy(0.2, cc.v2(0, -25)).easing(cc.easeCubicActionIn()),
                        cc.delayTime(0.5),
                        cc.callFunc(this.in_dlg_mavelous.bind(this))
                    );
                stick.runAction(seq);
            }

            delay += 0.5;
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
    },

    stage_up: function()
    {
        this.game.curent_stage++;
        if(this.game.curent_stage == 50)
            this.game.curent_level++;

        if(this.game.curent_stage == this.game.stage)
            this.game.stage ++;
        if(this.game.curent_stage > this.game.stage)
            this.game.stage  = this.game.curent_stage;
        if(this.game.curent_level > this.game.level)
            this.game.level++;
        this.game.update_stage_button();
    },    

    get_pattern_square: function()
    {
        var result = [
            [         
                [[0 , 1, 2, 3]],
                [[0 ,6, 4, 5],[1 ,2, 3 ,6]],
                [[2, 3 ,11, 10],[11 , 4, 5 , 12],[0 ,1, 10, 12, 6,7, 8, 9]],
                [[0, 1, 2, 3, 4, 5]],
                [[0, 8, 10, 7], [1, 2, 9, 8], [0, 1, 2, 3, 4, 5, 6, 7]],
                [[0, 1, 2, 8], [9, 8, 3, 4], [6, 7, 9, 5]],
                [[0, 1, 5], [6,2,3], [4,5,6]],
                [[0, 1, 2, 3], [4, 5, 6, 7], [9, 10, 11, 12],[4, 8, 12, 3]],
                [[0, 8, 10, 7], [8, 1, 2, 9], [11, 9, 3, 4],[5, 6, 10, 11],[0,1,2,3,4,5,6,7]],
            ]
        ];

        return result[this.game.curent_level - 1][this.game.curent_stage - 1];
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
        this.bHintHand = false;
        this.b_stick_movable = true;
        this.b_last_stick = false;
        this.b_all_placed = false;
        this.b_shape_count = false;

        this.arr_sticks = [];
        this.arr_sticks_shadow = [];
        this.arr_sticks_mini = [];
        this.arr_sticks_mini_shadow = [];
        this.arr_added_sticks = [];
        this.arr_removed_sticks = [];
        this.arr_result = [];
        this.hint_count = 0;        

        this.progress.getComponent('progress').update_image();
    },    

    // update (dt) {},
});
