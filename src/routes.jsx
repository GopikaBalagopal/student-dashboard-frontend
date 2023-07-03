import Classes from './components/pages/classes'
import Dashboard from './components/pages/dashboard'
import LeaderBoards from './components/pages/leaderboard'
import Profile from './components/pages/profile'
import ResetPassword from './components/pages/reset-password'
import SignIn from './components/pages/signin'
import SignUp from './components/pages/signup'

const routes = () => [
    {
        path: '/auth',
        element: null,
        children: [
            {
                path: 'sign-in',
                element: <SignIn/>,
            },
            {
                path: 'sign-up',
                element: <SignUp/>,
            },
            {
                path: 'reset-password',
                element: <ResetPassword/>,
            },
        ],
    },
    {
        path: '/',
        element: null,
        children: [
            {
                path: 'dashboard',
                element: <Dashboard/>,
            },
            {
                path: 'class',
                element: <Classes/>,
            },
            {
                path: 'leaderboard',
                element: <LeaderBoards/>,
            },
            {
                path: 'profile',
                element: <Profile/>,
            }
        ],
    }
]

export default routes
