import firebase from '../config/firebase';

const db = firebase.firestore();

export function dataFromSnapshot(snapshot) {
    if(!snapshot.exists) return undefined;
    const data = snapshot.data();

    return {
        ...data,
        docId: snapshot.id
    }
}

export function getEventsFromFirestore(observer){
    return db.collection('Donuts').onSnapshot(observer);
}