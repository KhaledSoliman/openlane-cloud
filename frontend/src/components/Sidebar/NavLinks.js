// sidebar nav links
export default {
	category1: [
		{
			"menu_title": "sidebar.getting-started",
			"path": "/app/getting-started",
			"menu_icon": "zmdi zmdi-view-dashboard",
		},
		{
			"menu_title": "sidebar.jobs",
			"menu_icon": "zmdi zmdi-case",
			"child_routes": [
				{
					"menu_title": "sidebar.jobManagement",
					"path": "/app/jobs/job-management",
				},
				{
					"menu_title": "sidebar.createJob",
					"path": "/app/employees/manage",
				},
			]
		},
	],
}
