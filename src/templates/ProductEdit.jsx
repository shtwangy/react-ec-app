import React, { useState, useCallback, useEffect } from "react";
import { TextInput, SelectBox, PrimaryButton } from "../components/UIkit";
import { ImageArea } from "../components/Products";
import { useDispatch } from "react-redux";
import { saveProduct } from "../reducks/products/operations";
import { db } from "../firebase";

const ProductEdit = () => {
    const dispatch = useDispatch();
    let id = window.location.pathname.split('/product/edit')[1];
    if (id !== '') {
        id = id.split('/')[1];
    }

    const [name, setName] = useState(""),
          [description, setDescription] = useState(""),
          [category, setCategory] = useState(""),
          [gender, setGender] = useState(""),
          [price, setPrice] = useState(""),
          [images, setImages] = useState([]);

    const inputName = useCallback((event) => {
        setName(event.target.value);
    }, [setName]);

    const inputDescription = useCallback((event) => {
        setDescription(event.target.value);
    }, [setDescription]);

    const inputCategory = useCallback((event) => {
        setCategory(event.target.value);
    }, [setCategory]);

    const inputGender = useCallback((event) => {
        setGender(event.target.value);
    }, [setGender]);

    const inputPrice = useCallback((event) => {
        setPrice(event.target.value);
    }, [setPrice]);

    const categories = [
        {id: 'tops', name: 'トップス'},
        {id: 'shirts', name: 'シャツ'},
        {id: 'pants', name: 'パンツ'}
    ];

    const genders = [
        {id: 'all', name: '全て'},
        {id: 'male', name: 'メンズ'},
        {id: 'female', name: 'レディース'}
    ];

    useEffect(() => {
        if (id !== '') {
            db.collection('products').doc(id).get()
                .then( snapshot => {
                   const data = snapshot.data();
                   setImages(data.images);
                   setName(data.name);
                   setDescription(data.description);
                   setCategory(data.category);
                   setGender(data.gender);
                   setPrice(data.price);
                });
        }
    }, [id]);

    return (
        <section>
            <h2 className="u-text__headline u-text-center">商品の登録と編集</h2>
            <div className="c-section-container">
                <ImageArea images={images} setImages={setImages}/>
                <TextInput
                    fullWidth={true}
                    label={"商品名"}
                    multiline={false}
                    required={true}
                    rows={1}
                    value={name}
                    type={"text"}
                    onChange={inputName}
                />
                <TextInput
                    fullWidth={true}
                    label={"商品説明"}
                    multiline={true}
                    required={true}
                    rows={5}
                    value={description}
                    type={"text"}
                    onChange={inputDescription}
                />
                <SelectBox
                    label={"カテゴリー"}
                    required={true}
                    value={category}
                    options={categories}
                    select={setCategory}
                    onChange={inputCategory}
                />
                <SelectBox
                    label={"性別"}
                    required={true}
                    value={gender}
                    options={genders}
                    select={setGender}
                    onChange={inputGender}
                />
                <TextInput
                    fullWidth={true}
                    label={"価格"}
                    multiline={false}
                    required={true}
                    rows={1}
                    value={price}
                    type={"number"}
                    onChange={inputPrice}
                />
                <div className="module-spacer--medium" />
                <div className="center">
                    <PrimaryButton
                        label={"商品情報を保存"}
                        onClick={() => dispatch(saveProduct(id, name, description, category, gender, price, images))}
                    />
                </div>
            </div>
        </section>
    )
};

export default ProductEdit;
