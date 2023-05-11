import VacancySearchPublic from "./VacancySearchPublic"

const ListPage = ({ searchResults }) => {

    const results = searchResults.map(vacancy => <VacancySearchPublic key={vacancy.id} vacancy={vacancy} />)

    const content = results?.length ? results : <article><p>No Matching Vacancy</p></article>

    return (
        <main>{content}</main>
    )
}
export default ListPage