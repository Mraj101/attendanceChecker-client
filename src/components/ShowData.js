import React from "react";

const ShowData = () => {
  return (
    <>
      <div className="my-10 mx-auto">
        <div class="datepicker">
          <input type="date" id="datepicker-input" />
          <div class="calendar-container">
            <div class="calendar"></div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center from-gray-100 bg-gradient-to-br">
        <div className="flex items-center justify-center w-full ">
          <div className="overflow-x-auto relative shadow-md sm:rounded-lg w-[92%] border border-black">
            <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
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
    </>
  );
};

export default ShowData;
