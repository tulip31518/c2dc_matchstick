
cc.Class({
    extends: cc.Component,

    properties: {

        canvas:{
            default:null,
            type: cc.Node
        },

        lbl_stage:{
            default:null,
            type: cc.Label
        },

        lvl_hint:{
            default:null,
            type: cc.Node
        },

        spriteList: {
            default: [],
            type: [cc.SpriteFrame]
        },
        snd_btn_click:{
            default:null,
            type: cc.AudioClip
        },

        stage: 1,
        brefresh: false,
        capable:true,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () 
    {
        this.game = this.canvas.getComponent('game');

        /*
            Display current stage
        */        
        this.lbl_stage.string = this.stage;        


        /*
            Select Background Image according to Game Stage.
        */
        this.stage_sprite = this.getComponent(cc.Sprite); 
        this.refresh_btn_info();

        this.node.on(cc.Node.EventType.TOUCH_END, function () 
        {
            if(this.game.bsound_play)
                cc.audioEngine.play(this.snd_btn_click, false, 1);
            cc.log( "stage:" + this.stage + " game.stage:" + this.game.stage);
            cc.log( "curent_level:" + this.game.curent_level + " game.level:" + this.game.level);
            if(this.capable)             //Available stage
            {                
                this.game.curent_stage = this.stage;
                this.game.load_game_pan();
            }
            else
            {
                if(this.lvl_hint.active)
                    this.game.load_dlg_get_hint();                                  // Display Dialog to get Hint
            }            
            
        }, this);


    },

    refresh_btn_info: function()
    {
        /*
            In case that current level or stage is passed
        */   
        var game_info = this.game.level_detail_info;
        this.lbl_stage.node.color = cc.Color.WHITE;
        this.capable = true;
        if(game_info != null && game_info.length > this.game.curent_level - 1)            
        {            
            var levelInfo = game_info[this.game.curent_level - 1];                
            if(levelInfo.indexOf(this.stage) != -1)                    
            {                
                this.stage_sprite.spriteFrame = this.spriteList[0];
                this.lvl_hint.active = false;                
            }    
            else
            {               
                if(levelInfo.length == 0)
                {
                    if(this.stage < 4)
                    {                        
                        this.stage_sprite.spriteFrame = this.spriteList[1];
                        this.lbl_stage.node.color = new cc.Color(232, 184, 7);
                    }    
                    else
                    {
                        this.capable = false;
                        this.stage_sprite.spriteFrame = this.spriteList[2];
                    }    
                }
                else if(this.stage < (Math.max(...levelInfo) + 4))
                {
                    this.stage_sprite.spriteFrame = this.spriteList[1];
                    this.lbl_stage.node.color = new cc.Color(232, 184, 7);
                }    
                else
                {
                    this.stage_sprite.spriteFrame = this.spriteList[2];
                    this.capable = false;                
                }    

                if(this.stage % 10 == 0)
                    this.lvl_hint.active = true;
            }   
        } 
        else 
        {   
            if(this.stage < 4)
            {
                this.stage_sprite.spriteFrame = this.spriteList[1];
                this.lbl_stage.node.color = new cc.Color(232, 184, 7);
            }    
            else             
            {
                this.capable = false;
                this.stage_sprite.spriteFrame = this.spriteList[2];
            }    
            
            if(this.stage % 10 == 0)
                this.lvl_hint.active = true;
        } 
        this.brefresh = false;
    },

    // start () {

    // },

    update (dt) {
        if(this.brefresh)
            this.refresh_btn_info();
    },
});
