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
		? <IconButton onClick={onClick}>
			<ArrowBack/>
		</IconButton>
		: <></>;
}