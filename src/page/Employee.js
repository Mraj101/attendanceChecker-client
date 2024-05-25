import React, { useState, useEffect } from "react";
import axios from "axios";
import BoxData from "../components/Dashboard/BoxData";
import EmployeeData from "../components/Employee/EmployeeData";

const Employee = () => {
  const [selectDate, setSelectedDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [summaryData, setSummaryData] = useState(null);
  const [weeklysummaryData, setWeeklySummaryData] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [userId, setUserId] = useState("daily");
  const [isDisabled, setDisabled] = useState(true);
  const [date, setDates] = useState(null);
  const [empList, setEmpList] = useState(null);
  const [userName, setuserName] = useState(null);

  const fetcEmpList = async () => {
    let empList = await axios.get(process.env.REACT_APP_GetEmpList);
    // console.log("consosling list", empList.data.data.data);
    setEmpList(empList.data.data.data);
  };

  useEffect(() => {
    fetcEmpList();
  }, []);

  const handleUser = (event) => {
    const selectedUserName = event.target.value;
    setuserName(selectedUserName);

    const selectedEmployee = empList.find(
      (employee) => employee.userName === selectedUserName
    );
    if (selectedEmployee) {
      setUserId(selectedEmployee.userId);
    }
    setWeeklySummaryData(null);
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
      //   console.log("hitting");
      setWeeklySummaryData(null);
      setLoading(true);
      setDisabled(true);
      const postData = { date: selectDate };
      //   console.log("before posting data");
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
    let dates = [];
    let currentDate = new Date(startDate);
    let currentEndDate = new Date(endDate);

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
      const postData = {
        date: {
          startDate,
          endDate,
        },
        userId,
      };
      console.log("consoling post data", postData);
      let sequencialDates = getSequentialDateStrings(startDate, endDate);
      setDates(sequencialDates);
      // console.log(sequencialDates, "list");
      // console.log(postData, process.env.REACT_APP_GetWeeklySummary);
      const response = await axios.post(
        process.env.REACT_APP_GetEmpdata,
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

  //   const handleSummary = (e) => {
  //     setWeeklySummaryData(null);
  //     setSummaryData(null);
  //   };

  console.log("consoling emp list userid", weeklysummaryData?.dateList);
  return (
    <>
      <div class="flex flex-col h-screen p-3">
        <div className="mt-2">
          <h1 class="text-3xl font-bold text-red-800 text-center">
            Welcome To Attendance Checker
          </h1>
          <p class="text-xl mt-2 text-gray-600 text-center">
            check attendance for single employee
          </p>
        </div>
        <BoxData />

        <div className="w-full">
          <div className="text-center mb-7 font-semibold text-3xl underline">
            View Attendance Summary
          </div>
          <div className="relative flex flex-col gap-5 ">
            <div className="flex gap-4">
              <span className="mt-3 font-bold">Employee</span>
              <select
                className="p-2 border border-gray-300 rounded-lg bg-white shadow-md"
                value={userName}
                onChange={handleUser}
              >
                <option value="">Select Employee</option> {/* Default option */}
                {empList?.map((employee) => (
                  <option key={employee.userId} value={employee.userName}>
                    {employee.userName}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex gap-4">
              <span className="mt-3 font-bold">Choose Start Date:</span>
              <div className="datepicker">
                <input
                  type="date"
                  id="datepicker-input"
                  value={startDate}
                  onChange={handleStartDateChange}
                />
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
          </div>
        </div>

        {weeklysummaryData && userName && (
          <EmployeeData
            userName={userName}
            weeklysummaryData={weeklysummaryData}
            error={error}
          />
        )}
      </div>
    </>
  );
};

export default Employee;
