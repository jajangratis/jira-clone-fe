import {useEffect, useState} from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { useDispatch, useSelector } from 'react-redux';
import { IconButton } from '@mui/material';

import { usersGetData } from '../actions/get-data';
import { DeleteIconWrap, EditIconWrap } from '../../../components/Icons';
import DialogStateless from "../../../components/Dialog2";
import { usersDeleteData } from '../actions/delete-data';

// c_user_id
// v_email
// v_fullname
// c_role_id


const columns = [
  { id: 'c_user_id', label: 'ID', minWidth: 100 },
  { id: 'v_email', label: 'Email', minWidth: 100 },  
  { id: 'v_fullname', label: 'Fullname', minWidth: 100 },  
  { id: 'c_role_id', label: 'Role', minWidth: 100 },  
  { id: 'action', label: 'Action', minWidth: 100 },  
];

export default function UserTable({
  handleOpenEditPopup,
  handleCloseEditPopup,
  setSelectedEditData
}) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const dispatch = useDispatch()
  const usersState = useSelector(state => state.users)
  const userData = usersState.result
  const [openDialogDelete, setOpenDialogDelete] = useState(false)
  const [selectDelete, setSelectDelete] = useState()

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleCloseDialogDelete = () => {
      setOpenDialogDelete(false)
  }

  useEffect(() => {
    dispatch(usersGetData())
  }, [dispatch])
  const userDataAction = JSON.parse(JSON.stringify(userData)).map(x => {
      x.actions = 'test'
      return x
  })
  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <DialogStateless
            wording={"Data yang akan dihapus tidak bisa dikembalikan"}
            onClickAction={() => {
                dispatch(usersDeleteData(selectDelete))
                setSelectDelete()
            }}
            title={"Delete Data?"}
            isOpen={openDialogDelete}
            handleClose={handleCloseDialogDelete}
        ></DialogStateless>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {userDataAction
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      if (column.id === 'action') {
                        return (
                            <TableCell key={column.id} align={column.align}>
                                <IconButton onClick={() => {
                                  setSelectedEditData(row)
                                  handleOpenEditPopup()
                                }}><EditIconWrap sx={{color: 'primary.main'}}/></IconButton>
                                <IconButton onClick={() => {
                                    setOpenDialogDelete(true)
                                    setSelectDelete(row)
                                }}><DeleteIconWrap sx={{color: 'red'}}/></IconButton>
                            </TableCell>
                        );
                      } else {
                        return (
                            <TableCell key={column.id} align={column.align}>
                                {column.format && typeof value === 'number'
                                ? column.format(value)
                                : value}
                            </TableCell>
                        );
                      }
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={userData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
