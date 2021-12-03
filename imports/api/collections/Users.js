import { Meteor } from "meteor/meteor";
import { RoleAssignment } from "./Roles";

const Users = Meteor.users;

Users.helpers({
    permissions: function () {
        return this._id
    }
})
