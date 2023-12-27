const Router = ReactRouterDOM.BrowserRouter;
const Switch = ReactRouterDOM.Switch;
const Route = ReactRouterDOM.Route;
const Link = ReactRouterDOM.Link;

class QuestionService extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeSection: "add-qn", 
            questions: [],
        };

        this.fetchAllQuestions = this.fetchAllQuestions.bind(this);
        this.addQuestion = this.addQuestion.bind(this);
        this.deleteQuestion = this.deleteQuestion.bind(this);
        this.updateQuestion = this.updateQuestion.bind(this);
    }

    setActiveSection(section) {
        this.setState({ activeSection: section });
    }

    componentDidMount() {
        this.fetchAllQuestions();
    }

    async fetchAllQuestions() {
        const query = `
          query {
            getAllQuestions {
              id
              title
              description
              category
              complexity
              createdByUser
            }
          }`;

        try {
            const data = await graphQLFetch(query);
            if (data) {
                this.setState({ questions: data.getAllQuestions });
                console.log("data.getAllQuestions", data.getAllQuestions);
            }
        } catch (error) {
            console.error('Error fetching questions:', error);
        }
    }

    async addQuestion(auth, questionData) {
        const mutation = `
          mutation AddQuestion($auth: AuthInput!, $input: AddQuestionInput!) {
            addQuestion(auth: $auth, input: $input) {
                id
                title
                description
                category
                complexity
                createdByUser
            }
          }`;

        try {
            const data = await graphQLFetch(mutation, { auth: auth, input: questionData });
            if (data && data.addQuestion) {
                this.setState(prevState => ({
                    questions: [...prevState.questions, data.addQuestion],
                }));
                console.log("Question added successfully");
            }
        } catch (error) {
            console.error("Error adding question:", error);
        }
    }

    async deleteQuestion(questionId, auth) {
        const mutation = `
          mutation DeleteQuestion($id: ID!, $auth: AuthInput!) {
            deleteQuestion(id: $id, auth: $auth) 
          }`;

        try {
            const data = await graphQLFetch(mutation, { id: questionId, auth: auth});
            if (data.deleteQuestion == 'true') {
                this.setState(prevState => ({
                    questions: prevState.questions.filter(q => q.id !== questionId),
                }));
                console.log("Question deleted successfully");
            }
        } catch (error) {
            console.error("Error deleting question:", error);
        }
    }

    async updateQuestion(questionId, auth, questionData) {
        const mutation = `
          mutation UpdateQuestion($id: ID!, $auth: AuthInput!, $updates: UpdateQuestionInput!) {
            updateQuestion(id: $id, auth: $auth, updates: $updates) {
              id
              title
              description
              category
              complexity
              createdByUser
            }
          }`;

        try {
            const data = await graphQLFetch(mutation, { id: questionId, auth: auth, updates: questionData });
            if (data && data.updateQuestion) {
                this.setState(prevState => ({
                    questions: prevState.questions.map(q =>
                        q.id === data.updateQuestion.id ? data.updateQuestion : q
                    ),
                }));
                console.log("Question updated successfully");
            }
        } catch (error) {
            console.error("Error updating question:", error);
        }
    }

    renderSection = () => {
        const { activeSection, questions } = this.state;
        switch (activeSection) {
            case 'add-qn':
                return <AddQuestionForm onQuestionSubmit={this.addQuestion} />;
            case 'display-qns':
                return <DisplayAllQuestions questions={questions} onDisplayQuestions={this.fetchAllQuestions} />;
            case 'update-qn':
                return <UpdateQuestionForm onUpdateQuestion={this.updateQuestion} />;
            case 'delete-qn':
                return <DeleteQuestionForm onDeleteQuestion={this.deleteQuestion} />;
            default:
                return <AddQuestionForm onQuestionSubmit={this.addQuestion} />;
        }
    };
    
    render() {
        return (
            <div className="outer-container">
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <div className="container-fluid">
                        <button className="btn btn-outline-secondary me-2" onClick={() => this.setActiveSection('add-qn')}>Add a Question</button>
                        <button className="btn btn-outline-secondary me-2" onClick={() => this.setActiveSection('display-qns')}>Display All Questions</button>
                        <button className="btn btn-outline-secondary me-2" onClick={() => this.setActiveSection('update-qn')}>Update a Question</button>
                        <button className="btn btn-outline-secondary me-2" onClick={() => this.setActiveSection('delete-qn')}>Delete a Question</button>
                    </div>
                </nav>

                <div className="content-area mt-3">
                    {this.renderSection()}
                </div>
            </div>
        );
    }
}

window.QuestionService = QuestionService;

