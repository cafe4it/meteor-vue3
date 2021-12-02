import { defineStore } from "pinia";
import {Meteor} from "meteor/meteor";
import {callMethod} from "../helper";
export const useStore = defineStore('main', {
    state(){
        return {
            currentUser: Meteor.user()
        }
    },
    actions: {
        async setCurrentUser(user){
            if(user && user._id){
                const permissions = await callMethod({name: 'user.getPermissions'})
                this.currentUser = Object.assign({}, user, {permissions})
            }
        }
    }
})
