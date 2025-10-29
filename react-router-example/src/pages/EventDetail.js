import { useParams,useNavigate } from "react-router-dom";
export default function EventDetail() {
    const params = useParams();
    const navigate = useNavigate();
    console.log(params);
    return <>
        <h1>Event Detail Page</h1>
        <p>Details about event {params.id} will be displayed here.</p>
        <button onClick={() => navigate('/events')} >Go Back</button>
    </>;
}
