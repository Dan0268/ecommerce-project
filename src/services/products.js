import firestore from "../firestore";

const products = [
    {
        name: "Hexagon",
        price: 35,
        type: "shirt",
        variants: [
            {
                variant: "Outrun",
                imgLink: "https://firebasestorage.googleapis.com/v0/b/react-ecommerce-1e532.appspot.com/o/Hex.png?alt=media&token=4f0b1b4c-8b95-4a80-8e55-7156161f1db6"
            },
            {
                variant: "Forge",
                imgLink: "https://firebasestorage.googleapis.com/v0/b/react-ecommerce-1e532.appspot.com/o/Forge.png?alt=media&token=2d0d2526-c1db-4869-bbbf-6bf3cc6b758c"

            },
            {
                variant: "Arcanum",
                imgLink: "https://firebasestorage.googleapis.com/v0/b/react-ecommerce-1e532.appspot.com/o/Arcanum%20Forge.png?alt=media&token=d8ff802e-cce8-49c3-9b81-1dca09a6d97b"

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
                imgLink: "https://firebasestorage.googleapis.com/v0/b/react-ecommerce-1e532.appspot.com/o/Grey.png?alt=media&token=dbd860c1-c35e-44b8-b80e-7581bce4a145"
            },
            {
                variant: "Gold",
                imgLink: "https://firebasestorage.googleapis.com/v0/b/react-ecommerce-1e532.appspot.com/o/Gold.png?alt=media&token=e9a31563-c5d5-4e9e-91ed-8118d5185a14"

            },
            {
                variant: "Neon",
                imgLink: "https://firebasestorage.googleapis.com/v0/b/react-ecommerce-1e532.appspot.com/o/Neonscape.png?alt=media&token=9e432e6f-2186-40ea-bf13-b314b59c0ac8"

            }
        ],
    },
    {
        name: "Glass",
        price: 35,
        type: "shirt",
        variants: [
            {
                variant: "Red",
                imgLink: "https://firebasestorage.googleapis.com/v0/b/react-ecommerce-1e532.appspot.com/o/Orange.png?alt=media&token=b1da5f3f-7645-43f2-b9b4-c950ad3c75e8"

            },
            {
                variant: "Blue",
                imgLink: "https://firebasestorage.googleapis.com/v0/b/react-ecommerce-1e532.appspot.com/o/Blue.png?alt=media&token=2d8a6c1c-d9bb-4084-a968-a115762789b4"
            }
        ],
    }
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

export default products;