import { defineStore } from "pinia";
import {Meteor} from "meteor/meteor";
import {callMethod} from "../helper";
import { Ability} from "@casl/ability";

export const useStore = defineStore('main', {
    state(){
        return {
            currentUser: Meteor.user(),
            ability: new Ability()
        }
    },
    actions: {
        async setCurrentUser(user){
            if(user && user._id){
                const permissions = await callMethod({name: 'user.getPermissions'})
                this.currentUser = user
                this.ability.update(permissions)
            }
        }
    }
})
