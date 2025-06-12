import { useEffect, useState } from "react";
import { HomeService, type CartItem } from "../types/type";
import apiClinet from "../services/apiServices";
import { Link } from "react-router-dom";

export default function MyCartPage() {
  const [serviceDetails, setServiceDetails] = useState<HomeService[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      const cartItems: CartItem[] = JSON.parse(savedCart);
      setCart(cartItems);

      const fetchServiceDetails = async () => {
        const validServices: HomeService[] = [];
        const updatedCart: CartItem[] = [];

        for (const item of cartItems) {
          // 1 bed-cleaning
          try {
            const response = await apiClinet.get(`/service/${item.slug}`);
            const service = response.data.data;
            //  name, price, duration, etc

            // jika masih ada datanya maka akan dimasukkan ke dalam validServices berupa array sementara
            if (service) {
              validServices.push(service);
              updatedCart.push(item);
            } else {
              console.warn(
                `Service with slug ${item.slug} is no longer available.`
              );
            }
          } catch (error: unknown) {
            if (error instanceof Error) {
              setError(error.message);
              console.error(
                `Error fetching service with slug ${item.slug}: ${error.message}`
              );
              const updatedCartAfterError = cartItems.filter(
                (cartItem) => cartItem.slug !== item.slug
              );
              setCart(updatedCartAfterError);
              localStorage.setItem(
                "cart",
                JSON.stringify(updatedCartAfterError)
              );
            }
          }
        }

        setServiceDetails(validServices);
        setLoading(false);
      };
      fetchServiceDetails();
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <p>Loading data...</p>;
  }

  if (error) {
    return <p>Error loading data: {error}</p>;
  }

  const BASE_URL = import.meta.env.VITE_REACT_API_STORAGE_URL;

  return (
    <main className="relative mx-auto min-h-screen w-full max-w-[640px] bg-[#F4F5F7] pb-[158px]">
      <div id="Background" className="absolute left-0 right-0 top-0">
        <img
          src="/assets/images/backgrounds/orange.png"
          alt="image"
          className="h-[190px] w-full object-cover object-bottom"
        />
      </div>
      <section
        id="NavTop"
        className="fixed left-0 right-0 top-[16px] z-30 transition-all duration-300"
      >
        <div className="relative mx-auto max-w-[640px] px-5">
          <div
            id="ContainerNav"
            className="relative flex h-[68px] items-center justify-center transition-all duration-300"
          >
            <Link
              to={`/`}
              id="BackA"
              className="absolute left-0 transition-all duration-300"
            >
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
            </Link>
            <h1
              id="Title"
              className="font-semibold text-white transition-all duration-300"
            >
              My Cart
            </h1>
          </div>
        </div>
      </section>
      <div className="relative flex flex-col gap-[20px] px-5 pt-[100px]">
        <section
          id="HomeServices"
          className="flex flex-col gap-4 rounded-3xl border border-shujia-graylight bg-white px-[14px] py-[14px]"
        >
          <div className="flex items-center justify-between">
            <h2 className="font-semibold">Home Services</h2>
            <button type="button" data-expand="HomeServicesJ">
              <img
                src="/assets/images/icons/bottom-booking-form.svg"
                alt="icon"
                className="h-[32px] w-[32px] shrink-0 transition-all duration-300"
              />
            </button>
          </div>
          <div className="flex flex-col gap-4" id="HomeServicesJ">
            <div className="card flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-[90px] w-[80px] shrink-0 items-center justify-center overflow-hidden rounded-3xl">
                  <img
                    src="/assets/images/thumbnails/clean-mini-cart.png"
                    alt="image"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <h3 className="line-clamp-2 h-[42px] text-sm font-semibold leading-[21px]">
                    Home Family Theater Best Lights Installation
                  </h3>
                  <div className="flex items-center gap-[6px]">
                    <div className="flex items-center gap-1">
                      <img
                        src="/assets/images/icons/coint.svg"
                        alt="icon"
                        className="h-4 w-4 shrink-0"
                      />
                      <p className="text-xs leading-[18px] text-shujia-gray">
                        Rp 8.489.391
                      </p>
                    </div>
                    <div className="flex items-center gap-1">
                      <img
                        src="/assets/images/icons/clock-cart.svg"
                        alt="icon"
                        className="h-4 w-4 shrink-0"
                      />
                      <p className="text-xs leading-[18px] text-shujia-gray">
                        15 Hours
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <button type="button" className="shrink-0">
                <img
                  src="/assets/images/icons/garbage.svg"
                  alt="icon"
                  className="size-[32px] shrink-0"
                />
              </button>
            </div>
            <hr className="border-shujia-graylight" />
            <div className="card flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-[90px] w-[80px] shrink-0 items-center justify-center overflow-hidden rounded-3xl">
                  <img
                    src="/assets/images/thumbnails/swim-mini-cart.png"
                    alt="image"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <h3 className="line-clamp-2 h-[42px] text-sm font-semibold leading-[21px]">
                    Home Family Theater Best Lights Installation
                  </h3>
                  <div className="flex items-center gap-[6px]">
                    <div className="flex items-center gap-1">
                      <img
                        src="/assets/images/icons/coint.svg"
                        alt="icon"
                        className="h-4 w-4 shrink-0"
                      />
                      <p className="text-xs leading-[18px] text-shujia-gray">
                        Rp 8.489.391
                      </p>
                    </div>
                    <div className="flex items-center gap-1">
                      <img
                        src="/assets/images/icons/clock-cart.svg"
                        alt="icon"
                        className="h-4 w-4 shrink-0"
                      />
                      <p className="text-xs leading-[18px] text-shujia-gray">
                        15 Hours
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <button type="button" className="shrink-0">
                <img
                  src="/assets/images/icons/garbage.svg"
                  alt="icon"
                  className="size-[32px] shrink-0"
                />
              </button>
            </div>
            <hr className="border-shujia-graylight" />
            <div className="card flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-[90px] w-[80px] shrink-0 items-center justify-center overflow-hidden rounded-3xl">
                  <img
                    src="/assets/images/thumbnails/write-mini-cart.png"
                    alt="image"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <h3 className="line-clamp-2 h-[42px] text-sm font-semibold leading-[21px]">
                    Home Family Theater Best Lights Installation
                  </h3>
                  <div className="flex items-center gap-[6px]">
                    <div className="flex items-center gap-1">
                      <img
                        src="/assets/images/icons/coint.svg"
                        alt="icon"
                        className="h-4 w-4 shrink-0"
                      />
                      <p className="text-xs leading-[18px] text-shujia-gray">
                        Rp 8.489.391
                      </p>
                    </div>
                    <div className="flex items-center gap-1">
                      <img
                        src="/assets/images/icons/clock-cart.svg"
                        alt="icon"
                        className="h-4 w-4 shrink-0"
                      />
                      <p className="text-xs leading-[18px] text-shujia-gray">
                        15 Hours
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <button type="button" className="shrink-0">
                <img
                  src="/assets/images/icons/garbage.svg"
                  alt="icon"
                  className="size-[32px] shrink-0"
                />
              </button>
            </div>
          </div>
        </section>
        <section
          id="BookingDetails"
          className="flex flex-col gap-4 rounded-3xl border border-shujia-graylight bg-white px-[14px] py-[14px]"
        >
          <div className="flex items-center justify-between">
            <h2 className="font-semibold">Booking Details</h2>
            <button type="button" data-expand="BookingDetailsJ">
              <img
                src="/assets/images/icons/bottom-booking-form.svg"
                alt="icon"
                className="h-[32px] w-[32px] shrink-0 transition-all duration-300"
              />
            </button>
          </div>
          <div className="flex flex-col gap-4" id="BookingDetailsJ">
            <div className="flex justify-between">
              <div className="flex items-center gap-[10px]">
                <img
                  src="/assets/images/icons/note-payment.svg"
                  alt="icon"
                  className="h-[24px] w-[24px] shrink-0"
                />
                <p className="text-shujia-gray">Sub Total</p>
              </div>
              <strong className="font-semibold">Rp 180.394.392</strong>
            </div>
            <hr className="border-shujia-graylight" />
            <div className="flex justify-between">
              <div className="flex items-center gap-[10px]">
                <img
                  src="/assets/images/icons/note-payment.svg"
                  alt="icon"
                  className="h-[24px] w-[24px] shrink-0"
                />
                <p className="text-shujia-gray">Tax 11%</p>
              </div>
              <strong className="font-semibold">Rp 18.495.699</strong>
            </div>
            <hr className="border-shujia-graylight" />
            <div className="flex justify-between">
              <div className="flex items-center gap-[10px]">
                <img
                  src="/assets/images/icons/note-payment.svg"
                  alt="icon"
                  className="h-[24px] w-[24px] shrink-0"
                />
                <p className="text-shujia-gray">Insurance</p>
              </div>
              <strong className="font-semibold">Free for All</strong>
            </div>
            <hr className="border-shujia-graylight" />
            <div className="flex justify-between">
              <div className="flex items-center gap-[10px]">
                <img
                  src="/assets/images/icons/note-payment.svg"
                  alt="icon"
                  className="h-[24px] w-[24px] shrink-0"
                />
                <p className="text-shujia-gray">Service Tools</p>
              </div>
              <strong className="font-semibold">Free for All</strong>
            </div>
          </div>
        </section>
        <section id="Adverticement">
          <a href="#">
            <img
              src="/assets/images/backgrounds/adverticement.png"
              alt="icon"
            />
          </a>
        </section>
      </div>
      <nav className="fixed bottom-5 left-0 right-0 z-30 mx-auto w-full">
        <div className="mx-auto max-w-[640px] px-5">
          <div className="flex items-center gap-[45px] rounded-[24px] bg-shujia-black px-[20px] py-[14px]">
            <div>
              <strong className="whitespace-nowrap text-[22px] font-extrabold leading-[33px] text-white">
                Rp 8.394.391
              </strong>
              <p className="text-sm leading-[21px] text-white">Grand Total</p>
            </div>
            <a href="booking-form.html" className="w-full">
              <p className="w-full rounded-full bg-shujia-orange px-[18px] py-[14px] text-center font-semibold text-white transition-all duration-300 hover:shadow-[0px_4px_10px_0px_#D04B1E80]">
                Continue
              </p>
            </a>
          </div>
        </div>
      </nav>
    </main>
  );
}
