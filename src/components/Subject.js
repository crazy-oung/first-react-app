import React , { Component } from 'react';

// <Control>
class Control extends Component {
  render() {
    console.log('Subject render');
    return (
      <header>
        {/* <h1>NEW HTML</h1> */}
        <h1><a href="/" onClick={(e)=>{
          // console.log(e);
          e.preventDefault(); 
          this.props.onChangePage();
          console.log(this);
        }}>new! {this.props.title}</a></h1>
        <h2>{this.props.sub}</h2>
    </header>
    );
  }
}

  export default Control;