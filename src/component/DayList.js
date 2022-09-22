import { Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";

export default function DayList() {
    // const [days, setDays] = useState([]);

    // useEffect(() => {
    //     fetch('http://localhost:3001/days')
    //     .then(res => {
    //         return res.json();
    //     })
    //     .then(data => {
    //         setDays(data);
    //     })
    // }, []); // 빈 배열을 사용하면 렌더링 직후 한번만 실행

    const days = useFetch('http://localhost:3001/days');

    // 느린 환경에서 로딩이 느릴 경우에 로딩... 표시
    if(days.length === 0) {
        return <span>Loading...</span>
    }

    return (
        <ul className="list_day">
            {days.map(day => (
                <li key={day.id}>
                    <Link to={`/day/${day.day}`}>Day {day.day}</Link>
                </li>
            ))}
        </ul>
    )

}