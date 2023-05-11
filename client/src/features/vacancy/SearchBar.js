import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"

const SearchBar = ({ posts, setSearchResults }) => {
    const handleSubmit = (e) => e.preventDefault()

    const handleSearchChange = (e) => {
        if (!e.target.value) return setSearchResults(posts)

        const resultsArray = posts.filter(post => post.jobtitle.includes(e.target.value) || post.description.includes(e.target.value))

        setSearchResults(resultsArray)
    }

    return (
                <input
                    class="form-control search-bar"
                    type="text"
                    id="search"
                    onChange={handleSearchChange}
                    placeholder="Search"
                />
    )
}
export default SearchBar