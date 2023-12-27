// UserProfileUpdateForm.jsx

// import React from 'react';

class UserProfileUpdateForm extends React.Component {
    state = {
        email: '',
        password: '', 
        name: '',
        age: '',
        location: '',
    };

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        const { email, password, name, age, location } = this.state;

        const auth = {
            email,
            password,
        };
        
        const profileData = {
            name: name === "" ? null : name,
            age: age === "" ? null : parseInt(age, 10),
            location: location === "" ? null : location,
        };

        this.props.onUpdateProfile(auth, profileData);
        this.setState({ email: '', password: '', name: '', age: '', location: ''});
    };

    render() {
        const { email, password, name, age, location } = this.state;

        return (
            <div className="container my-4">
                <h2>Update Profile</h2>
                <p>To update your profile, please enter your email and password for authorization purposes.</p>
                <p>Please also enter the profile fields that you want to update and leave the other fields blank.</p>
                <form onSubmit={this.handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email:</label>
                        <input type="email" className="form-control" name="email" placeholder="Email" value={email} onChange={this.handleChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password:</label>
                        <input type="password" className="form-control" name="password" placeholder="Password" value={password} onChange={this.handleChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name:</label>
                        <input type="text" className="form-control" name="name" placeholder="Name" value={name} onChange={this.handleChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="age" className="form-label">Age:</label>
                        <input type="text" className="form-control" name="age" placeholder="Age" value={age} onChange={this.handleChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="location" className="form-label">Location:</label>
                        <input type="text" className="form-control" name="location" placeholder="Location" value={location} onChange={this.handleChange} />
                    </div>
                    <div className="d-grid gap-2">
                        <button type="submit" className="btn btn-primary">Update Profile</button>
                    </div>
                </form>
            </div>
        );
    }
}

window.UserProfileUpdateForm = UserProfileUpdateForm;   
