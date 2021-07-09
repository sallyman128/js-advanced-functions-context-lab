/* Your Code Here */

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

let allWagesFor = function () {
    let eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    let payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
};

const createEmployeeRecord = (employee) => {
    return {
        firstName: employee[0],
        familyName: employee[1],
        title: employee[2],
        payPerHour: employee[3],
        timeInEvents: [],
        timeOutEvents: []
    };
};

const createEmployeeRecords = (employees) => {
    return employees.map( (employee) => createEmployeeRecord(employee) )
};

const createTimeInEvent = function(dateIn) {
    const date = dateIn.slice(0,10);
    const hour = parseInt(dateIn.slice(11));
    this.timeInEvents.push({
        date: date,
        hour: hour,
        type: "TimeIn"
    })
    return this;
};

const createTimeOutEvent = function(dateOut) {
    const date = dateOut.slice(0,10);
    const hour = parseInt(dateOut.slice(11));
    this.timeOutEvents.push({
        date: date,
        hour: hour,
        type: "TimeOut"
    })
    return this;
}

const hoursWorkedOnDate = function(targetDate) {
    const timeInDay = this.timeInEvents.find( (day) => day.date == targetDate);
    const timeOutDay = this.timeOutEvents.find( (day) => day.date == targetDate);
    return (timeOutDay.hour - timeInDay.hour ) / 100;
}

const wagesEarnedOnDate = function(date) {
    return hoursWorkedOnDate.call(this, date) * this.payPerHour;
}

const findEmployeeByFirstName = function(employees, targetFirstName) {
    return employees.find( (employee) => employee.firstName === targetFirstName )
}

const calculatePayroll = function(employees) {
    return employees.reduce( (totalExpense, employee) => {
        // let employeeWorksDays = createEmployeeRecord(employee).timeInEvents;
        // let totalEmployeeExpense = employeeWorksDays.reduce( (employeeExpense, timeIn) => {
        //     return employeeExpense + wagesEarnedOnDate.call(employee, timeIn.date);
        // }, 0)
        return totalExpense + allWagesFor.call(employee);
    }, 0)
}