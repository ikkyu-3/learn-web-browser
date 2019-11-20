// データベース構築
const customerData = [
  { ssn: "111-11-1111", name: "Taro", age: 35, email: "taro@example.com" },
  { ssn: "222-22-2222", name: "Ichiro", age: 32, email: "ichiro@example.org" }
];

const dbName = "db_name";

/**
 * データベース構築
 */
const createRequest = indexedDB.open(dbName, 1);

// error
createRequest.onerror = event => {
  console.error(`error: ${event.target.errorCode}`);
};

// success
createRequest.onsuccess = event => {
  console.log("success: ", event);
};

// データベース作成 or 既存のデータベースのバージョンを更新時
createRequest.onupgradeneeded = event => {
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

/**
 * キージェネレータ
 */
const keyGeneRequest = indexedDB.open(dbName, 3);

keyGeneRequest.onupgradeneeded = event => {
  const db = event.target.result;

  const objectStore = db.createObjectStore("names", { autoIncrement: true });

  customerData.forEach(data => objectStore.add(data.name));
};

/**
 * データを追加
 */
const addRequest = indexedDB.open(dbName);
addRequest.onsuccess = event => {
  const db = event.target.result;

  const transaction = db.transaction(["customers"], "readwrite");

  transaction.oncomplete = e => {
    console.log("All done!!: ", e);
  };

  transaction.onerror = e => {
    console.error("add transaction error: ", e);
  };

  const objectStore = transaction.objectStore("customers");
  const request = objectStore.add({
    ssn: "333-33-3333",
    name: "Jiro",
    age: 25,
    email: "jiro@example.com"
  });

  request.onerror = e => {
    console.error("add error: ", e);
  };

  request.onsuccess = e => {
    console.log("add success: ", e);
  };
};

/**
 * データを削除
 */
const deleteRequest = indexedDB.open(dbName);
deleteRequest.onsuccess = event => {
  const db = event.target.result;

  const request = db
    .transaction(["customers"], "readwrite")
    .objectStore("customers")
    .delete("111-11-1111");

  request.onerror = e => {
    console.error("delete error: ", e);
  };

  request.onsuccess = e => {
    console.log("delete success: ", e);
  };
};

/**
 * データを取得
 */
const getRequest = indexedDB.open(dbName);
getRequest.onsuccess = event => {
  const db = event.target.result;
  const request = db
    .transaction(["customers"])
    .objectStore("customers")
    .get("333-33-3333");

  request.onerror = e => {
    console.error("get error", e);
  };

  request.onsuccess = e => {
    console.log("get success: ", e);
  };
};

/**
 * 項目を更新
 */
const updateRequest = indexedDB.open(dbName);
updateRequest.onsuccess = event => {
  const db = event.target.result;

  const objectStore = db
    .transaction(["customers"], "readwrite")
    .objectStore("customers");

  const request = objectStore.get("222-22-2222");
  request.onerror = e => {
    console.log("update error", e);
  };

  request.onsuccess = () => {
    const data = request.result;
    data.age = 42;

    const req = objectStore.put(data);
    req.onerror = e => {
      console.log("put error", e);
    };

    req.onsuccess = e => {
      console.log("put success", e);
    };
  };
};

/**
 * カーソル
 */
const cursorRequest = indexedDB.open(dbName);
cursorRequest.onsuccess = event => {
  const db = event.target.result;

  const objectStore = db.transaction("customers").objectStore("customers");

  objectStore.openCursor().onsuccess = e => {
    const cursor = e.target.result;
    if (cursor) {
      console.log(cursor);
      cursor.continue();
    } else {
      console.error("No more entries!");
    }
  };
};
