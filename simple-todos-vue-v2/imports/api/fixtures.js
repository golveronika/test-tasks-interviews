import { Meteor } from 'meteor/meteor';
import Links from './collections/Links.js';
import Tasks from './collections/Tasks.js';


async function insertLink({ title, url }) {
  await Links.insertAsync({ title, url, createdAt: new Date() });
}

async function insertTask({ text }) {
  await Tasks.insertAsync({ text });
}

Meteor.startup(async () => {
  // If the Links collection is empty, add some data.

  if (Tasks?.find()?.count() === 0) {
    await insertTask({
      text: 'Do the Tutorial Vue 1',
    });
    await insertTask({
      text: 'Do the Tutorial Blazer',
    });
  }

  if (await Links.find().countAsync() === 0) {
    await insertLink({
      title: 'Do the Tutorial',
      url: 'https://vue-tutorial.meteor.com/',
    });

    await insertLink({
      title: 'Follow the Guide',
      url: 'https://guide.meteor.com',
    });

    await insertLink({
      title: 'Read the Docs',
      url: 'https://docs.meteor.com',
    });

    await insertLink({
      title: 'Discussions',
      url: 'https://forums.meteor.com',
    });
  }
});
