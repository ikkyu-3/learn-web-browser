// データベース構築
const customerData = [
  { ssn: "444-44-4444", name: "Bill", age: 35, email: "bill@company.com" },
  { ssn: "555-55-5555", name: "Donna", age: 32, email: "donna@home.org" }
];
const dbName = "the_name";

const request = indexedDB.open(dbName, 2);

request.onerror = event => {
  console.error(event);
};

request.onupgradeneeded = event => {
  const db = event.target.result;

  const objectStore = db.createObjectStore("customers", { keyPath: "ssn" });

  objectStore.createIndex("name", "name", { unique: false });
  objectStore.createIndex("email", "email", { unique: true });
  objectStore.transaction.oncomplete = () => {
    const customerObjectStore = db
      .transaction("customers", "readwrite")
      .objectStore("customers");

    customerData.forEach(data => customerObjectStore.add(data));
  };
};
