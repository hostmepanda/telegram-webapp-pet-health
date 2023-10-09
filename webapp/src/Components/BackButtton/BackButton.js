import {ArrowBack} from '@mui/icons-material';
import {IconButton} from '@mui/joy';
import React from 'react';

export const BackButton = (
	{
		selectedDiary,
		diaries,
		onClick,
	},
) => {
	return selectedDiary && diaries?.length > 0
		? <IconButton size={'sm'} color={'primary'} style={{height: 10, marginLeft: -10 }} onClick={onClick}>
			<ArrowBack/>
		</IconButton>
		: <></>;
}