import MainButton from "@/Components/MainButton";
import InputError from "@/Components/InputError";
import TextArea from "./TextArea";
import {useForm} from "@inertiajs/react";
import Rate from "@/Components/Rate";

export default function ReviewForm({product, user}) {
    const {data, setData, post, processing, errors, reset} = useForm({
        product_id: product.id,
        comment: "",
        rate: ""
    })

    const handleOnChange = (event) => {
        setData(event.target.name, event.target.value);
    };

    const handleRate = (rate) => {
        setData('rate', rate)
    }

    const submit = (e) => {
        e.preventDefault();
        post(route("reviews.store"), {preserveScroll: true, onSuccess: () => reset('comment')});
    };

    return (
        <form onSubmit={submit} className="flex flex-col gap-4">
            <div>
                <h3 className="text-xl font-semibold">
                    Review for the product: {product.name}
                </h3>
            </div>
            <div>
                <TextArea
                    placeholder="Enter the comment"
                    className="w-full p-2 border rounded"
                    name="comment"
                    value={data.comment}
                    onChange={handleOnChange}
                />
                <InputError message={errors.comment}/>
            </div>
            <div>
                <Rate totalStars={5} initialValue={0} name="rate" onChange={handleRate} className="text-2xl"/>
                <InputError message={errors.rate}/>
            </div>
            <div>
                <MainButton type="submit" disabled={processing} className="py-2 px-4 rounded text-white font-bold">
                    Send message
                </MainButton>
            </div>
        </form>
    );
}
