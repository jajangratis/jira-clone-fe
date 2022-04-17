import { Box } from "@mui/material"
import { useState } from "react"
import UserEditPopup from "./UserEditPopup"
import UserTable from "./UserTable"


const UserList = () => {
    const [isEdit, setIsEdit] = useState(false)
    const [selectedData, setSelectedData] = useState()
    const handleCloseEdit = () => {
        setIsEdit(false)
    }
    const handleOpenEdit = () => {
        setIsEdit(true)
    }
    return (
        <Box width={'100%'} height={'auto'} sx={{mt: '250px'}}>
            <UserEditPopup
                open={isEdit}
                handleOpen={handleOpenEdit}
                handleClose={handleCloseEdit}
                userData={selectedData}
            />
            <UserTable
                handleOpenEditPopup={handleOpenEdit}
                handleCloseEditPopup={handleCloseEdit}
                setSelectedEditData={setSelectedData}
            />
        </Box>
    )
}

export default UserList