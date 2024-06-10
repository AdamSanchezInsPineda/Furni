import PageLayout from "@/Layouts/PageLayout";

export default function CheckoutCancel({auth}) {
    return (
        <PageLayout user={auth.user} headTitle="Cancel" cartAmount={auth.cartAmount}>
            <div className="w-1/2 mx-auto p-14">
                <h2 className="text-4xl sm:text-6xl font-bold mb-8 text-center mt-8 sm:mt-32">
                    Payment Process <span className="text-red-500">Error</span>
                </h2>
                <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <p>Dear Customer,</p>
                    <p>
                        We regret to inform you that an error has occurred
                        during the payment process for your order with Erynek3D.
                    </p>
                    <p>
                        Please verify that your credit/debit card details are
                        correct and try to make the payment again. If the issue
                        persists, we recommend contacting your bank for further
                        assistance.
                    </p>
                    <p>
                        If you have any questions or need additional assistance,
                        please feel free to contact our customer service team:
                    </p>
                    <ul className="list-disc ml-5">
                        <li>
                            <strong>Phone:</strong> (+48)504-999-310
                        </li>
                        <li>
                            <strong>Email:</strong> office@furnivisual.com
                        </li>
                    </ul>
                    <p>
                        We apologize for any inconvenience this may have caused
                        and appreciate your understanding.
                    </p>
                    <p>Sincerely,</p>
                    <p>Erynek3D</p>
                </div>
            </div>
        </PageLayout>
    );
}
