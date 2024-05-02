import React, { useState } from "react";

const ShowData = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

  const handleShowResults = () => {};

  const isButtonDisabled = startDate === "" || endDate === "";

  return (
    <>
      <div className="w-full">
        <div className=" w-full m-10">
          <div className="relative flex flex-col md:flex-row justify-center items-center  w-[80%] broder gap-8">
            <div className="flex gap-4">
              <span className="my-3 font-bold">start Date:</span>
              <div className="datepicker">
                <input
                  type="date"
                  id="datepicker-input"
                  value={startDate}
                  onChange={handleStartDateChange}
                />
                <div className="calendar-container">
                  <div className="calendar"></div>
                </div>
              </div>
            </div>

            <div className=" flex gap-2">
              <span className="my-3 font-bold">End Date:</span>
              <div className="datepicker">
                <input
                  type="date"
                  id="datepicker-input"
                  value={endDate}
                  onChange={handleEndDateChange}
                />
                <div className="calendar-container">
                  <div className="calendar"></div>
                </div>
              </div>
            </div>
            <button
              className={`ml-[180px] md:ml-2 w-28 p-2 border-2 border-gray-300 rounded-lg bg-blue-300 shadow-md ${
                isButtonDisabled
                  ? "cursor-not-allowed opacity-50 bg-gray-300"
                  : "cursor-pointer"
              }`}
              onClick={handleShowResults}
              disabled={isButtonDisabled}
            >
              Show results
            </button>
          </div>
        </div>

        <div className="flex items-center justify-center from-gray-100 bg-gradient-to-br w-full my-10  ">
          <div className="flex items-center justify-center w-full ">
            <div className="overflow-x-auto relative shadow-md sm:rounded-lg w-[75%] ">
              <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left text-gray-800 dark:text-gray-400 border border-gray-200 rounded-lg">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="py-3 px-4">
                        Name
                      </th>
                      <th scope="col" className="py-3 px-4">
                        Date
                      </th>
                      <th scope="col" className="py-3 px-4">
                        Total time
                      </th>
                      <th scope="col" className="py-3 px-4">
                        Arrival
                      </th>
                      <th scope="col" className="py-3 px-4">
                        departure
                      </th>
                      <th scope="col" className="py-3 px-4">
                        status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                      <td className="py-4 px-4">Istiak</td>
                      <td className="py-4 px-4">Limon</td>
                      <td className="py-4 px-4">sakib</td>
                      <td className="py-4 px-4">Yes</td>
                    </tr>
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                      <td className="py-4 px-4">Maria Garcia</td>
                      <td className="py-4 px-4">55387621</td>
                      <td className="py-4 px-4">$3,150.00</td>
                      <td className="py-4 px-4">No</td>
                    </tr>
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                      <td className="py-4 px-4">James Smith</td>
                      <td className="py-4 px-4">90817264</td>
                      <td className="py-4 px-4">$7,820.00</td>
                      <td className="py-4 px-4">Yes</td>
                    </tr>
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                      <td className="py-4 px-4">Patricia Brown</td>
                      <td className="py-4 px-4">26483910</td>
                      <td className="py-4 px-4">$1,230.00</td>
                      <td className="py-4 px-4">Yes</td>
                    </tr>
                    <tr className="bg-white dark:bg-gray-800">
                      <td className="py-4 px-4">Ethan Davis</td>
                      <td className="py-4 px-4">64738290</td>
                      <td className="py-4 px-4">$865.00</td>
                      <td className="py-4 px-4">No</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShowData;
