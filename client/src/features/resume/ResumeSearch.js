import { getPosts } from './ResumeLink'
import { useState, useEffect } from 'react'
import SearchBar from './SearchBar'
import ListPage from './ResumeListPage'
import NewResumeForm from './NewResumeForm'
import Reporting from './Reporting'

function ResumeSearch() {
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
      <div class="request">
        <div class="row justify-content-end">
          <Reporting></Reporting>
          <NewResumeForm></NewResumeForm>
        </div>
      </div>
      <div class="search">
        <div class="row justify-content-center">
          <SearchBar posts={posts} setSearchResults={setSearchResults} />
        </div>
      </div>
      <div class="leave-list">
        <div class="row justify-content-center">
          <ListPage searchResults={searchResults} />
        </div>
      </div>
    </>
  )
}

export default ResumeSearch;