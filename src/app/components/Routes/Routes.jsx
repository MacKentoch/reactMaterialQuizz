export const Routes = ()=>{
	return (
		<Route path="/" handler={App}>
			<DefaultRoute handler={Home} />
			<Route name="about" handler={About} />
			<Route name="contact" handler={Contact} />
		</Route>
	);
};
