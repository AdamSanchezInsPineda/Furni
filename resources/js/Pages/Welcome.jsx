import Footer from "@/Components/Footer";
import Header from "@/Components/Header";
import { Head } from "@inertiajs/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "@inertiajs/react";
import { Pagination } from "swiper/modules";
import ReactCompareImage from "react-compare-image";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import "swiper/css";
import "swiper/css/pagination";

export default function Welcome({ auth }) {
    return (
        <>
            <Head title="Home page"></Head>
            <Header user={auth.user} cartAmount={auth.cartAmount}></Header>
            <section className="flex items-center max-lg:justify-center h-screen">
                <video
                    autoPlay
                    loop
                    muted
                    className="absolute z-0 w-full h-full object-cover"
                >
                    <source src="videos/furniVideo.mp4" type="video/mp4" />
                </video>
                <div className="lg:ms-10 flex flex-col gap-4 items-end z-10 backdrop-blur-xl p-4 rounded-xl">
                    <h1 className="md:text-7xl text-5xl text-end">
                        Welcome to our <br /> innovative <br /> graphic studio
                    </h1>
                    <p className="max-w-96 text-end">
                        Nestled in the vibrant heart of Cracow, our studio is a
                        hub of creativity and craftsmanship. We specialize in
                        crafting immersive 3D furniture models that transcend
                        traditional design boundaries.
                    </p>

                    <Link
                        className="tracking-wide text-lg inline-block px-4 py-1 border-[3px] border-black hover:bg-black hover:text-white"
                        href={"catalogue"}
                    >
                        See more
                    </Link>
                </div>
            </section>
            <section className="py-24">
                <div className="flex flex-col items-center  gap-5">
                    <h1 className="text-4xl text-center max-w-[700px]">
                        Unlock the Dimension of Imagination: Where Furniture
                        Comes to Life in 3D!
                    </h1>
                    <p className="max-w-[900px] text-center">
                        Step into a world where creativity knows no limits and
                        each design is crafted with meticulous precision. Our
                        passion for 3D furniture modeling fuels our commitment
                        to bring your visions to life, turning concepts into
                        captivating realities. Explore the endless possibilities
                        of design with us and witness your ideas unfold in
                        stunning detail. Join us on this journey where
                        imagination takes center stage and every piece tells a
                        story.
                    </p>
                </div>
                <div className="mx-10 mt-10">
                    <Swiper
                        slidesPerView={1}
                        spaceBetween={10}
                        pagination={{
                            clickable: true,
                        }}
                        breakpoints={{
                            640: {
                                slidesPerView: 2,
                                spaceBetween: 20,
                            },
                            768: {
                                slidesPerView: 2,
                                spaceBetween: 40,
                            },
                            1024: {
                                slidesPerView: 3,
                                spaceBetween: 50,
                            },
                        }}
                        modules={[Pagination]}
                        className="mySwiper"
                    >
                        <SwiperSlide>
                            <img
                                src="/images/catalogue.webp"
                                className="rounded-xl"
                            />
                        </SwiperSlide>
                        <SwiperSlide>
                            <img
                                src="/images/IN002SF2.jpg"
                                className="rounded-xl"
                            />
                        </SwiperSlide>
                        <SwiperSlide>
                            <img
                                src="/images/image1.jpg"
                                className="rounded-xl"
                            />
                        </SwiperSlide>
                        <SwiperSlide>
                            <img
                                src="/images/image2.jpg"
                                className="rounded-xl"
                            />
                        </SwiperSlide>
                    </Swiper>
                </div>
            </section>

            <hr className="mx-10" />

            <section className="flex lg:flex-row flex-col m-4">
                <div className="flex-1 flex flex-col justify-center items-center text-center max-lg:mb-4 gap-4">
                    <h1 className="lg:text-4xl text-4xl">
                        Transforming Ideas into Tailored Treasures
                    </h1>
                    <br />
                    <p className="w-full lg:max-w-[800px]">
                        At FurniVisual, we're not just creating products; we're
                        crafting personalized masterpieces tailored to your
                        dreams. With meticulous attention to detail and a
                        passion for innovation, we breathe life into every
                        design, ensuring it reflects your individuality. Whether
                        it's a custom furniture piece or a bespoke interior
                        concept, we're here to turn your ideas into tangible
                        works of art. Let us be your creative partner in
                        bringing your vision to reality, where every detail is a
                        reflection of your style and personality.
                    </p>
                </div>
                <div className="flex-1 w-full">
                    <ReactCompareImage
                        leftImage="/images/compare1.webp"
                        rightImage="/images/compare2.jpg"
                    />
                </div>
            </section>

            <Footer></Footer>
        </>
    );
}
