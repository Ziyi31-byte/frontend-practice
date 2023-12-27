class UpdateQuestionForm extends React.Component {
    state = {
        id: '', 
        email: '',
        password: '', 
        title: '',
        description: '',
        category: '', 
        complexity: ''
    };

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        const { id, email, password, title, description, category, complexity } = this.state;

        const auth = {
            email,
            password,
        };
        
        const questionInput = {
            title: title === "" ? undefined : title,
            description: description === "" ? undefined : description,
            category: category === "" ? undefined : category,
            complexity: complexity === "" ? undefined : complexity,
        };

        this.props.onUpdateQuestion(id, auth, questionInput);
        this.setState({ id: '', email: '', password: '', title: '', description: '', category: '', complexity: ''});
    };

    render() {
        const { id, email, password, title, description, category, complexity } = this.state;

        return (
            <div className="container">
                <h2>Update Your Questions</h2>
                <p>To update your question, please enter the question id, your email and password for authorization purpose.</p>
                <p>Please also enter the question fields that you want to update and leave the other fields blank.</p>
                <form onSubmit={this.handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="id" className="form-label">Question ID:</label>
                        <input type="text" className="form-control" name="id" placeholder="Question ID" value={id} onChange={this.handleChange} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email:</label>
                        <input type="email" className="form-control" name="email" placeholder="Email" value={email} onChange={this.handleChange} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password:</label>
                        <input type="password" className="form-control" name="password" placeholder="Password" value={password} onChange={this.handleChange} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title:</label>
                        <input type="text" className="form-control" name="title" placeholder="Question Title" value={title} onChange={this.handleChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description:</label>
                        <textarea className="form-control" name="description" placeholder="Describe your question" value={description} onChange={this.handleChange}></textarea>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="category" className="form-label">Category:</label>
                        <input type="text" className="form-control" name="category" placeholder="Question Category" value={category} onChange={this.handleChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="complexity" className="form-label">Complexity:</label>
                        <input type="text" className="form-control" name="complexity" placeholder="Question Complexity" value={complexity} onChange={this.handleChange} />
                    </div>
                    <div className="mb-3">
                        <button type="submit" className="btn btn-primary">Update Question</button>
                    </div>
                </form>
            </div>
        );
    }
}

window.UpdateQuestionForm = UpdateQuestionForm;   
