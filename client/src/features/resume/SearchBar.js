

const SearchBar = ({ posts, setSearchResults }) => {
    const handleSubmit = (e) => e.preventDefault()

    const handleSearchChange = (e) => {
        if (!e.target.value) return setSearchResults(posts)

        const resultsArray = posts.filter(post => post.fullname.toLowerCase().includes(e.target.value.toLowerCase()) || post.forthepostof.toLowerCase().includes(e.target.value.toLowerCase()))

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