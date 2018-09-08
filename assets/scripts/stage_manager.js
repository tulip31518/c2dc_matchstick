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

        this.node.on(cc.Node.EventType.TOUCH_END, function () {
            if(this.stage < this.game.stage + 3)                                    //Available stage
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
       

        if(this.game.curent_level < this.game.level)            
        {
            this.level_sprite.spriteFrame = this.spriteList[0];
        }    
        else if(this.stage < this.game.stage)
        {
            this.level_sprite.spriteFrame = this.spriteList[0];                                  //Yellow Button
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

        this.brefresh = false;
    },

    // start () {

    // },

    update (dt) {
        if(this.brefresh)
            this.refresh_btn_info();
    },
});
