import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import Word from "./Word";

export default function Day() {
    // dummy.words
    const day = useParams().day;

    // const [words, setWords] = useState([]);

    // useEffect(() => {
    //     fetch(`http://localhost:3001/words?day=${day}`)
    //     .then(res => {
    //         return res.json();
    //     })
    //     .then(data => {
    //         setWords(data);
    //     });
    // }, [day]);

    const words = useFetch(`http://localhost:3001/words?day=${day}`);
    
    return (
        <>
        <h2>Day {day}</h2>
        {words.length === 0 && <span>Loading...</span>}
        <table>
            <tbody>
                {words.map(word => (
                    <Word word={word} key={word.id} />
                ))}
            </tbody>
        </table>
        </>
    );

}