let db;

const request = indexedDB.open("MyTestDatabase");
request.onerror = event => {
  console.log("request: error", event);
};

request.onsuccess = event => {
  console.log("request: success");
  db = event.target.result;

  db.onerror = e => {
    console.error(e);
  };
};
