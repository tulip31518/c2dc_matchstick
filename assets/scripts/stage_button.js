
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
        this.level_sprite = this.getComponent(cc.Sprite); 
        this.refresh_btn_info();

        this.node.on(cc.Node.EventType.TOUCH_END, function () 
        {
            if(this.game.bsound_play)
                cc.audioEngine.play(this.snd_btn_click, false, 1);
            if(this.game.curent_level < this.game.level || this.stage < this.game.stage + 3)                                    //Available stage
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

        if(this.game.curent_level < this.game.level || this.stage < this.game.stage)            
        {
            var game_info = this.game.level_detail_info;
            if(game_info != null && game_info.length > this.game.curent_level - 1)            
            {
                var levelInfo = game_info[this.game.curent_level - 1];
                if(levelInfo.indexOf(this.stage) == -1)                    
                    this.level_sprite.spriteFrame = this.spriteList[1];
                else
                    this.level_sprite.spriteFrame = this.spriteList[0];
            } 
            else 
                this.level_sprite.spriteFrame = this.spriteList[0];
        }                                
        else if(this.stage >= this.game.stage && this.stage < this.game.stage + 3)
            this.level_sprite.spriteFrame = this.spriteList[1];                                 //Yellow Empty Button
        else
            this.level_sprite.spriteFrame = this.spriteList[2];

         /*
            Display Stage Hint
        */
        if(this.stage % 10 == 0 && this.stage >= this.game.stage && this.game.curent_level >= this.game.level)        
            this.lvl_hint.active = true;
        else
            this.lvl_hint.active = false;
        this.brefresh = false;
    },

    // start () {

    // },

    update (dt) {
        if(this.brefresh)
            this.refresh_btn_info();
    },
});
