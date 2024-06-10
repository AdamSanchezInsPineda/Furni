import {Link} from "@inertiajs/react";
import Category from "@/Components/Dashboard/Category";
import Order from "@/Components/Dashboard/Order";
import User from "@/Components/Dashboard/User";
import Product from "@/Components/Dashboard/Product";
import DashboardLayout from "@/Layouts/DashboardLayout";

export default function Dashboard({auth, categories, products, users, orders,}) {
    return (
        <DashboardLayout auth={auth}>
            <div className="grid md:grid-cols-3 gap-4 ">
                {/* pb-[71px] h-full"> */}
                <div className="bg-white p-4 rounded-2xl shadow flex flex-col">
                    <h1 className="font-black text-2xl mb-2">Categories</h1>
                    <div className="grid grid-cols-2 gap-2 mb-2">
                        {categories.map((category, index) => (
                            <Category
                                key={index}
                                category={category}
                            ></Category>
                        ))}
                    </div>
                    <div className="flex flex-grow justify-center items-end">
                        <Link
                            href={route("admin.categories")}
                            className="bg-neutral-800 text-white px-4 py-2 rounded-xl hover:bg-neutral-700"
                        >
                            See all
                        </Link>
                    </div>
                </div>
                <div className="bg-white p-4 rounded-2xl shadow flex flex-col">
                    <h1 className="font-black text-2xl mb-2">Products</h1>
                    <div className="grid grid-cols-2 gap-2 mb-2">
                        {products.map((product, index) => (
                            <Product product={product} key={index}></Product>
                        ))}
                    </div>
                    <div className="flex justify-center items-end flex-grow">
                        <Link
                            href={route("admin.products")}
                            className="bg-neutral-800 text-white px-4 py-2 rounded-xl hover:bg-neutral-700"
                        >
                            See all
                        </Link>
                    </div>
                </div>
                <div className="bg-white p-4 rounded-2xl shadow flex flex-col">
                    <h1 className="font-black text-2xl mb-2">Users</h1>
                    <div className="flex flex-col gap-2 mb-2">
                        {users.length > 0 ? (
                            users.map((user, index) => (
                                <User user={user} key={index}></User>
                            ))
                        ) : (
                            <p>No users</p>
                        )}
                    </div>
                    <div className="flex justify-center items-end flex-grow">
                        <Link
                            href={route("admin.users")}
                            className="bg-neutral-800 text-white px-4 py-2 rounded-xl hover:bg-neutral-700"
                        >
                            See all
                        </Link>
                    </div>
                </div>
                <div className="bg-white p-4 rounded-2xl shadow md:col-span-3">
                    <h1 className="font-black text-2xl mb-2">Orders</h1>
                    <div className="flex flex-col gap-2 mb-2">
                        {orders.length > 0 ? (
                            orders.map((order, index) => (
                                <Order order={order} key={index}></Order>
                            ))
                        ) : (
                            <p>No orders</p>
                        )}
                    </div>
                    <div className="flex justify-center items-end flex-grow">
                        <Link
                            href={route("admin.orders")}
                            className="bg-neutral-800 text-white px-4 py-2 rounded-xl hover:bg-neutral-700"
                        >
                            See all
                        </Link>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
