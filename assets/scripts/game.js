
cc.Class({
    extends: cc.Component,

    properties: {

        stickPrefab:{
            default:null,
            type: cc.Prefab
        },

        daily_gift:{
            default:null,
            type: cc.Node
        },

        background:{
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

        dlg_level_locked:{
            default:null,
            type: cc.Node
        },

        play_dlg_level_locked:{
            default:null,
            type: cc.Node
        },

        close_dlg_level_locked:{
            default:null,
            type: cc.Node
        },

        lbl_dlg_level_locked:{
            default:null,
            type: cc.Label
        },  
        
        dlg_get_hint:{
            default:null,
            type: cc.Node
        },

        ok_dlg_get_hint:{
            default:null,
            type: cc.Node
        },

        close_dlg_get_hint:{
            default:null,
            type: cc.Node
        },

        btn_sound:{
            default:null,
            type: cc.Node
        },

        snd_spriteList:{
            default:[],
            type: [cc.SpriteFrame]
        },

        snd_home:{
            default:null,
            type: cc.AudioClip
        },
        snd_btn_click:{
            default:null,
            type: cc.AudioClip
        },
        snd_level_1:{
            default:null,
            type: cc.AudioClip
        },
        snd_level_2:{
            default:null,
            type: cc.AudioClip
        },
        snd_level_3:{
            default:null,
            type: cc.AudioClip
        },

        btn_cap:{
            default:null,
            type: cc.Node
        },

        btn_bucket:{
            default:null,
            type: cc.Node
        },

        dlg_bucket:{
            default:null,
            type: cc.Node
        },

        close_dlg_bucket:{
            default:null,
            type: cc.Node
        },

        hint1_video_dlg_bucket:{
            default:null,
            type: cc.Node
        },

        lbl_dlg_bucket:{
            default:null,
            type: cc.Label
        },

        dlg_no_video:{
            default:null,
            type: cc.Node
        },

        close_dlg_no_video:{
            default:null,
            type: cc.Node
        },

        ok_dlg_no_video:{
            default:null,
            type: cc.Node
        },

        btn_start:{
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

        level_all_stages:{
            default:null,
            type: cc.Label
        },

        lbl_gift_timer:{
            default:null,
            type: cc.Label
        },

        level: 1,
        stage: 1,
        curent_level: 1,
        curent_stage: 1,
        all_stages:0,
        hints:2,
        blevel_detail: false,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.task = null;
        this._assets = [];
        this._hasLoading = false;
        this.load_game_info_asset();
        this.bsound_play = true;
        this.updateInterval = 1;
        this.parent_node = this.node;
        this.actions();
        this.events();
    },

    load_game_info_asset: function()
    {
        if (this._hasLoading) { return; }
        this._hasLoading = true;
        cc.loader.loadResDir("data", (err, assets) => {
            if (!this.isValid) {
                return;
            }
            this._assets = assets;
            for (var i = 0; i < assets.length; ++i) {
                var asset = assets[i];
                var info = asset.toString();
                if (!info) {
                    if (asset instanceof cc.JsonAsset) {
                        info = JSON.stringify(asset.json, null, 4);
                        this.task = JSON.parse(info);
                    }
                    else {
                        info = info || asset.name || cc.js.getClassName(asset);
                    }
                }
            }
            this._hasLoading = false;
        });

        this.load_saved_game_info();
    },

    actions: function()
    {
        this.comein_levelAction = cc.moveBy(0.1, cc.v2(0, 50)).easing(cc.easeElasticInOut(3.0));
        this.in_gift_Action = cc.moveBy(0.5, cc.v2(0, -700)).easing(cc.easeElasticOut());
        this.out_gift_Action = cc.moveBy(0.5, cc.v2(0, 700)).easing(cc.easeElasticOut());

        this.btn_start_rot_r = cc.rotateBy(0.1, 15).easing(cc.easeElasticOut());
        this.btn_start_rot_l = cc.rotateBy(0.2, -15).easing(cc.easeElasticIn());
        
        this.btn_start.runAction(cc.repeatForever(cc.sequence(
            cc.rotateBy(0.1, 15),
            cc.rotateBy(0.1, -15),
            cc.rotateBy(0.1, -15),
            this.btn_start_rot_r, 
            cc.delayTime(2)
        )));

        // this.btn_start.runAction(cc.moveBy(5, cc.v2(0, 500))).repeatForever();
        // this.btn_start.runAction(cc.rotateBy(3, 360)).repeatForever();

        this.daily_gift.runAction(cc.repeatForever(cc.sequence(
            cc.scaleBy(0.1, 1.25, 1.25),
            cc.scaleBy(0.1, 0.8, 0.8),
            cc.scaleBy(0.1, 0.8, 0.8),
            cc.scaleBy(0.1, 1.25, 1.25).easing(cc.easeElasticInOut()), 
            cc.delayTime(5)
        )));
    },

    events: function()
    {                
        this.event_home_pan();
        this.event_dlg_gift();
        this.event_dlg_buy_hint();
        this.event_dlg_level_locked();
        this.event_dlg_get_hint();   
        
    },

    event_home_pan:function()
    {
        this.home_pan.on(cc.Node.EventType.TOUCH_END, function (event) 
        {       
            if(this.bsound_play)
                cc.audioEngine.play(this.snd_btn_click, false, 1);
            var touches = event.getTouches();
            if(touches[0].getLocation().y > this.daily_gift.position. y + this.daily_gift.height / 2 + this.node.height / 2) 
                this.load_game_menu(); 

        }, this);

        this.btn_backhome.on(cc.Node.EventType.TOUCH_END, function () {
            if(this.bsound_play)
                cc.audioEngine.play(this.snd_btn_click, false, 1);
            if(this.lvl_detail_pan.active)
            {
                this.lvl_large_pan.active = true;
                this.lvl_detail_pan.active = false;
                this.toppan_title.string = "LEVEL";
                // this.passed_stages.string = (this.level - 1) * 50 + this.stage;
                this.passed_stages.string = this.all_stages;
                this.update_stage_button();
            }
            else
            {
                this.home_pan.active = true;
                this.top_pan.active = false;
                this.level_pan.active = false;            
                this.level_pan.position = cc.v2(0, -200);          
            }            
        }, this);

        this.btn_sound.on(cc.Node.EventType.TOUCH_END, function () {
            this.bsound_play = !this.bsound_play;
            var sprite = this.btn_sound.getComponent(cc.Sprite);
            if(this.bsound_play)
            {
                sprite.spriteFrame = this.snd_spriteList[0];
                cc.audioEngine.play(this.snd_home, true, 1);
            }    
            else
            {
                sprite.spriteFrame = this.snd_spriteList[1];
                cc.audioEngine.stopAll();
            }
              
        }, this);

        this.btn_share.on(cc.Node.EventType.TOUCH_END, function(){
            if(this.bsound_play)
                cc.audioEngine.play(this.snd_btn_click, false, 1);
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

        if(this.bsound_play)
            cc.audioEngine.play(this.snd_home, true, 1);
    },

    in_dlg_buy_hint:function()
    {
        this.dlg_bucket.active = true;
        this.lbl_dlg_bucket.string =  this.hints;
        this.dlg_bucket.position = cc.v2(375, 2000);
        this.parent_node.runAction(cc.sequence(
            cc.delayTime(0.1),
            cc.fadeOut(0.5)
        ));
        this.dlg_bucket.runAction(cc.sequence(
            cc.moveBy(0.5, cc.v2(0, -700)),
            this.in_gift_Action
        ));    
    },

    out_dlg_buy_hint: function(parent)
    {
        this.parent_node.runAction(cc.sequence(
            cc.delayTime(0.1),
            cc.fadeIn(0.5)
        ));
        this.dlg_bucket.runAction(cc.sequence(
            cc.moveBy(0.5, cc.v2(0, 700)),
            this.out_gift_Action,

        ));
    },

    event_dlg_buy_hint: function()
    {
        this.btn_bucket.on(cc.Node.EventType.TOUCH_END, function () 
        {
            if(this.bsound_play)
                cc.audioEngine.play(this.snd_btn_click, false, 1);
            this.in_dlg_buy_hint();
        }, this);

        this.close_dlg_bucket.on(cc.Node.EventType.TOUCH_END, function () {
            if(this.bsound_play)
                cc.audioEngine.play(this.snd_btn_click, false, 1);
            this.out_dlg_buy_hint();
        }, this);

        this.hint1_video_dlg_bucket.on(cc.Node.EventType.TOUCH_END, function () {
            if(this.bsound_play)
                cc.audioEngine.play(this.snd_btn_click, false, 1);
            this.dlg_no_video.active = true;
            this.dlg_no_video.position = cc.v2(375, 2000);
            this.dlg_bucket.runAction(cc.sequence(
                cc.delayTime(0.1),
                cc.fadeOut(0.5)
            ));
            this.dlg_no_video.runAction(cc.sequence(
                cc.moveBy(0.5, cc.v2(0, -700)),
                this.in_gift_Action
            ));
        }, this);

        this.ok_dlg_no_video.on(cc.Node.EventType.TOUCH_END, function () {
            if(this.bsound_play)
                cc.audioEngine.play(this.snd_btn_click, false, 1);
            this.dlg_bucket.runAction(cc.sequence(
                cc.delayTime(0.1),
                cc.fadeIn(0.5)
            ));
            this.dlg_no_video.active = false;
        }, this);

        this.close_dlg_no_video.on(cc.Node.EventType.TOUCH_END, function () {
            if(this.bsound_play)
                cc.audioEngine.play(this.snd_btn_click, false, 1);
            this.dlg_bucket.runAction(cc.sequence(
                cc.delayTime(0.1),
                cc.fadeIn(0.5)
            ));
            this.dlg_no_video.active = false;
        }, this);
    },

    event_dlg_gift: function()
    {
        this.daily_gift.on(cc.Node.EventType.TOUCH_END, function () 
        {
            if(this.bsound_play)
                cc.audioEngine.play(this.snd_btn_click, false, 1);

            if(this.lbl_gift_timer.node.active)            
                return;
            this.lbl_gift_timer.node.active  = true;
            this.time_got_gift = Date.now();
            this.hints += 1;
            this.save_data();
            
            this.dlg_gift.active = true;            
            this.lbl_dlg_gift.string = "The number of hints \nyou have has\n incresed to " + this.hints + ".";
            this.dlg_gift.position = cc.v2(375, 2000);
            this.node.runAction(cc.sequence(
                cc.delayTime(0.1),
                cc.fadeOut(0.5)
            ));
            this.dlg_gift.runAction(cc.sequence(
                cc.moveBy(0.5, cc.v2(0, -700)),
                this.in_gift_Action
            ));
        }, this);

        this.ok_dlg_gift.on(cc.Node.EventType.TOUCH_END, function () {
            if(this.bsound_play)
                cc.audioEngine.play(this.snd_btn_click, false, 1);
            this.node.runAction(cc.sequence(
                cc.delayTime(0.1),
                cc.fadeIn(0.5)
            ));
            this.dlg_gift.runAction(cc.sequence(
                cc.moveBy(0.5, cc.v2(0, 700)),
                this.out_gift_Action,

            ));
        }, this);
    },

    event_dlg_level_locked: function()
    {
        this.close_dlg_level_locked.on(cc.Node.EventType.TOUCH_END, function () {
            if(this.bsound_play)
                cc.audioEngine.play(this.snd_btn_click, false, 1);
            this.node.runAction(cc.sequence(
                cc.delayTime(0.1),
                cc.fadeIn(0.5)
            ));
            this.dlg_level_locked.active = false;
        }, this);

        this.play_dlg_level_locked.on(cc.Node.EventType.TOUCH_END, function () {
            if(this.bsound_play)
                cc.audioEngine.play(this.snd_btn_click, false, 1);
            this.node.runAction(cc.sequence(
                cc.delayTime(0.1),
                cc.fadeIn(0.5)
            ));
            this.dlg_level_locked.active = false;
        }, this);
    },

    event_dlg_get_hint: function()
    {
        this.close_dlg_get_hint.on(cc.Node.EventType.TOUCH_END, function () {
            if(this.bsound_play)
                cc.audioEngine.play(this.snd_btn_click, false, 1);
            this.node.runAction(cc.sequence(
                cc.delayTime(0.1),
                cc.fadeIn(0.5)
            ));
            this.dlg_get_hint.active = false;
        }, this);

        this.ok_dlg_get_hint.on(cc.Node.EventType.TOUCH_END, function () {
            if(this.bsound_play)
                cc.audioEngine.play(this.snd_btn_click, false, 1);
            this.node.runAction(cc.sequence(
                cc.delayTime(0.1),
                cc.fadeIn(0.5)
            ));
            this.dlg_get_hint.active = false;
        }, this);
    },


    load_dlg_level_locked: function(lvl)
    {
        this.dlg_level_locked.active = true;
        this.dlg_level_locked.position = cc.v2(375, 2000);
        var temp = lvl - 1;
        this.lbl_dlg_level_locked.string = "To try Level " + lvl + " you must beat 20 \n stages on LEVEL " + temp;
        this.node.runAction(cc.sequence(
            cc.delayTime(0.1),
            cc.fadeOut(0.5)
        ));
        this.dlg_level_locked.runAction(cc.sequence(
            cc.moveBy(0.5, cc.v2(0, -700)),
            this.in_gift_Action
        ));
    },

    load_dlg_get_hint: function()
    {
        this.dlg_get_hint.active = true;
        this.dlg_get_hint.position = cc.v2(375, 2000);
        this.node.runAction(cc.sequence(
            cc.delayTime(0.1),
            cc.fadeOut(0.5)
        ));
        this.dlg_get_hint.runAction(cc.sequence(
            cc.moveBy(0.5, cc.v2(0, -700)),
            this.in_gift_Action
        ));
    },

    load_game_pan: function()
    {
        this.game_pan.active = true;
        this.top_pan.active = false;
        this.level_pan.active = false;             
        this.game_pan.getComponent('game_control').load_game();
    },    

    load_level_detail_pan: function()
    {        
        this.blevel_detail = true;
        this.lvl_large_pan.active = false;
        this.lvl_detail_pan.active = true;

        this.toppan_title.string = "LEVEL " + this.curent_level;
        if(this.level_detail_info.length >= this.curent_level)
            this.passed_stages.string = this.level_detail_info[this.curent_level - 1].length;
        else
            this.passed_stages.string = 0;
       
        this.level_pan.position = cc.v2(0, -200);
        this.level_pan.runAction(cc.sequence(
            cc.moveBy(0.2, cc.v2(0, 50)),
            this.comein_levelAction
        ));
        this.update_stage_button();
    },

    update_stage_button: function()
    {        
        // this.passed_stages.string = (this.level - 1) * 50 + this.stage;
        this.passed_stages.string = this.all_stages;
        this.level_all_stages.string = " / 300";
        if(this.lvl_detail_pan.active)
        {
            if(this.level_detail_info.length >= this.curent_level)
                this.passed_stages.string = this.level_detail_info[this.curent_level - 1].length;
            else
                this.passed_stages.string = 0;
            this.level_all_stages.string = " / 50";
        }
        var btns = this.lvl_detail_pan.getComponentsInChildren("stage_button");
        for(var i = 0; i < btns.length; i++) 
            btns[i].brefresh = true;
        
        var btns_level = this.lvl_large_pan.getComponentsInChildren("level_button");
            for(var i = 0; i < btns_level.length; i++) 
            {
                btns_level[i].brefresh = true;
            }    
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
        this.update_stage_button();
        this.level_pan.runAction(cc.sequence(
            cc.moveBy(0.2, cc.v2(0, 50)),
            this.comein_levelAction
        ));        
    },

    save_data: function()
    {
        var userData = {
            name: 'Matchstick',
            level: this.level,
            stage: this.stage,
            hints: this.hints,
            gift_time:this.time_got_gift,
            detail:this.level_detail_info
        };
        cc.sys.localStorage.setItem('userData', JSON.stringify(userData));
    },

    load_saved_game_info: function()
    {
        // cc.sys.localStorage.removeItem("userData");
        this.userData = null;
        try {
            var ud = cc.sys.localStorage.getItem('userData');
            if(ud != null)
                this.userData = JSON.parse(ud);
            cc.log(this.userData);
        } catch (error) {
            
        }        
        
        if(this.userData == null)
        {
            this.level = this.curent_level = 1;
            this.stage = this.curent_stage = 1;
            this.hints = 15;
            this.time_got_gift = 0;
            this.level_detail_info = [
                []
            ];
        }
        else
        {
            this.level_detail_info = this.userData.detail;
            this.level = this.level_detail_info.length;
            this.stage = Math.max(...this.level_detail_info[this.level_detail_info.length - 1]);
            this.hints = this.userData.hints;    
            this.time_got_gift = this.userData.gift_time;
            if(this.time_got_gift > 0)
                this.lbl_gift_timer.node.active = true; 
            for(var i = 0; i < this.level_detail_info.length; i++)
            {
                this.all_stages += this.level_detail_info[i].length;
            }
        }                
    },

    // start () {

    // },

    toHHMMSS: function (sec_num) {        
        var hours   = Math.floor(sec_num / 3600);
        var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
        var seconds = sec_num - (hours * 3600) - (minutes * 60);
    
        if (hours   < 10) {hours   = "0"+hours;}
        if (minutes < 10) {minutes = "0"+minutes;}
        if (seconds < 10) {seconds = "0"+seconds;}
        return hours+':'+minutes+':'+seconds;
    },

    update (dt) 
    {
        this.updateTimer += dt;
        if (this.updateTimer < this.updateInterval) return; // we don't need to do the math every frame
        
        if(this.lbl_gift_timer.node.active)               
        {
            var sec_num = Math.floor((this.time_got_gift + 86400 * 1000 - Date.now()) / 1000);
            this.lbl_gift_timer.string = this.toHHMMSS(sec_num);
            if(sec_num == 0)
                this.lbl_gift_timer.node.active = false;
        }    
        
        this.updateTimer = 0;
        
        if(!this.home_pan.active) return;

        var scl = Math.random();
        if(scl < 0.3) return;
        var xPos = this.node.width * (Math.random() - 0.5);

        let item = cc.instantiate(this.stickPrefab);
        item.getComponent('stick').game = this;
        item.getComponent('stick').status = 1;
    	this.background.addChild(item);
        item.setPosition(xPos, cc.winSize.height / 2 + 250);
        
        item.runAction(cc.scaleTo(0.1, scl, scl));
        item.runAction(cc.moveBy(8 - scl * 2, cc.v2(0, -600))).repeatForever();
        item.runAction(cc.rotateBy(5- scl, -360)).repeatForever();       


    },
});
