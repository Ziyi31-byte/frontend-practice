import React, {useState} from 'react';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  Button,
  useColorScheme,
  View,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 30,
    backgroundColor: '#fff',
  },
  header: {
    height: 50,
    backgroundColor: '#537791',
  },
  headerText: {
    textAlign: 'center',
    color: '#fff', 
  },
  text: {
    textAlign: 'center',
    backgroundColor: '#E7E6E1',
  },
  dataWrapper: {
    marginTop: -1,
  },
  row: {
    flexDirection: 'row',
    backgroundColor: '#E7E6E1',
  },
  filterStatement: {
    fontSize: 16,
    marginLeft: 20, 
  },
});

const width= [40,80,80,80,80,80,200];

const dateRegex = new RegExp('^\\d\\d\\d\\d-\\d\\d-\\d\\d');

function jsonDateReviver(key, value) {
  if (dateRegex.test(value)) return new Date(value);
  return value;
}

async function graphQLFetch(query, variables = {}) {
  try {
    const response = await fetch('http://192.168.1.102:3000/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify({ query, variables })
    });
    const body = await response.text();
    const result = JSON.parse(body, jsonDateReviver);

    if (result.errors) {
      const error = result.errors[0];
      if (error.extensions.code == 'BAD_USER_INPUT') {
        const details = error.extensions.exception.errors.join('\n ');
        alert(`${error.message}:\n ${details}`);
      } else {
        alert(`${error.extensions.code}: ${error.message}`);
      }
    }

    return result.data;
  } catch (e) {
    alert(`Error in sending data to server: ${e.message}`);
  }
}

class IssueFilter extends React.Component {
  render() {
    return (
      <>
        <Text style={styles.filterStatement}>Dummy Statement for IssueFilter</Text>
      </>
    );
  }
}

function IssueRow(props) {
  const issue = props.issue;
  const createdDate = issue.created instanceof Date ? issue.created.toDateString() : issue.created;
  const dueDate = issue.due instanceof Date ? issue.due.toDateString() : issue.due;

  return (
    <View style={styles.row}>
      <Text style={[styles.text, { width: width[0] }]}>{issue.id}</Text>
      <Text style={[styles.text, { width: width[1] }]}>{issue.status}</Text>
      <Text style={[styles.text, { width: width[2] }]}>{issue.owner}</Text>
      <Text style={[styles.text, { width: width[3] }]}>{createdDate}</Text>
      <Text style={[styles.text, { width: width[4] }]}>{issue.effort}</Text>
      <Text style={[styles.text, { width: width[5] }]}>{dueDate || 'N/A'}</Text>
      <Text style={[styles.text, { width: width[6] }]}>{issue.title}</Text>
    </View>
  );
}

function IssueTable(props) {
  const issues = props.issues;
  
  return (
    <View style={styles.container}>
      <ScrollView horizontal={true}>
        <View>
          <View style={[styles.row, styles.header]}>
            <Text style={[styles.headerText, { width: width[0] }]}>ID</Text>
            <Text style={[styles.headerText, { width: width[1] }]}>Status</Text>
            <Text style={[styles.headerText, { width: width[2] }]}>Owner</Text>
            <Text style={[styles.headerText, { width: width[3] }]}>Created</Text>
            <Text style={[styles.headerText, { width: width[4] }]}>Effort</Text>
            <Text style={[styles.headerText, { width: width[5] }]}>Due</Text>
            <Text style={[styles.headerText, { width: width[6] }]}>Title</Text>
          </View>
          <View style={styles.dataWrapper}>
            {issues.map((issue) => (
              <IssueRow key={issue.id.toString()} issue={issue} width={width} />
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

class IssueAdd extends React.Component {
  constructor() {
    super();
    this.state = {
      title: '',
      owner: '',
      effort: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(name, value) {
    this.setState({ [name]: value });
  }
  
  handleSubmit() {
    const newIssue = {
      title: this.state.title,
      owner: this.state.owner,
      effort: Number(this.state.effort),
      due: new Date(new Date().getTime() + 1000*60*60*24*10),
    };
    this.props.createIssue(newIssue);

    // set back to empty 
    this.setState({
      title: '',
      owner: '',
      effort: '',
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Title"
          value={this.state.title}
          onChangeText={(text) => this.handleChange('title', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Owner"
          value={this.state.owner}
          onChangeText={(text) => this.handleChange('owner', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Effort"
          value={this.state.effort}
          onChangeText={(text) => this.handleChange('effort', text)}
          keyboardType="numeric"
        />
        <Button title="Add Issue" onPress={this.handleSubmit} />
      </View>
    );
  }
}

class BlackList extends React.Component {
  constructor() {   
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {name: ""}; 
  }

  setName(newname) {
    this.setState({name: newname});
  }

  async handleSubmit() {
    console.log(this.state.name);
    const query = `mutation myaddToBlacklist($newname: String!) {
      addToBlacklist(nameInput: $newname) 
    }`;
    const newname = this.state.name;
    const data = await graphQLFetch(query, { newname });
    this.setState({ name: '' });
  }

  render() {
    const { name } = this.state;
    return (
      <View>
        <TextInput 
          placeholder="Specify name to blacklist" 
          value={this.state.name} // Bind the input value to the component's state
          onChangeText={newName => this.setName(newName)} // Update the state on every change
        />
        <Button title="Add to Blacklist" onPress={this.handleSubmit} />
      </View>
    );
  }
}

export default class IssueList extends React.Component {
  constructor() {
    super();
    this.state = { issues: [] };
    this.createIssue = this.createIssue.bind(this);
  }

  componentDidMount() {
    this.loadData();
  }

  async loadData() {
    const query = `query {
      issueList {
        id 
        title 
        status 
        owner
        created 
        effort 
        due
      }
    }`;

    const data = await graphQLFetch(query);
    if (data) {
      this.setState({ issues: data.issueList });
    }
  }

  async createIssue(issue) {
    const query = `mutation issueAdd($issue: IssueInputs!) {
      issueAdd(issue: $issue) {
        id
      }
    }`;

    const data = await graphQLFetch(query, { issue });
    if (data) {
      this.loadData();
    }
  }
  
  render() {
    return (
      <>
        <IssueFilter />
        <IssueTable issues={this.state.issues}/>
        <IssueAdd createIssue={this.createIssue} />
        <BlackList /> 
      </>
    );
  }
}
