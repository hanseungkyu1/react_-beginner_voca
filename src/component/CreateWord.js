import { useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import useFetch from "../hooks/useFetch"

export default function CreateWord() {
    const days = useFetch(`http://localhost:3001/days`);
    const history = useHistory(); // react-router에서 지원하는 기능
    
    // 느린 환경에서 처리중인 통신이 있으면 같은 버튼 여러번 눌러도 통신이 끝나기 전까지 버튼이 안눌리게 하기 위한 state
    // isLoading이 false일 때만 실행하게끔
    const [isLoading, setIsLoading] = useState(false);

    function onSubmit(e) {
        e.preventDefault();

        if(!isLoading) {
            setIsLoading(true);
        
            fetch(`http://localhost:3001/words/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    day: dayRef.current.value,
                    eng: engRef.current.value,
                    kor: korRef.current.value,
                    isDone: false,
                }),
            }).then(res => {
                if(res.ok) {
                    alert('생성이 완료 되었습니다.');
                    history.push(`/day/${dayRef.current.value}`); // 페이지 이동시켜줌
                    setIsLoading(false);
                }
            });
        }
    }

    const engRef = useRef(null); // Dom에 접근할 수 있게 해줌, 스크롤 위치나 포커스 확인할 때
    const korRef = useRef(null);
    const dayRef = useRef(null);

    return <form onSubmit={onSubmit}>
        <div className="input_area">
            <label>Eng</label>
            <input type="text" placeholder="computer" ref={engRef}/>
        </div>
        <div className="input_area">
            <label>Kor</label>
            <input type="text" placeholder="컴퓨터" ref={korRef}/>
        </div>
        <div className="input_area">
            <label>Day</label>
            <select ref={dayRef}>
                {days.map(day => (
                    <option key={day.id} value={day.day}>
                        {day.day}
                    </option>
                ))}
            </select>
        </div>
        <button style={{
            opacity: isLoading ? 0.3 : 1,
        }}
        >
            {isLoading ? "saving..." : "저장"}
        </button>
    </form>
}