import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Plot from 'react-plotly.js'

const ResourceReport = () => {

    const [resources, setResources] = useState([])
    //const [name,setName] = useState([])
    //const [quantity,setQuantity] = useState([])

    //const{_id,name,type,quantity,invoiceNo,supplierName,orderedDate,imageURL}=resources

    //Retrieve all the resources
    const retrieveResources = () => {
        axios.get("http://localhost:5000/api/resources/getResource").then((res) => {
            setResources(res.data)
            //setName(res.data.name)
            //setQuantity(res.data.quantity)
        })
            .catch((error) => {
                console.log(error.response.data)
            })
    }

    useEffect(() => {
        retrieveResources()
    }, [])

    const name = []
    const quantity = []
    const empAssigned = []

    resources.map((resource) => {
        name.push(resource.name)
        quantity.push(resource.quantity)
        empAssigned.push(resource.employeesAssigned.length)
    })

    console.log(name)
    console.log(quantity)
    console.log(empAssigned)


    const quantityData = [
        {
            x: name,
            y: quantity,
            type: 'bar',
            marker: { color: 'green' },
        }
    ]

    const quantityLayout = {
        title: 'Available Quantity',
        xaxis: {
            title: 'Resource Name',
        },
        yaxis: {
            title: 'Quantity',
        },
        height: 400

    }

    const empChart = [
        {
            labels: name,
            values: empAssigned,
            hole: .4,
            type: "pie"
        }
    ]

    return (
        <>

            <>
                <button type="button" class="btn btn-primary col-2 " data-bs-toggle="modal" data-bs-target="#payrollstats">
                    Resource Statistics
                </button>
                <div class="modal fade" id="payrollstats" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="ReqLeaveFormLabel" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered modal-lg">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="staticBackdropLabel">Resource Statistics</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <Plot data={quantityData} layout={quantityLayout} />
                                <Plot data={empChart} layout={{ title: 'Employees Assigned to a Resource', height:400}} />
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        </>
    )
}

export default ResourceReport