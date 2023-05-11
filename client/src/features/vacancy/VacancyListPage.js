import Vacancy from "./VacancyRecord"

const ListPage = ({ searchResults }) => {

    const results = searchResults.map(vacancy => <Vacancy key={vacancy.id} vacancy={vacancy} />)

    const content = results?.length ? results : <article><p>No Matching Vacancy</p></article>

    return (
        <main>{content}</main>
    )
}
export default ListPage