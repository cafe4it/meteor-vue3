import {Meteor} from "meteor/meteor";
import {Accounts} from "meteor/accounts-base";

if(Meteor.isServer){
    Accounts.config({
        defaultFieldSelector: {
            username: 1,
            createdAt: 1,
            role: 1,
        }
    });
}
