import React from 'react';
import './App.css';
import Header from "./components/common/Header";
import Tile from './components/tile/Tile';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      mylist: [],
      recommendations: []
    };
  }

  componentDidMount() {
    this.getData();
  }

  async getData() {
    const res = await fetch('./assets/data.json');
    const data = await res.json();
    const mylist = data.mylist;
    const recommendations = data.recommendations;
    return this.setState({ mylist, recommendations });
  }

  handleAdd = (item) => {
    const mylist = [...this.state.mylist];
    mylist.push(item);
    const recommendations = [...this.state.recommendations];
    const index = recommendations.findIndex(x => x.id === item.id);
    recommendations.splice(index, 1);
    this.setState({
      mylist,
      recommendations
    });
  }

  handleRemove = (item) => {
    const mylist = [...this.state.mylist];
    const index = mylist.findIndex(x => x.id === item.id);
    mylist.splice(index, 1);
    const recommendations = [...this.state.recommendations];
    recommendations.push(item);
    this.setState({
      mylist,
      recommendations
    });
  }

  render() {
    const { mylist, recommendations } = this.state;
    return (
      <div className="App">
        <Header />
        <h2 className="main-title">My List</h2>
        <div className="tile-container">
          {mylist.map((item) => (
            <Tile key={item.id} item={item} type="mylist" handleRemove={this.handleRemove} />
          ))}
          {mylist.length === 0 && (
            <p className="no-records-text">No records found.</p>
          )}
        </div>
        <h2 className="main-title">Recommendations</h2>
        <div className="tile-container">
          {recommendations.map((item) => (
            <Tile key={item.id} item={item} type="recommendation" handleAdd={this.handleAdd}/>
          ))}

          {recommendations.length === 0 && (
            <p className="no-records-text">No recommendations found.</p>
          )}
        </div>
      </div>
    );
  }
}

export default App;
