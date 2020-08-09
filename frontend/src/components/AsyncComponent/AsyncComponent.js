/**
 * AsyncComponent
 * Code Splitting Component / Server Side Rendering
 */
import React from 'react';
import Loadable from 'react-loadable';

// rct page loader
import RctPageLoader from 'Components/RctPageLoader/RctPageLoader';

// ecommerce dashboard
const AsyncGettingStartedComponent = Loadable({
	loader: () => import("Routes/getting-started"),
	loading: () => <RctPageLoader />,
});
const AsyncUserSettingsComponent = Loadable({
	loader: () => import("Routes/user/user-settings"),
	loading: () => <RctPageLoader />,
});

const AsyncUserWidgetComponent = Loadable({
	loader: () => import("Routes/widgets/user-widgets"),
	loading: () => <RctPageLoader />,
});

const AsyncUserChartsComponent = Loadable({
	loader: () => import("Routes/widgets/charts-widgets"),
	loading: () => <RctPageLoader />,
});

const AsyncGeneralWidgetsComponent = Loadable({
	loader: () => import("Routes/widgets/general-widgets"),
	loading: () => <RctPageLoader />,
});

// about us
const AsyncAboutUsComponent = Loadable({
	loader: () => import("Routes/about-us"),
	loading: () => <RctPageLoader />,
});

// chat app
const AsyncChatComponent = Loadable({
	loader: () => import("Routes/chat"),
	loading: () => <RctPageLoader />,
});

// mail app
const AsyncMailComponent = Loadable({
	loader: () => import("Routes/mail"),
	loading: () => <RctPageLoader />,
});

// todo app
const AsyncTodoComponent = Loadable({
	loader: () => import("Routes/todo"),
	loading: () => <RctPageLoader />,
});

// gallery
const AsyncGalleryComponent = Loadable({
	loader: () => import("Routes/pages/gallery"),
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

// pricing
const AsyncPricingComponent = Loadable({
	loader: () => import("Routes/pages/pricing"),
	loading: () => <RctPageLoader />,
});

// blank
const AsyncBlankComponent = Loadable({
	loader: () => import("Routes/pages/blank"),
	loading: () => <RctPageLoader />,
});

// google maps
const AsyncGooleMapsComponent = Loadable({
	loader: () => import("Routes/maps/google-map"),
	loading: () => <RctPageLoader />,
});

// google maps
const AsyncLeafletMapComponent = Loadable({
	loader: () => import("Routes/maps/leaflet-map"),
	loading: () => <RctPageLoader />,
});

// shop list
const AsyncShoplistComponent = Loadable({
	loader: () => import("Routes/ecommerce/shop-list"),
	loading: () => <RctPageLoader />,
});

// shop grid
const AsyncShopGridComponent = Loadable({
	loader: () => import("Routes/ecommerce/shop-grid"),
	loading: () => <RctPageLoader />,
});

// shop 
const AsyncShopComponent = Loadable({
	loader: () => import("Routes/ecommerce/shop"),
	loading: () => <RctPageLoader />,
});

// cart 
const AsyncCartComponent = Loadable({
	loader: () => import("Routes/ecommerce/cart"),
	loading: () => <RctPageLoader />,
});

// checkout 
const AsyncCheckoutComponent = Loadable({
	loader: () => import("Routes/ecommerce/checkout"),
	loading: () => <RctPageLoader />,
});

// invoice
const AsyncInvoiceComponent = Loadable({
	loader: () => import("Routes/ecommerce/invoice"),
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

// themify icons
const AsyncThemifyIconsComponent = Loadable({
	loader: () => import("Routes/icons/themify-icons"),
	loading: () => <RctPageLoader />,
});

// Simple Line Icons
const AsyncSimpleLineIconsComponent = Loadable({
	loader: () => import("Routes/icons/simple-line-icons"),
	loading: () => <RctPageLoader />,
});

// Material Icons
const AsyncMaterialIconsComponent = Loadable({
	loader: () => import("Routes/icons/material-icons"),
	loading: () => <RctPageLoader />,
});

// Basic Table
const AsyncBasicTableComponent = Loadable({
	loader: () => import("Routes/tables/basic"),
	loading: () => <RctPageLoader />,
});

// Basic Table
const AsyncDataTableComponent = Loadable({
	loader: () => import("Routes/tables/data-table"),
	loading: () => <RctPageLoader />,
});

// Responsive Table
const AsyncResponsiveTableComponent = Loadable({
	loader: () => import("Routes/tables/responsive"),
	loading: () => <RctPageLoader />,
});

// Users List
const AsyncUsersListComponent = Loadable({
	loader: () => import("Routes/users/user-list"),
	loading: () => <RctPageLoader />,
});

// Users Profile
const AsyncUserProfileComponent = Loadable({
	loader: () => import("Routes/users/user-profile"),
	loading: () => <RctPageLoader />,
});

// Users Profile 1
const AsyncUserProfile1Component = Loadable({
	loader: () => import("Routes/users/user-profile-1"),
	loading: () => <RctPageLoader />,
});

// Users Management
const AsyncJobManagementComponent = Loadable({
	loader: () => import("Routes/jobs/job-management"),
	loading: () => <RctPageLoader />,
});

/*--------------- Charts ----------------*/

// Re charts
const AsyncRechartsComponent = Loadable({
	loader: () => import("Routes/charts/recharts"),
	loading: () => <RctPageLoader />,
});

// ReactChartsjs2
const AsyncReactChartsjs2Component = Loadable({
	loader: () => import("Routes/charts/react-chartjs2"),
	loading: () => <RctPageLoader />,
});

/*---------------------- Calendar -----------*/

// Basic Calendar
const AsyncBasicCalendarComponent = Loadable({
	loader: () => import("Routes/calendar/BasicCalendar"),
	loading: () => <RctPageLoader />,
});

// Cultures Calendar
const AsyncCulturesComponent = Loadable({
	loader: () => import("Routes/calendar/Cultures"),
	loading: () => <RctPageLoader />,
});

// Dnd Calendar
const AsyncDndComponent = Loadable({
	loader: () => import("Routes/calendar/Dnd"),
	loading: () => <RctPageLoader />,
});

// Selectable Calendar
const AsyncSelectableComponent = Loadable({
	loader: () => import("Routes/calendar/Selectable"),
	loading: () => <RctPageLoader />,
});

// Custom Calendar
const AsyncCustomComponent = Loadable({
	loader: () => import("Routes/calendar/Custom"),
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

/*------------- Form Elemets -------------*/

// forms elements
const AsyncFormElementsComponent = Loadable({
	loader: () => import("Routes/forms/form-elements"),
	loading: () => <RctPageLoader />,
});

// forms TextField
const AsyncTextFieldComponent = Loadable({
	loader: () => import("Routes/forms/material-text-field"),
	loading: () => <RctPageLoader />,
});

// forms TextField
const AsyncSelectListComponent = Loadable({
	loader: () => import("Routes/forms/select-list"),
	loading: () => <RctPageLoader />,
});

/*------------------ UI Components ---------------*/

// components Alerts
const AsyncUIAlertsComponent = Loadable({
	loader: () => import("Routes/components/alert"),
	loading: () => <RctPageLoader />,
});

// components Appbar
const AsyncUIAppbarComponent = Loadable({
	loader: () => import("Routes/components/app-bar"),
	loading: () => <RctPageLoader />,
});

// components BottomNavigation
const AsyncUIBottomNavigationComponent = Loadable({
	loader: () => import("Routes/components/bottom-navigation"),
	loading: () => <RctPageLoader />,
});

// components BottomNavigation
const AsyncUIAvatarsComponent = Loadable({
	loader: () => import("Routes/components/avatar"),
	loading: () => <RctPageLoader />,
});

// components Buttons
const AsyncUIButtonsComponent = Loadable({
	loader: () => import("Routes/components/buttons"),
	loading: () => <RctPageLoader />,
});

// components Badges
const AsyncUIBadgesComponent = Loadable({
	loader: () => import("Routes/components/badges"),
	loading: () => <RctPageLoader />,
});

// components CardMasonary
const AsyncUICardMasonaryComponent = Loadable({
	loader: () => import("Routes/components/card-masonry"),
	loading: () => <RctPageLoader />,
});

// components Cards
const AsyncUICardsComponent = Loadable({
	loader: () => import("Routes/components/cards"),
	loading: () => <RctPageLoader />,
});

// components Chips
const AsyncUIChipsComponent = Loadable({
	loader: () => import("Routes/components/chip"),
	loading: () => <RctPageLoader />,
});

// components Dialog
const AsyncUIDialogComponent = Loadable({
	loader: () => import("Routes/components/dialog"),
	loading: () => <RctPageLoader />,
});

// components Dividers
const AsyncUIDividersComponent = Loadable({
	loader: () => import("Routes/components/dividers"),
	loading: () => <RctPageLoader />,
});

// components Drawers
const AsyncUIDrawersComponent = Loadable({
	loader: () => import("Routes/components/drawers"),
	loading: () => <RctPageLoader />,
});

// components ExpansionPanel
const AsyncUIExpansionPanelComponent = Loadable({
	loader: () => import("Routes/components/expansion-panel"),
	loading: () => <RctPageLoader />,
});

// components Grid List
const AsyncUIGridListComponent = Loadable({
	loader: () => import("Routes/components/grid-list"),
	loading: () => <RctPageLoader />,
});

// components List
const AsyncUIListComponent = Loadable({
	loader: () => import("Routes/components/list"),
	loading: () => <RctPageLoader />,
});

// components Menu
const AsyncUIMenuComponent = Loadable({
	loader: () => import("Routes/components/menu"),
	loading: () => <RctPageLoader />,
});

// components Popover
const AsyncUIPopoverComponent = Loadable({
	loader: () => import("Routes/components/popover"),
	loading: () => <RctPageLoader />,
});

// components Progress
const AsyncUIProgressComponent = Loadable({
	loader: () => import("Routes/components/progress"),
	loading: () => <RctPageLoader />,
});

// components Snackbar
const AsyncUISnackbarComponent = Loadable({
	loader: () => import("Routes/components/snackbar"),
	loading: () => <RctPageLoader />,
});

// components SelectionControls
const AsyncUISelectionControlsComponent = Loadable({
	loader: () => import("Routes/components/selection-controls"),
	loading: () => <RctPageLoader />,
});

/*---------------- Advance UI Components -------------*/

// advance components DateAndTimePicker
const AsyncAdvanceUIDateAndTimePickerComponent = Loadable({
	loader: () => import("Routes/advance-ui-components/dateTime-picker"),
	loading: () => <RctPageLoader />,
});

// advance components Tabs
const AsyncAdvanceUITabsComponent = Loadable({
	loader: () => import("Routes/advance-ui-components/tabs"),
	loading: () => <RctPageLoader />,
});

// advance components Stepper
const AsyncAdvanceUIStepperComponent = Loadable({
	loader: () => import("Routes/advance-ui-components/stepper"),
	loading: () => <RctPageLoader />,
});

// advance components NotificationComponent
const AsyncAdvanceUINotificationComponent = Loadable({
	loader: () => import("Routes/advance-ui-components/notification"),
	loading: () => <RctPageLoader />,
});

// advance components SweetAlert
const AsyncAdvanceUISweetAlertComponent = Loadable({
	loader: () => import("Routes/advance-ui-components/sweet-alert"),
	loading: () => <RctPageLoader />,
});

// advance components autoComplete
const AsyncAdvanceUIAutoCompleteComponent = Loadable({
	loader: () => import("Routes/advance-ui-components/autoComplete"),
	loading: () => <RctPageLoader />,
});


export {
	AsyncUserWidgetComponent,
	AsyncUserChartsComponent,
	AsyncGeneralWidgetsComponent,
	AsyncAboutUsComponent,
	AsyncChatComponent,
	AsyncMailComponent,
	AsyncTodoComponent,
	AsyncGalleryComponent,
	AsyncFeedbackComponent,
	AsyncReportComponent,
	AsyncFaqComponent,
	AsyncPricingComponent,
	AsyncBlankComponent,
	AsyncGooleMapsComponent,
	AsyncLeafletMapComponent,
	AsyncShoplistComponent,
	AsyncShopGridComponent,
	AsyncInvoiceComponent,
	AsyncReactDragulaComponent,
	AsyncReactDndComponent,
	AsyncThemifyIconsComponent,
	AsyncSimpleLineIconsComponent,
	AsyncMaterialIconsComponent,
	AsyncBasicTableComponent,
	AsyncDataTableComponent,
	AsyncResponsiveTableComponent,
	AsyncUsersListComponent,
	AsyncUserProfileComponent,
	AsyncUserProfile1Component,
	AsyncJobManagementComponent,
	AsyncRechartsComponent,
	AsyncReactChartsjs2Component,
	AsyncBasicCalendarComponent,
	AsyncCulturesComponent,
	AsyncDndComponent,
	AsyncSelectableComponent,
	AsyncCustomComponent,
	AsyncSessionLoginComponent,
	AsyncSessionRegisterComponent,
	AsyncSessionLockScreenComponent,
	AsyncSessionForgotPasswordComponent,
	AsyncSessionPage404Component,
	AsyncSessionPage500Component,
	AsyncTermsConditionComponent,
	AsyncQuillEditorComponent,
	AsyncWysiwygEditorComponent,
	AsyncFormElementsComponent,
	AsyncTextFieldComponent,
	AsyncSelectListComponent,
	AsyncUIAlertsComponent,
	AsyncUIAppbarComponent,
	AsyncUIBottomNavigationComponent,
	AsyncUIAvatarsComponent,
	AsyncUIButtonsComponent,
	AsyncUIBadgesComponent,
	AsyncUICardMasonaryComponent,
	AsyncUICardsComponent,
	AsyncUIChipsComponent,
	AsyncUIDialogComponent,
	AsyncUIDividersComponent,
	AsyncUIDrawersComponent,
	AsyncUIExpansionPanelComponent,
	AsyncUIGridListComponent,
	AsyncUIListComponent,
	AsyncUIMenuComponent,
	AsyncUIPopoverComponent,
	AsyncUIProgressComponent,
	AsyncUISnackbarComponent,
	AsyncUISelectionControlsComponent,
	AsyncAdvanceUIDateAndTimePickerComponent,
	AsyncAdvanceUITabsComponent,
	AsyncAdvanceUIStepperComponent,
	AsyncAdvanceUINotificationComponent,
	AsyncAdvanceUISweetAlertComponent,
	AsyncAdvanceUIAutoCompleteComponent,
	AsyncShopComponent,
	AsyncCartComponent,
	AsyncCheckoutComponent,

	AsyncGettingStartedComponent,
	AsyncUserSettingsComponent,
};
