function App() {
  const Router = ReactRouterDOM.BrowserRouter;
  const Switch = ReactRouterDOM.Switch;
  const Route = ReactRouterDOM.Route;

  return (
    <Router>
      <div>
        <Header />
        <NavigationPane />
        
        <Switch>
          <Route exact path="/">
            <LandingPage />
          </Route>
          <Route path="/users">
            <UserService />
          </Route>
          <Route path="/questions">
            <QuestionService />
          </Route>
          {/* You can add more routes as required */}
        </Switch>
      </div>
    </Router>
  );
}

window.App = App;

const rootElement = document.getElementById('contents');
ReactDOM.render(<App />, rootElement);
