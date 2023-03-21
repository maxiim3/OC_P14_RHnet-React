import {OChildren} from "./types"
import {DateContext} from "./date.context"
import {useDateContextApi} from "./useDateContextApi"
import React from "react"

export function ProvideDateContext({children}: OChildren) {
	return <DateContext.Provider value={useDateContextApi()}>{children}</DateContext.Provider>
}