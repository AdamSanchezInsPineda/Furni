import {FaFacebook, FaInstagram, FaTwitter} from "react-icons/fa";

export default function AboutCard({
                                      src,
                                      name,
                                      work,
                                      description,
                                      socials = {instagram: "", facebook: "", twitter: ""}
                                  }) {
    return (
        <section className="flex flex-col justify-center items-center transition duration-300 ease-in-out section ">
            <div className="relative flex justify-center items-center">
                <picture>
                    <img
                        src={src}
                        alt={name}
                        className="rounded-b-3xl"
                        width={350}
                        style={{maskImage: "linear-gradient(to bottom, black 70%, transparent 100%)"}}
                    />
                </picture>
                <div
                    className="absolute bottom-0 flex flex-col justify-center items-center font-oldStandard font-bold text-4xl p-2 cursor-default">
                    <h1>{name}</h1>
                    <p className="text-sm mb-4 semi">{work}</p>
                </div>
            </div>
            <div className="mt-2 px-5 max-w-[450px]">
                <p className="text-lg text-center">{description}</p>
            </div>
            <div className="mt-2 bg-neutral-300/20 rounded-xl py-2 px-5">
                <div className="flex px-2 gap-3 text-2xl text-black">
                    <a href={socials.instagram} target="_blank" rel="noopener noreferrer">
                        <FaInstagram className="cursor-pointer transition duration-300 ease-in-out"/>
                    </a>
                    <a href={socials.facebook} target="_blank" rel="noopener noreferrer">
                        <FaFacebook className="cursor-pointer transition duration-300 ease-in-out"/>
                    </a>
                    <a href={socials.twitter} target="_blank" rel="noopener noreferrer">
                        <FaTwitter className="cursor-pointer transition duration-300 ease-in-out"/>
                    </a>
                </div>
            </div>
        </section>
    )
}
