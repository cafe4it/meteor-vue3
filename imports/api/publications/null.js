import { Meteor } from "meteor/meteor";

Meteor.publish(null, function () {
    return Meteor.users.find({}, {fields: {role: 1, username: 1}})
})
