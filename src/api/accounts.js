import { getDatabase, ref, set, onValue, update, get, child } from "firebase/database";

export async function getAccount(uid) {
  const db = getDatabase();
  const usersRef = ref(db);
  try {
    return (await get(child(usersRef, `users/${uid}`))).val()
  } catch (e) {
    throw e
  }
}

// export async function createAccount(data) {
//   const db = getDatabase();
//   const usersRef = ref(db, `users/${uid}`);
//   const newAccountRef = push(usersRef);
//   try {
//     return await set(newAccountRef, data);
//   } catch (e) {
//     throw e
//   }
// }
export async function registerAccount(data) {
  const { uid, ...rest } = data;
  const db = getDatabase();
  const usersRef = ref(db, `users/${uid}`);
  try {
    return await set(usersRef, rest);
  } catch (e) {
    throw e
  }
}

export async function updateAccount(data) {
  const { uid, ...rest } = data;
  const db = getDatabase();
  const usersRef = ref(db, `users/${uid}`);
  try {
    return await update(usersRef, rest);
  } catch (e) {
    throw e
  }
}

export async function deleteAccount(uid) {
  const db = getDatabase();
  const usersRef = ref(db, `users/${uid}`);
  try {
    return await update(usersRef, { deleted: true });
  } catch (e) {
    throw e
  }
}

export async function getAccounts(params, paramException) {
  const db = getDatabase();
  const usersRef = ref(db);
  const paramsMatch = (params, item) => {
    let shouldReturn = true;
    let allEmpty = true;
    for (let paramName in params) {
      if(params[paramName] !== '' && !paramException.includes(paramName)) {
        allEmpty = false;
      }
      shouldReturn = shouldReturn && item[paramName].toString().includes(params[paramName]);
    }
    return !allEmpty && shouldReturn;
  }
  try {
    return get(child(usersRef, 'users')).then(snapshot => {
      const arr = [];
      const values = snapshot.val();
      for (let each in values) {
        if (!values[each].deleted) {
          if (paramsMatch(params, values[each])) {
            arr.push({
              uid: each,
              ...values[each]
            })
          }
        }
      }
      return arr
    });
  } catch (e) {
    throw e
  }
}

export async function getAccountsListener(callback) {
  const db = getDatabase();
  const usersRef = ref(db, `users`);
  try {
    return onValue(usersRef, snapshot => {
      const arr = [];
      const values = snapshot.val();
      for (let each in values) {
        if (!values[each].deleted) {
          arr.push({
            uid: each,
            ...values[each]
          })
        }
      }
      callback(arr);
    });
  } catch (e) {
    throw e
  }
}
