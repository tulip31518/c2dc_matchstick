
cc.Class({
    extends: cc.Component,

    properties: {
        game_pan:{
            default:null,
            type: cc.Node
        },
        rule1_icon_outside:{
            default:null,
            type: cc.Node
        },
        rule2_icon_outside:{
            default:null,
            type: cc.Node
        },
        rule3_icon_outside:{
            default:null,
            type: cc.Node
        },
        spriteList: {
            default: [],
            type: [cc.SpriteFrame]
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.game = this.game_pan.getComponent('game_control');
        this.spr_rule1 = this.rule1_icon_outside.getComponent(cc.Sprite); 
        this.spr_rule2 = this.rule2_icon_outside.getComponent(cc.Sprite); 
        this.spr_rule3 = this.rule3_icon_outside.getComponent(cc.Sprite); 
    },

    // start () {
        
    // },

    update_image: function()
    {
        if(this.game.b_last_stick)
            this.spr_rule3.spriteFrame = this.spriteList[1];
        else
            this.spr_rule3.spriteFrame = this.spriteList[0];

        if(this.game.b_all_placed)
            this.spr_rule1.spriteFrame = this.spriteList[1];
        else
            this.spr_rule1.spriteFrame = this.spriteList[0];

        if(this.game.b_shape_count)
            this.spr_rule2.spriteFrame = this.spriteList[1];
        else
            this.spr_rule2.spriteFrame = this.spriteList[0];
    },

    update (dt) {
        
    },
});
