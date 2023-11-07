import { Meteor } from 'meteor/meteor';
import Tasks from '../collections/Tasks.js';

Meteor.methods({
  'createTask'(text) {

    return Tasks.insert({
      text,
    });
  },
});
