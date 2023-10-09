import AddCircle from '@mui/icons-material/AddCircle';
import DeleteForever from '@mui/icons-material/DeleteForever';
import {Button, IconButton, Sheet, Stack, Typography} from '@mui/joy';
import React from 'react';

export const DiaryRecords = (
	{
		selectedDiary,
		selectedDiaryRecords,
		deleteRecordOnClick,
		addRecordOnClick,
	},
) => {

	return selectedDiary && (
		<div>
			<Stack
				direction="column"
				justifyContent="flex-start"
				alignItems="center"
				spacing={1}
			>
				<Button
					variant={'outlined'}
					color={'primary'}
					onClick={addRecordOnClick}
					startDecorator={<AddCircle />}
				>Add record</Button>
				{selectedDiaryRecords?.length > 0 && selectedDiaryRecords.map(({recordDate, note, _id, recordType}) => (
					<Sheet
						key={_id}
						variant={'outlined'}
						sx={{ padding: 0, width: '90%' }}
						color={'neutral'}>
						<Typography level="body-xs" sx={{ width: '100%', padding: 0 }}>
							{new Date(recordDate).toLocaleDateString()}, {new Date(recordDate).toLocaleTimeString()}
						</Typography>
						<Stack
							direction={'row'}
							justifyContent={'flex-start'}
							alignItems={'center'}
							sapcing={1}
							sx={{ padding: 0, paddingLeft: 1, paddingRight: 2 }}
						>
							<div style={{ justifyContent: 'center', alignItems: 'center' }}>
								<Typography sx={{ fontSize: 30 }}>{recordType?.symbol}</Typography>
								<Typography sx={{ fontSize: 14 }}>{recordType?.caption}</Typography>
							</div>
							<div style={{ flex: 1, alignSelf: 'flex-start', marginLeft: 2, marginRight: 1 }}>
								<Typography
									level="body-sm" textColor="inherit">{note ? `Notes: ${note}` : ''}</Typography>
							</div>
							<IconButton variant="outlined" color={'danger'} size={'sm'} sx={{ alignSelf: 'flex-start' }} onClick={() => deleteRecordOnClick(_id)}>
								<DeleteForever/>
							</IconButton>
						</Stack>
					</Sheet>
				))}
				{selectedDiaryRecords?.length === 0 && (
					<div>
						You don't have records in this diary yet!
					</div>
				)}
			</Stack>
		</div>
	);
}