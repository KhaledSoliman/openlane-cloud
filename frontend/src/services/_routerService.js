// routes
import GettingStarted from "Routes/getting-started";
import Jobs from "Routes/jobs";
import User from "Routes/User";

// async component
import {
	AsyncAboutUsComponent,
} from 'Components/AsyncComponent/AsyncComponent';

export default [
	{
		path: 'getting-started',
		component: GettingStarted
	},
	{
		path: 'jobs',
		component: Jobs
	},
	{
		path: 'user',
		component: User
	},
	{
		path: 'about-us',
		component: AsyncAboutUsComponent
	},
]