import classes from './PageContent.module.css';

// message = JSON.parse(error.data).message
function PageContent({ title, children }) {
	return (
		<div className={ classes.content }>
			<h1>{ title }</h1>
			{ children }
		</div>
	);
}

export default PageContent;