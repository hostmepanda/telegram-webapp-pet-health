import {Check, Close, IosShare} from '@mui/icons-material';
import {
  Button,
  DialogContent,
  DialogTitle, Divider,
  Drawer,
  IconButton,
  Input,
  ModalClose,
  Stack,
  Typography
} from '@mui/joy';
import {useEffect, useState} from 'react';
import axios from 'axios';
import Done from '@mui/icons-material/Done'

import './App.css'
import {BASE_URL, fetchAllDiaryByUserId} from './api/api';
import {DiaryCoverCard} from './Components/DiaryCoverCard/DiaryCoverCard';
import {DiaryRecords} from './Components/DiaryRecords/DiaryRecords';
import {Header} from './Components/Header/Header';

function App() {
  const webApp = window.Telegram.WebApp;

  const [telegramUserId, setTelegramUserId] = useState();
  const [diaries, setDiaries] = useState([]);
  const [selectedDiaryRecords, setSelectedDiaryRecords] = useState([]);
  const [visible, setVisible] = useState(false);
  const [isSettingVisible, setIsSettingVisible] = useState(false);
  const [recordNote, setRecordNote] = useState('');
  const [selectedDiary, setSelectedDiary] = useState(undefined);
  const [selectedRecordType, setSelectedRecordType] = useState(undefined);
  const [shareWith, setShareWith] = useState('');
  const [isShowShareInput, setIsShowShareInput] = useState(false);

  const {
    initDataUnsafe: {
      user: {id} = {},
    } = {},
  } = webApp ?? {};

  useEffect(() => {
    setTelegramUserId(id);
    void fetchAllDiaryByUserId(id, setDiaries);
  }, [id]);

  const onAddRecordClick = async () => {
    try {
      const {data: {records: updatedRecords}} = await axios.post(
        `${BASE_URL}/diaries/${selectedDiary}/records`,
        {
          recordDate: new Date().valueOf(),
          note: recordNote,
          recordType: selectedRecordType,
        }
      );

      setSelectedDiaryRecords(updatedRecords);
    } catch (error) {
      console.log(error);
    }
  };

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

  const show = () => {
    setVisible(true);
  };

  const backButtonOnClick = async () => {
    setSelectedDiary(undefined);
    setSelectedDiaryRecords([]);
    await fetchAllDiaryByUserId(id, setDiaries);
  }

  const diaryCoverCardOnClick = (clickedDiaryId) => {
    const {records = []} = diaries?.find(({_id: diaryId}) => diaryId === clickedDiaryId) ?? {};
    setTimeout(() => {
      setSelectedDiary(clickedDiaryId);
      setSelectedDiaryRecords(records);
    }, 500);
  }

  const addShareWithToDiary = async () => {
    if (!`${shareWith}`.trim()) {
      return;
    }
    await axios.post(
      `${BASE_URL}/diaries/${selectedDiary}/share`,
      { telegramUserId: shareWith },
    );
    setShareWith('');
    setIsShowShareInput(false);
    await fetchAllDiaryByUserId(id, setDiaries);
  }

  return (
    <div className="App">
      <Header
        diaries={diaries}
        selectedDiary={selectedDiary}
        setDiaries={setDiaries}
        setIsSettingVisible={setIsSettingVisible}
        setSelectedDiary={setSelectedDiary}
        telegramUserId={telegramUserId}
        backButtonOnClick={backButtonOnClick}
      />
      <DiaryCoverCard
        selectedDiary={selectedDiary}
        diaries={diaries}
        onClick={diaryCoverCardOnClick}
      />
      <DiaryRecords
        selectedDiary={selectedDiary}
        selectedDiaryRecords={selectedDiaryRecords}
        deleteRecordOnClick={onDeleteRecordButtonClick}
        addRecordOnClick={show}
      />

      <Drawer
        open={visible}
        onClose={() => setVisible(false)}
        anchor={'bottom'}
        size={'md'}
      >
        <Stack
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
          spacing={1}
          style={{ width: '90%', paddingTop: 10, paddingLeft: 10 }}
        >
          <DialogTitle style={{ flex: 0.9 }}>
            Add new record
          </DialogTitle>
          <IconButton size={'sm'} variant={'outlined'} onClick={() => {
            if(!selectedRecordType) {
              return;
            }
            void onAddRecordClick();
            setVisible(false);
            setSelectedRecordType(undefined);
            setRecordNote('');
          }}>
            <Done />
          </IconButton>
        </Stack>
        <ModalClose variant={'outlined'} />

        <DialogContent style={{ paddingLeft: 25, paddingRight: 25, paddingBottom: 40 }}>
          <div>Choose type</div>
          <Stack
            direction={'row'}
            justifyContent={'space-evenly'}
            flexWrap={'wrap'}
            alignItems={'center'}
            spacing={1}
          >
            {diaries?.find(({ _id }) => _id === selectedDiary)?.recordTypes?.map((recordType) => (
                <IconButton
                  style={{ marginTop: 2 }}
                  variant={recordType?._id === selectedRecordType?._id ? 'solid' : 'outlined'}
                  color={ recordType?._id === selectedRecordType?._id ? 'success' : 'neutral' }
                  key={recordType._id} onClick={() => recordType._id === selectedRecordType?._id ? setSelectedRecordType(undefined) : setSelectedRecordType(recordType)}>
                  <Typography>{recordType.symbol}</Typography>
                  <Typography>{recordType.caption}</Typography>
                </IconButton>
              ))}
          </Stack>

          <div>Note (Optional)</div>
          <Input
            size={'md'}
            style={{ width: '100%' }}
            placeholder="Optional: add your notes here"
            value={recordNote}
            onChange={({ target: { value: text } }) => setRecordNote(`${text}`)}  />
        </DialogContent>
      </Drawer>
      <Drawer
        open={isSettingVisible}
        onClose={() => {
          setIsSettingVisible(false);
          setIsShowShareInput(false);
          setShareWith('');
        }}
        anchor={'left'}
        size={'sm'}
      >
        <ModalClose/>
        <DialogTitle>Settings</DialogTitle>
        <DialogContent style={{ paddingLeft: 25, paddingRight: 25 }}>
          {diaries.find(({ _id }) => _id === selectedDiary)?.recordTypes?.map((recordType) => {
            return (
              <Stack
                key={recordType._id}
                direction="row"
                justifyContent="flex-start"
                alignItems="center"
                spacing={1}
              >
                <Typography>{recordType.symbol}</Typography>
                <Typography>{recordType.caption}</Typography>
              </Stack>
            );
          })}
        <Divider sx={{ marginTop: 2, marginBottom: 1 }} />
        <DialogContent>
            {diaries.find(({_id}) => _id === selectedDiary)?.sharedWith?.map(
              ({
                 telegramId,
                 firstName,
                 userName,
                _id,
               }) => {
                const userNamesOrNick = !firstName || !firstName ? telegramId : `${userName ?? firstName}`;

                return (
                  <Stack
                    key={_id}
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="center"
                    spacing={1}
                  >
                    <Typography level={'body-xs'}>Diary shared with: {userNamesOrNick}</Typography>
                  </Stack>
                );
              })}
            {!isShowShareInput && (
              <Button startDecorator={<IosShare size={'sm'}/>} variant={'outlined'} color={'primary'} size={'sm'}
                      onClick={() => setIsShowShareInput(true)}>
                Share diary
              </Button>
            )}
            {isShowShareInput && (
              <Stack direction={'column'} justifyContent={'center'} sx={{ marginTop: 1 }}>
                <DialogTitle sx={{ marginTop: 1 }}>Telegram id or nickname</DialogTitle>
                <Input
                  size={'sm'}
                  style={{width: '100%', marginTop: 1 }}
                  placeholder="@friendName or 1213123"
                  value={shareWith}
                  onChange={({target: {value: text}}) => setShareWith(`${text}`)}/>
                <Stack direction={'row'} alignItems={'center'} justifyContent='space-between' sx={{ marginTop: 1 }}>
                  <Button sx={{flex: 0.45}} variant={'outlined'} color={'success'} size={'sm'}
                          onClick={() => {
                            void addShareWithToDiary();
                          }}
                          startDecorator={<Check/>}>Share</Button>
                  <Button sx={{flex: 0.45}} variant={'outlined'} color={'danger'} size={'sm'} startDecorator={<Close/>}
                          onClick={() => {
                            setIsShowShareInput(false);
                            setShareWith('');
                          }}>Clear</Button>
                </Stack>
              </Stack>
            )}
      </DialogContent>
        </DialogContent>
      </Drawer>
    </div>
  );
}

export default App;
