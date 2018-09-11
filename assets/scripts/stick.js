
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
        
        updateInterval: 0,
        direction: 0,
        bUpdated: true,
        status: 1,
        scale: 1,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {        
        cc.director.getCollisionManager().enabled = true;
        // cc.director.getCollisionManager().enabledDebugDraw = true;
        this.sprite = this.getComponent(cc.Sprite);
        this.updateInterval = 0.5;
       
    },

    onCollisionEnter: function (other) 
    {
         
    },

    start () {     
        var sprite = this.getComponent(cc.Sprite);
        if(this.status == 0)
            this.sprite.spriteFrame = this.stick_spriteList[0];
        else if(this.status == 2)
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
