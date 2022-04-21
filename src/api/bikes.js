import { getDatabase, ref, set, push, onValue, update, get, child } from "firebase/database";
import moment from 'moment';
import { dateFormat } from "../pages/home/pages";


export async function getBike(bikeId) {
  const db = getDatabase();
  const bikesRef = ref(db);
  try {
    return (await get(child(bikesRef, `bikes/${bikeId}`))).val()
  } catch (e) {
    throw e
  }
}

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

export async function getBikes(params, paramException) {
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
    return get(child(usersRef, 'bikes')).then(snapshot => {
      const arr = [];
      const values = snapshot.val();
      for (let each in values) {
        if (!values[each].deleted) {
          if (paramsMatch(params, values[each])) {
            arr.push({
              id: each,
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

export async function getBikesListener(params, callback) {
  const db = getDatabase();
  const bikesRef = ref(db, `bikes`);
  const checkDatesAvailability = (fromDate, toDate, bookedDates) => {
    const sorted = bookedDates.sort((a, b) => {
      return (moment(a.from).valueOf() - moment(b.to).valueOf());
    })
    let available = false;
    for (let i = 0; i < sorted.length; i++) {
      if (i === 0 && moment(toDate).valueOf() < moment(sorted[i].from).valueOf()) {
        available = true;
        break;
      }
      if (i === sorted.length - 1 && moment(sorted[i].to).valueOf() < moment(fromDate).valueOf()) {
        available = true;
        break;
      }
      if (moment(fromDate).valueOf() > moment(sorted[i].to).valueOf() && moment(toDate).valueOf() < moment(sorted[i + 1].from).valueOf()) {
        available = true;
        break;
      }
    }
    return available;
  }
  const findAverageRating = (allReservations) => {
    let total = 0;
    for (let i = 0; i < allReservations.length; i++) {
      total += parseInt(allReservations[i].rating);
    }
    return total / allReservations.length;
  }
  try {
    return onValue(bikesRef, snapshot => {
      const arr = [];
      const values = snapshot.val();
      for (let each in values) {
        if (!values[each].deleted) {
          arr.push({
            id: each,
            rating: values[each]?.usersReservations ? findAverageRating(Object.values(values[each].usersReservations)) : '0',
            available: values[each]?.usersReservations ? checkDatesAvailability(params.from || moment().format(dateFormat), params.to || moment().format(dateFormat), Object.values(values[each].usersReservations)) : true,
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
