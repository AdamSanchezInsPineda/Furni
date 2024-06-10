import "../../../css/scroll.css";
import PageLayout from "@/Layouts/PageLayout";
import OrdersTable from "@/Components/OrdersTable";

export default function Order({auth, orders}) {
    if (!orders || orders.length === 0) {
        return (
            <PageLayout
                user={auth.user}
                className="bg-slate-100"
                headTitle={"Orders"}
                cartAmount={auth.cartAmount}
            >
                <div className="mx-4 xl:mx-64 py-4 flex flex-col justify-center items-center" style={{height: '400px'}}>
                    <p className="text-center text-lg md:text-2xl mb-8">No orders found.</p>
                    <img src="/notFound.svg" alt="Mi SVG"/>
                </div>
            </PageLayout>
        );
    }
    return (
        <PageLayout
            user={auth.user}
            cartAmount={auth.cartAmount}
            className="bg-slate-100"
            headTitle={"Orders"}
        >
            <div className="mx-4 xl:mx-64 py-4">
                <div className="text-9xl font-black font-mono text-center">
                    <span className="bg-clip-text text-transparent bg-center bg-[url('/images/catalogue.webp')]">
                       Your Orders
                    </span>
                </div>
                <OrdersTable
                    auth={auth}
                    orders={orders}
                    head={["Number", "Status", "Price", "Email", "Created at", "Actions"]}
                    body={[
                        "number",
                        "status",
                        "price",
                        "email",
                        "created at",
                        "actions",
                    ]}
                ></OrdersTable>
            </div>
        </PageLayout>
    );
}
