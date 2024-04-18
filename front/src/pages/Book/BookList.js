import React, { useEffect, useState, useCallback } from 'react'
// import { useNavigate } from 'react-router-dom';
import customTheme from '../../themes/customTheme';
import TableforData from '../../components/TableforData.js'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Container, CssBaseline, Box } from '@mui/material'
import { LocalLibrary } from '@mui/icons-material';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
// import { error } from 'jquery';



function BookList() {
  // let navigate = useNavigate()
  const [openDialog, setOpenDialog] = useState(false);
  const [rows, setRows] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);
  // const [initializedRef,setInitializedRef] = useState(false);
  const doInitializeTable = false;

  const [inputData, setInputData] = useState({
    book_id: "",
    book_title: "",
    book_author: "",
    book_description: "",
    book_Published_Date: "",
    book_Language: "",
  });


  const columns = ["ID", "Book Title", "Book Author", 'Book Description', "Published Date", "Book language"]
  axios.defaults.withCredentials = true;
  const fetchData = async () => {
    // console.log("working")
    try {
      const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/book/getAllBooks`);
      if (res.data.length) {
        // console.log(res.data)
        setRows(res.data.map(({ id, book_title, book_author, book_description, book_Published_Date, book_Language }) => ({ id, book_title, book_author, book_description, book_Published_Date, book_Language })));
      } else {
        toast.error("No data found");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Something went wrong while fetching books");
    }
  };
  // function for adding a book:
  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
    setInputData({
      ...inputData,
      book_id: "",
      book_title: "",
      book_author: "",
      book_description: "",
      book_Published_Date: "",
      book_Language: "",
    })
    setIsEditMode(false)
  };

  const handleInput = (event) => {
    setInputData({ ...inputData, [event.target.name]: event.target.value })
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // console.log(inputData)
    if (inputData.book_title === '' || inputData.book_author === '' || inputData.book_description === '' || inputData.book_Published_Date === '' || inputData.book_Language === '') {
      return toast.error("All field must be filed.")
    }
    if (isEditMode === false) {
      // console.log(inputData)
      try {
        const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/book/addBook`, inputData);
        // console.log(res.data)
        if (res.data.status === true) {
          handleClose()
          toast.success("Added successfully!");
          fetchData()
        }
      } catch (error) {
        return toast.error(error.response.data.error);
      }
    } else {
      try {
        // console.log(inputData)
        const res = await axios.patch(`${process.env.REACT_APP_BACKEND_URL}/book/editBook/${inputData.book_id}`, inputData);
        // console.log(res)
        if (res.data.status === true) {
          handleClose()
          toast.success("Updated successfully!");
          fetchData()
          setIsEditMode(false)

        }
        setIsEditMode(false)
        if (res.data.status === false) {
          toast.success("Not updated, Something wrong!");
        }
      } catch (error) {
        // console.log(error)
        return toast.error(error.response.data.error);
      }
    }

  };

  const handleDelete = async (e) => {
    if (e === undefined || e === null || e[0] === null || e[0] === '' || e[0] === undefined) {
      toast.warn('You have made changes.\nBefore deleting refresh the page')
    } else {
      try {
        const res = await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/book/deleteBook/${e[0]}`);
        // console.log(res)
        if (res.data.status === true) {
          fetchData()
          toast.success("Deleted successfully!");
        }
        if (res.data.status === false) {
          toast.success("Not delete, Something wrong!");
        }
      } catch (error) {
        console.log(error)
        toast(error)
        // return toast.error(error);
      }
    }
  }

  const handleEdit = (e) => {
    // console.log(e)
    if (e === undefined || e === null || e[0] === null || e[0] === '' || e[0] === undefined) {
      toast.warn('You have made changes.\nBefore editing refresh the page')
    } else {
      setInputData({
        ...inputData,
        book_id: e[0],
        book_title: e[1],
        book_author: e[2],
        book_description: e[3],
        book_Published_Date: e[4],
        book_Language: e[5]
      })
      setOpenDialog(true);
      setIsEditMode(true)
    }
  }

  //   const rows = [{
  //   "id": 1,
  //   "first_name": "Kerk",
  //   "last_name": "Vasilik",
  //   "email": "kvasilik0@google.cn",
  //   "gender": "Male",
  //   "ip_address": "11.80.69.113"
  // }];
  useEffect(() => {
    fetchData()
  }, []);
  return (
    <>
      <div style={{ textAlign: 'center' }}>
        <h1 >{<LocalLibrary />} Book list</h1>
        <Button style={{ color: customTheme.palette.button.secondary, }} onClick={handleClickOpen}>Add Book</Button>
      </div>
      {rows.length > 0 && <TableforData caption={'Book list page'} icon={LocalLibrary} columns={columns} rows={rows} condition={doInitializeTable} handleDelete={handleDelete} handleEdit={handleEdit} />}


      <Dialog
        open={openDialog}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Add book"}
        </DialogTitle>
        <DialogContent>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
              sx={{
                marginTop: 'normal',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Box component="form" method='post' onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="book_title"
                  label="Book Title"
                  name="book_title"
                  value={inputData.book_title}
                  autoFocus
                  onChange={handleInput}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="book_author"
                  label="Book Author"
                  value={inputData.book_author}
                  id="User_Password"
                  onChange={handleInput}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="book_description"
                  label="Book Description"
                  value={inputData.book_description}
                  id="book_description"
                  onChange={handleInput}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="book_Published_Date"
                  label="Book Published Date"
                  value={inputData.book_Published_Date}
                  id="book_Published_Date"
                  onChange={handleInput}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="book_Language"
                  label="Book Language"
                  value={inputData.book_Language}
                  id="book_Language"
                  onChange={handleInput}
                />
              </Box>
            </Box>

          </Container >
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>
      <ToastContainer />
    </>
  )
}
export default BookList