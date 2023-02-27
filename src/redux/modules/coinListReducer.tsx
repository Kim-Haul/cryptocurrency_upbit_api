// 액션 타입 설정
const ADD = 'coinListReducer/ADD' as const;
const DELETE = 'coinListReducer/DELETE' as const;

// 초기값 설정
const initialState = {
  RecommendList: [{ genre: '먼치킨' }, { genre: '판타지' }],
};

// Action Creators
// 액션 생성함수에서 액션 개체 리턴
export function plusGenre(addGenre: any) {
  console.log('장르 추가 액션을 실행.');
  return { type: ADD, addGenre: addGenre };
}

export function deleteGenre(deleteGenre: any) {
  console.log('장르 삭제 액션을 실행.');
  return { type: DELETE, deleteGenre };
}

// Reducer
// 액션생성함수가 요청 -> 실제로 바꾸는건 리듀서에서
export default function reducer(state = initialState, action: any = {}) {
  switch (action.type) {
    case 'coinListReducer/ADD': {
      console.log('리듀서에서 값 추가.');
      const newRecommendList = [
        ...state.RecommendList,
        { genre: action.addGenre },
      ];
      return { RecommendList: newRecommendList };
    }

    case 'coinListReducer/DELETE': {
      console.log('리듀서에서 값 삭제.');
      const newRecommendList = state.RecommendList.filter((element, idx) => {
        return element.genre !== action.deleteGenre;
      });
      return { RecommendList: newRecommendList };
    }

    default:
      return state;
  }
}
