import React, { useState } from "react";
import useFetch from "../../hooks/useFetch";
import axios from "axios";
import BoxData from "./BoxData";
import "./ShowData.css";
import WeeklyData from "./WeeklyData";

const ShowData = () => {
  const [selectDate, setSelectedDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [summaryData, setSummaryData] = useState(null);
  const [weeklysummaryData, setWeeklySummaryData] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [summaryType, setSummaryType] = useState("daily");
  const [isDisabled, setDisabled] = useState(true);
  const [date, setDates] = useState(null);

  const handlesingleDateChange = (event) => {
    setSelectedDate(event.target.value);
    if (event.target.value !== "") {
      setDisabled(false);
    }
  };
  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
    if (event.target.value !== "") {
      setDisabled(false);
    }
  };
  const handleEndDateChange = (event) => {
    console.log("end date");
    setEndDate(event.target.value);
  };

  const handleShowResults = async () => {
    try {
      setWeeklySummaryData(null);
      setLoading(true);
      setDisabled(true);
      const postData = { date: selectDate };
      const response = await axios.post(
        process.env.REACT_APP_GetdailySummary,
        postData
      );
      if (response.data.error) {
        setError(true);
      } else {
        setError(false);
      }
      setSummaryData(response.data.data);
    } catch (error) {
      setError(true);
      console.log(error);
      setSummaryData(error.response.data.data);
      setLoading(false);
    } finally {
      setDisabled(false);
      setLoading(false);
      setSelectedDate(""); // Clear the selectDate state
    }
  };

  function getSequentialDateStrings(startDate, endDate) {
    // console.log("inside function sequential date list");
    // console.log(startDate, "start date");
    // console.log(endDate, "end date");

    let dates = [];
    let currentDate = new Date(startDate);
    let currentEndDate = new Date(endDate);
    // console.log(currentDate.getTime(), "current date");

    while (currentDate <= currentEndDate) {
      dates.push(currentDate.toISOString());
      currentDate.setDate(currentDate.getDate() + 1);
      // console.log(currentDate, "updated current date");
    }

    // console.log("before returning the date array", dates);
    return dates;
  }

  const handleShowWeeklyResults = async () => {
    try {
      setSummaryData(null);
      // console.log("hi");
      setLoading(true);
      setDisabled(true);
      const postData = { startDate: startDate, endDate: endDate };
      let sequencialDates = getSequentialDateStrings(startDate, endDate);
      setDates(sequencialDates);
      // console.log(sequencialDates, "list");
      // console.log(postData, process.env.REACT_APP_GetWeeklySummary);
      const response = await axios.post(
        process.env.REACT_APP_GetWeeklySummary,
        postData
      );
      if (response.data.error) {
        setError(true);
      } else {
        setError(false);
      }
      // console.log(response.data.data);
      setWeeklySummaryData(response.data.data);
    } catch (error) {
      setError(true);
    } finally {
      setDisabled(false);
      setLoading(false);
      setSelectedDate("");
    }
  };

  // console.log(summaryData,"data")

  const handleSummary = (e) => {
    setSummaryType(e.target.value);
    setWeeklySummaryData(null);
    setSummaryData(null);
  };

  return (
    // <>
    //   <div className="w-full">
    //     <div className=" w-full m-10">
    //       <div className="relative flex flex-col md:flex-row justify-center items-center  w-[80%] broder gap-8">
    //       <div className="flex gap-4">
    //     <span className="mt-3 font-bold">start Date:</span>
    //       <div className="datepicker">
    //         <input
    //               type="date"
    //               id="datepicker-input"
    //               value={selectDate}
    //               onChange={handleStartDateChange}
    //         />
    //         <div className="calendar-container">
    //         <div className="calendar"></div>
    //         </div>
    //       </div>
    //         </div>
    //         <button
    //           className={`ml-[180px] md:ml-2 w-28 p-2 border-2 border-gray-300 rounded-lg bg-blue-300 shadow-md ${
    //             isButtonDisabled
    //               ? "cursor-not-allowed opacity-50 bg-gray-300"
    //               : "cursor-pointer"
    //           }`}
    //           onClick={handleShowResults}
    //           disabled={isButtonDisabled}
    //         >
    //           Show results
    //         </button>
    //       </div>

    //     </div>

    //     <div className="flex items-center justify-center from-gray-100 bg-gradient-to-br w-full my-10  ">
    //       <div className="flex items-center justify-center w-full ">
    //         <div className="overflow-x-auto relative shadow-md sm:rounded-lg w-[75%] ">
    //           <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
    //             <table className="w-full text-sm text-left text-gray-800 dark:text-gray-400 border border-gray-200 rounded-lg">
    //               <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
    //                 <tr>
    //                   <th scope="col" className="py-3 px-4">
    //                     Name
    //                   </th>
    //                   <th scope="col" className="py-3 px-4">
    //                     Date
    //                   </th>
    //                   <th scope="col" className="py-3 px-4">
    //                     Total time
    //                   </th>
    //                   <th scope="col" className="py-3 px-4">
    //                     Arrival
    //                   </th>
    //                   <th scope="col" className="py-3 px-4">
    //                     departure
    //                   </th>
    //                 </tr>
    //               </thead>
    //               <tbody>
    //                 {
    //                   summaryData?.map(singleData=>(
    //                   <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
    //                   <td className="py-4 px-4">{singleData.userName}</td>
    //                   <td className="py-4 px-4">{singleData.timestamp?.split('T')[0]}</td>
    //                   <td className="py-4 px-4">{singleData.spentTime}</td>
    //                   <td className="py-4 px-4">{singleData.checkin}</td>
    //                   <td className="py-4 px-4">{singleData.checkout}</td>
    //                 </tr>))
    //                 }
    //               </tbody>
    //             </table>

    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </>
    <>
      <div className="w-full">
        <BoxData data={summaryData} />
        <div className="text-center mb-7 font-semibold text-3xl underline">
          View Attendance Summary
        </div>
        <div className="relative flex flex-col gap-5 ">
          <div className="flex gap-4">
            <span className="mt-3 font-bold">Select Summary Type:</span>
            <select
              className="p-3 border border-gray-300 rounded-lg bg-white shadow-md"
              value={summaryType}
              onChange={handleSummary}
            >
              <option value="daily">Daily</option>
              <option value="ranged">Ranged</option>
            </select>
          </div>
          {summaryType === "ranged" && (
            <div className="flex gap-4">
              <span className="mt-3 font-bold">Choose Start Date:</span>
              <div className="datepicker">
                <input
                  type="date"
                  id="datepicker-input"
                  value={startDate}
                  onChange={handleStartDateChange}
                />
                {/* <div className="calendar-container">
                  <div className="calendar"></div>
                </div> */}
              </div>
              <span className="text-4xl text-blue-400">|</span>
              <span className="mt-3 font-bold">Choose End Date:</span>
              <div className="datepicker">
                <input
                  type="date"
                  id="datepicker-input"
                  value={endDate}
                  onChange={handleEndDateChange}
                />
                {/* <div className="calendar-container">
                  <div className="calendar"></div>
                </div> */}
              </div>

              <button
                className={`ml-[180px] md:ml-2 w-36 p-2 border-2 border-gray-300 rounded-lg bg-blue-300 shadow-md ${
                  !startDate || !endDate
                    ? "cursor-not-allowed opacity-50 bg-gray-300"
                    : "cursor-pointer"
                }`}
                onClick={handleShowWeeklyResults}
                disabled={!startDate && !endDate}
              >
                Show Results
              </button>
            </div>
          )}
          {summaryType === "daily" && (
            <div className="flex gap-4">
              <span className="mt-3 font-bold">
                select Date to view summary:
              </span>
              <div className="datepicker">
                <input
                  required
                  type="date"
                  id="datepicker-input"
                  value={selectDate}
                  onChange={handlesingleDateChange}
                />
                {/* <div className="calendar-container">
                  <div className="calendar"></div>
                </div> */}
              </div>
              <button
                className={`ml-[180px] md:ml-2 w-36 p-2 border-2 border-gray-300 rounded-lg bg-blue-300 shadow-md ${
                  selectDate === ""
                    ? "cursor-not-allowed opacity-50 bg-gray-300"
                    : "cursor-pointer"
                }`}
                onClick={handleShowResults}
                disabled={selectDate === ""}
              >
                Show Results
              </button>
            </div>
          )}
        </div>

        {/* Loader within the table section */}
        <div className="flex items-center justify-center from-gray-100 bg-gradient-to-br w-full my-5  ">
          <div className="flex items-center justify-center w-full ">
            <div
              className={` relative shadow-md sm:rounded-lg w-[95%] ${
                loading ? "block" : "hidden"
              }`}
            >
              <div role="status">
                <svg
                  aria-hidden="true"
                  className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          </div>
        </div>

        {/* Display table when summaryData is available */}
        {summaryData && (
          <div className="flex items-center justify-center from-gray-100 bg-gradient-to-br w-full my-2 ">
            <div className="flex items-center justify-center w-full ">
              <div className="overflow-x-auto relative shadow-md sm:rounded-lg w-[90%] ">
                {loading ? ( // Show loader if loading state is true
                  <div role="status">
                    <svg
                      aria-hidden="true"
                      className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"
                      />
                    </svg>
                    <span className="sr-only">Loading...</span>
                  </div>
                ) : (
                  <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
                    <table>
                      <thead>
                        <tr class="table-headers">
                          <th>NAME</th>
                          <th>DATE</th>
                          <th>CHECKIN</th>
                          <th>CHECKOUT</th>
                          <th>WorkHour</th>
                          <th>STATUS</th>
                        </tr>
                      </thead>
                      <tbody>
                        {summaryData?.map((item, index) => (
                          <tr className=" font-extralight" key={index}>
                            <td>{item.userName}</td>
                            <td>
                              {item.date
                                ? new Date(item.date).toLocaleDateString()
                                : "N/A"}
                            </td>
                            <td>
                              {item.checkin
                                ? new Date(item.checkin).toLocaleTimeString(
                                    [],
                                    { hour: "2-digit", minute: "2-digit" }
                                  )
                                : ""}
                            </td>
                            <td>
                              {item.checkout
                                ? new Date(item.checkout).toLocaleTimeString(
                                    [],
                                    { hour: "2-digit", minute: "2-digit" }
                                  )
                                : ""}
                            </td>
                            <td>
                              {item.spentTime
                                ? `${Math.floor(item.spentTime / 60)}h ${
                                    item.spentTime % 60
                                  }m`
                                : "0"}
                            </td>
                            <td
                              className={`${
                                item.absent ? "text-red-500" : "text-green-500"
                              } font-bold`}
                            >
                              {item.absent ? "Absent" : "Present"}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="w-full">
        {weeklysummaryData && (
          <div className="flex items-center justify-center from-gray-100 bg-gradient-to-br w-full my-2 ">
            <div className=" w-full ">
              <div className="sm:rounded-lg">
                <>
                  <WeeklyData
                    weeklysummaryData={weeklysummaryData}
                    loading={loading}
                    date={date}
                  />
                </>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="text-center">{error && <p>No Data Found</p>}</div>
    </>
  );
};

export default ShowData;
