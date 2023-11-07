import { Meteor } from 'meteor/meteor';
import Tasks from '../collections/Tasks.js';

Meteor.publish('tasks', function () {
  return Tasks.find();
});
