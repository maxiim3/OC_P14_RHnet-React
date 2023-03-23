import {OChildren} from "../../types"
import {DateContext} from "../../context/date.context"
import {useDateContextApi} from "../../hooks/useDateContextApi"
import React from "react"

export function ContextProvider({children}: OChildren) {
	return <DateContext.Provider value={useDateContextApi()}>{children}</DateContext.Provider>
}