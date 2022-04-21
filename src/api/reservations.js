import { getDatabase, ref, set, push, onValue, update, child, get, remove } from "firebase/database";

export async function createUpdateReservation(data) {
  const { bikeId, uid, ...rest } = data;
  const db = getDatabase();
  const updates = {};
  updates[`bikes/${bikeId}/usersReservations/${uid}`] = rest;
  updates[`users/${uid}/bikesReservations/${bikeId}`] = rest;
  try {
    return await update(ref(db), updates);
  } catch (e) {
    throw e
  }
}

export async function getUserReservations(uid, callback) {
  const db = getDatabase();
  const userReservationRef = ref(db, `users/${uid}`);
  try {
    return onValue(userReservationRef, async snapshot => {
      const arr = [];
      const values = snapshot.val().bikesReservations
      for (let each in values) {
        const reservation = values[each];
        const bikeRef = ref(db, `bikes/${each}`);
        await get(bikeRef).then(bikeSnapshot => {
          arr.push({
            id: each,
            ...bikeSnapshot.val(),
            ...reservation
          })
        })
      }
      callback(arr);
    });
  } catch (e) {
    throw e
  }
}

export async function cancelReservation(uid, bikeId) {
  const db = getDatabase();
  const dbRef = ref(db)
  try {
    await remove(child(dbRef, `users/${uid}/bikesReservations/${bikeId}`));
    await remove(child(dbRef, `bikes/${bikeId}/usersReservations/${uid}`));
    return true;
  } catch (e) {
    throw e
  }
}
