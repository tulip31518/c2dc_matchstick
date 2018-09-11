
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
        status:0,
        direction: 0,
        bUpdated: true,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.sprite = this.getComponent(cc.Sprite);
        this.updateInterval = 0.5;
        // this.sprite.spriteFrame = this.snd_spriteList[this.status];
    },

    // start () {     

    // },

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
