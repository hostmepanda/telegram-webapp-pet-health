import PostAdd from '@mui/icons-material/PostAdd';
import {Box, CardContent, CardCover, IconButton, Typography} from '@mui/joy';
import Card from '@mui/joy/Card';
import React from 'react';

import diaryImage from '../../assets/diary.jpg';

export const DiaryCoverCard = (
	{
		selectedDiary,
		diaries,
		onClick,
	},
) => {

	const noDiaryExists= (
		<h3 style={{fontSize: 15, width: '100%', textAlign: 'center' }}>
			You have not created yet a diary for your pet
					<Typography sx={{ fontSize: 15, paddingTop: 2, color: 'white' }}>
						To add a diary click{' '}
						<IconButton size={'sm'} color={'primary'} variant={'outlined'} sx={{ backgroundColor: 'white' }}>
							<PostAdd/>
						</IconButton>
						{' '}button
					</Typography>
		</h3>
	);

	const diaryCoverCards = !selectedDiary && diaries?.length > 0 &&
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
					onClick={() => onClick(_id)}
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
							<img src={diaryImage} style={{opacity: 0.3}} alt={'Image of a diary'}/>
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
		);

	return diaries?.length === 0
		? noDiaryExists
		: diaryCoverCards;
}