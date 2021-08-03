import { useUser } from '../components/user';

export default function Home(props) {
	if (useUser()) return <div>MAIN</div>;
	return <div>NOT</div>;
}
