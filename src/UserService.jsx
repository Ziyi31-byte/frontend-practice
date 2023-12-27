const Router = ReactRouterDOM.BrowserRouter;
const Switch = ReactRouterDOM.Switch;
const Route = ReactRouterDOM.Route;
const Link = ReactRouterDOM.Link;

class UserService extends React.Component {
    constructor(props) {
      super(props);
    }

    state = {
      activeSection: 'sign-up'
    }; 

    setActiveSection = (section) => {
      this.setState({ activeSection: section });
    };
  
    handleUpdateProfile = async (auth, profileData) => {
      // Implement logic to update user profile using the "updateUserProfile" mutation
      const updateUserProfileMutation = `
        mutation UpdateUserProfile($auth: AuthInput!, $profile: UpdateUserProfileInput!) {
          updateUserProfile(auth: $auth, updates: $profile) {
            id
            email
            profile {
              name
              age
              location
            }
          }
        }`;
      
      try {
        const data = await graphQLFetch(updateUserProfileMutation, { auth: auth, profile: profileData });
        console.log("Updated user profile", data);
      } catch (error) {
        console.error("Error updating user profile:", error);
      }
    }
  
    handleDeregisterUser = async (auth) => {
      const deregisterUserMutation = `
        mutation deregisterUser($auth: AuthInput!) {
          deregisterUser(auth: $auth) 
        }`;
      
      try {
        const data = await graphQLFetch(deregisterUserMutation, { auth });
        if (data.deregisterUser == 'true') {
          console.log("User deregistered successfully");
        } else {
          console.log("User deregistered not successful");
        }
      } catch (error) {
        console.error("Error deregistering user:", error);
      }
    }
  
    handleSignUpUser = async (userData) => {
        const { email, password, profile } = userData;

        const signUpUserMutation = `
          mutation signUpUser($email: String!, $password: String!, $profile: AddUserProfileInput!) {
            signUpUser(email: $email, password: $password, profile: $profile) {
              id
              email
              profile {
                name
                age
                location
              }
            }
          }
        `;
    
        const variables = {
          email,
          password, 
          profile,
        };
        
        try {
          const data = await graphQLFetch(signUpUserMutation, variables);
          console.log("Signed up user", data);
        } catch (error) {
          console.error("Error signing up user:", error);
        }
      }

    accessUserProfile = async (auth) => {
        const getUserProfileQuery = `
        query getUserProfile($auth: AuthInput!) {
          accessUserProfile(auth: $auth) {
            id
            email
            profile {
              name
              age
              location
            }
          }
        }`;
  
      try {
        const data = await graphQLFetch(getUserProfileQuery, { auth });
        return data.accessUserProfile;
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    }

    renderSection = () => {
      const { activeSection } = this.state;
      switch (activeSection) {
        case 'sign-up':
          return <SignUpUserForm handleSignUpUser={this.handleSignUpUser} />;
        case 'display-profile':
          return <UserProfileDisplay accessUserProfile={this.accessUserProfile} />;
        case 'update-profile':
          return <UserProfileUpdateForm onUpdateProfile={this.handleUpdateProfile} />;
        case 'deregister-profile':
          return <DeregisterButton onDeregister={this.handleDeregisterUser} />;
        default:
          return <SignUpUserForm handleSignUpUser={this.handleSignUpUser} />;
      }
    };
  
    render() {
      return (
        <div className="outer-container">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
              <button className="btn btn-outline-secondary me-2" onClick={() => this.setActiveSection('sign-up')} >Sign Up</button>
              <button className="btn btn-outline-secondary me-2" onClick={() => this.setActiveSection('display-profile')} >Show Profile</button>
              <button className="btn btn-outline-secondary me-2" onClick={() => this.setActiveSection('update-profile')} >Update Profile</button>
              <button className="btn btn-outline-secondary me-2" onClick={() => this.setActiveSection('deregister-profile')} >Deregister Profile</button>
            </div>
          </nav>

          <div className="content-area mt-3">
            {this.renderSection()}
          </div>
        </div>
      );
    }
  }

window.UserService = UserService;
  