import React, { useState } from 'react'
import { useGetUsersQuery } from './usersApiSlice'
import User from './User'
import Plot from 'react-plotly.js';
import Spinner from '../../components/Spinner';
import NewUserForm from './NewUserForm';
import useTitle from '../../hooks/useTitle';

const UsersList = () => {
  useTitle("Employees")
  const {
    data: users,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetUsersQuery('usersList', {
    pollingInterval: 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true
  })

  const [search, setSearch] = useState('')
  const [showChart, setShowChart] = useState(false)

  //console.log(search)

  let content;

  if (isLoading) {
    content = <Spinner />
  }

  if (isError) {
    content = <p className="errmsg">{error?.data?.message}</p>
  }

  if (isSuccess) {
    const { ids } = users;

    const filteredUsers = ids.filter((userId) => {
      const user = users.entities[userId];
      return search.toLowerCase() === '' || user.fullname.toLowerCase().includes(search) || user.empID.toLowerCase().includes(search) || user.employee_type.toLowerCase().includes(search);
    }).map((userId) => {
      return users.entities[userId];
    });

    // const data = [{
    //   x: filteredUsers.map((user) => user.department),
    //   y: filteredUsers.map((user) => user.),
    //   type: 'bar'
    // }];

    // const layout = {
    //   title: 'Number of Roles per User'
    // };

    const { entities: usersById } = users

    const departments = {}
    ids.forEach(id => {
      const user = usersById[id]
      if (user.department in departments) {
        departments[user.department]++
      } else {
        departments[user.department] = 1
      }
    })



    const data = [
      {
        x: Object.keys(departments),
        y: Object.values(departments),
        type: 'bar'
      }
    ]

    const layout = {
      title: 'Number of Employees per Department',
      height: 400,
      width: 450,
      xaxis: {
        title: 'Department'
      },
      yaxis: {
        title: 'Number of Employees'
      }
    }


    const employeeTypes = {}
    ids.forEach(id => {
      const user = usersById[id]
      if (user.employee_type in employeeTypes) {
        employeeTypes[user.employee_type]++
      } else {
        employeeTypes[user.employee_type] = 1
      }
    })

    const data1 = [
      {
        values: Object.values(employeeTypes),
        labels: Object.keys(employeeTypes),
        type: 'pie'
      }
    ]

    const layout1 = {
      title: 'Employee Types',
    }





    content = (

      <>
        <div class="request">
          <div class="row justify-content-end">
          <NewUserForm></NewUserForm>
                <button type="button" onClick={() => setShowChart(!showChart)} class="btn btn-primary col-2 " data-bs-toggle="modal" data-bs-target="#payrollstats">
                  Employee Statistics
                </button>
            <div class="modal fade" id="payrollstats" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="ReqLeaveFormLabel" aria-hidden="true">
              <div class="modal-dialog modal-dialog-centered modal-lg">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="staticBackdropLabel">Employee Statistics</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div class="modal-body">

                    {showChart && (
                      <Plot
                        data={data}
                        layout={layout}
                      />
                    )}

                    {showChart && (
                      <Plot
                        data={data1}
                        layout={layout1}
                      />
                    )}
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="search-z">
          <div class="row justify-content-center">
            <input
              class="form-control search-bar-z"
              type="text"
              id="search"
              placeholder='Search Employee using Employee ID, Full Name, Employee type'
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
        <div>
          <div class="leave-list">
            <div class="row justify-content-center">
              <table class="table table-striped table-hover">
                <thead>
                  <tr>
                    <th scope="col">Employee ID</th>
                    <th scope="col">Full Name</th>
                    <th scope="col">User Name</th>
                    <th scope="col">Employee Type</th>
                    <th scope="col">Department</th>
                    <th scope="col">Position</th>

                    <th scope="col">Role</th>

                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user) => (
                    <User key={user.id} userId={user.id} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </>
    );
  }

  return content;
};

export default UsersList;















