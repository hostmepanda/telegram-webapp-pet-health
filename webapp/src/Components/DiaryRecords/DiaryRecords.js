import AddCircle from '@mui/icons-material/AddCircle';
import DeleteForever from '@mui/icons-material/DeleteForever';
import {CardContent, IconButton, Stack, Typography} from '@mui/joy';
import Card from '@mui/joy/Card';

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
				<Card
					key={`add-record-row`}
					variant={'soft'}
					color={'primary'}
					sx={{minWidth: 143}}>
					<IconButton
						variant={'outlined'}
						color={'neutral'}
						onClick={addRecordOnClick}
					>
						<AddCircle/>
					</IconButton>
				</Card>
				{selectedDiaryRecords?.length > 0 && selectedDiaryRecords.map(({recordDate, note, _id, recordType}) => (
					<Card
						key={_id}
						variant={'soft'}
						color={'primary'}
						sx={{minWidth: 143}}>
						<div>
							<Typography
								level="title-sm"
								textColor="inherit"
								sx={{textTransform: 'capitalize'}}
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
								<Typography level="body-xs">{recordType?.caption}</Typography>
								<Typography fontSize="lg" fontWeight="lg">
									{recordType?.symbol}
								</Typography>
							</div>
							<IconButton variant="soft" color={'danger'} onClick={() => deleteRecordOnClick(_id)}>
								<DeleteForever/>
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
	);
}