import Done from '@mui/icons-material/Done';
import React, {useState} from 'react';
import axios from 'axios';
import DeleteForever from '@mui/icons-material/DeleteForever';
import PostAdd from '@mui/icons-material/PostAdd';
import Settings from '@mui/icons-material/Settings';
import {
	CardContent,
	DialogContent,
	DialogTitle,
	Drawer,
	IconButton,
	Input,
	ModalClose,
	Stack,
	Typography
} from '@mui/joy';
import Card from '@mui/joy/Card';

import {BASE_URL} from '../../api/api';
import {BackButton} from '../BackButtton/BackButton';

import {HeaderWithButtonWrapper} from './ui/styles';

export const Header = (
	{
		diaries,
		selectedDiary,
		setDiaries,
		setIsSettingVisible,
		setSelectedDiary,
		telegramUserId,
		backButtonOnClick,
	},
) => {
	const [isAddDiaryDialogOpened, setIsAddDiaryDialogOpened] = useState(false);
	const [petName, setPetName] = useState('');

	const onSettingsClick = () => {
		setIsSettingVisible(true);
	};

	const onAddDiaryClick = async () => {
		try {
			const createdDiary = await axios.post(
				`${BASE_URL}/diaries/${telegramUserId}`,
				{
					petName,
				},
			);
			setDiaries(diaries.push(createdDiary.data));
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


	return (
		<HeaderWithButtonWrapper>
			<Stack
				direction="row"
				justifyContent="space-between"
				alignItems="center"
				spacing={2}
				style={{ width: '100%', paddingBottom: 10 }}
			>
				<BackButton
					selectedDiary={selectedDiary}
					diaries={diaries}
					onClick={backButtonOnClick}
				/>
				<Stack
					direction="column"
					justifyContent="flex-start"
					alignItems="flex-start"
					spacing={1}
					style={{ minWidth: 150, width: '100%', paddingTop: 10 }}
				>
					{selectedDiary
						&& diaries.find(({_id}) => _id === selectedDiary)?.petName
						&& <Typography level={'title-lg'} color={'white'}>
							Diary of {diaries.find(({_id}) => _id === selectedDiary)?.petName ?? 'Unnamed pet'}
					</Typography>}
					<Typography level={'title-sm'} color={'primary'}>
						Pet Health Diary!
					</Typography>
				</Stack>

				{selectedDiary && (
					<Stack
						direction={'row'}
						spacing={1}
						justifyContent={'flex-end'}
					>
						<Card
							style={{width: 40, padding: 0}}
							color={'neutral'}
							variant="outlined" size={'sm'} onClick={onRemoveDiaryClick}>
							<CardContent>
								<IconButton size={'sm'} color={'primary'}>
									<DeleteForever/>
								</IconButton>
							</CardContent>
						</Card>
						<Card
							style={{width: 40, padding: 0}}
							color={'neutral'}
							variant="outlined" size={'sm'} onClick={onSettingsClick}>
							<CardContent>
								<IconButton size={'sm'} color={'primary'}>
									<Settings/>
								</IconButton>
							</CardContent>
						</Card>
					</Stack>)}

				{!selectedDiary && diaries?.length < 20 && (
					<Card
						style={{width: 40, padding: 0}}
						color={'neutral'}
						variant="outlined" size={'sm'} onClick={() => { setIsAddDiaryDialogOpened(true); }}>
						<CardContent>
							<IconButton size={'sm'} color={'primary'}>
								<PostAdd/>
							</IconButton>
						</CardContent>
					</Card>
				)}
			</Stack>
			<Drawer
				open={isAddDiaryDialogOpened}
				onClose={() => {
					setIsAddDiaryDialogOpened(false);
					setPetName('');
				}}
				anchor={'left'}
				size={'sm'}
			>

					<ModalClose/>
					<DialogTitle>Adding diary</DialogTitle>
				<DialogContent
					style={{ paddingLeft: 25, paddingRight: 25 }}
				>
					<div>Pet Name</div>
					<Stack
						direction="row"
						justifyContent="flex-start"
						alignItems="center"
						spacing={1}
						style={{width: '100%', paddingTop: 10 }}
					>
						<Input
							size={'md'}
							style={{width: '100%'}}
							placeholder="Waffle"
							value={petName}
							onChange={({target: {value: text}}) => setPetName(text)}/>
						<IconButton size={'sm'} variant={'outlined'} onClick={() => {
							if (!petName.trim()) {
								return;
							}
							void onAddDiaryClick();
							setIsAddDiaryDialogOpened(false);
							setPetName('');
						}}>
							<Done/>
						</IconButton>
					</Stack>
				</DialogContent>
			</Drawer>
		</HeaderWithButtonWrapper>
	);
}