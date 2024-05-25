import React from "react";

const DailyData = ({ summaryData, loading, error }) => {
  return (
    <>
      {summaryData && (
        <div className="overflow-x-auto h-[700px] overflow-y-scroll">
          <table className="w-full">
            <thead className=" bg-blue-300">
              <tr class="table-headers ">
                <th scope="col" className="px-9 py-3">
                  NAME
                </th>
                <th scope="col" className="px-9 py-3">
                  DATE
                </th>
                <th scope="col" className="px-9 py-3">
                  CHECKIN
                </th>
                <th scope="col" className="px-9 py-3">
                  CHECKOUT
                </th>
                <th scope="col" className="px-9 py-3">
                  WorkHour
                </th>
                <th scope="col" className="px-9 py-3">
                  STATUS
                </th>
                <th scope="col" className="px-9 py-3">
                  Details
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-gray-100">
              {summaryData?.map((item, index) => (
                <tr className="bg-gray-50 font-bold " key={index}>
                  <td className="px-6 py-3 text-center  whitespace-nowrap text-sm ">
                    {item.userName}
                  </td>
                  <td className="px-6 py-3 text-center  whitespace-nowrap text-sm ">
                    {item.date
                      ? new Date(item.date).toLocaleDateString()
                      : "N/A"}
                  </td>
                  <td className="px-6 py-3 text-center  whitespace-nowrap text-sm">
                    {item.checkin
                      ? new Date(item.checkin).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                      : ""}
                  </td>
                  <td className="px-6 py-3 text-center  whitespace-nowrap text-sm ">
                    {item.checkout
                      ? new Date(item.checkout).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                      : ""}
                  </td>
                  <td className="px-6 py-3 text-center  whitespace-nowrap text-sm ">
                    {item.spentTime
                      ? `${Math.floor(item.spentTime / 60)}h ${
                          item.spentTime % 60
                        }m`
                      : "0"}
                  </td>
                  <td
                    className={`${
                      item.absent ? "text-red-500" : "text-green-500"
                    } font-bold px-6 py-3 text-center  whitespace-nowrap text-sm "`}
                  >
                    {item.absent ? "Absent" : "Present"}
                  </td>
                  <td className="px-6 py-3 text-center  whitespace-nowrap text-sm ">
                    <div class="relative grid select-none items-center whitespace-nowrap rounded-full bg-blue-200 px-3 py-1.5 font-sans text-xs font-bold uppercase text-white">
                      <div class="absolute top-2/4 left-1.5 h-5 w-5 -translate-y-2/4">
                        <img
                          alt="Tania Andrew"
                          src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"
                          class="relative inline-block h-full w-full -translate-x-0.5 !rounded-full  object-cover object-center"
                        />
                      </div>
                      <span class="ml-[18px]">
                        <p class="block font-sans text-sm antialiased font-medium leading-none text-black capitalize hover:cursor-pointer">
                          {item.userName}
                        </p>
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <div className="text-center">{error && <p>No Data Found</p>}</div>
    </>
  );
};

export default DailyData;
