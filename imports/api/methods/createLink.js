import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Links from '../collections/Links.js';
import { Ability, ForbiddenError, subject } from '@casl/ability';
Meteor.methods({
  'createLink'(title, url) {
    check(url, String);
    check(title, String);
    const rules = Meteor.call('user.getPermissions')
    const ability = new Ability(rules)
    // console.log(ability.can('create', 'Links'), rules)

    return ability.can('create', 'Links') ? Links.insert({
      url,
      title,
      createdAt: new Date(),
      authorId: this.userId
    }) : null;
  },
  'deleteLink'(id){
    check(id, String)
    const rules = Meteor.call('user.getPermissions')
    const ability = new Ability(rules)

    return ability.can('delete', 'Links') ? Links.remove({_id: id}) : null
  }
});
