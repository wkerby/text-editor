import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  try {
    console.log('PUT to the database');
    const jateDb = await openDB('jate', 1);
    const tx = jateDb.transaction('jate', 'readwrite'); //readwrite parameter allows us to update indexedDB
    const store = tx.objectStore('jate');
    const request = store.add({ text: content });
    const result = await request;
    console.log('🚀 - data saved to the database', result.value);
  }

  catch (err) {
    console.error('putDb not implemented')
  }
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  try {
    console.log('GET all from the database');
    const jateDb = await openDB('jate', 1); //do I have to provide value of 1?
    const tx = jateDb.transaction('jate', 'readonly');
    const store = tx.objectStore('jate');
    const request = store.getAll(); //retrieves what is stored in the text editor
    const result = await request;
    if (result) {
      console.log("🚀 - data retrieved from the database", result)
    }
    else {
      console.log("🚀 - data not found in the database")
    }
  }

  catch (err) {
    console.log(err);
    console.error('getDb not implemented')
  }
};


initdb();
