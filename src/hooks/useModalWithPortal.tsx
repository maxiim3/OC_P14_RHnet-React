import React, {useCallback, useState} from "react"
import {OClick} from "../types"
import {createPortal} from "react-dom"
import {Modal} from "../components/molecules/Modal"

export const useModalWithPortal = () => {
	const [showModal, setShowModal] = useState(false)
	const appendModal = useCallback((e: OClick) => {
		e.preventDefault()
		setShowModal(true)
		// todo 	after x seconds, hide modal and redirect to employee list
	}, [])

	const hideModal = useCallback((e: OClick) => {
		e.preventDefault()
		setShowModal(false)
	}, [])

	const AppendModalToBody = () => {
		if (!showModal) return <></>

		return createPortal(<Modal onClose={hideModal} />, document.body)
	}
	return {AppendModalToBody, appendModal}
}