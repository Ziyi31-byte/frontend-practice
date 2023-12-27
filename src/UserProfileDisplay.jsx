// UserProfileDisplay.jsx

// import React from 'react';

class UserProfileDisplay extends React.Component {
    state = {
        email: '',
        password: '',
        user: null
    };

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleSubmit = async (e) => {
        e.preventDefault();
        const { email, password, user } = this.state;

        const auth = {
            email, 
            password};
        
        const userData = await this.props.accessUserProfile( auth );
        this.setState({ email: '', password: '', user: userData });        
    }

    render() {
        const { email, password, user} = this.state;
        return (
            <div className="container my-4">
                <h2>Access the Profile</h2>
                <p>Please input your email and passwords for authorizations to access the profile</p>
                <form onSubmit={this.handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email:</label>
                        <input type="email" className="form-control" name="email" placeholder="Email" value={email} onChange={this.handleChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password:</label>
                        <input type="password" className="form-control" name="password" placeholder="Password" value={password} onChange={this.handleChange} />
                    </div>
                    <div className="d-grid gap-2">
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </div>
                </form>
                {user && (
                <div className="mt-4">
                    <h3>Profile Information</h3>
                    <table className="table">
                        <tbody>
                            <tr>
                            <th>ID</th>
                            <td>{user.id}</td>
                            </tr>
                            <tr>
                            <th>Email</th>
                            <td>{user.email}</td>
                            </tr>
                            <tr>
                            <th>Name</th>
                            <td>{user.profile.name}</td>
                            </tr>
                            <tr>
                            <th>Age</th>
                            <td>{user.profile.age}</td>
                            </tr>
                            <tr>
                            <th>Location</th>
                            <td>{user.profile.location}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                )}
            </div>
        );
    }
}

window.UserProfileDisplay = UserProfileDisplay;

