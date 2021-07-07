import firestore from "../firestore";

// Create
export const createRecord = async (records, collection) => {
    const prod = firestore.collection(collection);
    const data = await prod.get();
    if (data.size !== 0) {
        return;
    }
    const promises = records.map(async (product) => {
        return await prod.add(product);
    });
    const resolvedReferences = await Promise.all(promises);
};


// Read
export const getRecords = async (collection) => {
    // await seedProducts();
    const col = firestore.collection(collection);

    const queryData = await col.get();

    const documents = queryData.docs;

    return documents.map(doc => {
        return ( {id: doc.id, ...doc.data()} )
    })
};

export const getRecord = async (collection, id) => {
    const col = firestore.collection(collection);
    const ref = col.doc(id);
    const doc = await ref.get();
    if (!doc.exists) {
        return;
    }
    return {id: doc.id, ...doc.data()};
}

// Update
export const updateRecords = async (collection, id, record, ) => {
    const ref = firestore.collection(collection).doc(id);
    await ref.update({products: record});
};

// Delete
export const deleteRecord = async (id, collection) => {
    const col = firestore.collection(collection).doc(id);
    await col.delete();
}