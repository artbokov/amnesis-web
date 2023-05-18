import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ChatPage, InfoPage, SupportPage } from "./pages";
import { Layout } from "./components";

const App = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route index element={<InfoPage />} />
					<Route path="chat" element={<ChatPage />} />
					<Route path="support" element={<SupportPage />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
};

export default App;
