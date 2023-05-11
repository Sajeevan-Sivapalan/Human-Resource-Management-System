import { useNavigate } from 'react-router-dom'
import { useDeleteUserMutation } from './usersApiSlice'
import { useSelector } from 'react-redux'
import { selectUserById } from './usersApiSlice'
import {  useDispatch } from 'react-redux'



const User = ({ userId }) => {
    const user = useSelector(state => selectUserById(state, userId))

    const [deleteUser, {
        isSuccess: isDelSuccess,
        isError: isDelError,
        error: delerror
    }] = useDeleteUserMutation()

    const navigate = useNavigate()
    const dispatch = useDispatch()


    if (user) {
        const handleEdit = () => navigate(`/dash/admin/users/${userId}`)

        const onDeleteUserClicked = async () => {
            await deleteUser({ id: user.id })
        }

        const userRolesString = user.roles.toString().replaceAll(',', ', ')

        const cellStatus = user.active ? '' : 'table-danger'

        return (
            <tr className="table__row user">

                <td class={cellStatus}>{user.empID}</td>
                <td class={cellStatus}>{user.fullname}</td>  
                <td class={cellStatus}>{user.username}</td>
                <td class={cellStatus}>{user.employee_type}</td>
                <td class={cellStatus}>{user.department}</td>    
                <td class={cellStatus}>{user.position}</td>

                <td class={cellStatus}>{userRolesString}</td>
                          
                <td>
                    <button
                        class="btn btn-primary"
                        onClick={handleEdit}
                    >
                        Review
                    </button>
                </td>

                
                <td>
                    <button
                        class="btn btn-danger"
                        onClick={()=> {
                            if(window.confirm("Are you sure you want to delete this employee?")){
        
                             dispatch(onDeleteUserClicked)       }
                        }}
                    >
                        Delete Employee
                    </button>
                </td>



            </tr>
        )

    } else return null
}
export default User
