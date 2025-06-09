import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { HomeService } from "../types/type";
import apiClinet from "../services/apiServices";
import { Swiper, SwiperSlide } from "swiper/react";

export default function DetailsPage() {
  const { slug } = useParams<{ slug: string }>();

  const [service, setService] = useState<HomeService | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    apiClinet
      .get(`/service/${slug}`)
      .then((response) => {
        setService(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, [slug]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error loading: {error}</p>;
  }

  if (!service) {
    return <p>Service not found</p>;
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(value);
  };
  const BASE_URL = import.meta.env.VITE_REACT_API_STORAGE_URL;

  return (
    <main className="relative mx-auto w-full max-w-[640px] overflow-x-hidden bg-white pb-[144px]">
      <div id="Background" className="absolute left-0 right-0 top-0 h-[228px]">
        <img
          src="/assets/images/backgrounds/orange-service-details.png"
          alt="image"
        />
      </div>
      <section
        id="NavTop"
        className="fixed left-0 right-0 top-[16px] z-30 transition-all duration-300"
      >
        <div className="relative mx-auto max-w-[640px] px-5">
          <div
            id="ContainerNav"
            className="flex items-center justify-between py-[14px] transition-all duration-300"
          >
            <a href="category.html">
              <div
                id="Back"
                className="flex h-[44px] w-[44px] shrink-0 items-center justify-center rounded-full bg-white"
              >
                <img
                  src="/assets/images/icons/back.svg"
                  alt="icon"
                  className="h-[22px] w-[22px] shrink-0"
                />
              </div>
            </a>
            <h2
              id="Title"
              className="font-semibold text-white transition-all duration-300"
            >
              Details
            </h2>
            <a href="#">
              <div
                id="Cart"
                className="flex h-[44px] w-[44px] shrink-0 items-center justify-center rounded-full bg-white"
              >
                <img
                  src="/assets/images/icons/cart.svg"
                  alt="icon"
                  className="h-[22px] w-[22px] shrink-0"
                />
              </div>
            </a>
          </div>
        </div>
      </section>
      <header className="mt-[100px] px-5">
        <div className="relative flex w-full items-center justify-center overflow-hidden rounded-[40px]">
          <img
            src={`${BASE_URL}/${service.thumbnail}`}
            alt="image"
            className="h-full w-full object-cover"
          />
          <div className="absolute right-5 top-5 flex shrink-0 items-center gap-[2px] rounded-full bg-white px-[8px] py-[7px]">
            <img
              src="/assets/images/icons/star-service-details.svg"
              alt="icon"
              className="h-[22px] w-[22px] shrink-0"
            />
            <p className="font-semibold">4.8</p>
          </div>
          {service.is_popular ? (
            <div className="absolute bottom-5 left-[20.5px] flex shrink-0 items-center gap-[2px] rounded-full bg-white px-[8px] py-[7px]">
              <img
                src="/assets/images/icons/star-service-details.svg"
                alt="icon"
                className="h-[22px] w-[22px] shrink-0"
              />
              <p className="font-semibold">Popular</p>
            </div>
          ) : (
            ""
          )}
        </div>
        <h1 className="mt-5 text-2xl font-bold leading-[36px]">
          {service.name}
        </h1>
      </header>
      <section
        id="ServiceDetails"
        className="mt-5 grid grid-cols-2 gap-[14px] px-5"
      >
        <div className="flex items-center gap-[10px] rounded-[20px] bg-[#F4F5F7] px-[14px] py-[14px]">
          <img
            src="/assets/images/icons/clock-service-details.svg"
            alt="icon"
            className="h-[32px] w-[32px] shrink-0"
          />
          <div>
            <strong className="text-sm font-semibold leading-[21px]">
              {service.duration} Hours
            </strong>
            <p className="text-sm leading-[21px] text-shujia-gray">Duration</p>
          </div>
        </div>
        <div className="flex items-center gap-[10px] rounded-[20px] bg-[#F4F5F7] px-[14px] py-[14px]">
          <img
            src="/assets/images/icons/note-service-details.svg"
            alt="icon"
            className="h-[32px] w-[32px] shrink-0"
          />
          <div>
            <strong className="text-sm font-semibold leading-[21px]">
              Top Service
            </strong>
            <p className="text-sm leading-[21px] text-shujia-gray">Guarantee</p>
          </div>
        </div>
        <div className="flex items-center gap-[10px] rounded-[20px] bg-[#F4F5F7] px-[14px] py-[14px]">
          <img
            src="/assets/images/icons/calender-service-details.svg"
            alt="icon"
            className="h-[32px] w-[32px] shrink-0"
          />
          <div>
            <strong className="text-sm font-semibold leading-[21px]">
              {service.category.name}
            </strong>
            <p className="text-sm leading-[21px] text-shujia-gray">Category</p>
          </div>
        </div>
        <div className="flex items-center gap-[10px] rounded-[20px] bg-[#F4F5F7] px-[14px] py-[14px]">
          <img
            src="/assets/images/icons/clock-service-details.svg"
            alt="icon"
            className="h-[32px] w-[32px] shrink-0"
          />
          <div>
            <strong className="text-sm font-semibold leading-[21px]">
              Free Tools
            </strong>
            <p className="text-sm leading-[21px] text-shujia-gray">SNI Level</p>
          </div>
        </div>
      </section>
      <section id="ServiceDescription" className="mt-5 px-5">
        <h3 className="font-semibold">Details</h3>
        <p className="leading-7">{service.about}</p>
      </section>
      <section id="ServiceBenefits" className="mt-5 px-5">
        <div className="flex w-full flex-col gap-3 rounded-[24px] border border-shujia-graylight p-[14px]">
          <h3 className="font-semibold">Service Benefits</h3>
          {service.benefits.length > 0 ? (
            service.benefits.map((benefit, index) => (
              <div key={benefit.id} className="flex flex-col gap-3">
                <div className="flex items-center gap-3 pb-3">
                  <img
                    src="/assets/images/icons/verify-service-details.svg"
                    alt="icon"
                    className="h-[32px] w-[32px] shrink-0"
                  />
                  <p className="leading-[26px]">{benefit.name}</p>
                </div>

                {index < service.benefits.length - 1 && (
                  <hr className="border-shujia-graylight" />
                )}
              </div>
            ))
          ) : (
            <p>belum ada data</p>
          )}
        </div>
      </section>
      <section id="GreatCustomers" className="relative mt-5 space-y-[14px]">
        <h3 className="pl-5 font-semibold">Great Customers</h3>
        <div
          id="GreatCustomersSlider"
          className="swiper w-full overflow-x-hidden"
        >
          <Swiper
            className="swiper-wrapper"
            direction="horizontal"
            spaceBetween={20}
            slidesPerView="auto"
            slidesOffsetAfter={20}
            slidesOffsetBefore={20}
          >
            {service.testimonials.length > 0
              ? service.testimonials.map((testimonial) => (
                  <SwiperSlide
                    key={testimonial.id}
                    className="swiper-slide !w-fit"
                  >
                    <a href="#" className="card">
                      <div className="flex w-[300px] flex-col gap-4 rounded-3xl border border-shujia-graylight p-5">
                        <div className="stars flex items-center">
                          <img
                            src="/assets/images/icons/star-service-details.svg"
                            alt="icon"
                            className="h-[22px] w-[22px] shrink-0"
                          />
                          <img
                            src="/assets/images/icons/star-service-details.svg"
                            alt="icon"
                            className="h-[22px] w-[22px] shrink-0"
                          />
                          <img
                            src="/assets/images/icons/star-service-details.svg"
                            alt="icon"
                            className="h-[22px] w-[22px] shrink-0"
                          />
                          <img
                            src="/assets/images/icons/star-service-details.svg"
                            alt="icon"
                            className="h-[22px] w-[22px] shrink-0"
                          />
                          <img
                            src="/assets/images/icons/star-service-details.svg"
                            alt="icon"
                            className="h-[22px] w-[22px] shrink-0"
                          />
                        </div>
                        <p className="leading-7">{testimonial.message}</p>
                        <div className="profil flex items-center gap-3">
                          <div className="flex h-[60px] w-[60px] items-center justify-center overflow-hidden rounded-full">
                            <img
                              src={`${BASE_URL}/${testimonial.photo}`}
                              alt="image"
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div className="flex flex-col gap-[2px]">
                            <h5 className="font-semibold">
                              {testimonial.name}
                            </h5>
                            <p className="text-sm leading-[21px] text-shujia-gray">
                              Programer
                            </p>
                          </div>
                        </div>
                      </div>
                    </a>
                  </SwiperSlide>
                ))
              : "belum ada data"}
          </Swiper>
        </div>
      </section>
      <nav className="fixed bottom-5 left-0 right-0 z-30 mx-auto w-full">
        <div className="mx-auto max-w-[640px] px-5">
          <div className="flex items-center gap-[45px] rounded-[24px] bg-shujia-black px-[20px] py-[14px]">
            <div>
              <strong className="whitespace-nowrap text-[22px] font-extrabold leading-[33px] text-white">
                {formatCurrency(service.price)}
              </strong>
              <p className="text-sm leading-[21px] text-white">
                Refund Guarantee
              </p>
            </div>
            <a href="my-cart.html" className="w-full">
              <p className="w-full rounded-full bg-shujia-orange px-[18px] py-[14px] text-center font-semibold text-white transition-all duration-300 hover:shadow-[0px_4px_10px_0px_#D04B1E80]">
                Add to Cart
              </p>
            </a>
          </div>
        </div>
      </nav>
    </main>
  );
}
