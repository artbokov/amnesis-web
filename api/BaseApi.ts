class BaseApi {
	private apiUrl: string;
	
	constructor(url: string) {
		this.apiUrl = url
	}

	postRequest<requestType, responseType>(
		url: string,
		body: requestType
	) {
		return new Promise<responseType>((resolve, reject) => {
			fetch(`${this.apiUrl}${url}`, {
				method: "POST",
				headers: {"Content-Type": "application/json"},
				body: JSON.stringify(body)
			}).then(response => response.text())
				.then(text => resolve(JSON.parse(text)))
		});
	}

	getRequest<responseType>(url: string) {
		return new Promise<responseType>((resolve, reject) => {
			fetch(`${this.apiUrl}${url}`)
				.then(response => response.text())
				.then(text => resolve(JSON.parse(text)))
		});
	}
}

const baseApi = new BaseApi("http://oncoanalitika.com/api");
export default baseApi;