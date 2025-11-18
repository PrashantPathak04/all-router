import { useNavigation } from "react-router-dom";
export default function Home() {
    const navigation = useNavigation();
    const NavState = navigation.state;
    console.log(navigation.state);
    return <>
     {NavState === 'loading' ? <p>Loading....</p> : null}
    <h1>Home Page</h1></>;
}
