import axios from 'axios';

export const BASE_URL = process.env.REACT_APP_BASE_URL

export const fetchAllDiaryByUserId = async (userId, setState) => {
	try {
		const response = await axios.get(
			`${BASE_URL}/diaries/${userId}`,
			{
				headers: {
				 ...(process.env.REACT_APP_ENVIRONMENT === 'development' ? {"ngrok-skip-browser-warning": "1"} : undefined),
				},
			}
		);
		if (Array.isArray(response.data)) {
			setState(response.data);
		}
	} catch (error) {
		console.log(error.message);
	}
}