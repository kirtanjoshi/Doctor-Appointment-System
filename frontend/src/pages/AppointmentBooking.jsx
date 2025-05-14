import { useState, useEffect, Fragment } from "react";
import { useParams } from "react-router-dom";
import { Dialog, Transition } from "@headlessui/react";
import {
  CalendarDaysIcon,
  ClockIcon,
  CreditCardIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  UserIcon,
} from "@heroicons/react/24/outline";

import { useContext } from "react";
import { AuthContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const AppointmentBooking = () => {
  const { id } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [visitType, setVisitType] = useState("New Patient Visit");
  const [visitReason, setVisitReason] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date()); // ✅ Dynamic current month

  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const res = await fetch(`http://localhost:4000/api/doctors/${id}`);
        const data = await res.json();
        setDoctor(data);
      } catch (err) {
        console.error("Error loading doctor details:", err);
      }
    };
    fetchDoctor();
  }, [id]);

  const bookAppointment = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.warn("No token found. Cannot book appointment.");
      return;
    }

    console.log(token);
    console.log(doctor._id);
    console.log(user._id);
    console.log(selectedDate);
    console.log(selectedTime);
    console.log(visitType);
    console.log(visitReason);

    try {
      const response = await fetch(
        "http://localhost:4000/api/appointments/book",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            doctorId: doctor._id,
            appointmentDate: selectedDate.toISOString(),
            appointmentTime: selectedTime,
            visitType,
            visitReason,
          }),
        }
      );
      console.log(response);

      const data = await response.json();

      if (!response.ok) {
        console.error("Booking failed:", data.message || response.statusText);
        return;
      }
      setIsModalOpen(true);
      console.log("Appointment booked successfully:", data);
      navigate("patient/dashboard");
    } catch (err) {
      console.error("Error booking appointment:", err);
    }
  };

  const handleConfirmBooking = () => {
    bookAppointment();
  };

  const generateCalendarDays = () => {
    const days = [];
    const startDate = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      1
    );
    const daysInMonth = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth() + 1,
      0
    ).getDate();
    const firstDayOfMonth = startDate.getDay();

    for (let i = 0; i < firstDayOfMonth; i++) days.push(null);
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(
        new Date(currentMonth.getFullYear(), currentMonth.getMonth(), i)
      );
    }
    return days;
  };

  const handlePrevMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1)
    );
  };

  const handleNextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1)
    );
  };

  const selectedDay = selectedDate?.toLocaleDateString("en-US", {
    weekday: "long",
  });
  const availableSlots = doctor?.availability?.find(
    (avail) => avail.day === selectedDay
  );
  const timeSlots = availableSlots ? availableSlots.timeSlot.flat() : [];

  if (!doctor) return <p className="text-center text-gray-600">Loading...</p>;

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto bg-gray-50 min-h-screen">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-gray-800">
        Book an Appointment
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Calendar, Time Selection, and Visit Details */}
        <div className="lg:col-span-2 space-y-4 sm:space-y-6">
          {/* Date and Time Selection */}
          <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm">
            <h2 className="text-base sm:text-lg font-semibold mb-4 text-gray-700">
              Select Date & Time
            </h2>
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center">
                <button onClick={handlePrevMonth} className="p-1">
                  <ChevronLeftIcon className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
                </button>
                <span className="mx-2 text-xs sm:text-sm font-medium text-gray-700">
                  {currentMonth.toLocaleString("en-US", {
                    month: "long",
                    year: "numeric",
                  })}
                </span>
                <button onClick={handleNextMonth} className="p-1">
                  <ChevronRightIcon className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
                </button>
              </div>
            </div>
            <div className="grid grid-cols-7 gap-1 sm:gap-2 mb-4 sm:mb-6">
              {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
                <div
                  key={day}
                  className="ml-2 text-[10px] sm:text-xs font-medium text-gray-500"
                >
                  {day}
                </div>
              ))}
              {generateCalendarDays().map((date, index) => {
                const isSelected =
                  selectedDate &&
                  selectedDate.getFullYear() === date?.getFullYear() &&
                  selectedDate.getMonth() === date?.getMonth() &&
                  selectedDate.getDate() === date?.getDate();

                const today = new Date();
                const isToday =
                  date &&
                  date.getFullYear() === today.getFullYear() &&
                  date.getMonth() === today.getMonth() &&
                  date.getDate() === today.getDate();

                const isPast =
                  date &&
                  date.setHours(0, 0, 0, 0) < today.setHours(0, 0, 0, 0);

                return (
                  <button
                    key={index}
                    onClick={() => {
                      if (date && !isPast) {
                        setSelectedDate(date);
                        setSelectedTime(null);
                      }
                    }}
                    disabled={!date || isPast}
                    className={`w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center text-xs sm:text-sm font-medium rounded-full transition-colors ${
                      !date || isPast
                        ? "text-gray-300 cursor-not-allowed"
                        : isSelected
                        ? "bg-teal-500 text-white"
                        : isToday
                        ? "bg-teal-100 text-teal-600"
                        : "hover:bg-teal-100 text-gray-700"
                    }`}
                  >
                    {date ? date.getDate() : ""}
                  </button>
                );
              })}
            </div>
            <h3 className="text-sm sm:text-sm font-semibold mb-2 text-gray-700">
              Select Time
            </h3>
            <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-2">
              {selectedDate ? (
                timeSlots.length > 0 ? (
                  timeSlots.map((time, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedTime(time)}
                      className={`p-1 sm:p-2 rounded-full border text-center text-xs sm:text-sm transition-colors ${
                        selectedTime === time
                          ? "bg-teal-500 text-white border-teal-500"
                          : "border-gray-200 hover:bg-teal-100 text-gray-700"
                      }`}
                    >
                      {time}
                    </button>
                  ))
                ) : (
                  <p className="col-span-3 sm:col-span-4 lg:col-span-5 text-xs sm:text-sm text-red-500">
                    No time slots available on {selectedDay}
                  </p>
                )
              ) : (
                <p className="col-span-3 sm:col-span-4 lg:col-span-5 text-xs sm:text-sm text-gray-500">
                  Please select a date to view available time slots.
                </p>
              )}
            </div>
          </div>

          {/* Visit Details Section */}
          <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm">
            <h2 className="text-base sm:text-lg font-semibold mb-4 text-gray-700 flex items-center">
              <UserIcon className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-teal-500" />
              Visit Details
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                  Visit Type
                </label>
                <select
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-xs sm:text-sm"
                  value={visitType}
                  onChange={(e) => setVisitType(e.target.value)}
                >
                  <option>New Patient Visit</option>
                  <option>Follow-up Visit</option>
                  <option>Consultation</option>
                </select>
              </div>
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                  Reason for Visit
                </label>
                <textarea
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-xs sm:text-sm"
                  rows="3"
                  placeholder="Please describe your symptoms or reason for visit"
                  value={visitReason}
                  onChange={(e) => setVisitReason(e.target.value)}
                ></textarea>
              </div>
            </div>
          </div>
        </div>

        {/* Doctor Info and Summary */}
        <div className="space-y-4 sm:space-y-6">
          <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm">
            <h2 className="text-base sm:text-lg font-semibold mb-4 text-gray-700">
              Doctor Information
            </h2>
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-teal-100 rounded-full flex items-center justify-center">
                <span className="text-teal-600 text-xs sm:text-sm font-bold">
                  DSJ
                </span>
              </div>
              <div className="ml-3 sm:ml-4">
                <h3 className="text-base sm:text-lg font-semibold text-gray-800">
                  {doctor.fullName}
                </h3>
                <p className="text-teal-600 text-xs sm:text-sm">
                  {doctor.specialization}, MD, FACC
                </p>
                <p className="text-xs sm:text-sm text-gray-600">
                  {doctor.experience} years experience
                </p>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-gray-600">
              Specializing in cardiovascular health with a focus on preventative
              care and heart disease management.
            </p>
          </div>

          <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm">
            <h2 className="text-base sm:text-lg font-semibold mb-4 text-gray-700">
              Appointment Summary
            </h2>
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-center">
                <CalendarDaysIcon className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 mr-2 sm:mr-3" />
                <div>
                  <p className="text-xs sm:text-sm text-gray-600">Date</p>
                  <p className="font-medium text-gray-800 text-xs sm:text-sm">
                    {selectedDate
                      ? selectedDate.toLocaleDateString("en-US", {
                          weekday: "long",
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })
                      : "Not selected"}
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <ClockIcon className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 mr-2 sm:mr-3" />
                <div>
                  <p className="text-xs sm:text-sm text-gray-600">Time</p>
                  <p className="font-medium text-gray-800 text-xs sm:text-sm">
                    {selectedTime || "Not selected"}
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <CreditCardIcon className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 mr-2 sm:mr-3" />
                <div>
                  <p className="text-xs sm:text-sm text-gray-600">Visit Type</p>
                  <p className="font-medium text-gray-800 text-xs sm:text-sm">
                    {visitType}
                  </p>
                </div>
              </div>
            </div>
            <button
              onClick={handleConfirmBooking}
              disabled={!selectedDate || !selectedTime}
              className="w-full mt-4 sm:mt-6 bg-teal-500 text-white py-2 rounded-lg hover:bg-teal-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
            >
              Confirm Appointment
            </button>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      <Transition appear show={isModalOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => setIsModalOpen(false)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-4 sm:p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-base sm:text-lg font-medium leading-6 text-gray-900 text-center"
                  >
                    Appointment Confirmed!
                  </Dialog.Title>
                  <div className="mt-4">
                    <div className="bg-gray-50 rounded-lg p-3 sm:p-4 space-y-3">
                      <div>
                        <p className="text-xs sm:text-sm text-gray-500">
                          Doctor
                        </p>
                        <p className="font-medium text-gray-800 text-xs sm:text-sm">
                          {doctor.fullName}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs sm:text-sm text-gray-500">
                          Date & Time
                        </p>
                        <p className="font-medium text-gray-800 text-xs sm:text-sm">
                          {selectedDate?.toLocaleDateString("en-US", {
                            weekday: "long",
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })}{" "}
                          at {selectedTime}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs sm:text-sm text-gray-500">
                          Visit Type
                        </p>
                        <p className="font-medium text-gray-800 text-xs sm:text-sm">
                          {visitType}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs sm:text-sm text-gray-500">
                          Payment
                        </p>
                        <p className="font-medium text-gray-800 text-xs sm:text-sm">
                          Self Pay
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 sm:mt-6">
                    <button
                      type="button"
                      className="w-full inline-flex justify-center rounded-md border border-transparent bg-teal-500 px-4 py-2 text-xs sm:text-sm font-medium text-white hover:bg-teal-600"
                      onClick={() => setIsModalOpen(false)}
                    >
                      Done
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default AppointmentBooking;