import { getDatabase, ref, child, set, get } from "firebase/database";

export async function addUserPermission(uid, permission) {
  const db = getDatabase();
  const permissionRef = ref(db, `permissions/${uid}`);
  try {
    return await set(permissionRef, {
      permission,
    });
  } catch (e) {
    throw e
  }
}

export async function getUserPermission(uid) {
  const db = getDatabase();
  const permissionRef = ref(db);
  try {
    return (await get(child(permissionRef, `permissions/${uid}`))).val()
  } catch (e) {
    throw e
  }
}
