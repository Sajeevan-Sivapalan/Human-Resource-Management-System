//const employeeAttendance = require("../models/EmployeeAttendance")

function calculateSalary(department, position, otHours) {
  let Salary = 0, mealAllow = 0, travelAllow = 0, otPayment = 0, BaseSalary = 0

  if (department == "Finance Department") {
    if (position == "Executive")
      BaseSalary = 125000
    else if (position == "Intermediate")
      BaseSalary = 100000
    else if (position == "Middle Management")
      BaseSalary = 75000
    else if (position == "Entry level")
      BaseSalary = 50000
  }
  else if (department == "IT Department") {
    if (position == "Executive")
      BaseSalary = 150000
    else if (position == "Intermediate")
      BaseSalary = 125000
    else if (position == "Middle Management")
      BaseSalary = 100000
    else if (position == "Entry level")
      BaseSalary = 75000
  }
  else if (department == "HR Department") {
    if (position == "Executive")
      BaseSalary = 100000
    else if (position == "Intermediate")
      BaseSalary = 75000
    else if (position == "Middle Management")
      BaseSalary = 50000
    else if (position == "Entry level")
      BaseSalary = 25000
  }

  mealAllow = BaseSalary * 0.05
  travelAllow = BaseSalary * 0.1
  const otRate = 1000
  if (otHours) {
    otPayment = otRate * otHours
  }

  Salary = otPayment + mealAllow + travelAllow + BaseSalary

  return {
    SalaryPaid: Salary,
    mealAllow: mealAllow,
    travelAllow: travelAllow,
    OtPayment: otPayment,
    BaseSalary: BaseSalary
  }
}


function calculateDeductions(SalaryPaid) {

  let taxes = 0

  if (SalaryPaid > 100000)
    taxes = SalaryPaid * 0.1

  const epf = 0.08

  let epfCalculated = epf * SalaryPaid

  let deductions = epfCalculated + taxes

  let FinalSalary = SalaryPaid - deductions


  return {
    epfCalculated,
    FinalSalary,
    taxes,
    deductions
  }
}

function addBonus(FinalSalary, bonus) {
  const finalSalary = Number(FinalSalary);
  const bonusValue = Number(bonus);
  return finalSalary + bonusValue;
}

// async function getTotalHours(empID, month) {

//   month = Number(month).toString();
//   const result = await employeeAttendance.aggregate([
//     {
//       $match: {
//         empID: empID,
//         date: { $regex: `-${month}-` }
//       }
//     },
//     {
//       $group: {
//         _id: null,
//         totalHours: {
//           $sum: {
//             $divide: [
//               {
//                 $add: [
//                   {
//                     $multiply: [{
//                       $toInt: {
//                         $substr:
//                           ["$timeDifference", 0, 2]
//                       }
//                     }, 3600]
//                   },
//                   {
//                     $multiply: [{
//                       $toInt: {
//                         $substr:
//                           ["$timeDifference", 3, 2]
//                       }
//                     }, 60]
//                   },
//                   {
//                     $toInt: { $substr: ["$timeDifference", 6, 2] }
//                   }
//                 ]
//               },
//               3600
//             ]
//           }
//         },
//         daysWorked: { $sum: 1 }
//       }
//     }
//   ]);

//   if (result.length === 0) {
//     return { totalHours: 0, daysWorked: 0 };
//   } else {
//     return { totalHours: result[0].totalHours, daysWorked: result[0].daysWorked };
//   }
// }

module.exports = {
  calculateSalary,
  calculateDeductions,
  addBonus
  //getTotalHours
}