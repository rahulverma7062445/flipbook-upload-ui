import {react} from 'react';
import animation from '../images/loading.gif';
import './css/bootstrap.css';

const FileProgress = () => {
	return(
		<div style ={{margin: "10%"}}>
		<img src={animation} alt="loading..." />
		<p>LOADING</p>
		</div>
  )
}

export default FileProgress;