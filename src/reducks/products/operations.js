import { db, FirebaseTimestamp } from "../../firebase";
import { push } from 'connected-react-router';

const productsRef = db.collection('products');

export const saveProduct = (name, description, category, gender, price) => {
    return async (dispatch) => {
        const timestamp = FirebaseTimestamp.now();

        const data = {
            category: category,
            description: description,
            gender: gender,
            name: name,
            price: parseInt(price, 10),
            created_at: timestamp,
            updated_at: timestamp
        };

        const ref = productsRef.doc();
        const id = ref.id;
        data.id = id;

        return productsRef.doc(id).set(data)
            .then(() => {
                dispatch(push('/'))
            })
            .catch(error => {
                console.log(error);
                throw new Error(error);
            });
    }
};
