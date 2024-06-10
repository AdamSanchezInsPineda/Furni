import PageLayout from "@/Layouts/PageLayout";
import {Link} from "@inertiajs/react";

export default function CheckoutSuccess({auth, order}) {
    return (
        <PageLayout
            user={auth.user}
            headTitle={"Success"}
            cartAmount={auth.cartAmount}
        >
            <div className="w-1/2 mx-auto p-14">
                <h1 className="text-4xl sm:text-6xl font-bold mb-8 text-center mt-8 sm:mt-32">
                    <span
                        style={{
                            backgroundImage:
                                "linear-gradient(120deg, transparent 0%, transparent 30%, green 20%)",
                            backgroundRepeat: "no-repeat",
                            backgroundSize: "100% 0.2em",
                            backgroundPosition: "0 88%",
                            color: "black",
                        }}
                    >
                        Order Confirmation
                    </span>{" "}
                </h1>
                <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <p>Dear {auth.user.name},</p>
                    <p>
                        We are pleased to confirm the receipt of your payment
                        and the processing of your order with Erynek3D. Your
                        transaction has been successfully processed, and we are
                        committed to providing you with an exceptional shopping
                        experience.
                    </p>
                    <h3 className="font-bold text-xl mt-4 mb-2">
                        Order Details:
                    </h3>
                    <ul className="list-disc ml-5">
                        <li>
                            <strong>Order Number:</strong> {order.order_number}
                        </li>
                        <li>
                            <strong>Order Date: </strong>
                            {new Date(order.created_at).toLocaleDateString()}
                        </li>
                        <li>
                            <strong>Total Amount: </strong> {order.total_price}€
                        </li>
                    </ul>
                    <p className="mt-4">
                        You will soon receive a detailed email confirmation of
                        your order, along with information regarding the
                        estimated delivery time and any other relevant
                        instructions.
                    </p>
                    <h3 className="font-bold text-xl mt-4 mb-2">
                        Customer Service:
                    </h3>
                    <p>
                        Our customer service team is at your disposal to address
                        any questions or concerns you may have. Please feel free
                        to contact us:
                    </p>
                    <ul className="list-disc ml-5">
                        <li>
                            <strong>Phone:</strong> (+48)504-999-310
                        </li>
                        <li>
                            <strong>Email:</strong> office@furnivisual.com
                        </li>
                    </ul>
                    <p className="mt-4">
                        We sincerely appreciate your trust in Erynek3D. We will
                        strive to exceed your expectations at every step of the
                        purchasing process.
                    </p>
                    <p>Thank you for choosing us as your trusted provider.</p>
                    <p className="mt-4">Sincerely,</p>
                    <p>Erynek3D</p>

                    <div className="mt-8 text-center">
                        <Link
                            href={route("orders.view", order)}
                            className="inline-flex items-center px-4 py-2 bg-black border border-neutral-900 rounded-xl
                          font-semibold text-white shadow-sm hover:bg-gray-900 focus:outline-none focus:ring-2
                          focus:ring-neutral-900 focus:ring-offset-2 disabled:opacity-25 transition ease-in-out duration-150"
                        >
                            My Order
                        </Link>
                    </div>
                </div>
            </div>
        </PageLayout>
    );
}
