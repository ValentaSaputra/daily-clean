import { useEffect, useState } from "react";
import type { BookingFormData } from "../types/type";
import type { z } from "zod";
import { useNavigate } from "react-router-dom";
import { bookingSchema } from "../types/validationBooking";

export default function BookingPage() {
  const [formData, setFormData] = useState<BookingFormData>({
    name: "",
    email: "",
    phone: "",
    started_time: "",
    schedule_at: "",
    post_code: "",
    address: "",
    city: "",
  });

  const [formErrors, setFormErrors] = useState<z.ZodIssue[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    const savedData = localStorage.getItem("bookingData");
    const cartData = localStorage.getItem("cart");
    if (!cartData || JSON.parse(cartData).length === 0) {
      navigate("/");
      return;
    }
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, [navigate]);

  const cities = ["Semarang", "Demak", "Ungaran"];

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    console.log(tomorrow);
    // YYYY-MM-DDTHH:MM:SS.sssZ
    const formattedDate = tomorrow.toISOString().split("T")[0]; //Format as YYYY-MM-DD

    setFormData((prev) => ({
      ...prev,
      schedule_at: formattedDate,
    }));
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const validataion = bookingSchema.safeParse(formData);

    if (!validataion.success) {
      setFormErrors(validataion.error.issues);
      return;
    }

    localStorage.setItem("bookingData", JSON.stringify(formData));
    alert("Booking information saved");

    navigate("/payment");

    setFormErrors([]);
  };

  return (
    <main className="relative min-h-screen mx-auto w-full max-w-[640px] bg-[#F4F5F7]">
      <div id="Background" className="absolute left-0 right-0 top-0">
        <img
          src="/assets/images/backgrounds/orange.png"
          alt="image"
          className="h-[350px] w-full object-cover object-bottom"
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
            <a
              id="BackA"
              href="my-cart.html"
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
            </a>
            <h2
              id="Title"
              className="font-semibold text-white transition-all duration-300"
            >
              Booking Services
            </h2>
          </div>
        </div>
      </section>
      <section id="ProgressBar" className="relative px-5 pt-[92px]">
        <div className="flex">
          <div className="flex flex-col items-center">
            <div className="relative z-10 flex h-[25px] items-center">
              <div className="h-2 w-[60px] rounded-full bg-white" />
              <div className="absolute right-0 top-0 translate-x-1/2">
                <div className="flex flex-col items-center gap-[6px]">
                  <div className="flex h-[25px] w-[25px] items-center justify-center rounded-full bg-white text-xs font-bold leading-[18px]">
                    1
                  </div>
                  <p className="text-xs font-semibold leading-[18px] text-white">
                    Booking
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="relative flex h-[25px] w-full items-center">
            <div className="h-2 w-full rounded-full bg-[#E68B6D]" />
            <div className="absolute right-1/2 top-0 translate-x-1/2">
              <div className="flex flex-col items-center gap-[6px]">
                <div className="flex h-[25px] w-[25px] items-center justify-center rounded-full bg-[#FFBFA9] text-xs font-bold leading-[18px] text-[#C2836D]">
                  2
                </div>
                <p className="text-xs font-semibold leading-[18px] text-[#FFBFA9]">
                  Payment
                </p>
              </div>
            </div>
          </div>
          <div className="relative z-10 flex h-[25px] w-[60px] items-center">
            <div className="h-2 w-[60px] rounded-full bg-[#E68B6D]" />
            <div className="absolute left-0 top-0 -translate-x-1/2">
              <div className="flex flex-col items-center gap-[6px]">
                <div className="flex h-[25px] w-[25px] items-center justify-center rounded-full bg-[#FFBFA9] text-xs font-bold leading-[18px] text-[#C2836D]">
                  3
                </div>
                <p className="text-xs font-semibold leading-[18px] text-[#FFBFA9]">
                  Delivery
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="relative mt-[44px] flex flex-col px-5 pb-5">
        <form onSubmit={handleSubmit}>
          <header className="flex flex-col gap-[2px]">
            <h1 className="text-[26px] font-extrabold leading-[39px] text-white">
              Start Booking
            </h1>
            <p className="text-white">Lorem dolor si amet data asli</p>
          </header>
          <div className="mt-[20px] flex flex-col gap-5">
            <section
              id="WorkingSchedule"
              className="flex flex-col gap-4 rounded-3xl border border-shujia-graylight bg-white px-[14px] py-[14px]"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Working Schedule</h3>
                <button type="button" data-expand="WorkingScheduleJ">
                  <img
                    src="/assets/images/icons/bottom-booking-form.svg"
                    alt="icon"
                    className="h-[32px] w-[32px] shrink-0 transition-all duration-300"
                  />
                </button>
              </div>
              <div id="WorkingScheduleJ" className="flex flex-col gap-4">
                <label className="flex flex-col gap-2">
                  <h4 className="font-semibold">Date</h4>
                  <div className="relative h-[52px] w-full overflow-hidden rounded-full border border-shujia-graylight">
                    <img
                      src="/assets/images/icons/date-booking-form.svg"
                      alt="icon"
                      className="absolute left-[14px] top-[14px] h-6 w-6 shrink-0"
                    />
                    <input
                      value={formData.schedule_at}
                      name="schedule_at"
                      onChange={handleChange}
                      required
                      className="h-full w-full rounded-full bg-[#F4F5F7] pl-[50px] font-semibold focus:outline-none"
                      readOnly
                      type="text"
                    />
                  </div>
                </label>
                <label className="flex flex-col gap-2">
                  <h4 className="font-semibold">Start Time At</h4>
                  <div className="relative h-[52px] w-full overflow-hidden rounded-full border border-shujia-graylight transition-all duration-300 focus-within:border-shujia-orange">
                    <img
                      src="/assets/images/icons/clock-booking-form.svg"
                      alt="icon"
                      className="absolute left-[14px] top-[14px] h-6 w-6 shrink-0"
                    />
                    <select
                      value={formData.started_time}
                      onChange={handleChange}
                      name="started_time"
                      id=""
                      className="h-full w-full appearance-none rounded-full bg-transparent relative z-10 pl-[50px] font-semibold focus:outline-none"
                    >
                      <option value="">Enter the time</option>
                      <option value="08:00">08:00</option>
                      <option value="10:00">10:00</option>
                      <option value="12:00">12:00</option>
                      <option value="14:00">14:00</option>
                      <option value="16:00">16:00</option>
                    </select>
                    {formErrors.find((error) =>
                      error.path.includes("started_time")
                    ) && (
                      <p className="text-red-500 text-sm">
                        {
                          formErrors.find((error) =>
                            error.path.includes("started_time")
                          )?.message
                        }
                      </p>
                    )}
                  </div>
                </label>
              </div>
            </section>
            <section
              id="PersonalInformations"
              className="flex flex-col gap-4 rounded-3xl border border-shujia-graylight bg-white px-[14px] py-[14px]"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Personal Informations</h3>
                <button type="button" data-expand="PersonalInformationsJ">
                  <img
                    src="/assets/images/icons/bottom-booking-form.svg"
                    alt="icon"
                    className="h-[32px] w-[32px] shrink-0 transition-all duration-300"
                  />
                </button>
              </div>
              <div className="flex flex-col gap-4" id="PersonalInformationsJ">
                <label className="flex flex-col gap-2">
                  <h4 className="font-semibold">Full Name</h4>
                  <div className="relative h-[52px] w-full overflow-hidden rounded-full border border-shujia-graylight transition-all duration-300 focus-within:border-shujia-orange">
                    <img
                      src="/assets/images/icons/profil-booking-form.svg"
                      alt="icon"
                      className="absolute left-[14px] top-[14px] h-6 w-6 shrink-0"
                    />
                    <input
                      required
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="h-full w-full rounded-full pl-[50px] font-semibold leading-6 placeholder:text-[16px] placeholder:font-normal placeholder:text-shujia-gray focus:outline-none"
                      placeholder="Write your complete name"
                      type="text"
                    />
                    {formErrors.find((error) =>
                      error.path.includes("name")
                    ) && (
                      <p className="text-red-500 text-sm">
                        {
                          formErrors.find((error) =>
                            error.path.includes("name")
                          )?.message
                        }
                      </p>
                    )}
                  </div>
                </label>
                <label className="flex flex-col gap-2">
                  <h4 className="font-semibold">Email Address</h4>
                  <div className="relative h-[52px] w-full overflow-hidden rounded-full border border-shujia-graylight transition-all duration-300 focus-within:border-shujia-orange">
                    <img
                      src="/assets/images/icons/amplop-booking-form.svg"
                      alt="icon"
                      className="absolute left-[14px] top-[14px] h-6 w-6 shrink-0"
                    />
                    <input
                      required
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="h-full w-full rounded-full pl-[50px] font-semibold leading-6 placeholder:text-[16px] placeholder:font-normal placeholder:text-shujia-gray focus:outline-none"
                      placeholder="Write your email"
                      type="email"
                    />
                    {formErrors.find((error) =>
                      error.path.includes("email")
                    ) && (
                      <p className="text-red-500 text-sm">
                        {
                          formErrors.find((error) =>
                            error.path.includes("email")
                          )?.message
                        }
                      </p>
                    )}
                  </div>
                </label>
                <label className="flex flex-col gap-2">
                  <h4 className="font-semibold">No. Phone</h4>
                  <div className="relative h-[52px] w-full overflow-hidden rounded-full border border-shujia-graylight transition-all duration-300 focus-within:border-shujia-orange">
                    <img
                      src="/assets/images/icons/telepon-booking-form.svg"
                      alt="icon"
                      className="absolute left-[14px] top-[14px] h-6 w-6 shrink-0"
                    />
                    <input
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      type="tel"
                      required
                      className="h-full w-full rounded-full pl-[50px] font-semibold leading-6 placeholder:text-[16px] placeholder:font-normal placeholder:text-shujia-gray focus:outline-none"
                      placeholder="Write your active number"
                    />
                    {formErrors.find((error) =>
                      error.path.includes("phone")
                    ) && (
                      <p className="text-red-500 text-sm">
                        {
                          formErrors.find((error) =>
                            error.path.includes("phone")
                          )?.message
                        }
                      </p>
                    )}
                  </div>
                </label>
              </div>
            </section>
            <section
              id="YourHomeAddress"
              className="flex flex-col gap-4 rounded-3xl border border-shujia-graylight bg-white px-[14px] py-[14px]"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Your Home Address</h3>
                {formErrors.find((error) => error.path.includes("address")) && (
                  <p className="text-red-500 text-sm">
                    {
                      formErrors.find((error) => error.path.includes("address"))
                        ?.message
                    }
                  </p>
                )}
                <button type="button" data-expand="YourHomeAddressJ">
                  <img
                    src="/assets/images/icons/bottom-booking-form.svg"
                    alt="icon"
                    className="h-[32px] w-[32px] shrink-0 transition-all duration-300"
                  />
                </button>
              </div>
              <div id="YourHomeAddressJ" className="flex flex-col gap-4">
                <label className="flex flex-col gap-2">
                  <h4 className="font-semibold">Address</h4>
                  <div className="relative h-[110px] w-full overflow-hidden rounded-[22px] border border-shujia-graylight transition-all duration-300 focus-within:border-shujia-orange">
                    <textarea
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="Enter your complete address"
                      required
                      className="h-full w-full pl-[50px] pr-[14px] pt-[14px] font-semibold leading-7 placeholder:text-[16px] placeholder:font-normal placeholder:text-shujia-gray focus:outline-none"
                      name="address"
                      id=""
                    />
                    <img
                      src="/assets/images/icons/school-booking-form.svg"
                      alt="icon"
                      className="absolute left-[14px] top-[14px] h-6 w-6 shrink-0"
                    />
                  </div>
                </label>
                <label className="flex flex-col gap-2">
                  <h4 className="font-semibold">City</h4>
                  {formErrors.find((error) => error.path.includes("city")) && (
                    <p className="text-red-500 text-sm">
                      {
                        formErrors.find((error) => error.path.includes("city"))
                          ?.message
                      }
                    </p>
                  )}
                  <div className="relative h-[52px] w-full overflow-hidden rounded-full border border-shujia-graylight transition-all duration-300 focus-within:border-shujia-orange">
                    <img
                      src="/assets/images/icons/location-booking-form.svg"
                      alt="icon"
                      className="absolute left-[14px] top-[14px] h-6 w-6 shrink-0"
                    />
                    <select
                      value={formData.city}
                      onChange={handleChange}
                      name="city"
                      id=""
                      className="h-full w-full appearance-none rounded-full bg-transparent relative z-10 pl-[50px] font-semibold focus:outline-none"
                    >
                      <option value="Null">Enter the city name</option>
                      {cities.map((city) => (
                        <option key={city} value={city}>
                          {city}
                        </option>
                      ))}
                    </select>
                    <img
                      src="/assets/images/icons/bottom-select.svg"
                      alt="icon"
                      className="absolute right-[14px] top-1/2 h-6 w-6 shrink-0 -translate-y-1/2"
                    />
                  </div>
                </label>
                <label className="flex flex-col gap-2">
                  <h4 className="font-semibold">Post Code</h4>
                  <div className="relative h-[52px] w-full overflow-hidden rounded-full border border-shujia-graylight transition-all duration-300 focus-within:border-shujia-orange">
                    <img
                      src="/assets/images/icons/ball-booking-form.svg"
                      alt="icon"
                      className="absolute left-[14px] top-[14px] h-6 w-6 shrink-0"
                    />
                    <input
                      name="post_code"
                      value={formData.post_code}
                      onChange={handleChange}
                      required
                      className="post-code h-full w-full rounded-full pl-[50px] font-semibold leading-6 placeholder:text-[16px] placeholder:font-normal placeholder:text-shujia-gray focus:outline-none"
                      placeholder="What’s your postal code"
                      type="tel"
                    />
                    {formErrors.find((error) =>
                      error.path.includes("post_code")
                    ) && (
                      <p className="text-red-500 text-sm">
                        {
                          formErrors.find((error) =>
                            error.path.includes("post_code")
                          )?.message
                        }
                      </p>
                    )}
                  </div>
                </label>
              </div>
            </section>
          </div>
          <button
            type="submit"
            className="mt-[44px] w-full rounded-full bg-shujia-orange py-[14px] font-semibold text-white transition-all duration-300 hover:shadow-[0px_4px_10px_0px_#D04B1E80]"
          >
            Continue to Payment
          </button>
        </form>
      </div>
    </main>
  );
}
