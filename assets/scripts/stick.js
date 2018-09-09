
cc.Class({
    extends: cc.Component,

    properties: {
        game:{
            default: null,
            type: cc.Node
        },
        updateInterval: 0,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.updateInterval = 0.5;
    },

    // start () {

    // },

    update (dt) {
        if(!this.game.home_pan.active)
            this.node.destroy();
        
        this.updateTimer += dt;
        if (this.updateTimer < this.updateInterval) return;
        
        if(this.node.position.y < cc.view.getVisibleSize().height / (-2))        
            this.node.destroy();
        this.updateTimer = 0;
        
    },
});
