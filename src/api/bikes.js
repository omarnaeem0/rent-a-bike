import { getDatabase, ref, set, push, onValue, update } from "firebase/database";

export async function createBike(data) {
  const db = getDatabase();
  const bikesRef = ref(db, `bikes`);
  const newBikeRef = push(bikesRef);
  try {
    return await set(newBikeRef, data);
  } catch (e) {
    throw e
  }
}

export async function updateBike(data) {
  const { id, ...rest } = data;
  const db = getDatabase();
  const bikesRef = ref(db, `bikes/${id}`);
  try {
    return await update(bikesRef, rest);
  } catch (e) {
    throw e
  }
}

export async function deleteBike(id) {
  const db = getDatabase();
  const bikesRef = ref(db, `bikes/${id}`);
  try {
    return await update(bikesRef, { deleted: true });
  } catch (e) {
    throw e
  }
}

export async function getBikesListener(params, callback) {
  const db = getDatabase();
  const bikesRef = ref(db, `bikes`);
  try {
    return onValue(bikesRef, snapshot => {
      const arr = [];
      const values = snapshot.val();
      for (let each in values) {
        if (!values[each].deleted) {
          arr.push({
            id: each,
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
