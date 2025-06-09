import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { HomeService, Category } from "../types/type";
import apiClinet from "../services/apiServices";
import { Link } from "react-router-dom";

const fetchCategories = async () => {
  const response = await apiClinet.get("/categories");
  return response.data.data;
};

const fetchServices = async () => {
  const response = await apiClinet.get("/services?limit=4&ispopular=1");
  return response.data.data;
};

export default function HomePage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [services, setServices] = useState<HomeService[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [loadingServices, setLoadingServices] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategoriesData = async () => {
      try {
        const categoriesData = await fetchCategories();
        setCategories(categoriesData);
      } catch {
        setError("Failed to load categories");
      } finally {
        setLoadingCategories(false);
      }
    };

    const fetchServicesData = async () => {
      try {
        const servicesData = await fetchServices();
        setServices(servicesData);
      } catch {
        setError("Failed to load services");
      } finally {
        setLoadingServices(false);
      }
    };

    fetchCategoriesData();
    fetchServicesData();
  }, []);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(value);
  };

  if (loadingCategories && loadingServices) {
    return <p>Loading categories and services...</p>;
  }

  if (error) {
    return <p>Error loading data: {error}</p>;
  }

  const BASE_URL = import.meta.env.VITE_REACT_API_STORAGE_URL;

  return (
    <main className="relative mx-auto w-full max-w-[640px] overflow-hidden bg-white pb-[142px]">
      <div id="Background" className="absolute left-0 right-0 top-0">
        <img
          src="assets/images/backgrounds/home-banner.png"
          alt="image"
          className="h-[349.02px] w-full object-cover object-bottom"
        />
      </div>
      <section id="NavTop" className="fixed left-0 right-0 top-5 z-30">
        <div className="relative mx-auto max-w-[640px] px-5">
          <div className="flex items-center justify-between rounded-[22px] bg-white px-4 py-[14px]">
            <a href="#" className="pl-1">
              <img
                src="assets/images/logos/company.svg"
                alt="icon"
                className="h-[40px] w-[114px] shrink-0"
              />
            </a>
            <ul className="flex items-center gap-[10px]">
              <li className="shrink-0">
                <a href="#">
                  <div className="flex h-[44px] w-[44px] shrink-0 items-center justify-center rounded-full border border-shujia-graylight">
                    <img
                      src="assets/images/icons/cart.svg"
                      alt="icon"
                      className="h-[22px] w-[22px] shrink-0"
                    />
                  </div>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </section>
      <header className="relative ml-5 mt-[128px] w-[246px]">
        <h1 className="text-[32px] font-extrabold leading-[46px]">
          Discover Top Home Services
        </h1>
      </header>
      <section
        id="Categories"
        className="swiper mt-[40px] w-full overflow-x-hidden"
      >
        <div className="pb-5">
          <Swiper
            className="swiper-wrapper"
            direction="horizontal"
            spaceBetween={20}
            slidesPerView="auto"
            slidesOffsetAfter={20}
            slidesOffsetBefore={20}
          >
            {categories.length > 0
              ? categories.map((category) => (
                  <SwiperSlide
                    key={category.id}
                    className="swiper-slide !w-fit"
                  >
                    <Link to={`/category/${category.slug}`} className="card">
                      <div className="shrink-0 space-y-3 rounded-[24px] border border-x-shujia-graylight bg-white py-4 text-center transition-all duration-300 hover:border-shujia-orange">
                        <div className="mx-auto flex h-[70px] w-[70px] shrink-0 items-center justify-center overflow-hidden rounded-full">
                          <img
                            src={`${BASE_URL}/${category.photo}`}
                            alt="icon"
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="flex min-w-[130px] flex-col gap-[2px]">
                          <h3 className="font-semibold">{category.name}</h3>
                          <p className="text-sm leading-[21px] text-shujia-gray">
                            {category.home_services_count} Services
                          </p>
                        </div>
                      </div>
                    </Link>
                  </SwiperSlide>
                ))
              : "belum ada data terbaru"}
          </Swiper>
        </div>
      </section>
      <section id="Adverticement" className="relative px-5">
        <a href="#">
          <img src="assets/images/backgrounds/adverticement.png" alt="icon" />
        </a>
      </section>
      <section id="PopularSummer" className="mt-[30px] space-y-[14px]">
        <h2 className="pl-5 text-[18px] font-bold leading-[27px]">
          Popular This Summer
        </h2>
        <div
          id="PopularSummerSlider"
          className="swiper w-full overflow-x-hidden"
        >
          <Swiper
            className="swiper-wrapper pb-[30px]"
            direction="horizontal"
            spaceBetween={20}
            slidesPerView="auto"
            slidesOffsetAfter={20}
            slidesOffsetBefore={20}
          >
            {services.length > 0
              ? services.map((service) => (
                  <SwiperSlide key={service.id} className="swiper-slide !w-fit">
                    <Link to={`/service/${service.slug}`} className="card">
                      <div className="relative flex w-[230px] shrink-0 flex-col gap-[12px] overflow-hidden rounded-[24px] border border-shujia-graylight bg-white p-4 transition-all duration-300 hover:border-shujia-orange">
                        <span className="absolute right-[26px] top-[26px] shrink-0 rounded-full bg-white px-2 py-[7px]">
                          <div className="flex items-center gap-[2px]">
                            <img
                              src="assets/images/icons/star.svg"
                              alt="icon"
                            />
                            <p className="text-xs font-semibold leading-[18px]">
                              4.8
                            </p>
                          </div>
                        </span>
                        <div className="flex h-[140px] w-full shrink-0 items-center justify-center overflow-hidden rounded-[16px] bg-[#D9D9D9]">
                          <img
                            src={`${BASE_URL}/${service.thumbnail}`}
                            alt="image"
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <h3 className="line-clamp-2 min-h-[48px] font-semibold">
                          {service.name}
                        </h3>
                        <div className="flex flex-col gap-y-3">
                          <div className="flex items-center gap-2">
                            <img
                              src="assets/images/icons/date.svg"
                              alt="icon"
                              className="h-5 w-5 shrink-0"
                            />
                            <p className="text-sm leading-[21px] text-shujia-gray">
                              {service.category.name}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <img
                              src="assets/images/icons/clock.svg"
                              alt="icon"
                              className="h-5 w-5 shrink-0"
                            />
                            <p className="text-sm leading-[21px] text-shujia-gray">
                              {service.duration} Hours
                            </p>
                          </div>
                          <strong className="font-semibold text-shujia-orange">
                            {formatCurrency(service.price)}
                          </strong>
                        </div>
                      </div>
                    </Link>
                  </SwiperSlide>
                ))
              : "belum ada data terbaru"}
          </Swiper>
        </div>
      </section>
      <nav className="fixed bottom-5 left-0 right-0 z-30 mx-auto w-full">
        <div className="mx-auto max-w-[640px] px-5">
          <div className="rounded-[24px] bg-shujia-black px-[20px] py-[14px]">
            <ul className="flex items-center gap-[20.30px]">
              <li className="w-full">
                <a href="#">
                  <div className="flex items-center justify-center gap-2 rounded-full bg-shujia-orange px-[18px] py-[10px] transition-all duration-300 hover:shadow-[0px_4px_10px_0px_#D04B1E80]">
                    <img
                      src="assets/images/icons/browse.svg"
                      alt="icon"
                      className="h-6 w-6 shrink-0"
                    />
                    <p className="text-sm font-semibold leading-[21px] text-white">
                      Browse
                    </p>
                  </div>
                </a>
              </li>
              <li className="shrink-0">
                <a href="#">
                  <div className="flex h-[44px] w-[44px] shrink-0 items-center justify-center rounded-full border border-shujia-graylight transition-all duration-300 hover:border-shujia-orange">
                    <img
                      src="assets/images/icons/note.svg"
                      alt="icon"
                      className="h-[22px] w-[22px] shrink-0"
                    />
                  </div>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </main>
  );
}
