const asyncHandler = require('express-async-handler')
const Payroll = require('../models/payrollModel')
const { calculateSalary, calculateDeductions, addBonus, getTotalHours } = require('../controllers/payrollCalculator')
//@desc Get payrolls
//@route GET/ api/payrolls
//@access Private
const getPayrolls = asyncHandler(async (req, res) => {
    const payrolls = await Payroll.find()

    res.status(200).json(payrolls)
})

//@desc Set payrolls
//@route POST/ api/payrolls
//@access Private
const setPayroll = asyncHandler(async (req, res) => {
    const { username, fullname, empID, department, position } = req.body

    if (!fullname || !empID || !department || !position) {
        res.status(400)
        throw new Error('Please add a text field')
    }
    const { SalaryPaid, mealAllow, travelAllow, BaseSalary } = calculateSalary(department, position)

    const { epfCalculated, FinalSalary, taxes, deductions } = calculateDeductions(SalaryPaid)

    const payroll = await Payroll.create({
        username: username,
        Name: fullname,
        eid: empID,
        department: department,
        position: position,
        mealAllowance: mealAllow,
        travelAllowance: travelAllow,
        epf: epfCalculated,
        taxes: taxes,
        deductions: deductions,
        otHours: 0,
        otPaid: 0,
        Salary: FinalSalary,
        BaseSalary: BaseSalary
    })

    res.status(200).json(payroll)
})

//@desc Update payrolls
//@route PUT/ api/payrolls:id
//@access Private
const updatePayroll = asyncHandler(async (req, res) => {

    const payroll = await Payroll.findById(req.params.id)

    const { department, position, otHours, bonus } = req.body

    const { SalaryPaid, OtPayment, mealAllow, travelAllow, BaseSalary } = calculateSalary(department, position, otHours)

    const { epfCalculated, FinalSalary, taxes, deductions } = calculateDeductions(SalaryPaid)

    let finalSalary = FinalSalary
    if (bonus) {
        finalSalary = addBonus(finalSalary, bonus)
    }

    if (!payroll) {
        res.status(400)
        throw new Error('Payroll not found')
    }

    const updatedPayRollData = {
        ...req.body,
        epf: epfCalculated,
        taxes: taxes,
        deductions: deductions,
        mealAllowance: mealAllow,
        travelAllowance: travelAllow,
        otPaid: OtPayment,
        Salary: finalSalary,
        BaseSalary: BaseSalary
    }

    if (bonus) {
        updatedPayRollData.$set = { bonus: bonus };
    }
    const updatedPayroll = await Payroll.findByIdAndUpdate(req.params.id, updatedPayRollData, {
        new: true,
    })

    res.status(200).json(updatedPayroll)
})


const updatePayrollfromUser = asyncHandler(async (req, res) => {

    const payroll = await Payroll.findOne({ eid: req.params.empID })
    // console.log(req.params.empID)
    // console.log(req.body.fullname)

    if (!payroll) {
        res.status(400)
        throw new Error('Payroll not found')
    }

    const { username, fullname, department, position } = req.body

    const { SalaryPaid, mealAllow, travelAllow, BaseSalary } = calculateSalary(department, position, payroll.otHours)

    const { epfCalculated, FinalSalary, taxes, deductions } = calculateDeductions(SalaryPaid)

    let finalSalary = FinalSalary
    if (payroll.bonus) {
        finalSalary = addBonus(finalSalary, payroll.bonus)
    }

    const updatedPayRollData = {

        ...req.body,
        username: username,
        Name: fullname,
        epf: epfCalculated,
        taxes: taxes,
        deductions: deductions,
        mealAllowance: mealAllow,
        travelAllowance: travelAllow,
        Salary: finalSalary,
        BaseSalary: BaseSalary
    }

    const updatedPayroll = await Payroll.findOneAndUpdate({ eid: req.params.empID }, updatedPayRollData, {
        new: true,
    })

    res.status(200).json(updatedPayroll)
})

//@desc delete payrolls
//@route DELETE/ api/payrolls:id
//@access Private
const deletePayroll = asyncHandler(async (req, res) => {
    const payroll = await Payroll.findById(req.params.id)

    if (!payroll) {
        res.status(400)
        throw new Error('Payroll not found')
    }
    await payroll.remove()

    res.status(200).json({ id: req.params.id })
})

const searchpayrolls = asyncHandler(async (req, res) => {
    const { query } = req.query
    try {
        const results = await Payroll.find({
            $or: [
                { department: { $regex: query } }
            ],
        })

        res.json(results)

    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Server error' })
    }
})


// const setOT = asyncHandler(async (req, res) => {
//     const empID = "http://emp111";
//     const month = "04";
//     try {
//       const totalHours = await getTotalHours(empID, month);
//       res.json(totalHours );
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
//   });

module.exports = {
    getPayrolls,
    setPayroll,
    updatePayroll,
    deletePayroll,
    searchpayrolls,
    updatePayrollfromUser
    //setOT
}
