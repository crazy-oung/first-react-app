import React , { Component } from 'react';


// <UpdateContent>
class UpdateContent extends Component {
  constructor(props){
    super(props);
    this.state = {
      title : this.props.data.title,
      desc : this.props.data.desc,
      id: this.props.data.id
    }
  }
  inputFormHandler = (e) => {
    console.log(e.target.value);
    // this.setState({
    //   title: e.target.value,
    // })
    this.setState({
      [e.target.name]: e.target.value,
    })
  }
  render() {
    console.log('UpdateContent render', this.props);
    console.log();
    return (
      <article> 
          <h2>Update</h2>
          <form action="/update_process" method="post"
            onSubmit={(e) => {
              e.preventDefault();
              // console.log(this.props);
              // debugger;
              
              var content = {id: this.state.id, title: this.state.title.trim(), desc: this.state.desc.trim()};
              if(content.title.trim().length == 0 || content.desc.trim().length == 0){
                alert("모든 값을 채워 주세요.");
                return false;
              }
              
              this.props.onSubmit(content);
              alert("제출완료");
            }}
          >
          {/* 
            <p><input type="text" name="title" placeholder="title" value={this.props.data.title}></input></p> 
            위와 같이 value에 직접적으로 props 값을 넣어주면 값을 변경시킬 수 없도록 리액트가 막기 때문에 state화 해주어야 함
          */}
          <input type="hidden" name="id" value={this.state.id}></input>
          <p><input 
                type="text" 
                name="title" 
                placeholder="title" 
                value={this.state.title} 
                // onChange={(e)=>{
                //   console.log(e.target.value);
                //   this.setState({
                //     title: e.target.value,
                //   })
                onChange={this.inputFormHandler}></input>
          </p>
          <p>
            <textarea name="desc" placeholder="desc" value={this.state.desc} 
              //   onChange={(e)=>{
              //     console.log(e.target.value);
              //     this.setState({
              //       desc: e.target.value,
              //     })
              // }}
              onChange={this.inputFormHandler}
              ></textarea>
          </p>
          <p>
            <input type="submit"></input>
          </p>
        </form>
      </article>
    );
  }
}

export default UpdateContent;