import React from 'react';
import axios from 'axios';
import DeleteForever from '@mui/icons-material/DeleteForever';
import PostAdd from '@mui/icons-material/PostAdd';
import Settings from '@mui/icons-material/Settings';
import {CardContent, IconButton, Stack, Typography} from '@mui/joy';
import Card from '@mui/joy/Card';

import {BASE_URL} from '../../api/api';

import {HeaderWithButtonWrapper} from './ui/styles';

export const Header = (
	{
		diaries,
		selectedDiary,
		setDiaries,
		setIsSettingVisible,
		setSelectedDiary,
		telegramUserId,
	},
) => {
	const onSettingsClick = () => {
		setIsSettingVisible(true);
	};

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


	return (
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
				{selectedDiary
					&& diaries.find(({_id}) => _id === selectedDiary)?.petName
					&&
					<Typography>Diary of {diaries.find(({_id}) => _id === selectedDiary)?.petName ?? 'Unnamed pet'}</Typography>}
				{selectedDiary && (
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
				)}
				{!selectedDiary && diaries?.length < 2 && (
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
				{selectedDiary && <Card
					style={{width: 40, padding: 0}}
					color={'neutral'}
					variant="outlined" size={'sm'} onClick={onSettingsClick}>
					<CardContent>
						<IconButton size={'sm'} color={'primary'}>
							<Settings/>
						</IconButton>
					</CardContent>
				</Card>}
			</Stack>
		</HeaderWithButtonWrapper>
	);
}