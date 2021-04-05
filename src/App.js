import React , { Component } from 'react';
import Nav from './components/Nav';
import ReadContent from './components/ReadContent';
import CreateContent from './components/CreateContent';
import UpdateContent from './components/UpdateContent';
import Subject from './components/Subject';
import Control from './components/Control';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  // 생성자
  constructor(props){
    super(props);
    this.max_content_id = 3; 
    //  리스트 사이즈를 state에 두지 않은 이유는 리스트 사이즈 변경이 일어난다고 해서 
    // 리렌더링이 일어날 필요가 없으므로 리렌더링 방지 차원에서 state가 아닌 외부에 선언
    this.state = {
      mode: 'welcome',
      selected_content_id:2,
      subject: {title: 'First', sub:'react-app'},
      welcome: {title: 'Welcome', desc: 'Hello, React!!'},
      contents: [
        // <li><a href="1.html">HTML</a></li>
        // <li><a href="2.html">CSS</a></li>
        // <li><a href="3.html">JS</a></li>
        {id:1, title: 'HTML', desc: 'HTML is for information'},
        {id:2, title: 'CSS', desc: 'CSS is for design'},
        {id:3, title: 'Javascript', desc: 'Javascript is for interactive'},
      ]
    }
  }
  getChoosenContent() {
    if(this.state.contents.filter(id => this.state.selected_content_id)){
      let content = this.state.contents.find(el => el.id === this.state.selected_content_id);
      console.log("content ",content);
      // _title = content.title;
      // _desc = content.desc;
      return content;
    } else { 
      alert("땡!");
      return null;
    }
  }
  getArticle() {
    var _title, _desc, _article = null;
    if(this.state.mode === 'welcome'){
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
      _article = <ReadContent title={_title} desc={_desc}></ReadContent>
    } else if(this.state.mode === 'read'){
      // if(this.state.contents.filter(id => this.state.selected_content_id)){
      //   let content = this.state.contents.filter(el => el.id == this.state.selected_content_id)[0];
      //   // console.log(content);
      //   _title = content.title;
      //   _desc = content.desc;
      // } else { 
      //   alert("땡!");
      // }
      let _content = this.getChoosenContent();
      _article = <ReadContent title={_content.title} desc={_content.desc}></ReadContent>
    } else if(this.state.mode === 'create'){
      _article = <CreateContent onSubmit={(_content) => {
        console.log(_content);
        // this.max_content_id++;
        // this.state.contents.push(
        //   {id:this.max_content_id, title: _content.title, desc: _content.desc}
        // );
        // _content = this.state.contents.concat(
        //   {id: ++this.max_content_id, title: _content.title, desc: _content.desc}
        // );
        // var content = this.state.contents.concat(
        //   Object.assign(_content,{id: ++this.max_content_id})
        // );
        // assign() 객체에 값을 추가 Object.assign(content,{id: ++this.max_content_id});
        //  immutable js를 사용하면 원본을 절대 바꾸지 않음
        //  Immutable.Map......... 
        var content = Array.from(this.state.contents);
        content.push(Object.assign({id: ++this.max_content_id}, _content))
        this.setState({
          contents: content,
          mode: 'read',
          selected_content_id: this.max_content_id,
        })
      }}></CreateContent>
    } else if(this.state.mode === 'update'){ 
      let content = this.getChoosenContent();
      _article = <UpdateContent data={content}
        onSubmit={(_content) => {
          console.log(_content);
          // content = this.state.contents.concat(_content);
          var contents = Array.from(this.state.contents);
          if(this.state.contents.filter((id, idx) => this.state.selected_content_id)){
            let idx = this.state.contents.findIndex(el => el.id === this.state.selected_content_id);
            console.log("content idx ",idx);
            contents[idx].title = _content.title;
            contents[idx].desc = _content.desc;
          }

          this.setState({
            contents: contents,
            mode: 'read',
          })
      }}></UpdateContent>
    }

    return _article;
  } // -- getArticle
  // redner() 함수는 state나 props의 값이 바뀔경우 다사 실행되도록 리액트에서 설정 되어 있음
  // 화면이 다시 그려지는 것( 다시 렌더링 하는 것 )
  render() {
    console.log('App render');
    console.log('render ==> ', this);
    return (
      <div className="App">
        <img src={logo} width="100px" className="App-logo" alt="logo" />
        {/* Components and props를 이용한 사용자 정의 태그 */}
        {/* <Subject title="{this.state.subject.title}" sub="react-app"></Subject>
        <Subject title="Second" sub="react-app"></Subject> */}

        {/* 
          - state 를 이용
          - 상위 컴포넌트의 값들을 하위에서 사용하는 것이 가능함
        */}
        <Subject 
          title={this.state.subject.title} 
          sub={this.state.subject.sub} 
          onChangePage={()=>{
            // alert("hi");
            this.setState({
              mode: 'welcome'
            });
            console.log(this);
          }}
        >
        </Subject>

        {/* <header>
          // 
          //   - 리액트 에서는 html코드를 html과 완벽히 똑같게 코딩하지 않음
          //   - 그러므로 onclick을 사용하고 싶다면 리액트에서는 onClick으로 써야 인식됨
          //  
          <h1><a href="/" onClick={function(e){
            // alert("!");
            console.log(e);
            e.preventDefault(); // 이벤트의 발생을 막는 함수 
            // this.state.mode = 'welcome';  
            // 위 경우에는 this는 아직 만들어 지지 않은 것으로 undefined 라서 오류가 발생
            // 따라서 this를 사용하고 싶다면 함수가 끝는 직후에  .bind(this)를 이용해 this의 state안의 데이터에 대한 값을 변경하면 됨
            // this.state.mode = 'welcome';  <-- 이 방식을 사용할 경우 리액트는 값이 바뀌었음을 감지하지 않아 리렌더링을 하지 않음. 
            // 태그 내부 함수에서는 this를 렌더 함수에서 접근 하는 this에 같게 접근하지 않아 이렇게 setState를 이용해 설정
            // 바인드를 통해 객체를 주입해 함수 내부에서 해당 객체가 this가 되는 개념
            this.setState({
              mode: 'welcome'
            }); // setSate를 통해 리액트에게 값이 바뀌었음을 알림
          }.bind(this)}>new! {this.state.subject.title}</a></h1>
          * .bind(this) 대신 arrow function을 이용해 this 바인딩 간단히 해결 가능?
          <h2>{this.state.subject.sub}</h2>
        </header> */}

        {/* <ul>
          <li><a href="/create">create</a>
          </li><li><a href="/cupdate">update</a></li>
          <li><input type="button" value="delete"></input></li>
        </ul> */}
        <Control onChangeMode={(_mode) => {
            if(_mode === 'delete'){
              if(window.confirm('정말 삭제하시겠습니까?')){
                var _content = Array.from(this.state.contents);
                if(this.getChoosenContent() !== undefined){
                  _content.splice(this.state.contents.findIndex(el => el.id === this.state.selected_content_id), 1);
                  alert('삭제완료');
                  this.setState({
                    mode: 'welcome',
                    contents: _content,
                  })
                } else {
                  alert('해당 글이 존재하지 않습니다.');
                }
              }
            }
            this.setState({
              mode: _mode,
            })
        }}>
        </Control>
        <Nav 
          onChangePage={(selected_id)=>{
              this.setState({
                mode:'read',
                selected_content_id: Number(selected_id),
              });
          }} 
          data={this.state.contents}></Nav>
        {/* <Content title="HTML" desc="HTML is HyperText Markup Language."></Content> */}
        
        {/* <ReadContent title={_title} desc={_desc}></ReadContent> */}
        {/* {_article} */}
        {this.getArticle()}

        <hr/>
        {/* <h1>hello React</h1> */}
      </div>
    );
  }
}

 


// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//       <img src={logo} className="App-logo" alt="logo" />
//       <h1>hello React</h1>
//     </div>
//   );
// }

// <Subject>
// jsx 로 작성하면 알아서 자바스크립트로 컨버팅하여 출력
// function Subject() {
//   return (
//     <header>
//         <h1>NEW HTML</h1>
//         new!
//     </header>
//   );
// }
// class Subject extends Component {
//   render() {
//     return (
//       <header>
//         {/* <h1>NEW HTML</h1> */}
//         <h1>new! {this.props.title}</h1>
//         <h2>{this.props.sub}</h2>
//     </header>
//     );
//   }
// }


// <Nav>
// function Nav() {
//   return (
//     <nav>
//         <ul>
//             <li><a href="1.html">HTML</a></li>
//             <li><a href="2html">CSS</a></li>
//             <li><a href="3.html">JS</a></li>
//         </ul>
//     </nav>
//   );
// }
// class Nav extends Component {
//   render() {
//     return (
//       <nav>
//           <ul>
//               <li><a href="1.html">HTML</a></li>
//               <li><a href="2html">CSS</a></li>
//               <li><a href="3.html">JS</a></li>
//           </ul>
//       </nav>
//     );
//   }
// }
//  위 코드를 /src/componets/Nav.js  으로 이동 
//  외부의 컴포넌트를 import를 통해 컴포넌트를 사용할 수 있다.

// <Content>
// class Content extends Component {
//   render() {
//     return (
//       <article> 
//           <h2>{this.props.title}</h2>
//           <p>{this.props.desc}</p>
//       </article>
//     );
//   }
// }
// 아래 코드 오류..
// this.props
// function Content() {
//   return (
//       <article> 
//           <h2>{this.props.title}</h2>
//           <p>{this.props.desc}</p>
//       </article>
//   );
// }




export default App;
