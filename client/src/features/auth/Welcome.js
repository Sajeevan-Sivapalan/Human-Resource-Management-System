import { Link, redirect } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import AdminPanel from '../../components/AdminComponents/AdminPanel'
import EmployeePanel from '../../components/EmployeeComponents/EmployeePanel'



const Welcome = () => {
    
    const {username,isManager, isAdmin} = useAuth()
    const date = new Date()
    // //const today = new Intl.DateTimeFormat('en-US', { dateStyle: 'full', timeStyle: 'long' }).format(date)

    const content = (
        <section>
            {(isManager || isAdmin) &&  <AdminPanel></AdminPanel>}
            {!(isManager || isAdmin) && <EmployeePanel></EmployeePanel>}


        </section>
    )

    return content
}
export default Welcome