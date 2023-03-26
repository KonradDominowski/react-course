import React from "react";

const AuthContext = React.createContext({
	isLoggedIn: false,
	onLogout: () => { } // Zaznaczaj że ta właściwość ma być jakąś funkcją, żeby IDE mi lepiej podpowiadał
})

export default AuthContext;