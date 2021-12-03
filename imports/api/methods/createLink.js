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
    const link = {
      url,
      title,
      createdAt: new Date(),
      authorId: this.userId
    }
    // ForbiddenError.from(ability).throwUnlessCan('create', subject('Link', link));
    return ability.can('create', subject('Link', link)) ? Links.insert(link) : null
  },
  'deleteLink'(id){
    check(id, String)
    const rules = Meteor.call('user.getPermissions')
    const ability = new Ability(rules)
    const link = Links.findOne({_id: id})
    // ForbiddenError.from(ability).throwUnlessCan('delete', subject('Link', link));
    return ability.can('delete', subject('Link', link)) ? Links.remove({_id: id}) : null
  }
});
