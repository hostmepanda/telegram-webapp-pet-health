import axios from 'axios';

export const BASE_URL = process.env.REACT_APP_BASE_URL

export const fetchAllDiaryByUserId = async (userId, setState) => {
	try {
		const response = await axios.get(
			`${BASE_URL}/diaries/${userId}`,
			{
				headers: {
					"ngrok-skip-browser-warning": "1",
				},
			}
		);
		setState(response.data);
	} catch (error) {
		console.log(error.message);
	}
}