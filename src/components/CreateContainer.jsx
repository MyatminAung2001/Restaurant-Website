import React, { useState } from "react";
import { motion } from "framer-motion";
import { MdFastfood, MdCloudUpload, MdDelete, MdAttachMoney } from 'react-icons/md';
import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from '../firebase.config';

import { categories } from "../utils/Data";
import Loader from "./Loader";
import { saveItem } from "../utils/firebaseFunction";
import { useStateValue } from "../context/StateProvider";
import { getAllFoodItems } from '../utils/firebaseFunction';
import { actionType } from '../context/Reducer';

const CreateContainer = () => {

    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState(null);
    const [fields, setFields] = useState(false);
    const [alertStatus, setAlertStatus] = useState("danger");
    const [message, setMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [imageAsset, setImageAsset] = useState(null);

    const [dispatch] = useStateValue();

    const inputHandler = (event) => {
        setTitle(event.target.value);
    };

    const selectHandler = (event) => {
        setCategory(event.target.value);
    };

    const priceHandler = (event) => {
        setPrice(event.target.value);
    };

    const upLoadImageHandler = (event) => {
        setIsLoading(true);

        const imageFile = event.target.files[0];
        const storageRef = ref(storage, `Images/${Date.now()}-${imageFile.name}`)
        const uploadTask = uploadBytesResumable(storageRef, imageFile);

        uploadTask.on('state_changed', (snapshot) => {
            return (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        }, (error) => {
            console.log(error);
            setFields(true);
            setMessage('Erro while uploading : Try Again');
            setAlertStatus('danger');
            setTimeout(() => {
                setFields(false);
                setIsLoading(false);
            }, 3000);
        }, () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                setImageAsset(downloadURL);
                setIsLoading(false);
                setFields(true);
                setMessage('Image Uploaded Successfully');
                setAlertStatus('Success')
                setTimeout(() => {
                    setFields(false);
                }, 3000 );
            })
        });
    };

    const deleteImageHandler = () => {
        setIsLoading(true);

        const deleteRef = ref(storage, imageAsset);
        deleteObject(deleteRef).then(() => {
            setImageAsset(null);
            setIsLoading(false);
            setFields(true);
            setMessage('Image Deleted Successfully');
            setAlertStatus('Success')
            setTimeout(() => {
                setFields(false);
            }, 3000 );
        })
    };

    const clearDataHandler = () => {
        setTitle("");
        setImageAsset(null);
        setPrice("");
        setCategory("");
    };
    
    const saveDetailHandler = () => {
        setIsLoading(true);

        try {
            if (!title || !imageAsset || !price || !category) {
                setFields(true);
                setMessage('Required fields can\'t empty!');
                setAlertStatus('danger');
                setTimeout(() => {
                    setFields(false);
                    setIsLoading(false);
                }, 3000);
            } else {
                const data = {
                    id: `${Date.now()}`,
                    title: title,
                    imageURL: imageAsset,
                    category: category,
                    quantity: 1,
                    price: price
                };
                saveItem(data);
                setIsLoading(false);
                setFields(true);
                setMessage('Data Uploaded Successfully');
                setAlertStatus('Success');
                clearDataHandler();
                setTimeout(() => {
                    setFields(false);
                }, 3000 );
            }
        } catch (error) {
            console.log(error);
            setFields(true);
            setMessage('Erro while uploading : Try Again');
            setAlertStatus('danger');
            setTimeout(() => {
                setFields(false);
                setIsLoading(false);
            }, 3000);
        };

        fetchData();
    };

    const fetchData = async () => {
        await getAllFoodItems().then((data) => {
            dispatch({
                type: actionType.SET_FOOD_ITEMS,
                foodItems: data
            })
        });
    };

    return (
        <div className="w-full h-screen flex items-center justify-center">
            <div className="w-[90%] md:w-[75%] border border-gray-200 rounded-lg p-4 flex flex-col items-center justify-center gap-4">
                {
                    fields && (
                        <motion.p 
                            initial={{opacity: 0}}
                            animate={{opacity: 1}}
                            exit={{opacity: 0}}
                            className={`w-full p-2 rounded-lg text-center text-lg font-semibold
                                ${alertStatus === 'danger' ? 'bg-red-400 text-red-800' : 'bg-emerald-400 text-emerald-800'}`
                            }
                        >
                            {message}
                        </motion.p>
                    )
                }

                <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
                    <MdFastfood className="text-xl text-gray-700" />
                    <input 
                        type="text" 
                        required 
                        value={title} 
                        onChange={inputHandler}
                        placeholder="Give a title.." 
                        className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor"
                    />
                </div>

                <div className="w-full">
                    <select 
                        onChange={selectHandler}
                        className="w-full outline-none text-base border-b-2 border-gray-200 rounded-md cursor-pointer"
                    >
                        <option value="other" className="bg-white">
                            Select Category
                        </option>
                        {
                            categories && categories.map((item) => (
                                <option 
                                    key={item.id} 
                                    value={item.urlParamName}
                                    className="text-base border-0 outline-none capitalize bg-white text-textColor"
                                >
                                    {item.name}
                                </option>
                            ))
                        }
                    </select>
                </div>

                <div className="group flex items-center justify-center flex-col border-2 border-dotted border-gray-300 w-full h-225 md:h-340 cursor-pointer rounded-lg">
                        {
                            isLoading ? <Loader/> : 
                            <div>
                                {
                                    !imageAsset ? 
                                    <div>
                                        <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer">
                                            <div className="w-full h-full flex flex-col items-center justify-center gap-2">
                                                <MdCloudUpload 
                                                    className="text-gray-500 text-3xl hover:text-gray-700"
                                                />
                                                <p className="text-gray-500 hover:text-gray-700">
                                                    Click here to upload
                                                </p>
                                            </div>
                                            <input 
                                                type="file" 
                                                name="uploadimage"
                                                accept="image/*"
                                                onChange={upLoadImageHandler}
                                                className="w-0 h-0"
                                            />
                                        </label>
                                    </div> : 
                                    <div>
                                        <div className="relative h-full">
                                            <img 
                                                src={imageAsset} 
                                                alt="uploadedImage" 
                                                className="w-full object-cover"
                                            />
                                            <button 
                                                type="button"
                                                className="absolute bottom-3 right-3 p-3 rounded-full bg-red-500 text-xl cursor-pointer outline-none hover:shadow-md duration-500 transition-all ease-in-out"
                                                onClick={deleteImageHandler}
                                            >
                                                <MdDelete 
                                                    className="text-white"
                                                />
                                            </button>
                                        </div>
                                    </div>
                                }
                            </div>
                        }
                </div>

                <div className="w-full flex flex-col md:flex-row items-center gap-3">
                    <div className="w-full py-2 border-gray-300 flex items-center gap-2">
                        <MdAttachMoney 
                            className="text-gray-700 text-2xl"
                        />
                        <input 
                            type="text" 
                            required
                            value={price}
                            onChange={priceHandler}
                            placeholder="Price"
                            className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor"
                        />
                    </div>
                </div>

                <div className="flex items-center w-full">
                    <button 
                        type="button"
                        onClick={saveDetailHandler}
                        className="ml-0 md:ml-auto w-full md:w-auto border-none outline-none bg-emerald-500 px-12 py-2 rounded-lg text-lg text-white font-semibold"
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    )
};

export default CreateContainer;