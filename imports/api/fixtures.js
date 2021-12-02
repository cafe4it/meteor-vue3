import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import Links from './collections/Links.js';
import {Roles, RoleAssignment} from './collections/Roles';

Meteor.startup(() => {
  // if the Links collection is empty
  // const config = Assets.getText('config.default.json')
  // console.log(config)
  if(Roles.find().count() === 0){
    Roles.insert({
      _id: 'admin',
      permissions:[
        { action: 'manage', subject: 'all' }
      ]
    })
    Roles.insert({
      _id: 'member',
      permissions: [
        { action: 'read', subject: 'Links' },
        { action: 'manage', subject: 'Links', conditions: { authorId: '${user._id}' } },
      ]
    })
  }
  let adminId, userId;
  if(Meteor.users.find().count() === 0 ){
    adminId = Accounts.createUser({username: 'admin', password: '123456'})
    userId = Accounts.createUser({username: 'user', password: '123456'})
    Meteor.users.update({_id: adminId}, {$set: {role: 'admin'}})
    Meteor.users.update({_id: userId}, {$set: {role: 'member'}})
    RoleAssignment.upsert({userId: adminId, roleId: 'admin'}, {$set: {userId: adminId, roleId: 'admin'}})
    RoleAssignment.upsert({userId: userId, roleId: 'member'},{$set: {userId: userId, roleId: 'member'}})
  }

  if (Links.find().count() === 0) {
    const data = [
      {
        title: 'Do the Tutorial',
        url: 'https://www.meteor.com/try',
        createdAt: new Date(),
        authorId: userId
      },
      {
        title: 'Follow the Guide',
        url: 'http://guide.meteor.com',
        createdAt: new Date(),
        authorId: userId
      },
      {
        title: 'Read the Docs',
        url: 'https://docs.meteor.com',
        createdAt: new Date(),
        authorId: userId
      },
      {
        title: 'Discussions',
        url: 'https://forums.meteor.com',
        createdAt: new Date(),
        authorId: adminId
      },
    ];

    data.forEach(link => Links.insert(link));
  }
});
