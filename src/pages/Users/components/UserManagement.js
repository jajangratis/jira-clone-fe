import { Box } from "@mui/material"
import UserAddForm from "./UserAddForm"


const UserManagement = () => {
    return (
        <Box width={'100%'} height={'300px'}>
            <Box width={'30%'}>
                <UserAddForm/>
            </Box>
        </Box>
    )
}

export default UserManagement