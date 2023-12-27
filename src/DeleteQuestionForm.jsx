class DeleteQuestionForm extends React.Component {
    state = {
        id: '', 
        email: '',
        password: '',
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleSubmit = async (e) => {
        e.preventDefault();
        const { id, email, password } = this.state;

        const auth = {
            email: email, 
            password: password};
        
        this.props.onDeleteQuestion( id, auth );
        this.setState({ id: '', email: '', password: '' }); 
    };

    render() {
        const { id, email, password } = this.state;

        return (
            <div className="container mt-4">
                <h2 className="mb-3">Delete Your Questions</h2>
                <p>Please input the question ID, your email and password for authorizations to delete the question.</p>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="id">Question ID:</label>
                        <input type="text" className="form-control" name="id" placeholder="Question ID" value={id} onChange={this.handleChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input type="email" className="form-control" name="email" placeholder="Email" value={email} onChange={this.handleChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input type="password" className="form-control" name="password" placeholder="Password" value={password} onChange={this.handleChange} />
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-danger">Delete Question</button>
                    </div>
                </form>
            </div>
        );
    }
}

window.DeleteQuestionForm = DeleteQuestionForm;

