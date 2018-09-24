
cc.Class({
    extends: cc.Component,

    properties: {
        game_pan:{
            default:null,
            type: cc.Node
        },
        rule1_icon:{
            default:null,
            type: cc.Node
        },
        rule1_lable:{
            default:null,
            type: cc.Label
        },
        rule2_icon:{
            default:null,
            type: cc.Node
        },
        rule2_lable:{
            default:null,
            type: cc.Label
        },
        rule3_icon:{
            default:null,
            type: cc.Node
        },
        rule3_lable:{
            default:null,
            type: cc.Label
        },

        formula_digits:{
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
        this.spr_rule1 = this.rule1_icon.getComponent(cc.Sprite); 
        this.spr_rule2 = this.rule2_icon.getComponent(cc.Sprite); 
        this.spr_rule3 = this.rule3_icon.getComponent(cc.Sprite); 
    },

    update_info: function()
    {   
        if(this.game.task_info.act_type == "formula")
        {
            this.rule1_lable.string = "Each matchsticks must be \nplaced as part of a equation.";
            this.rule2_lable.string = "Correct the formula.";
            formula_digits.active = true;
        }
        else
        {
            this.rule1_lable.string = "Each matchsticks must be \nplaced as part of a " + this.game.task_info.act_shape + ".";
            this.rule2_lable.string = "Make " + this.game.task_info.act_shape_cnt + " " + this.game.task_info.act_shape + "s.";
        }
        
        this.rule3_lable.string = this.game.task_info.act_type + " " + this.game.task_info.act_cnt + " matchmaticks.";
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

    // start () {

    // },

    // update (dt) {},
});
