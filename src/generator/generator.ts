const CHARACTERS =
	"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
const CHARACTERS_LENGTH = CHARACTERS.length;

const generateString = (length: number) => {
	let result = "";

	for (let i = 0; i < length; ++i) {
		result += CHARACTERS.charAt(Math.floor(Math.random() * CHARACTERS_LENGTH));
	}

	return result;
};

export default generateString;
