import React,{useState, useEffect} from 'react'
import { useParams } from 'react-router-dom';
import axios from "axios"
import useTitle from '../../hooks/useTitle';

const EditResource = (props) => {
    useTitle("Edit Resources")
    //To get the id from URL
    const {id} = useParams()
    
    console.log(id)
    const [name,setName] = useState("")
    const [type,setType] = useState("")
    const [quantity,setQuantity] = useState("")
    const [invoiceNo,setInvoiceNo] = useState("")
    const [supplierName,setSupplierName] = useState("")
    const [orderedDate,setOrderDate] = useState("")
    const [imageURL,setImageURL] = useState("")

    useEffect(() => {
        axios.get(`http://localhost:5000/api/resources/getResource/${id}`).then((res) =>{
            console.log(res.data)
            setName(res.data.name)
            setType(res.data.type)
            setQuantity(res.data.quantity)
            setInvoiceNo(res.data.invoiceNo)
            setSupplierName(res.data.supplierName)
            setOrderDate(res.data.orderedDate)
            setImageURL(res.data.imageURL)
        })
        .catch((error) => {
            console.log(error.response.data)
        })
    },[])

    const update = (e) => {
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

        if(name === "" ||type === "" || quantity === "" || invoiceNo === "" || supplierName === "" || orderedDate === "" || imageURL === ""){
            //So if either any of this is empty the function will alert and return back
            alert("All the fields are mandatory")
            return
        }

        //the props addResourceHandler is passed from App.js
        //this.props.addResourceHandler(this.state)
            axios.put(`http://localhost:5000/api/resources/updateResource/${id}`,resources).then(() =>{
            //alert("Inventory Updated Successfully")
            //To clear the input text box once the submit button isclicked
            /*setName("")
            setQuantity("")
            setInvoiceNo("")
            setSupplierName("")
            setOrderDate("")
            setImageURL("")*/
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
            <div style={{marginTop:'100px'}} class="leave-list">
                <div class="row justify-content-center">
                    <form onSubmit={update}>
                        <div class="form-group">
                            <div class="row justify-content-center">
                                <div class="col-6">
                                    <label for="name" class="form-label">Name</label>
                                    <input type="text" class="form-control" id="name" placeholder="Enter Resource Name"  value={name} onChange={(e) => setName(e.target.value)}/> {/*e is event*/}
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
                                    <input type="text" class="form-control" id="quantity" placeholder="Enter the quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)}/>
                                </div>
                                <div class="col-6">
                                    <label for="invoiceNo" class="form-label">Invoice No</label>
                                    <input type="text" class="form-control" id="invoiceNo" placeholder="Enter the Invoice Number" value={invoiceNo} onChange={(e) => setInvoiceNo(e.target.value)}/>
                                </div>
                                <div class="col-6">
                                    <label for="supplierName" class="form-label">Supplier Name</label>
                                    <input type="text" class="form-control" id="supplierName" placeholder="Enter the Supplier Name" value={supplierName} onChange={(e) => setSupplierName(e.target.value)}/>
                                </div>
                                <div class="col-6">
                                    <label for="orderDate" class="form-label">Ordered Date</label>
                                    <input type="date" class="form-control" id="orderDate" value={orderedDate} onChange={(e) => setOrderDate(e.target.value)}/>
                                </div>
                                <div class="col-6">
                                    <label for="imageURL" class="form-label">Image URL</label>
                                    <button type="button" style={{ margin: "25px" }} className="btn btn-primary" onClick={(e) => {
                                            myWidget.open();
                                        }}>Upload Image</button>
                                        <img id="uploadedimage" src={imageURL} height={150}/>
                                </div>
                                <div class="row justify-content-center">
                                    <button type="submit" style={{marginTop:'10px'}} class="col-3 btn btn-primary">Update</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    
}

export default EditResource