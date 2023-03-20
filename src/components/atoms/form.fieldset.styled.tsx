import styled from "styled-components"

export const FormFieldsetStyled = styled.fieldset`
	max-width: 625px;
	padding: 1rem 3rem;
	margin: 1rem auto;
	border: 1px dashed ${props => props.theme.txt.rgba(0.2)};
`