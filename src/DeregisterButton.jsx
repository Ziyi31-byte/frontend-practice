// DeregisterButton.jsx

// import React from 'react';

class DeregisterButton extends React.Component {
    state = {
        email: '',
        password: '',
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleSubmit = async (e) => {
        e.preventDefault();
        const { email, password } = this.state;

        const auth = {
            email: email, 
            password: password};
        
        this.props.onDeregister( auth );
        this.setState({ email: '', password: ''});
    };

    render() {
        const { email, password } = this.state;

        return (
            <div className="container mt-4">
                <h2 className="mb-3">Deregister the Account</h2>
                <p>Please input your email and passwords for authorizations to deregister the account.</p>
                <form onSubmit={this.handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email:</label>
                        <input type="email" className="form-control" name="email" placeholder="Enter your email" value={email} onChange={this.handleChange} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password:</label>
                        <input type="password" className="form-control" name="password" placeholder="Enter your password" value={password} onChange={this.handleChange} required />
                    </div>
                    <div className="d-grid gap-2">
                        <button type="submit" className="btn btn-danger">Deregister</button>
                    </div>
                </form>
            </div>

        );
    }
}

window.DeregisterButton = DeregisterButton;

