import React, {useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AddProduct() {

    const [title , setTitle] = useState("");
    const [file , setFile] = useState("");
    const [preview , setPreview] = useState("");
    const navigate = useNavigate();
    

    // function load image

    const loadImage = (e) => {
        const image = e.target.files[0];
        setFile(image);

        setPreview(URL.createObjectURL(image));
    }

    // function save product
    const saveProduct = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("file", file);
        formData.append("title", title);

        try {
            await axios.post("http://localhost:5000/products", formData, {
                headers:{
                    "Content-type": "multipart/form-data"
                }
            });
            navigate("/");
        } catch (error) {
            console.log(error)
        }
    }

    return (
   <div className="columns is-centered mt-5">
    <div className="column is-half">
        <form onSubmit={saveProduct}>
            <div className="field">
                <label className="label">Product Name</label>
                <div className="control">
                    <input type="text" className="input" value={title} onChange={(e) => setTitle(e.target.value)}
                        placeholder="Product Name"
                    />
                </div>
            </div>

            <div className="field">
                <label className="label">Image</label>
                <div className="control">
                    <div className="file">
                        <label className="file-label">
                            <input type="file" className="file-input" onChange={loadImage}/>
                            <span className='file-cta'>
                                <span className='file-label'>Choose a file</span>
                            </span>
                        </label>
                    </div>
                </div>
            </div>

            {/* preview image */}

            {preview ? (
                <figure className="image is-square">
                    <img src={preview} alt="image-preview" />
                </figure>
            ) : ("") }

            <div className="field mt-3">
                <div className="control">
                    <button type='submit' className="button is-success">Simpan</button>
                </div>
            </div>
        </form>
    </div>

   </div>
  )
}

export default AddProduct