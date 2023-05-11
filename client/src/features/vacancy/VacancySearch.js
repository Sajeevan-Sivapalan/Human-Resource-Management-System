import { getPosts } from './VacancyLink'
import { useState, useEffect } from 'react'
import SearchBar from './SearchBar'
import ListPage from './VacancyListPage'
import NewVacancyForm from './NewVacancyForm'

function VacancySearch() {
  const [posts, setPosts] = useState([])
  const [searchResults, setSearchResults] = useState([])

  useEffect(() => {
    getPosts().then(json => {
      setPosts(json)
      setSearchResults(json)
    })
  }, [])

  return (
    <>
      <NewVacancyForm></NewVacancyForm>
      <div className="container">
        <div className="row justify-content-center">
          <SearchBar posts={posts} setSearchResults={setSearchResults} />
        </div>
      </div>
      <div class="leave-list">
        <div class="row justify-content-center">
          <table className="table table-striped table-hover mx-auto" style={{ borderSpacing: '0 10px' }}>
            <thead>
              <tr>
                <th scope="col" className="text-center">Job Title</th>
                <th scope="col" className="text-center">Description</th>
                <th scope="col" className="text-center">Requirements</th>
                <th scope="col" className="text-center">Edit</th>
              </tr>
            </thead>
          </table>
          <ListPage searchResults={searchResults} />
        </div>
      </div>
    </>
  )
}

export default VacancySearch;
