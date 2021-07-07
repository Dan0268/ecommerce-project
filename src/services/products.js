import firestore from "../firestore";

const products = [
    {
        name: "Glass",
        price: 35,
        type: "shirt",
        variants: [
            {
                variant: "Red",
                imgLink: "https://firebasestorage.googleapis.com/v0/b/react-ecommerce-1e532.appspot.com/o/Red.png?alt=media&token=f2811550-2de5-4401-a2ca-2cf916dd5c0f"

            },
            {
                variant: "Blue",
                imgLink: "https://firebasestorage.googleapis.com/v0/b/react-ecommerce-1e532.appspot.com/o/Blue.png?alt=media&token=a378e021-9a09-499d-8ddd-3a4e62fe552a"
            }
        ],
    },
    {
        name: "Polygon",
        price: 35,
        type: "shirt",
        variants: [
            {
                variant: "Silver",
                imgLink: "https://firebasestorage.googleapis.com/v0/b/react-ecommerce-1e532.appspot.com/o/Silver.png?alt=media&token=8999c2f2-c4c7-4c8d-b495-20ad19d3e5b6"
            },
            {
                variant: "Gold",
                imgLink: "https://firebasestorage.googleapis.com/v0/b/react-ecommerce-1e532.appspot.com/o/Gold.png?alt=media&token=66da74c2-696d-4880-8953-2fe3841e53ac"

            }
        ],
    },

];

const seedProducts = async () => {
    const prod = firestore.collection("products");
    const data = await prod.get();
    if (data.size !== 0) {
        return;
    }
    const promises = products.map(async (product) => {
        return await prod.add(product);
    });
    const resolvedReferences = Promise.all(promises);
}

export const getProducts = async () => {
    await seedProducts();
    const col = firestore.collection("products");
    const queryData = await col.get();
    const documents = queryData.docs;
    return documents.map(doc => {
        return ( {id: doc.id, ...doc.data()})
    })
}

export const getProduct = async (id) => {
    const col = firestore.collection("products");
    const ref = col.doc(id);
    const doc = await ref.get();

    if (!doc.exists) {
        return;
    }
    return {id: doc.id, ...doc.data()};
}

export const deleteProduct = async (id) => {
    const prod = firestore.collection("cart").doc(id);
    await prod.delete();
}