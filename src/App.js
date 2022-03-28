import './App.scss';
import ContConstructor from './components/Constructor/ContConstructor';
import ContSite from './components/Site/ContSite';
function App() {
	return (
		<div className='constructor_container'>
			<ContSite />
			<ContConstructor />
		</div>
	);
}

export default App;
