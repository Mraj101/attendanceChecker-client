import React from "react";

const EmployeeData = ({ userName, weeklysummaryData, error }) => {
  return (
    <div>
      {userName && (
        <p className="pt-10 text-center font-bold text-4xl">
          Attendance summary of {userName}
        </p>
      )}

      {weeklysummaryData && (
        <div className="overflow-x-auto mt-5 min-h-[300px] overflow-y-scroll">
          <table className="w-[100%] min-h-[500px] divide-y-2 divide-gray-200 bg-white  border border-gray-300 text-sm">
            <thead className="sticky top-0 ltr:text-left rtl:text-right bg-blue-300">
              <tr>
                <th scope="col" className="px-10 py-3">
                  Date
                </th>
                <th scope="col" className="px-10 py-3">
                  CHECK-IN
                </th>
                <th scope="col" className="px-10 py-3">
                  CHECK-OUT
                </th>
                <th scope="col" className="px-10 py-3">
                  WORK-HOURS
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200 bg-gray-100">
              {weeklysummaryData.dateList.map((single, index) => (
                <tr key={index}>
                  <td className="px-3 py-3 text-center whitespace-nowrap text-sm">
                    {new Date(single.date).toLocaleDateString("en-GB")}
                  </td>
                  <td className="px-3 py-3 text-center  whitespace-nowrap text-sm ">
                    {single.checkin
                      ? new Date(single.checkin).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                      : ""}
                  </td>
                  <td className="px-3 py-3 text-center  whitespace-nowrap text-sm ">
                    {single.checkout
                      ? new Date(single.checkout).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                      : ""}
                  </td>
                  <td className="px-3 py-3 text-center whitespace-nowrap text-sm">
                    {!single.checkin || !single.checkout
                      ? "0 h"
                      : `${Math.floor(single.spentTime / 60)}h ${
                          single.spentTime % 60
                        }m`}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="text-center">{error && <p>No Data Found</p>}</div>
    </div>
  );
};

export default EmployeeData;
