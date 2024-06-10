import {IoEllipsisVerticalSharp} from "react-icons/io5";
import Dropdown from "../Dropdown";
import {router} from "@inertiajs/react";

export default function User({user}) {
    const handleToggleChangeStatus = (item, deleted) => {
        router.post(route("changeTrashStatus", {user: item, trashed: deleted}), {preserveScroll: true})
    };

    return (
        <div
            className="flex items-center justify-between bg-gray-100 rounded-xl p-2 gap-2"
        >
            {user.avatar ? (
                <img
                    src={`/storage/avatars/${user.avatar}`}
                    alt={user.name}
                    className="w-10 h-10 rounded-full object-cover"
                />
            ) : (
                <button
                    type="button"
                    className="w-10 h-10 text-xl text-white font-bold bg-gray-700 rounded-full transition ease-in-out duration-300"
                >
                    {user.name.charAt(0)}
                </button>
            )}
            <div className="max-[920px]:hidden truncate w-24 max-[764px]:block">
                <h1 className="font-bold ">{user.name}</h1>
                <p className="text-gray-600 text-sm">{user.last_name}</p>
            </div>
            <p className="text-sm text-gray-600 max-[1320px]:hidden truncate w-32 max-[764px]:block">{user.email}</p>
            <Dropdown>
                <Dropdown.Trigger>
                    <IoEllipsisVerticalSharp className="text-xl cursor-pointer"/>
                </Dropdown.Trigger>
                <Dropdown.Content>
                    <Dropdown.Link href={route('admin.user.show', user)}>Edit</Dropdown.Link>
                    <Dropdown.Link
                        onClick={() => handleToggleChangeStatus(user, !user.deleted_at)}>Delete</Dropdown.Link>
                </Dropdown.Content>
            </Dropdown>
        </div>
    );
}
