import {Meteor} from "meteor/meteor";
import {RoleAssignment, Roles} from "../collections/Roles";
import {Ability} from "@casl/ability";

const interpolate = function (template, vars) {
    return JSON.parse(template, function (key, rawValue) {
        if (rawValue[0] !== "$") {
            return rawValue;
        }
        const name = rawValue.slice(2, -1);
        const value = _.get(vars, name);

        if (typeof value === "undefined") {
            throw new ReferenceError(`Variable ${name} is not defined`);
        }

        return value;
    });
};

function getPermissions(userId){
    const roleIds = RoleAssignment.find({userId: userId}).map((r) => r.roleId)
    let permissions = Roles.find({_id: {$in: roleIds}}).map((r) => interpolate(JSON.stringify(r.permissions), {user: {_id: userId}}))
    permissions = _.reduce(permissions, (arr, a) => arr.concat(a))
    return permissions
}

Meteor.methods({
    "user.getPermissions"(){
        if(this.userId){
            return getPermissions(this.userId)
        }
    },
    "user.getAbility"(){
        return this.userId ? new Ability().update(getPermissions(this.userId)) : new Ability([])
    }
})
