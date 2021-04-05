import React , { Component } from 'react';

// <CreateContent>
class CreateContent extends Component {
    render() {
      console.log('Content render');
      return (
        <article> 
            <h2>Create</h2>
            <form action="/create_process" method="post"
              onSubmit={(e) => {
                e.preventDefault();
                // console.log(e);
                // console.log(e.target.title);
                // console.log(e.target.title.value);
                // console.log(e.target.desc.value);
                // console.log(this.props);
                // debugger;
                var content = {title: e.target.title.value.trim(), desc: e.target.desc.value.trim()};
                if(content.title.trim().length == 0 || content.desc.trim().length == 0){
                  alert("모든 값을 채워 주세요.");
                  return false;
                }
                
                this.props.onSubmit(content);
                alert("제출완료");
              }}
            >
              <p><input type="text" name="title" placeholder="title"></input></p>
              <p>
                <textarea name="desc" placeholder="desc"></textarea>
              </p>
              <p>
                <input type="submit"></input>
              </p>
            </form>
            <p>{this.props.desc}</p>
        </article>
      );
    }
  }

  export default CreateContent;