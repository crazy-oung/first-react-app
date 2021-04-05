import React , { Component } from 'react';

// <Nav>
class Nav extends Component {
    shouldComponentUpdate(newProps, newState) {
        console.log("! Nav shouldComponentUpdate");
        console.log(newProps.date, this.props.data);
        if(newProps.data === this.props.data){
            return false; // false로 설정시 렌더링 하지 않음 
            // 만일 이러한 방식으로 리렌더링 되지 않을 컴포넌트를 설정했는데 
            // concat이 아니라 원본 배열을 수정하는 방식을 사용했을 경우
            // 이 같은 조건문이 작동하지 않게됨
            // 원본이 바뀌어 버렸으므로 항상 같은 것으로 처리되어 리렌더링 되어야 할 때에도 리렌더링 되지 않는 상황에 발생할 수 있음
        }

        return true; // true 반환시 렌더링 진행 
    }
    render() {
        console.log('Nav render');
        var list = [];
        var data = this.props.data;
        data.forEach((el, idx) => {
            // Each child in a list should have a unique "key" prop. 
            // 리액트의 내부적으로 필요한 정보로 키에는 id값을 주면 해결
            list.push(
                <li key={el.id}>
                    <a 
                        href={"/content/"+el.id} 
                        data-id={el.id}
                        onClick={(e)=>{
                            e.preventDefault();
                            // console.log(e);
                            // console.log(e.target.dataset.id);
                            // debugger;
                            // this.props.onChangePage(e.target.dataset.id);
                            this.props.onChangePage(el.id);
                        }}
                    >{el.id}. {el.title}</a>
                </li>
            )
        });
        return (
            <nav>
                <ul>
                    {list}
                </ul>
            </nav>
        );
    }
}

export default Nav;

