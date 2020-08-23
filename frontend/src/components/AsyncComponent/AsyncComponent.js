/**
 * AsyncComponent
 * Code Splitting Component / Server Side Rendering
 */
import React from 'react';
import Loadable from 'react-loadable';

// rct page loader
import RctPageLoader from 'Components/RctPageLoader/RctPageLoader';

const AsyncGettingStartedComponent = Loadable({
	loader: () => import("Routes/getting-started"),
	loading: () => <RctPageLoader />,
});
const AsyncUserSettingsComponent = Loadable({
	loader: () => import("Routes/user/user-settings"),
	loading: () => <RctPageLoader />,
});

// about us
const AsyncAboutUsComponent = Loadable({
	loader: () => import("Routes/about-us"),
	loading: () => <RctPageLoader />,
});

// feedback
const AsyncFeedbackComponent = Loadable({
	loader: () => import("Routes/pages/feedback"),
	loading: () => <RctPageLoader />,
});

// report
const AsyncReportComponent = Loadable({
	loader: () => import("Routes/pages/report"),
	loading: () => <RctPageLoader />,
});

// faq
const AsyncFaqComponent = Loadable({
	loader: () => import("Routes/pages/faq"),
	loading: () => <RctPageLoader />,
});

// blank
const AsyncBlankComponent = Loadable({
	loader: () => import("Routes/pages/blank"),
	loading: () => <RctPageLoader />,
});

// react dragula
const AsyncReactDragulaComponent = Loadable({
	loader: () => import("Routes/drag-drop/react-dragula"),
	loading: () => <RctPageLoader />,
});

// react dnd
const AsyncReactDndComponent = Loadable({
	loader: () => import("Routes/drag-drop/react-dnd"),
	loading: () => <RctPageLoader />,
});



const AsyncJobManagementComponent = Loadable({
	loader: () => import("Routes/jobs/job-management"),
	loading: () => <RctPageLoader />,
});

const AsyncJobDetailsComponent = Loadable({
	loader: () => import("Routes/jobs/job-details"),
	loading: () => <RctPageLoader />,
});

const AsyncJobMonitoringComponent = Loadable({
	loader: () => import("Routes/jobs/job-monitoring"),
	loading: () => <RctPageLoader />,
});


/*---------------- Session ------------------*/

// Session Login
const AsyncSessionLoginComponent = Loadable({
	loader: () => import("Routes/session/login"),
	loading: () => <RctPageLoader />,
});

// Session Register
const AsyncSessionRegisterComponent = Loadable({
	loader: () => import("Routes/session/register"),
	loading: () => <RctPageLoader />,
});

// Session Lock Screen
const AsyncSessionLockScreenComponent = Loadable({
	loader: () => import("Routes/session/lock-screen"),
	loading: () => <RctPageLoader />,
});

// Session Forgot Password
const AsyncSessionForgotPasswordComponent = Loadable({
	loader: () => import("Routes/session/forgot-password"),
	loading: () => <RctPageLoader />,
});

// Session Page 404
const AsyncSessionPage404Component = Loadable({
	loader: () => import("Routes/session/404"),
	loading: () => <RctPageLoader />,
});

// Session Page 404
const AsyncSessionPage500Component = Loadable({
	loader: () => import("Routes/session/500"),
	loading: () => <RctPageLoader />,
});

// terms and condition
const AsyncTermsConditionComponent = Loadable({
	loader: () => import("Routes/pages/terms-condition"),
	loading: () => <RctPageLoader />,
});

/*---------------- Editor -------------------*/

// editor quill
const AsyncQuillEditorComponent = Loadable({
	loader: () => import("Routes/editor/quill-editor"),
	loading: () => <RctPageLoader />,
});

// editor Wysiwyg
const AsyncWysiwygEditorComponent = Loadable({
	loader: () => import("Routes/editor/wysiwyg-editor"),
	loading: () => <RctPageLoader />,
});


export {
	AsyncAboutUsComponent,
	AsyncFeedbackComponent,
	AsyncReportComponent,
	AsyncFaqComponent,
	AsyncBlankComponent,
	AsyncReactDragulaComponent,
	AsyncReactDndComponent,
	AsyncSessionLoginComponent,
	AsyncSessionRegisterComponent,
	AsyncSessionLockScreenComponent,
	AsyncSessionForgotPasswordComponent,
	AsyncSessionPage404Component,
	AsyncSessionPage500Component,
	AsyncTermsConditionComponent,
	AsyncQuillEditorComponent,
	AsyncWysiwygEditorComponent,

	AsyncJobManagementComponent,
	AsyncJobMonitoringComponent,
	AsyncJobDetailsComponent,

	AsyncGettingStartedComponent,
	AsyncUserSettingsComponent,
};
