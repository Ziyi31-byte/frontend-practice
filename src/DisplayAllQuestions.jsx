class DisplayAllQuestions extends React.Component {

    render() {
        const { questions } = this.props;

        if (!questions || questions.length === 0) {
            return <div className="text-center p-5">No question to display.</div>
        }

        return (
            <div className="displayTable mt-4">
                <table className="table table-striped table-hover">
                    <thead className="table-dark">
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Category</th>
                        <th>Complexity</th>
                        <th>Created By</th>
                    </tr>
                    </thead>
                    <tbody>
                    {questions.map((question) => (
                        <tr key={question.id}>
                        <td>{question.id}</td>
                        <td>{question.title}</td>
                        <td>{question.description}</td>
                        <td>{question.category}</td>
                        <td>{question.complexity}</td>
                        <td>{question.createdByUser}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        );
    }
}