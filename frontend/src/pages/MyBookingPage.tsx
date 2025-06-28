import { useState } from "react";
import type { z } from "zod";
import type { BookingDetails } from "../types/type";
import { viewBookingSchema } from "../types/validationBooking";
import apiClinet from "../services/apiServices";
import { isAxiosError } from "axios";
import { Link } from "react-router-dom";
import AccordionSection from "../components/AccordionSection";

export default function MyBookingPage() {
  const [formData, setFormData] = useState({
    email: "",
    booking_trx_id: "",
  });

  const [formErrors, setFormErrors] = useState<z.ZodIssue[]>([]);
  const [loading, setLoading] = useState(false);
  const [bookingDetails, setBookingDetails] = useState<BookingDetails | null>(
    null
  );

  const [notFound, setNotFound] = useState(false);

  //   handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // handle form submission and validation
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // validate form data using zod
    const validation = viewBookingSchema.safeParse(formData);
    if (!validation.success) {
      setFormErrors(validation.error.issues);
      return;
    }

    // clear any exitiong errors
    setFormErrors([]);
    setLoading(true);
    setNotFound(false);

    try {
      // send request to check booking
      const response = await apiClinet.post("/check-booking", formData);

      if (response.status === 200 && response.data.data) {
        // assuming response contains booking details under 'response.data.data'
        setBookingDetails(response.data.data);
      } else {
        setNotFound(true);
        setBookingDetails(null);
      }
    } catch (err) {
      if (isAxiosError(err)) {
        if (err.response && err.response.status === 404) {
          // handle booking not found
          setNotFound(true);
          setBookingDetails(null);
        }
      }
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(value);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  const BASE_URL = import.meta.env.VITE_REACT_API_STORAGE_URL;

  return (
    <main className="relative mx-auto min-h-screen w-full max-w-[640px] bg-[#F4F5F7] px-5 pb-[138px] pt-[50px]">
      <div id="Background" className="absolute left-0 right-0 top-0">
        <img
          src="/assets/images/backgrounds/orange.png"
          alt="image"
          className="h-[280px] w-full object-cover object-bottom"
        />
      </div>
      <div className="relative flex flex-col gap-5">
        <header className="flex flex-col items-center gap-[10px]">
          <img
            src="/assets/images/icons/list-form-check.svg"
            alt="icon"
            className="size-[70px] shrink-0"
          />
          <h1 className="text-[26px] font-extrabold leading-[39px] text-white">
            Check My Booking
          </h1>
        </header>
        <form onSubmit={handleSubmit}>
          <section className="flex flex-col gap-4 rounded-3xl border border-shujia-graylight bg-white px-[14px] py-[14px]">
            <label className="flex flex-col gap-2">
              <h4 className="font-semibold">Booking TRX ID</h4>
              {formErrors.find((error) =>
                error.path.includes("booking_trx_id")
              ) && (
                <p>
                  {
                    formErrors.find((error) =>
                      error.path.includes("booking_trx_id")
                    )?.message
                  }
                </p>
              )}
              <div className="relative h-[52px] w-full overflow-hidden rounded-full border border-shujia-graylight focus-within:border-shujia-orange">
                <img
                  src="/assets/images/icons/note-id-finished.svg"
                  alt="icon"
                  className="absolute left-[14px] top-[14px] h-6 w-6 shrink-0"
                />
                <input
                  name="booking_trx_id"
                  required
                  onChange={handleChange}
                  value={formData.booking_trx_id}
                  id="bookingTrxId"
                  placeholder="Your Booking TRX ID"
                  className="h-full w-full rounded-full bg-transparent pl-[50px] font-semibold leading-6 placeholder:text-base placeholder:font-normal focus:outline-none"
                  type="text"
                />
              </div>
            </label>
            <label className="flex flex-col gap-2">
              <h4 className="font-semibold">Email Address</h4>
              {formErrors.find((error) => error.path.includes("email")) && (
                <p>
                  {
                    formErrors.find((error) => error.path.includes("email"))
                      ?.message
                  }
                </p>
              )}
              <div className="relative h-[52px] w-full overflow-hidden rounded-full border border-shujia-graylight focus-within:border-shujia-orange">
                <img
                  src="/assets/images/icons/amplop-booking-form.svg"
                  alt="icon"
                  className="absolute left-[14px] top-[14px] h-6 w-6 shrink-0"
                />
                <input
                  name="email"
                  required
                  onChange={handleChange}
                  value={formData.email}
                  id="emailAddress"
                  placeholder="Write your email"
                  className="h-full w-full rounded-full bg-transparent pl-[50px] font-semibold leading-6 placeholder:text-base placeholder:font-normal focus:outline-none"
                  type="email"
                />
              </div>
            </label>
            <button
              type="submit"
              className="w-full rounded-full bg-shujia-orange py-[14px] text-center font-semibold text-white hover:shadow-[0px_4px_10px_0px_#D04B1E80]"
            >
              Find My Booking
            </button>
          </section>
        </form>

        {notFound && (
          <section
            id="NotFound"
            className="flex flex-col items-center gap-4 rounded-3xl border border-shujia-graylight bg-white px-[14px] py-[14px]"
          >
            <img
              src="/assets/images/icons/list-form-check-black.svg"
              alt="icon"
              className="size-[50px] shrink-0"
            />
            <strong className="font-bold">Oops! Not Found</strong>
            <p className="text-center leading-7">
              Kami tidak dapat menemukan pesanan anda silahkan diperiksa kembali
            </p>
          </section>
        )}

        {bookingDetails && !notFound && (
          <div id="ResultBooking" className=" space-y-[20px]">
            <AccordionSection
              title="Booking Status"
              iconSrc="/assets/images/icons/bottom-booking-form.svg"
            >
              <div className="relative w-full pb-10">
                <div className="flex items-center w-full">
                  {/* STEP 1 */}
                  <div className="flex flex-col items-center min-w-[60px]">
                    <div
                      className={`flex h-[25px] w-[25px] items-center justify-center rounded-full font-bold text-xs leading-[18px]
          ${"bg-[#0CA024] text-white border-2 border-[#0CA024]"}`}
                    >
                      1
                    </div>
                    <p className="text-center text-xs mt-2 font-semibold leading-[18px] text-[#0CA024]">
                      Booking
                      <br />
                      Created
                    </p>
                  </div>
                  {/* LINE TO STEP 2 */}
                  <div className="flex-1 h-2 mx-2 relative min-w-[40px]">
                    <div className="absolute top-0 left-0 w-full h-2 rounded-full bg-[#F4F5F7]" />
                    <div
                      className="absolute top-0 left-0 h-2 rounded-full transition-all duration-300"
                      style={{
                        width: "100%",
                        background: "#0CA024",
                      }}
                    />
                  </div>
                  {/* STEP 2 */}
                  <div className="flex flex-col items-center min-w-[60px]">
                    <div
                      className={`flex h-[25px] w-[25px] items-center justify-center rounded-full font-bold text-xs leading-[18px] 
          ${
            bookingDetails.is_paid
              ? "bg-[#0CA024] text-white border-2 border-[#0CA024]"
              : "bg-[#F4F5F7] text-gray-400 border-2 border-[#0CA024]"
          }`}
                    >
                      2
                    </div>
                    <p
                      className={`text-center text-xs mt-2 font-semibold leading-[18px] ${
                        bookingDetails.is_paid
                          ? "text-[#0CA024]"
                          : "text-gray-400"
                      }`}
                    >
                      Verifying
                      <br />
                      Payment
                    </p>
                  </div>
                  {/* LINE TO STEP 3 */}
                  <div className="flex-1 h-2 mx-2 relative min-w-[40px]">
                    <div className="absolute top-0 left-0 w-full h-2 rounded-full bg-[#F4F5F7]" />
                    <div
                      className="absolute top-0 left-0 h-2 rounded-full transition-all duration-300"
                      style={{
                        width: bookingDetails.is_paid ? "100%" : "0%",
                        background: bookingDetails.is_paid
                          ? "#0CA024"
                          : "#F4F5F7",
                      }}
                    />
                  </div>
                  {/* STEP 3 */}
                  <div className="flex flex-col items-center min-w-[60px]">
                    <div
                      className={`flex h-[25px] w-[25px] items-center justify-center rounded-full font-bold text-xs leading-[18px] 
          ${
            bookingDetails.is_paid
              ? "bg-[#0CA024] text-white border-2 border-[#0CA024]"
              : "bg-[#F4F5F7] text-gray-400 border-2 border-[#0CA024]"
          }`}
                    >
                      3
                    </div>
                    <p
                      className={`text-center text-xs mt-2 font-semibold leading-[18px] ${
                        bookingDetails.is_paid
                          ? "text-[#0CA024]"
                          : "text-gray-400"
                      }`}
                    >
                      Start
                      <br />
                      Working
                    </p>
                  </div>
                </div>
              </div>
            </AccordionSection>

            <AccordionSection
              title="Working Schedule"
              iconSrc="/assets/images/icons/bottom-booking-form.svg"
            >
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
                      className="h-full w-full rounded-full bg-[#F4F5F7] pl-[50px] font-semibold focus:outline-none"
                      readOnly
                      type="text"
                      defaultValue={bookingDetails.schedule_at}
                    />
                  </div>
                </label>
                <label className="flex flex-col gap-2">
                  <h4 className="font-semibold">Start Time At</h4>
                  <div className="relative h-[52px] w-full overflow-hidden rounded-full border border-shujia-graylight">
                    <img
                      src="/assets/images/icons/clock-booking-form.svg"
                      alt="icon"
                      className="absolute left-[14px] top-[14px] h-6 w-6 shrink-0"
                    />
                    <input
                      className="h-full w-full rounded-full bg-[#F4F5F7] pl-[50px] font-semibold focus:outline-none"
                      readOnly
                      type="text"
                      defaultValue={bookingDetails.started_time}
                    />
                  </div>
                </label>
              </div>
            </AccordionSection>

            <AccordionSection
              title="Services Ordered"
              iconSrc="/assets/images/icons/bottom-booking-form.svg"
            >
              <div className="flex flex-col gap-4" id="ServicesOrderedJ">
                {bookingDetails.transaction_details.map((detail, index) => (
                  <div key={detail.id} className="flex flex-col gap-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-[90px] w-[80px] shrink-0 items-center justify-center overflow-hidden rounded-3xl">
                        <img
                          src={`${BASE_URL}/${detail.home_service.thumbnail}`}
                          alt="image"
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <h3 className="line-clamp-2 h-[42px] text-sm font-semibold leading-[21px]">
                          {detail.home_service.name}
                        </h3>
                        <div className="flex items-center gap-[6px]">
                          <div className="flex items-center gap-1">
                            <img
                              src="/assets/images/icons/coint.svg"
                              alt="icon"
                              className="h-4 w-4 shrink-0"
                            />
                            <p className="text-xs leading-[18px] text-shujia-gray">
                              {formatCurrency(detail.price)}
                            </p>
                          </div>
                          <div className="flex items-center gap-1">
                            <img
                              src="/assets/images/icons/clock-cart.svg"
                              alt="icon"
                              className="h-4 w-4 shrink-0"
                            />
                            <p className="text-xs leading-[18px] text-shujia-gray">
                              {detail.home_service.duration} Hours
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    {index < bookingDetails.transaction_details.length - 1 && (
                      <hr className="border-shujia-graylight" />
                    )}
                  </div>
                ))}
              </div>
            </AccordionSection>

            <AccordionSection
              title="Booking Details"
              iconSrc="/assets/images/icons/bottom-booking-form.svg"
            >
              <div className="flex flex-col gap-4" id="BookingDetailsJ">
                <div className="flex justify-between">
                  <div className="flex items-center gap-[10px]">
                    <img
                      src="/assets/images/icons/note-payment.svg"
                      alt="icon"
                      className="h-[24px] w-[24px] shrink-0"
                    />
                    <p className="text-shujia-gray">Booking ID</p>
                  </div>
                  <strong className="font-semibold">
                    {bookingDetails.booking_trx_id}
                  </strong>
                </div>
                <hr className="border-shujia-graylight" />
                <div className="flex justify-between">
                  <div className="flex items-center gap-[10px]">
                    <img
                      src="/assets/images/icons/note-payment.svg"
                      alt="icon"
                      className="h-[24px] w-[24px] shrink-0"
                    />
                    <p className="text-shujia-gray">Sub Total</p>
                  </div>
                  <strong className="font-semibold">
                    {formatCurrency(bookingDetails.sub_total)}
                  </strong>
                </div>
                <hr className="border-shujia-graylight" />
                <div className="flex justify-between">
                  <div className="flex items-center gap-[10px]">
                    <img
                      src="/assets/images/icons/note-payment.svg"
                      alt="icon"
                      className="h-[24px] w-[24px] shrink-0"
                    />
                    <p className="text-shujia-gray">Tax 12%</p>
                  </div>
                  <strong className="font-semibold">
                    {" "}
                    {formatCurrency(bookingDetails.total_tax_amount)}
                  </strong>
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
                <hr className="border-shujia-graylight" />
                <div className="flex justify-between">
                  <div className="flex items-center gap-[10px]">
                    <img
                      src="/assets/images/icons/note-payment.svg"
                      alt="icon"
                      className="h-[24px] w-[24px] shrink-0"
                    />
                    <p className="text-shujia-gray">Grand Total</p>
                  </div>
                  <strong className="text-[20px] font-bold leading-[30px] text-shujia-orange">
                    {formatCurrency(bookingDetails.total_amount)}
                  </strong>
                </div>
                <hr className="border-shujia-graylight" />
                <div className="flex w-full items-center justify-center overflow-hidden rounded-3xl">
                  <img
                    src={`${BASE_URL}/${bookingDetails.proof}`}
                    alt="image"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            </AccordionSection>

            <AccordionSection
              title="Personal Informations"
              iconSrc="/assets/images/icons/bottom-booking-form.svg"
            >
              <div className="flex flex-col gap-4" id="PersonalInformationsJ">
                <label className="flex flex-col gap-2">
                  <h4 className="font-semibold">Full Name</h4>
                  <div className="relative h-[52px] w-full overflow-hidden rounded-full border border-shujia-graylight">
                    <img
                      src="/assets/images/icons/profil-booking-form.svg"
                      alt="icon"
                      className="absolute left-[14px] top-[14px] h-6 w-6 shrink-0"
                    />
                    <input
                      readOnly
                      value={bookingDetails.name}
                      className="h-full w-full rounded-full bg-[#F4F5F7] pl-[50px] font-semibold leading-6 focus:outline-none"
                      type="text"
                    />
                  </div>
                </label>
                <label className="flex flex-col gap-2">
                  <h4 className="font-semibold">Email Address</h4>
                  <div className="relative h-[52px] w-full overflow-hidden rounded-full border border-shujia-graylight">
                    <img
                      src="/assets/images/icons/amplop-booking-form.svg"
                      alt="icon"
                      className="absolute left-[14px] top-[14px] h-6 w-6 shrink-0"
                    />
                    <input
                      readOnly
                      value={bookingDetails.email}
                      className="h-full w-full rounded-full bg-[#F4F5F7] pl-[50px] font-semibold leading-6 focus:outline-none"
                      type="email"
                    />
                  </div>
                </label>
                <label className="flex flex-col gap-2">
                  <h4 className="font-semibold">No. Phone</h4>
                  <div className="relative h-[52px] w-full overflow-hidden rounded-full border border-shujia-graylight">
                    <img
                      src="/assets/images/icons/telepon-booking-form.svg"
                      alt="icon"
                      className="absolute left-[14px] top-[14px] h-6 w-6 shrink-0"
                    />
                    <input
                      readOnly
                      value={bookingDetails.phone}
                      className="h-full w-full rounded-full bg-[#F4F5F7] pl-[50px] font-semibold leading-6 focus:outline-none"
                      type="tel"
                    />
                  </div>
                </label>
              </div>
            </AccordionSection>

            <AccordionSection
              title="Your Home Address"
              iconSrc="/assets/images/icons/bottom-booking-form.svg"
            >
              <div id="YourHomeAddressJ" className="flex flex-col gap-4">
                <label className="flex flex-col gap-2">
                  <h4 className="font-semibold">Address</h4>
                  <div className="relative h-[110px] w-full overflow-hidden rounded-[22px] border border-shujia-graylight">
                    <textarea
                      readOnly
                      className="h-full w-full bg-[#F4F5F7] pl-[50px] pr-[14px] pt-[14px] font-semibold leading-7 focus:outline-none"
                      value={bookingDetails.address}
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
                  <div className="relative h-[52px] w-full overflow-hidden rounded-full border border-shujia-graylight bg-[#F4F5F7]">
                    <img
                      src="/assets/images/icons/location-booking-form.svg"
                      alt="icon"
                      className="absolute left-[14px] top-[14px] h-6 w-6 shrink-0"
                    />
                    <select className="pointer-events-none relative z-10 h-full w-full appearance-none rounded-full bg-transparent pl-[50px] font-semibold focus:outline-none">
                      <option value={bookingDetails.city}>
                        {bookingDetails.city}
                      </option>
                    </select>
                  </div>
                </label>
                <label className="flex flex-col gap-2">
                  <h4 className="font-semibold">Post Code</h4>
                  <div className="relative h-[52px] w-full overflow-hidden rounded-full border border-shujia-graylight">
                    <img
                      src="/assets/images/icons/ball-booking-form.svg"
                      alt="icon"
                      className="absolute left-[14px] top-[14px] h-6 w-6 shrink-0"
                    />
                    <input
                      readOnly
                      className="post-code h-full w-full rounded-full bg-[#F4F5F7] pl-[50px] font-semibold leading-6 focus:outline-none"
                      type="tel"
                      value={bookingDetails.post_code}
                    />
                  </div>
                </label>
              </div>
            </AccordionSection>
          </div>
        )}
      </div>
      <nav className="fixed bottom-5 left-0 right-0 z-30 mx-auto w-full">
        <div className="mx-auto max-w-[640px] px-5">
          <div className="rounded-[24px] bg-shujia-black px-[20px] py-[14px]">
            <ul className="flex items-center gap-[10.67px]">
              <li className="w-full">
                <Link to={`/my-booking`}>
                  <div className="flex items-center justify-center gap-2 rounded-full bg-shujia-orange px-[18px] py-[10px] hover:shadow-[0px_4px_10px_0px_#D04B1E80]">
                    <img
                      src="/assets/images/icons/list-form-check-white.svg"
                      alt="icon"
                      className="h-6 w-6 shrink-0"
                    />
                    <p className="text-sm font-semibold leading-[21px] text-white">
                      My Booking
                    </p>
                  </div>
                </Link>
              </li>
              <li className="shrink-0">
                <Link to={`/`}>
                  <div className="flex h-[44px] w-[44px] shrink-0 items-center justify-center rounded-full border border-shujia-graylight hover:border-shujia-orange">
                    <img
                      src="/assets/images/icons/note-form-check-black.svg"
                      alt="icon"
                      className="h-[22px] w-[22px] shrink-0"
                    />
                  </div>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </main>
  );
}
