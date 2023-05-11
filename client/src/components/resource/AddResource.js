import React, { useState, useEffect } from 'react'
import { Link, useNavigate, redirect } from 'react-router-dom'
import axios from "axios"

const AddResource = () => {

    const [name, setName] = useState("")
    const [type, setType] = useState("")
    const [quantity, setQuantity] = useState("")
    const [invoiceNo, setInvoiceNo] = useState("")
    const [supplierName, setSupplierName] = useState("")
    const [orderedDate, setOrderDate] = useState("")
    const [imageURL, setImageURL] = useState("")

    const demo = (e) => {
        e.preventDefault()
        setName("Headphone")
        setType("Device")
        setQuantity(25)
        setInvoiceNo("INV2008")
        setSupplierName("PC House (Pvt) (Ltd)")
        setOrderDate("2023-04-13")
        setImageURL("https://res.cloudinary.com/dhzgmok7k/image/upload/v1683166181/resources/l2orhj7nbtbnkv4gjsrk.jpg")
    }

    const add = (e) => {
        e.preventDefault() //Like preventing page to refresh

        const resources = {
            name,
            type,
            quantity,
            invoiceNo,
            supplierName,
            orderedDate,
            imageURL
        }

        if (name === "" || type === "" || quantity === "" || invoiceNo === "" || supplierName === "" || orderedDate === "" || imageURL === "") {
            //So if either any of this is empty the function will alert and return back
            alert("All the fields are mandatory")
            return
        }

        //the props addResourceHandler is passed from App.js
        //this.props.addResourceHandler(this.state)
        axios.post("http://localhost:5000/api/resources/createResource", resources).then(() => {
            //alert("Inventory added Successfully")
            //To clear the input text box once the submit button isclicked
            setName("")
            setType("")
            setQuantity("")
            setInvoiceNo("")
            setSupplierName("")
            setOrderDate("")
            setImageURL("")
            //To go back to Resources List after submitting the form
            window.location.replace('/dash/admin/resourcesList')
        })
            .catch((error) => {
                console.log(error.response.data)
            })


    }

    const myWidget = window.cloudinary.createUploadWidget(
        {
            cloudName: "dhzgmok7k",
            uploadPreset: "k5ufwo6f",
        },
        (error, result) => {
            if (!error && result && result.event === "success") {
                console.log("Done! Here is the image info: ", result.info);
                document.getElementById("uploadedimage").setAttribute("src", result.info.url);
                console.log(result.info.url)
                setImageURL(result.info.url);
            }
        }
    )

    return (
        <>
            <button type="button" class="btn btn-primary col-2 " data-bs-toggle="modal" data-bs-target="#ReqLeaveForm">
                Add Resource
            </button>
            <div class="modal fade" id="ReqLeaveForm" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="ReqLeaveFormLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="staticBackdropLabel">Add Resource</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <form onSubmit={add}>
                                <div class="row">
                                    <div class="col-6">
                                        <label for="name" class="form-label">Name</label>
                                        <input type="text" class="form-control" id="name" placeholder="Enter Resource Name" value={name} onChange={(e) => setName(e.target.value)} /> {/*e is event*/}
                                    </div>
                                    <div class="col-6">
                                        <label for="name" class="form-label">Resource Type</label>
                                        <select class="form-select" aria-label="Default select example" name="type" value={type} onChange={(e) => setType(e.target.value)}>
                                            <option selected>Select Resource Type</option>
                                            <option value="Device">Device</option>
                                            <option value="Stationary">Stationary</option>
                                        </select>
                                    </div>
                                    <div class="col-6">
                                        <label for="quantity" class="form-label">Quantity</label>
                                        <input type="text" class="form-control" id="quantity" placeholder="Enter the quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
                                    </div>
                                    <div class="col-6">
                                        <label for="invoiceNo" class="form-label">Invoice No</label>
                                        <input type="text" class="form-control" id="invoiceNo" placeholder="Enter the Invoice Number" value={invoiceNo} onChange={(e) => setInvoiceNo(e.target.value)} />
                                    </div>
                                    <div class="col-6">
                                        <label for="supplierName" class="form-label">Supplier Name</label>
                                        <input type="text" class="form-control" id="supplierName" placeholder="Enter the Supplier Name" value={supplierName} onChange={(e) => setSupplierName(e.target.value)} />
                                    </div>
                                    <div class="col-6">
                                        <label for="orderDate" class="form-label">Ordered Date</label>
                                        <input type="date" class="form-control" id="orderDate" value={orderedDate} onChange={(e) => setOrderDate(e.target.value)} />
                                    </div>
                                    <div class="col-12">
                                        <br/>
                                        <label for="imageURL" class="form-label">Image</label>
                                        <button type="button" style={{ margin: "25px" }} className="btn btn-primary" onClick={(e) => {
                                            myWidget.open();
                                        }}>Upload Image</button>
                                        <img id="uploadedimage" src={imageURL} height={100} />
                                        <br/>
                                    </div>                        
                                </div>
                                <div class="modal-footer">
                                <br/>
                                    <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Cancel</button>
                                    <button type="submit" class="btn btn-primary">Add</button>
                                    <button style={{ marginLeft: "25px" }} className="btn btn-primary" onClick={(e) => {
                                        demo(e);
                                    }}>Demo</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}

export default AddResource