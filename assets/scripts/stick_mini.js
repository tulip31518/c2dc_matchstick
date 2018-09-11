
cc.Class({
    extends: cc.Component,

    properties: {
        game:{
            default: null,
            type: cc.Node
        },

        stick_mini_spriteList:{
            default:[],
            type: [cc.SpriteFrame]
        },
        status: 1,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () { 
        this.sprite = this.getComponent(cc.Sprite);
    },

    start () {     
        
        if(this.status == 0)
            this.sprite.spriteFrame = this.stick_mini_spriteList[0];
        else 
            this.sprite.spriteFrame = this.stick_mini_spriteList[1];
    },

    update (dt) 
    {       
                
    },
});
