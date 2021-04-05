# 가이드에 나와있는 npx 명령어는 한번만 실행하고 지움
- 설치할때마다 새로운 버전을 사용하므로 최신 버전으로 create-react-app을 사용할 수 있음
- 저장공간을 적게 사용
---

# build 할 때는 npm run build 를 이용해 빌드하면 buuild 파일이 만들어짐
- 경고를 없에는 작업후 빌드해 보안적 취약점들을 감춰줌
- npm run start 을 통해 실행하면 로드하는 자원의 크기가 매우큼 
  - 이를 줄여주고 취약점들을 감춰 주는 작업이 빌드작업.
- 실제 서비스 할 때에는 빌드 안의 파일들을 이용 
- `npm install -g serve`
  - serve install
- `npx serve -s build`
  - use serve to build
  - 위 명령어를 이용해 빌드 후 로드 되는 자원의 크기를 확인 
---

# state 와 props
- 사용자는 컴포넌트 내부적으로 사용되는 것들을 state 라고 함 
- 컴포넌트가 좋은 부품이 되기 위해서는 props와 내부의 state라는 정보가 철저히 분리되어 있어야 함
  - 양측의 편리성을 도모하는 것이 목표
- component가 더 다양한 기능을 하기 위해 필요한 것이 state
- 내부에서 사용되는 정보들을 state로 만들고 props를 이용해 정보를 다룸
- 내부의 정보를 은닉하고 숨기는 것이 좋은 사용성을 만드는 것의 첫 단계
  - ex) 전선이 삐져 나와 있는 핸드폰 처럼

## Props vs State
> 두개 모두 렌더를 유발함 (값 변동시 리액트가 감지하여 리렌더링 실시)
  - read-onnly
    - 컴포넌트 안에서 props안의 값을 바꾸는 것은 금지
  - cant be modified
    - 컴포넌트가 props를 안의 값을 바꿀수 없음
      - 하위가 상위의 정보를 바꿀 수 없는 것 (법칙을 거스르는 행위, 마치 자식이 부모의 유전자를 바꿀수 없는 것 처럼)
      - 상위 컴포넌트가 하위 컴포넌트에게 값을 전달할 때는 props를 이용해 전달( 
        - ex) data={this.state.contents}
      - 하위가 상위 컴포넌트의 값을 바꾸고자 할 때?
        - props를 이용할 수 없음 (readonly)
        - 그러므로 이벤트를 발생시켜 상위 정보에 변동을 일으키게 함 (onChagePage() )
- state
  - 내부적으로 필요한 정보의 경우 state를 이용해 관리함
  - 값이 변동 되는 것은 비동기적인 방식
  - state는 this.setState를 이용해서 값을 바꿀수 있음
- props → component(state 컴포넌트는 state를 가지고 상태가 결정됨) → DOM



---
# 부록 
## Arrow function
> ES6부터 적용된 문법임
> - 짧은 표기법 = 가독성 향상
> - 생성자로 사용할 수 없음
> - this 바인딩?
>   - dynamic scope가 아닌 lexical scope의 this를 가지고 있음
>   - this뿐만 아니라 arguments, super 이나 new.target을  Binding 하지 않음
- 교체하기 쉬운 경우
  - this나 arguments를 사용하지 않는 경우
  - .bind(this)를 사용하는 경우
- 교체하기 힘든 경우
  - new등을 사용하는 constructable한 함수
  - prototype에 덧붙여진 함수나 method들(보통 this를 사용합니다.)
  - this, arguments, super, new.target등을 함수의 인자로 사용하는 경우

## redux
- 하나의 저장소에 정보를 저장해두고 
- 그 저장소에서 변동이 일어나면 
- 그와 관련된 모든 값이 변동이 일어남
  - 컴포넌트의 중첩이 많아지면 골치 아파지는 상황을 해소해줌


## arr`.concat()` ?
- concat() 함수는 배열의 원본을 수정하지 않고 인자로 받은 값을 배열에 추가하여 반환함
