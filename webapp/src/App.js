import {AspectRatio, Box, CardActions, CardContent, CardCover, CardOverflow, Typography} from '@mui/joy';
import {useEffect, useState} from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import Card from '@mui/joy/Card';
import BakeryDiningIcon from '@mui/icons-material/BakeryDining';

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

const HeaderCaption = styled.div`
  flex: 0.75;
`

const HeaderAddDiaryButton = styled.div`
  flex: 0.15;
`

function App() {
  const webApp = window.Telegram.WebApp;

  const [telegramUserId, setTelegramUserId] = useState();
  const [diaries, setDiaries] = useState([]);
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

  const onRemoveDiaryClick = async (diaryId) => {
    try {
      await axios.delete(
        `${BASE_URL}/diaries/${diaryId}`,
      );
      setDiaries(diaries.filter(({ _id }) => _id !== diaryId));
    } catch (error) {
      console.log(error);
    }
  }

  const onAddRecordClick = async (diaryId) => {
    try {
      const updatedDiary = await axios.post(
        `${BASE_URL}/diaries/${diaryId}/records`,
        {
          recordDate: new Date().valueOf(),
          note: '',
        }
      );
      const indexOfUpdatedDiary = diaries.findIndex(({ _id }) => _id === diaryId);
      diaries[indexOfUpdatedDiary] = updatedDiary

      setDiaries(diaries);
    } catch (error) {
      console.log(error);
    }
  }

  const show = (position) => {
    setPosition(position);
    setVisible(true);
  };

  const userNameOrNick = `${userFirstName} ${userLastName}`.trim() ?? username;
  const footerContent = (
    <div>
      <Button label="No" icon="pi pi-times" onClick={() => setVisible(false)} className="p-button-text" />
      <Button label="Yes" icon="pi pi-check" onClick={() => setVisible(false)} autoFocus />
    </div>
  );
  return (
    <div className="App">
      <HeaderWithButtonWrapper>
        <HeaderCaption>
          <H1>Pet Health Diary!</H1>
          <H2>Welcome {userNameOrNick}</H2>
        </HeaderCaption>
        <HeaderAddDiaryButton>
            {diaries?.length < 2 && (
              <Card variant="outlined" onClick={onAddDiaryClick}>
                <CardContent>
                  <Typography level="title-md">Add diary</Typography>
                </CardContent>
              </Card>
            )}
        </HeaderAddDiaryButton>
      </HeaderWithButtonWrapper>
      {selectedDiary && diaries?.length > 0 && (
        <button onClick={() => setSelectedDiary(undefined)}>
          Back
        </button>
      )}
      {!selectedDiary && diaries?.length > 0 && (
        <Box
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
          {diaries?.map(({ _id, petName, records }) =>
            <Card
              onClick={() => { setSelectedDiary(_id) }}
              variant="outlined"
              sx={{
                minHeight: '180px',
                width: 300,
                backgroundColor: '#fff',
                borderColor: '#000',
                marginTop: 5,
                marginBottom: 5,
              }}
            >
              <Typography level="h2" fontSize="lg" textColor="#000">
                {petName}
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
                  Card Cover
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
                  Card Content
                </Typography>
              </CardContent>
            </Card>
          )}
        </Box>
      )}
      {selectedDiary && diaries && diaries?.map(({ records, _id, petName = 'Not provided' }) => {
        return (
          <div key={_id}>
            <H3>Diary {petName} <RemoveButton onClick={() => onRemoveDiaryClick(_id)}>X</RemoveButton></H3>
            <div>
              <Button
                label="Bottom"
                icon="pi pi-arrow-up"
                onClick={() => {
                  show('bottom');
                  onAddRecordClick(_id)
                }}
                className="p-button-success"
                style={{minWidth: '10rem'}}
              />
            {records?.length > 0 && records.map(({ recordDate, note }, index) => (
              <div key={recordDate ?? index}>
                <div>record date: {recordDate}</div>
                <div>note: {note}</div>
              </div>
            ))}
              {records?.length === 0 && (
                <div>
                  You don't have records in this diary yet!
                </div>
              )}
            </div>
          </div>
        );
      })}
      {diaries?.length === 0 && (
        <h3 style={{fontSize: 12, width: '100%', textAlign: 'center'}}>You have not created yet a diary for your
          pet
        </h3>
      )}

      <Dialog
        className={'dialog m-0'}
        header={() => <div className={'pt-1'}>New record in diary</div>}
        visible={visible}
        position={position}
        style={{ width: '100%', height: '50vh' }}
        onHide={() => setVisible(false)}
        footer={footerContent}
        draggable={false}
        resizable={false}
        maximizable
      >
        <div className="p-4">
          <div>Date</div>
          <input
            value={recordNote}
            type={'text'}
            style={{ width: '100%' }}
            onChange={({ target: { value: text } }) => setRecordNote(text)} />
        </div>
      </Dialog>
    </div>
  );
}

export default App;
