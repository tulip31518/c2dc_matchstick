
cc.Class({
    extends: cc.Component,

    properties: {

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
        brefresh: false,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () 
    {
        this.game = this.canvas.getComponent('game');
        this.refresh_btn_info();
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

    refresh_btn_info: function()
    {
        /*
            Display current level
        */
       
        this.level_name.string = "LEVEL " + this.level ;
        if(this.level == this.game.level)
           this.stage.string = this.game.stage;
        else if(this.game.level > this.level)
            this.stage.string = "10";
        else
           this.stage.string = "1";

        /*
           Delete Mark on Level Lock
        */
        if(this.level <= this.game.level || (this.level == this.game.level + 1 && this.game.stage >= 8))
        {
            this.level_locked.active = false;
            this.stage.node.active = true;
            this.lvl_count.active = true;
        }
        /*
            Display Medal on Level Success
        */
        if(this.level < this.game.level)
        {
            this.medal.active = true;
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
