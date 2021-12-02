import { Mongo } from 'meteor/mongo';

export const Roles = new Mongo.Collection('roles');
export const RoleAssignment = new Mongo.Collection('role_assignment');
