import {FaUser} from "react-icons/fa";

export default function Profile({profiles, className = '', ...props}) {
    return (
        <div {...props} className={'bg-white rounded-3xl p-3 shadow ' + className}>
            <div className="flex justify-between items-center mb-4 text-4xl">
                <FaUser className="flex-grow-0"/>
                <h1 className="flex-grow text-center">Profile</h1>
            </div>
            <div className="flex flex-col gap-2">
                {profiles?.map((profile, index) => (
                    <div
                        key={index}
                        className="flex justify-between gap-10 p-3 bg-gray-200 rounded-xl"
                    >
                        <h1>{profile.name}</h1>
                        <h1>{profile.email}</h1>
                    </div>
                ))}
            </div>
        </div>
    );
}
