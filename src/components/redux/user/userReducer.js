// const initialUserState = {
//     user: '',
//     loding: true,
//     error: ''

// }
const userReducer = (state = null, action) => {
    switch (action.type) {
        case 'LOGED_IN_USER':
            {
                return action.payload
            }
        case 'LOGOUT':
            {
                return action.payload
            }
        default: return state;
    }
}
export default userReducer;