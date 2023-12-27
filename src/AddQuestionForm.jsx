// QuestionForm.jsx

// import React from 'react';

class AddQuestionForm extends React.Component {
    state = {
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
        const { email, password, title, description, category, complexity } = this.state;

        const auth = {
            email,
            password,
        };
        
        const questionInput = {
            title: title,
            description: description,
            category: category === "" ? null : category,
            complexity: complexity === "" ? null : complexity,
        };

        this.props.onQuestionSubmit(auth, questionInput);
        this.setState({ email: '', password: '', title: '', description: '', category: '', complexity: ''}); 
    };

    render() {
        const { email, password, title, description, category, complexity } = this.state;

        return (
            <div className="container mt-4">
                <h2>Submit a Question</h2>
                <p>To submit a question, please enter the question id, your email and password for authorization purpose.</p>
                <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input type="email" className="form-control" name="email" placeholder="Email" value={email} onChange={this.handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input type="password" className="form-control" name="password" placeholder="Password" value={password} onChange={this.handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="title">Title:</label>
                    <input type="text" className="form-control" name="title" placeholder="Question Title" value={title} onChange={this.handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <textarea className="form-control" name="description" placeholder="Describe your question" value={description} onChange={this.handleChange} required></textarea>
                </div>
                <div className="form-group">
                    <label htmlFor="category">Category:</label>
                    <input type="text" className="form-control" name="category" placeholder="Question Category" value={category} onChange={this.handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="complexity">Complexity:</label>
                    <input type="text" className="form-control" name="complexity" placeholder="Question Complexity" value={complexity} onChange={this.handleChange} />
                </div>
                <div className="form-group">
                    <button type="submit" className="btn btn-primary">Submit</button>
                </div>
                </form>
            </div>
        );
    }
}

window.AddQuestionForm = AddQuestionForm;

