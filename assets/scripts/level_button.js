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

        level_name:{
            default:null,
            type: cc.Label  
        },

        medal:{
            default:null,
            type: cc.Node
        },

        stage:{
            default:null,
            type: cc.Label
        },

        level_locked:{
            default:null,
            type: cc.Node
        },

        lvl_count:{
            default:null,
            type: cc.Node
        },
        level: 1,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () 
    {
        this.game = this.canvas.getComponent('game');

        /*
            Display current level
        */
        this.level_name.string = "LEVEL " + this.level ;
        if(this.level == this.game.level)
            this.stage.string = this.game.stage;
        else
            this.stage.string = "50";

         /*
            Delete Mark on Level Lock
        */
        if(this.level <= this.game.level || (this.level == this.game.level + 1 && this.game.stage >= 20))
        {
            this.level_locked.active = false;
            this.stage.node.active = true;
            this.lvl_count.active = true;
        }
        // else if(this.level == this.game.level + 1)
        // {
        //     if(this.game.stage >= 20)
        //         this.level_locked.active = false;
        // }

        /*
            Display Medal on Level Success
        */
        if(this.level < this.game.level)
        {
            this.medal.active = true;
        }    

        this.node.on(cc.Node.EventType.TOUCH_END, function () {
            if(this.level_locked.active)
            {
                this.game.load_dlg_level_locked(this.level);
            }
            else
            {
                this.game.curent_level = this.level;
                this.game.blevel_detail = true;
                this.game.load_level_detail_pan(); 
            }                              
        }, this);


    },

    // start () {

    // },

    // update (dt) {},
});
