import {
  AspectRatio,
  Box,
  CardActions,
  CardContent,
  CardCover,
  CardOverflow, DialogContent, DialogTitle, Drawer,
  IconButton, Input, ModalClose,
  Stack,
  Typography
} from '@mui/joy';
import {useEffect, useMemo, useState} from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import Card from '@mui/joy/Card';
import BakeryDiningIcon from '@mui/icons-material/BakeryDining';
import dairyImage from './assets/diary.jpg';
import DeleteForever from '@mui/icons-material/DeleteForever'
import AddCircle from '@mui/icons-material/AddCircle'
import PostAdd from '@mui/icons-material/PostAdd'
import Settings from '@mui/icons-material/Settings'

import './App.css'

const BASE_URL = process.env.REACT_APP_BASE_URL

const H1 = styled.div`
  font-size: 16px;
  width: 100%;
  text-align: center;
`

const H2 = styled.div`
  font-size: 14px;
  width: 100%;
  text-align: center;
`

const H3 = styled.div`
  font-size: 12px;
  width: 100%;
  text-align: center;
`

const H4 = styled.div`
  font-size: 10px;
  width: 100%;
  text-align: center;
`

const RemoveButton = styled.button`
  color: --tg-theme-text-color;
  background-color: darkred;
`

const AddRecordButton = styled.button`
  border-radius: 50px;
  border-width: 1px;
  border-color: blueviolet;
  color: --tg-theme-text-color;
`

const HeaderWithButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
`

function App() {
  const webApp = window.Telegram.WebApp;

  const [telegramUserId, setTelegramUserId] = useState();
  const [diaries, setDiaries] = useState([]);
  const [selectedDiaryRecords, setSelectedDiaryRecords] = useState([]);
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState('center');
  const [recordNote, setRecordNote] = useState('');
  const [selectedDiary, setSelectedDiary] = useState(undefined);

  const {
    initDataUnsafe: {
      user: {
        id,
        first_name: userFirstName,
        last_name: userLastName,
        username,
      } = {},
    } = {},
  } = webApp ?? {};

  useEffect(() => {
    setTelegramUserId(id);
    (async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/diaries/${id}`,
          {
            headers: {
              "ngrok-skip-browser-warning": "1",
            },
          }
        );
        setDiaries(response.data);
      } catch (error) {
        console.log(error.message);
      }
    })()
  }, [id]);

  const onAddDiaryClick = async () => {
    try {
      const createdDiary = await axios.post(
        `${BASE_URL}/diaries/${telegramUserId}`,
      );
      setDiaries([...diaries, createdDiary.data]);
    } catch (error) {
      console.log(error);
    }
  }

  const onRemoveDiaryClick = async () => {
    const diaryId = selectedDiary;

    try {
      await axios.delete(
        `${BASE_URL}/diaries/${diaryId}`,
      );
      setDiaries(diaries.filter(({ _id }) => _id !== diaryId));
      setSelectedDiary(undefined);
    } catch (error) {
      console.log(error);
    }
  }

  const onAddRecordClick = async (diaryId) => {
    try {
      const { data: { records: updatedRecords } } = await axios.post(
        `${BASE_URL}/diaries/${diaryId}/records`,
        {
          recordDate: new Date().valueOf(),
          note: '',
        }
      );

      setSelectedDiaryRecords(updatedRecords);
    } catch (error) {
      console.log(error);
    }
  }

  const onDeleteRecordButtonClick = async (recordId) => {
    try {
      await axios.delete(
        `${BASE_URL}/diaries/${selectedDiary}/records/${recordId}`,
      );

      setSelectedDiaryRecords(selectedDiaryRecords.filter(({ _id }) => _id !== recordId));
    } catch (error) {
      console.log(error);
    }
  };

  const onSettingsClick = () => {

  };

  /**/const show = (position) => {
    setPosition(position);
    setVisible(true);
  };

  return (
    <div className="App">
      <HeaderWithButtonWrapper>
        <Stack
          direction="row"
          justifyContent="flex-end"
          alignItems="center"
          spacing={2}
        >
          <Typography
            level={'title-lg'}
            color={'primary'}
          >
            Pet Health Diary!
          </Typography>
          {selectedDiary && (
            <Card
              style={{width: 40, padding: 0 }}
              color={'neutral'}
              variant="outlined" size={'sm'} onClick={onRemoveDiaryClick}>
              <CardContent>
                <IconButton size={'sm'} color={'primary'}>
                  <DeleteForever/>
                </IconButton>
              </CardContent>
            </Card>
          )}
          {diaries?.length < 2 && (
            <Card
              style={{width: 40, padding: 0}}
              color={'neutral'}
              variant="outlined" size={'sm'} onClick={onAddDiaryClick}>
              <CardContent>
                <IconButton size={'sm'} color={'primary'}>
                  <PostAdd/>
                </IconButton>
              </CardContent>
            </Card>
          )}
          <Card
            style={{width: 40, padding: 0 }}
            color={'neutral'}
            variant="outlined" size={'sm'} onClick={onSettingsClick}>
            <CardContent>
              <IconButton size={'sm'} color={'primary'}>
                <Settings/>
              </IconButton>
            </CardContent>
          </Card>
        </Stack>
      </HeaderWithButtonWrapper>
      {selectedDiary && diaries?.length > 0 && (
        <button onClick={() => {
          setSelectedDiary(undefined);
          setSelectedDiaryRecords([]);
        }}>
          Back
        </button>
      )}
      {!selectedDiary && diaries?.length > 0 &&
        diaries?.map(({_id, petName, records}) =>
          <Box
            key={_id}
            sx={{
              perspective: '1000px',
              transition: 'transform 0.4s',
              '& > div, & > div > div': {
                transition: 'inherit',
              },
              '&:hover': {
                '& > div': {
                  transform: 'rotateY(30deg)',
                  '& > div:nth-child(2)': {
                    transform: 'scaleY(0.9) translate3d(20px, 30px, 40px)',
                  },
                  '& > div:nth-child(3)': {
                    transform: 'translate3d(45px, 50px, 40px)',
                  },
                },
              },
            }}
          >

            <Card
              onClick={() => {
                const {records = []} = diaries?.find(({_id: diaryId}) => diaryId === _id) ?? {};
                setTimeout(() => {
                  setSelectedDiary(_id);
                  setSelectedDiaryRecords(records);
                }, 500);

              }}
              variant="outlined"
              sx={{
                minHeight: '80px',
                width: 300,
                backgroundColor: '#fff',
                borderColor: '#000',
                marginTop: 5,
                marginBottom: 5,
              }}
            >
              <Typography level="h2" fontSize="lg" textColor="#000">
                Records: {records?.length === 0 ? 'no records yet' : records.length}
              </Typography>
              <CardCover
                sx={{
                  background:
                    'linear-gradient(to top, rgba(0,0,0,0.4), rgba(0,0,0,0) 200px), linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0) 300px)',
                  border: '1px solid',
                  borderColor: '#777',
                  backdropFilter: 'blur(1px)',
                }}
              >
                <Typography level="h2" fontSize="lg" textColor="#fff">
                  <img src={dairyImage} style={{opacity: 0.3}}/>
                </Typography>
              </CardCover>
              <CardContent
                sx={{
                  alignItems: 'self-end',
                  justifyContent: 'flex-end',
                  background: 'linear-gradient(to top, rgba(0,0,0,0.3), rgba(0,0,0,0.3))',
                  border: '1px solid',
                  borderColor: '#000',
                  backdropFilter: 'blur(1px)',
                }}
              >
                <Typography level="h2" fontSize="lg" textColor="#fff" m={2}>
                  {petName}
                </Typography>
              </CardContent>
            </Card>

          </Box>

      )}
      {selectedDiary && selectedDiaryRecords?.length > 0 && (
        <div>
          <H3>Diary {diaries.find(({ _id }) => _id === selectedDiary)?.petName ?? 'Unnamed pet'}</H3>
          <Stack
            direction="column"
            justifyContent="flex-start"
            alignItems="center"
            spacing={1}
          >
            <Card
              key={`add-record-row`}
              variant={'soft'}
              color={'primary'}
              sx={{minWidth: 143}}>
              <IconButton
                variant={'outlined'}
                color={'neutral'}
                onClick={() => {
                  show('bottom');
                }}
              >
                <AddCircle/>
              </IconButton>
            </Card>
            {selectedDiaryRecords.map(({ recordDate, note, _id }, index) => (
              <Card
                key={_id}
                variant={'soft'}
                color={'primary'}
                sx={{ minWidth: 143 }}>
                <div>
                  <Typography
                    level="title-sm"
                    textColor="inherit"
                    sx={{ textTransform: 'capitalize' }}
                  >
                    {new Date(recordDate).toLocaleDateString()}, {new Date(recordDate).toLocaleTimeString()}
                  </Typography>
                  <Typography
                    level="body-sm"
                    textColor="inherit"
                  >
                    {note}
                  </Typography>
                </div>
                <CardContent orientation="horizontal">
                  <div>
                    <Typography level="body-xs">Total price:</Typography>
                    <Typography fontSize="lg" fontWeight="lg">
                      $2,900
                    </Typography>
                  </div>
                  <IconButton variant="soft" color={'danger'} onClick={() => onDeleteRecordButtonClick(_id)}>
                    <DeleteForever />
                  </IconButton>
                </CardContent>
              </Card>
            ))}
            {selectedDiaryRecords?.length === 0 && (
              <div>
                You don't have records in this diary yet!
              </div>
            )}
          </Stack>
        </div>
      )}
      {diaries?.length === 0 && (
        <h3 style={{fontSize: 12, width: '100%', textAlign: 'center'}}>You have not created yet a diary for your
          pet
        </h3>
      )}

      <Drawer
        open={visible}
        onClose={() => setVisible(false)}
        anchor={'bottom'}
        size={'sm'}
      >
        <ModalClose/>
        <DialogTitle>Add new record</DialogTitle>
        <DialogContent
          style={{ paddingLeft: 25, paddingRight: 25 }}
        >
          <div>Note</div>
          <Input
            size={'md'}
            style={{ width: '100%' }}
            placeholder="Optional: add your notes here"
            value={recordNote}
            onChange={({ target: { value: text } }) => setRecordNote(text)}  />
        </DialogContent>
      </Drawer>
      <Drawer
        open={visible}
        onClose={() => setVisible(false)}
        anchor={'bottom'}
        size={'sm'}
      >
        <ModalClose/>
        <DialogTitle>Settings</DialogTitle>
        <DialogContent
          style={{ paddingLeft: 25, paddingRight: 25 }}
        >
          <div>Note</div>
          <Input
            size={'md'}
            style={{ width: '100%' }}
            placeholder="Optional: add your notes here"
            value={recordNote}
            onChange={({ target: { value: text } }) => setRecordNote(text)}  />
        </DialogContent>
      </Drawer>
    </div>
  );
}

export default App;
