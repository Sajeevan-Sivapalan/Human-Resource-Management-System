import Resume from "./ResumeRecord"

const ListPage = ({ searchResults }) => {

    const results = searchResults.map(resume => <Resume key={resume.id} resume={resume} />)

    const content = results?.length ? results : <article><p>No Matching Resume</p></article>

    return (
        <main>{content}</main>
    )
}
export default ListPage