import { getPosts } from './VacancyLink'
import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import SearchBar from './SearchBar'
import NewVacancyForm from './NewVacancyForm'
import ListPage from './VacancyRecordPublic'
import useTitle from '../../hooks/useTitle'

function VacancyListPublic() {
    useTitle("Available Vacancies")

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
            <div class="leave-list">
                <div class="row justify-content-center">
                    <h3 class=" text-primary" style={{ margin: '0px 0px 50px 0px' }}>Available Vacancies</h3>
                    <SearchBar posts={posts} setSearchResults={setSearchResults} />
                </div>
                <table class="table table-striped table-hover mx-auto" style={{ borderSpacing: '0 10px', width: '90%' }}>
                    <thead>
                        <tr>
                            <th scope="col" class="text-center">Job Title</th>
                            <th scope="col" class="text-center">Description</th>
                            <th scope="col" class="text-center">Requirements</th>
                        </tr>
                    </thead>
                </table>
                <ListPage searchResults={searchResults} />
                <div class="row justify-content-center">
                    <Link style={{ margin: '0px 0px 0px 1300px' }} to="/"><button class="btn btn-primary">Go To Login Page</button></Link>
                </div>
            </div>
        </>
    )
}

export default VacancyListPublic;
