import React, { Component } from 'react';
import Section from './components/share/Section';
import ArticlesView from './components/ArticlesView';

class App extends Component {
  render() {
    return (
      <Section>
        <ArticlesView />
      </Section>
    );
  }
}
export default App;
