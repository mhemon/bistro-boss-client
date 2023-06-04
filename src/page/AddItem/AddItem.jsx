import { useForm } from "react-hook-form";
import SectionTitle from "../../components/SectionTitle/SectionTitle";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
const ImageHostingToken = import.meta.env.VITE_Image_Upload_Token

const AddItem = () => {
    const { register, handleSubmit,reset, formState: { errors } } = useForm();

    const ImageHostingURL = `https://api.imgbb.com/1/upload?key=${ImageHostingToken}`

    const [axiosSecure] = useAxiosSecure()

    const onSubmit = data => {
        const formData = new FormData();
        formData.append('image', data.image[0])

        fetch(ImageHostingURL, {
            method : 'POST',
            body: formData
        })
        .then(res => res.json())
        .then(ImgResponse => {
            if(ImgResponse.success){
                const ImgURL = ImgResponse.data.display_url
                const {name, category, price, recipe} = data
                const newItem = {name, recipe, image: ImgURL, category, price: parseFloat(price)}
                console.log(newItem);
                axiosSecure.post('/menu',newItem)
                .then(data => {
                    if(data.data.insertedId){
                        reset()
                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: 'Item added Successfully',
                            showConfirmButton: false,
                            timer: 1500
                          })
                    }
                })
            }
        })
    }

    console.log(errors);
    
    return (
        <div className="w-full px-10 h-full py-8">
        <SectionTitle subHeading="What's new" heading="Add an item" ></SectionTitle>
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-control w-full mb-4">
                <label className="label">
                    <span className="label-text font-semibold">Recipe Name*</span>
                </label>
                <input type="text" placeholder="Recipe Name"
                    {...register("name", { required: true, maxLength: 120 })}
                    className="input input-bordered w-full " />
            </div>
            <div className="flex my-4">
                <div className="form-control w-full ">
                    <label className="label">
                        <span className="label-text">Category*</span>
                    </label>
                    <select defaultValue="Pick One" {...register("category", { required: true })} className="select select-bordered">
                        <option disabled>Pick One</option>
                        <option>Pizza</option>
                        <option>Soup</option>
                        <option>Salad</option>
                        <option>Dessert</option>
                        <option>Desi</option>
                        <option>Drinks</option>
                    </select>
                </div>
                <div className="form-control w-full ml-4">
                    <label className="label">
                        <span className="label-text font-semibold">Price*</span>
                    </label>
                    <input type="number" {...register("price", { required: true })} placeholder="Type here" className="input input-bordered w-full " />
                </div>
            </div>
            <div className="form-control">
                <label className="label">
                    <span className="label-text">Recipe Details</span>
                </label>
                <textarea {...register("recipe", { required: true })} className="textarea textarea-bordered h-24" placeholder="Bio"></textarea>
            </div>
            <div className="form-control w-full my-4">
                <label className="label">
                    <span className="label-text">Item Image*</span>
                </label>
                <input type="file" {...register("image", { required: true })} className="file-input file-input-bordered w-full " />
            </div>
            <input className="btn btn-block mt-4 mb-2" type="submit" value="Add Item" />
        </form>
    </div>
    );
};

export default AddItem;