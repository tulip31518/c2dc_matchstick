
cc.Class({
    extends: cc.Component,

    properties: {
        game:{
            default: null,
            type: cc.Node
        },

        stick_spriteList:{
            default:[],
            type: [cc.SpriteFrame]
        },
        snd_stick_click:{
            default:null,
            type: cc.AudioClip
        },
        updateInterval: 0,
        direction: 0,
        bUpdated: true,
        status: 1,
        scale: 1,
        movable:true,
        index:0,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {        
        cc.director.getCollisionManager().enabled = true;
        // cc.director.getCollisionManager().enabledDebugDraw = true;
        this.sprite = this.getComponent(cc.Sprite);
        this.updateInterval = 0.5;

        this.node.on(cc.Node.EventType.TOUCH_END, function () {            

            // let c = cc.find('Canvas');
            // if(c.getChildByName("game_pan").getComponent("game_control").b_game_successed == true)
            if(this.game.b_game_successed == true)
            return;

            if(!this.game.check_stick_movable(this.status) || !this.movable)            
                return;

            if(this.game.b_game_start_animation || this.game.b_game_end_animation) 
                return;
            
            if(this.game.game.bsound_play)
                cc.audioEngine.play(this.snd_stick_click, false, 1);


            if(this.status == 0)
            {
                this.game.add_stick(this.node.position , this.direction, this.index);
            }
            else
            {
                this.game.remove_stick(this.node);
            }
        }, this);
    },   

    onCollisionEnter: function (other) 
    {
         
    },

    start () {     
        
        // if(this.status == 0)
            this.sprite.spriteFrame = this.stick_spriteList[this.status];
        // else if(this.status == 2)
        if(!this.movable && this.status == 1)
        {
            var color = new cc.Color(200, 200, 200);
            this.node.color = color;     
        }
        this.node.scale = this.scale;
        
    },

    update (dt) 
    {       
        if(this.game.b_game_on)
            return;

        if(!this.game.home_pan.active)
            this.node.destroy();
        
        this.updateTimer += dt;
        if (this.updateTimer < this.updateInterval) return;
        
        if(this.node.position.y < cc.view.getVisibleSize().height / (-2))      
            this.node.destroy();
        this.updateTimer = 0;
        
    },
});
